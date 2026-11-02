require("dotenv").config({ path: require("path").join(__dirname, ".env") });

const bcrypt = require("bcryptjs");
const cors = require("cors");
const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { randomUUID } = require("crypto");

const app = express();
const port = Number(process.env.PORT || 5000);
const collectionNames = [
  "buses",
  "routes",
  "bookings",
  "payments",
  "notifications",
  "systemUsers",
  "staff",
  "loginHistory",
  "companySettings",
  "paymentSettings",
  "notificationSettings",
  "systemPreferences",
];

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 120 },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: { type: String, trim: true, maxlength: 40, default: "" },
    passwordHash: { type: String, required: true, select: false },
    profilePicture: { type: String, default: "" },
    bio: { type: String, maxlength: 500, default: "" },
    language: { type: String, enum: ["en", "rw", "fr"], default: "en" },
    role: { type: String, enum: ["passenger", "admin"], required: true },
    status: { type: String, default: "Active" },
  },
  { timestamps: true, collection: "users" },
);

const User = mongoose.model("User", userSchema);
const recordModels = new Map();

function getRecordModel(collection) {
  if (!collectionNames.includes(collection)) {
    throw new Error(`Unknown record collection: ${collection}`);
  }
  if (!recordModels.has(collection)) {
    const schema = new mongoose.Schema(
      { id: { type: mongoose.Schema.Types.Mixed, required: true } },
      { collection, strict: false, versionKey: false, id: false },
    );
    schema.index({ id: 1 }, { unique: true });
    recordModels.set(
      collection,
      mongoose.model(`SystemRecord_${collection}`, schema, collection),
    );
  }
  return recordModels.get(collection);
}

async function ensureCollections() {
  const db = mongoose.connection.db;
  const existingCollections = new Set(
    (await db.listCollections({}, { nameOnly: true }).toArray()).map(
      (collection) => collection.name,
    ),
  );
  const allCollections = ["users", ...collectionNames];
  for (const name of allCollections) {
    if (!existingCollections.has(name)) {
      await db.createCollection(name);
    }
  }
  await Promise.all([
    User.init(),
    ...collectionNames.map((name) => getRecordModel(name).init()),
  ]);
}

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
  }),
);
app.use(express.json({ limit: "6mb" }));

function publicUser(user) {
  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    phone: user.phone,
    profilePicture: user.profilePicture,
    bio: user.bio,
    language: user.language,
    role: user.role,
    status: user.status,
    createdAt: user.createdAt,
    accountType: "registered",
  };
}

function createToken(user) {
  return jwt.sign(
    { sub: user._id.toString(), role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "12h" },
  );
}

async function addNotification(type, message) {
  await saveRecord("notifications", {
    id: `NT${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    type,
    message,
    date: new Date().toLocaleString(),
    read: false,
  });
}

async function saveRecord(collection, record) {
  const Model = getRecordModel(collection);
  const { _id, ...safeRecord } = record;
  return Model.findOneAndUpdate(
    { id: safeRecord.id },
    { $set: safeRecord },
    { upsert: true, new: true, runValidators: true },
  );
}

async function replaceRecords(collection, records) {
  const Model = getRecordModel(collection);
  const normalized = records.map((record, index) => {
    if (!record || typeof record !== "object" || Array.isArray(record)) {
      throw new Error("Every record must be an object.");
    }
    const { _id, ...safeRecord } = record;
    return {
      ...safeRecord,
      id: safeRecord.id ?? (records.length === 1 ? "singleton" : `${collection}-${index}-${randomUUID()}`),
    };
  });
  if (normalized.length) {
    await Model.bulkWrite(
      normalized.map((record) => ({
        updateOne: {
          filter: { id: record.id },
          update: { $set: record },
          upsert: true,
        },
      })),
    );
    await Model.deleteMany({
      id: { $nin: normalized.map((record) => record.id) },
    });
  } else {
    await Model.deleteMany({});
  }
  return normalized;
}

function authenticate(req, res, next) {
  const token = req.get("authorization")?.replace(/^Bearer\s+/i, "");
  if (!token) {
    return res.status(401).json({ message: "Sign in to continue." });
  }

  try {
    req.auth = jwt.verify(token, process.env.JWT_SECRET);
    return next();
  } catch {
    return res.status(401).json({ message: "Your session has expired. Sign in again." });
  }
}

function requireAdmin(req, res, next) {
  if (req.auth.role !== "admin") {
    return res.status(403).json({ message: "Administrator access is required." });
  }
  return next();
}

function requirePassenger(req, res, next) {
  if (req.auth.role !== "passenger") {
    return res.status(403).json({ message: "Passenger access is required." });
  }
  return next();
}

function validText(value, maxLength) {
  return typeof value === "string" && value.trim().length > 0 && value.length <= maxLength;
}

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", database: mongoose.connection.readyState === 1 });
});

app.post("/api/auth/register", async (req, res, next) => {
  try {
    const { name, email, phone = "", password } = req.body;
    if (
      !validText(name, 120) ||
      typeof email !== "string" ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      !validText(password, 128) ||
      password.length < 8
    ) {
      return res.status(400).json({ message: "Enter a valid name, email, and password (at least 8 characters)." });
    }

    const normalizedEmail = email.trim().toLowerCase();
    if (await User.exists({ email: normalizedEmail })) {
      return res.status(409).json({ message: "An account with this email already exists." });
    }

    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      phone: String(phone).trim(),
      passwordHash: await bcrypt.hash(password, 12),
      role: "passenger",
    });
    await addNotification("registration", `Passenger registered: ${user.name} (${user.email}).`);
    return res.status(201).json({ user: publicUser(user) });
  } catch (error) {
    return next(error);
  }
});

app.post("/api/auth/login", async (req, res, next) => {
  try {
    const email = String(req.body.email || "").trim().toLowerCase();
    const { password, role } = req.body;
    if (!["passenger", "admin"].includes(role) || !validText(password, 128)) {
      return res.status(400).json({ message: "Enter your email, password, and account type." });
    }

    const user = await User.findOne({ email, role }).select("+passwordHash");
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    if (role === "passenger") {
      await addNotification("login", `Passenger signed in: ${user.name} (${user.email}).`);
    } else {
      await saveRecord("loginHistory", {
        id: `LG${Date.now()}-${randomUUID()}`,
        email: user.email,
        timestamp: new Date().toLocaleString(),
        device: String(req.get("user-agent") || "").slice(0, 50),
      });
    }
    return res.json({ user: publicUser(user), token: createToken(user) });
  } catch (error) {
    return next(error);
  }
});

app.get("/api/auth/me", authenticate, async (req, res, next) => {
  try {
    const user = await User.findById(req.auth.sub);
    if (!user) return res.status(401).json({ message: "Account not found." });
    return res.json({ user: publicUser(user) });
  } catch (error) {
    return next(error);
  }
});

app.patch("/api/users/me", authenticate, async (req, res, next) => {
  try {
    const allowed = ["name", "phone", "profilePicture", "bio", "language"];
    const updates = {};
    for (const key of allowed) {
      if (key in req.body) updates[key] = req.body[key];
    }
    if (!validText(updates.name, 120)) {
      return res.status(400).json({ message: "A valid name is required." });
    }
    if (updates.profilePicture && updates.profilePicture.length > 5_000_000) {
      return res.status(413).json({ message: "The profile image is too large." });
    }
    if (updates.language && !["en", "rw", "fr"].includes(updates.language)) {
      return res.status(400).json({ message: "Choose a supported language." });
    }
    const user = await User.findByIdAndUpdate(req.auth.sub, updates, {
      new: true,
      runValidators: true,
    });
    if (!user) return res.status(404).json({ message: "Account not found." });
    return res.json({ user: publicUser(user) });
  } catch (error) {
    return next(error);
  }
});

app.put("/api/users/me/password", authenticate, async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!validText(newPassword, 128) || newPassword.length < 8) {
      return res.status(400).json({ message: "The new password must be at least 8 characters." });
    }
    const user = await User.findById(req.auth.sub).select("+passwordHash");
    if (!user || !(await bcrypt.compare(String(currentPassword || ""), user.passwordHash))) {
      return res.status(400).json({ message: "Your current password is incorrect." });
    }
    user.passwordHash = await bcrypt.hash(newPassword, 12);
    await user.save();
    return res.json({ message: "Password updated." });
  } catch (error) {
    return next(error);
  }
});

app.get("/api/users/me/bookings", authenticate, requirePassenger, async (req, res, next) => {
  try {
    const bookings = await getRecordModel("bookings")
      .find({ userId: req.auth.sub })
      .select("-_id")
      .lean();
    return res.json({ records: bookings });
  } catch (error) {
    return next(error);
  }
});

app.post("/api/bookings", authenticate, requirePassenger, async (req, res, next) => {
  try {
    const { booking, payment, bus, route } = req.body;
    if (
      !booking ||
      !validText(booking.id, 100) ||
      !validText(booking.from, 120) ||
      !validText(booking.to, 120) ||
      !Array.isArray(booking.seats) ||
      !Number.isFinite(Number(booking.amount))
    ) {
      return res.status(400).json({ message: "Booking details are incomplete or invalid." });
    }

    const user = await User.findById(req.auth.sub);
    if (!user) return res.status(401).json({ message: "Account not found." });
    const savedBooking = {
      ...booking,
      userId: user._id.toString(),
      passenger: user.name,
      email: user.email,
      phone: user.phone,
      currency: "RWF",
    };
    const tasks = [saveRecord("bookings", savedBooking)];
    if (payment && validText(payment.id, 100)) {
      tasks.push(saveRecord("payments", {
        ...payment,
        bookingId: booking.id,
        passenger: user.name,
        email: user.email,
      }));
    }
    if (bus && validText(bus.name, 120)) {
      const Bus = getRecordModel("buses");
      const existingBus = bus.catalogId
        ? await Bus.findOne({ catalogId: bus.catalogId })
        : bus.plate
          ? await Bus.findOne({ plate: bus.plate })
          : null;
      tasks.push(
        saveRecord("buses", { ...bus, id: existingBus?.id ?? `bus-${randomUUID()}` }),
      );
    }
    if (route && validText(route.from, 120) && validText(route.to, 120)) {
      const Route = getRecordModel("routes");
      const existingRoute = await Route.findOne({
        from: route.from,
        to: route.to,
        ...(route.busId ? { busId: route.busId } : {}),
      });
      tasks.push(
        saveRecord("routes", { ...route, id: existingRoute?.id ?? `route-${randomUUID()}` }),
      );
    }
    await Promise.all(tasks);
    await addNotification(
      "booking",
      `${user.name} booked ${savedBooking.busName || "a bus"} (${savedBooking.from} - ${savedBooking.to}), seat(s) ${savedBooking.seats.join(", ")}. Total: RWF ${Number(savedBooking.amount).toLocaleString()}.`,
    );
    return res.status(201).json({ booking: savedBooking });
  } catch (error) {
    return next(error);
  }
});

app.get("/api/admin/data", authenticate, requireAdmin, async (req, res, next) => {
  try {
    const [collectionRecords, users] = await Promise.all([
      Promise.all(
        collectionNames.map((name) =>
          getRecordModel(name).find({}).select("-_id").lean(),
        ),
      ),
      User.find({}).sort({ createdAt: -1 }).lean(),
    ]);
    const data = Object.fromEntries(
      collectionNames.map((name, index) => [name, collectionRecords[index]]),
    );
    data.users = users.map(publicUser);
    return res.json({ data });
  } catch (error) {
    return next(error);
  }
});

app.delete("/api/admin/users/:id", authenticate, requireAdmin, async (req, res, next) => {
  try {
    const user = await User.findOneAndDelete({
      _id: req.params.id,
      role: "passenger",
    });
    if (!user) return res.status(404).json({ message: "Passenger account not found." });
    return res.status(204).end();
  } catch (error) {
    return next(error);
  }
});

app.put("/api/admin/data/:collection", authenticate, requireAdmin, async (req, res, next) => {
  try {
    const { collection } = req.params;
    const { records } = req.body;
    if (!collectionNames.includes(collection)) {
      return res.status(404).json({ message: "Unknown data collection." });
    }
    if (!Array.isArray(records) || records.length > 5000) {
      return res.status(400).json({ message: "Records must be an array of at most 5,000 items." });
    }
    const savedRecords = await replaceRecords(collection, records);
    return res.json({ message: `${collection} saved.`, records: savedRecords });
  } catch (error) {
    return next(error);
  }
});

app.use((error, req, res, next) => {
  console.error(error);
  if (res.headersSent) return next(error);
  if (error.code === 11000) {
    return res.status(409).json({ message: "An account with this email already exists." });
  }
  if (error.type === "entity.too.large") {
    return res.status(413).json({ message: "The submitted data is too large." });
  }
  return res.status(500).json({ message: "The server could not complete the request." });
});

async function start() {
  const required = ["MONGODB_URI", "JWT_SECRET", "ADMIN_EMAIL", "ADMIN_PASSWORD"];
  const missing = required.filter((key) => !process.env[key]);
  if (missing.length) {
    throw new Error(`Missing required environment variables: ${missing.join(", ")}`);
  }
  if (process.env.JWT_SECRET.length < 32) {
    throw new Error("JWT_SECRET must contain at least 32 characters.");
  }
  if (process.env.ADMIN_PASSWORD.length < 12) {
    throw new Error("ADMIN_PASSWORD must contain at least 12 characters.");
  }

  await mongoose.connect(process.env.MONGODB_URI, {
    dbName: process.env.MONGODB_DATABASE || "online-ticket-booking",
  });
  await ensureCollections();

  const adminEmail = process.env.ADMIN_EMAIL.trim().toLowerCase();
  const adminPassword = process.env.ADMIN_PASSWORD;
  const existingAdmin = await User.findOne({ email: adminEmail, role: "admin" }).select(
    "+passwordHash",
  );
  if (!existingAdmin) {
    await User.create({
      name: process.env.ADMIN_NAME || "System Administrator",
      email: adminEmail,
      passwordHash: await bcrypt.hash(adminPassword, 12),
      role: "admin",
    });
  }

  app.listen(port, () => {
    console.log(`API listening on http://localhost:${port}`);
    console.log(`Connected to MongoDB database "${mongoose.connection.name}".`);
  });
}

start().catch((error) => {
  console.error("Could not start the API server:", error.message);
  process.exitCode = 1;
});
