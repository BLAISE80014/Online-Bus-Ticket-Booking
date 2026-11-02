import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../../utils/api";
import { useLanguage } from "../../context/LanguageContext";

function resizeProfileImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Could not read the selected image."));
    reader.onload = () => {
      const image = new Image();
      image.onerror = () => reject(new Error("The selected file is not a valid image."));
      image.onload = () => {
        const maxSize = 512;
        const scale = Math.min(1, maxSize / Math.max(image.width, image.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(image.width * scale);
        canvas.height = Math.round(image.height * scale);
        const context = canvas.getContext("2d");
        if (!context) {
          reject(new Error("Image processing is unavailable in this browser."));
          return;
        }
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", 0.78));
      };
      image.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

function Account() {
  const navigate = useNavigate();
  const { language, changeLanguage, t } = useLanguage();
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem("currentUser") || "null"),
  );
  const [bookings, setBookings] = useState([]);
  const [profile, setProfile] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    profilePicture: user?.profilePicture || "",
  });
  const [passwords, setPasswords] = useState({
    current: "",
    next: "",
    confirm: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user || user.role !== "passenger") {
      navigate("/login", { replace: true });
      return;
    }

    const loadAccount = async () => {
      try {
        const [{ user: account }, { records }] = await Promise.all([
          apiRequest("/auth/me"),
          apiRequest("/users/me/bookings"),
        ]);
        if (account.language) changeLanguage(account.language);
        localStorage.setItem("currentUser", JSON.stringify(account));
        setUser(account);
        setProfile({
          name: account.name || "",
          phone: account.phone || "",
          profilePicture: account.profilePicture || "",
        });
        setBookings(records);
      } catch (requestError) {
        setError(requestError.message);
      }
    };
    loadAccount();
  }, [changeLanguage, navigate]);

  const updateLanguage = async (event) => {
    const nextLanguage = event.target.value;
    changeLanguage(nextLanguage);
    try {
      const { user: updatedUser } = await apiRequest("/users/me", {
        method: "PATCH",
        body: { name: user.name, language: nextLanguage },
      });
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));
      setUser(updatedUser);
    } catch (requestError) {
      setError(requestError.message);
    }
  };

  const bookingTotal = useMemo(
    () => bookings.reduce((total, booking) => total + Number(booking.amount || 0), 0),
    [bookings],
  );

  const saveProfile = async (event) => {
    event.preventDefault();
    try {
      const { user: updatedUser } = await apiRequest("/users/me", {
        method: "PATCH",
        body: {
          name: profile.name.trim(),
          phone: profile.phone.trim(),
          profilePicture: profile.profilePicture,
        },
      });
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));
      setUser(updatedUser);
      setProfile({
        name: updatedUser.name,
        phone: updatedUser.phone,
        profilePicture: updatedUser.profilePicture || "",
      });
      setMessage("Your profile settings have been saved.");
      setError("");
    } catch (requestError) {
      setError(requestError.message);
    }
  };

  const handleProfileImage = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Choose an image file.");
      return;
    }

    try {
      const profilePicture = await resizeProfileImage(file);
      const { user: updatedUser } = await apiRequest("/users/me", {
        method: "PATCH",
        body: { name: user.name, profilePicture },
      });
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));
      setUser(updatedUser);
      setProfile((current) => ({ ...current, profilePicture }));
      setMessage("Your profile photo has been updated.");
      setError("");
    } catch (imageError) {
      setError(imageError.message);
    } finally {
      event.target.value = "";
    }
  };

  const changePassword = async (event) => {
    event.preventDefault();
    if (passwords.next.length < 8) {
      setError("Your new password must contain at least 8 characters.");
      setMessage("");
      return;
    }
    if (passwords.next !== passwords.confirm) {
      setError("The new passwords do not match.");
      setMessage("");
      return;
    }

    try {
      const response = await apiRequest("/users/me/password", {
        method: "PUT",
        body: {
          currentPassword: passwords.current,
          newPassword: passwords.next,
        },
      });
      setPasswords({ current: "", next: "", confirm: "" });
      setMessage(response.message);
      setError("");
    } catch (requestError) {
      setError(requestError.message);
      setMessage("");
    }
  };

  const logout = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("authToken");
    window.dispatchEvent(new Event("user-session-change"));
    navigate("/", { replace: true });
  };

  if (!user || user.role !== "passenger") return null;

  return (
    <div className="mx-auto mt-[13ch] mb-16 w-full max-w-6xl space-y-8 px-4 sm:px-7 md:px-16 lg:px-28">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-violet-600">
            {t("Passenger account")}
          </p>
          <h1 className="mt-1 text-3xl font-bold text-neutral-900 dark:text-white">
            {t("Welcome,")} {user.name}
          </h1>
          <p className="mt-2 text-neutral-500">{user.email}</p>
        </div>
        <button
          type="button"
          onClick={logout}
          className="rounded-xl border border-red-200 px-5 py-3 font-medium text-red-600 transition hover:bg-red-50"
        >
          {t("Logout")}
        </button>
      </header>

      {message && (
        <p role="status" className="rounded-xl bg-green-50 px-4 py-3 text-sm text-green-700">
          {message}
        </p>
      )}
      {error && (
        <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      )}

      <div className="grid gap-8 lg:grid-cols-2">
        <section className="rounded-2xl bg-white p-6 shadow-sm dark:bg-neutral-900">
          <h2 className="mb-5 text-xl font-semibold">{t("Profile settings")}</h2>
          <div className="mb-5 flex items-center gap-4">
            {profile.profilePicture ? (
              <img src={profile.profilePicture} alt="Passenger profile" className="h-16 w-16 rounded-full object-cover" />
            ) : (
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-violet-100 text-xl font-bold text-violet-700">
                {profile.name?.charAt(0)?.toUpperCase() || "?"}
              </div>
            )}
            <div>
              <label htmlFor="profile-photo" className="mb-1 block text-sm font-medium">
                {t("Profile photo")}
              </label>
              <input id="profile-photo" type="file" accept="image/*" onChange={handleProfileImage} className="block max-w-full text-sm text-neutral-500 file:mr-3 file:rounded-lg file:border-0 file:bg-violet-100 file:px-3 file:py-2 file:text-violet-700" />
            </div>
          </div>
          <form onSubmit={saveProfile} className="space-y-4">
            <div>
              <label htmlFor="account-name" className="mb-2 block text-sm font-medium">
                {t("Full name")}
              </label>
              <input
                id="account-name"
                value={profile.name}
                onChange={(event) =>
                  setProfile((current) => ({ ...current, name: event.target.value }))
                }
                minLength={2}
                required
                className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 outline-none focus:border-violet-500 dark:border-neutral-700 dark:bg-neutral-950"
              />
            </div>
            <div>
              <label htmlFor="account-email" className="mb-2 block text-sm font-medium">
                {t("Email address")}
              </label>
              <input
                id="account-email"
                type="email"
                value={user.email}
                disabled
                className="w-full rounded-xl border border-neutral-200 bg-neutral-100 px-4 py-3 text-neutral-500 dark:border-neutral-700 dark:bg-neutral-950"
              />
            </div>
            <div>
              <label htmlFor="account-phone" className="mb-2 block text-sm font-medium">
                {t("Phone number")}
              </label>
              <input
                id="account-phone"
                type="tel"
                value={profile.phone}
                onChange={(event) =>
                  setProfile((current) => ({ ...current, phone: event.target.value }))
                }
                required
                className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 outline-none focus:border-violet-500 dark:border-neutral-700 dark:bg-neutral-950"
              />
            </div>
            <button type="submit" className="rounded-xl bg-violet-600 px-5 py-3 font-medium text-white hover:bg-violet-700">
              {t("Save profile")}
            </button>
          </form>

          <form onSubmit={changePassword} className="mt-8 space-y-4 border-t border-neutral-200 pt-6 dark:border-neutral-800">
            <h3 className="text-lg font-semibold">{t("Change password")}</h3>
            <input
              type="password"
              placeholder="Current password"
              autoComplete="current-password"
              value={passwords.current}
              onChange={(event) => setPasswords((current) => ({ ...current, current: event.target.value }))}
              required
              className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 outline-none focus:border-violet-500 dark:border-neutral-700 dark:bg-neutral-950"
            />
            <input
              type="password"
              placeholder="New password (at least 8 characters)"
              autoComplete="new-password"
              minLength={8}
              value={passwords.next}
              onChange={(event) => setPasswords((current) => ({ ...current, next: event.target.value }))}
              required
              className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 outline-none focus:border-violet-500 dark:border-neutral-700 dark:bg-neutral-950"
            />
            <input
              type="password"
              placeholder="Confirm new password"
              autoComplete="new-password"
              minLength={8}
              value={passwords.confirm}
              onChange={(event) => setPasswords((current) => ({ ...current, confirm: event.target.value }))}
              required
              className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 outline-none focus:border-violet-500 dark:border-neutral-700 dark:bg-neutral-950"
            />
            <button type="submit" className="rounded-xl border border-violet-600 px-5 py-3 font-medium text-violet-700 hover:bg-violet-50 dark:text-violet-300">
            {t("Update password")}
            </button>
          </form>

          <div className="mt-8 border-t border-neutral-200 pt-6 dark:border-neutral-800">
            <label htmlFor="passenger-language" className="mb-2 block text-sm font-semibold">
            {t("Language")}
            </label>
            <select
            id="passenger-language"
            value={language}
            onChange={updateLanguage}
            className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 dark:border-neutral-700 dark:bg-neutral-950"
            >
            <option value="en">English</option>
            <option value="rw">Kinyarwanda</option>
            <option value="fr">Français</option>
            </select>
          </div>
        </section>

        <section className="rounded-2xl bg-white p-6 shadow-sm dark:bg-neutral-900">
          <div className="mb-5 flex items-center justify-between gap-4">
            <h2 className="text-xl font-semibold">{t("My tickets and bookings")}</h2>
            <span className="rounded-full bg-violet-100 px-3 py-1 text-sm font-medium text-violet-700">
              {bookings.length}
            </span>
          </div>
          {bookings.length === 0 ? (
            <div className="rounded-xl border border-dashed border-neutral-300 p-8 text-center dark:border-neutral-700">
              <p className="font-medium">{t("No bookings yet")}</p>
              <p className="mt-2 text-sm text-neutral-500">
                {t("Your completed ticket bookings will appear here.")}
              </p>
              <button onClick={() => navigate("/bus")} className="mt-4 rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white">
                {t("Find a bus")}
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {bookings.map((booking) => (
                <article key={booking.id} className="rounded-xl border border-neutral-200 p-4 dark:border-neutral-800">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold">{booking.routeId}</p>
                      <p className="mt-1 text-sm text-neutral-500">
                        {booking.dateTime || "Date not selected"}
                      </p>
                    </div>
                    <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-medium text-violet-700">
                      {booking.status}
                    </span>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                    <p><span className="text-neutral-500">Ticket:</span> {booking.id}</p>
                    <p><span className="text-neutral-500">Seat(s):</span> {booking.seats?.join(", ") || booking.seat || "—"}</p>
                    <p><span className="text-neutral-500">Bus:</span> {booking.busName || "—"}</p>
                    <p className="font-semibold text-violet-700 dark:text-violet-300">
                      RWF {Number(booking.amount || 0).toLocaleString()}
                    </p>
                  </div>
                </article>
              ))}
              <p className="border-t border-neutral-200 pt-4 text-right text-sm font-semibold dark:border-neutral-800">
                Total booked: RWF {bookingTotal.toLocaleString()}
              </p>
            </div>
          )}
        </section>
      </div>
      <p className="text-xs text-neutral-500">
        This demo stores account and booking data in this browser only. Production use requires secure server-side authentication and a shared database.
      </p>
    </div>
  );
}

export default Account;
