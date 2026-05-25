import React, { useState, useEffect } from "react";
import {
  FaTachometerAlt,
  FaBus,
  FaRoute,
  FaTicketAlt,
  FaUsers,
  FaFileAlt,
  FaCreditCard,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaEye,
  FaEdit,
  FaTrash,
  FaPlus,
  FaCalendarAlt,
  FaDollarSign,
  FaBell,
  FaEnvelope,
  FaMoon,
  FaSun,
  FaUserPlus,
  FaMoneyBillWave,
  FaBuilding,
  FaPalette,
  FaGlobe,
  FaSave,
  FaUpload,
  FaLock,
  FaPhone,
  FaFax,
  FaWhatsapp,
  FaUserCircle,
} from "react-icons/fa";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { useNavigate } from "react-router-dom";
// Modal Component
function Modal({ isOpen, onClose, title, children, darkMode }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div
        className={`max-w-md w-full rounded-2xl shadow-xl ${darkMode ? "bg-neutral-900" : "bg-white"}`}>
        <div className="flex justify-between items-center p-6 border-b border-neutral-200 dark:border-neutral-800">
          <h3
            className={`text-xl font-semibold ${darkMode ? "text-white" : "text-neutral-800"}`}>
            {title}
          </h3>
          <button
            onClick={onClose}
            className="text-neutral-500 hover:text-neutral-700">
            <FaTimes />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

// Password Strength Indicator
function PasswordStrength({ password }) {
  const getStrength = () => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.match(/[a-z]/)) strength++;
    if (password.match(/[A-Z]/)) strength++;
    if (password.match(/[0-9]/)) strength++;
    if (password.match(/[^a-zA-Z0-9]/)) strength++;
    return strength;
  };

  const strength = getStrength();
  const getColor = () => {
    if (strength <= 2) return "bg-red-500";
    if (strength === 3) return "bg-yellow-500";
    if (strength === 4) return "bg-blue-500";
    return "bg-green-500";
  };

  const getText = () => {
    if (strength <= 2) return "Weak";
    if (strength === 3) return "Medium";
    if (strength === 4) return "Strong";
    return "Very Strong";
  };

  return (
    <div className="mt-2">
      <div className="h-2 bg-neutral-200 rounded-full overflow-hidden">
        <div
          className={`h-full ${getColor()} transition-all duration-300`}
          style={{ width: `${(strength / 5) * 100}%` }}></div>
      </div>
      <p className={`text-xs mt-1 ${getColor().replace("bg-", "text-")}`}>
        Password strength: {getText()}
      </p>
    </div>
  );
}

// Main Dashboard Component
function AdminDashboard() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [darkMode, setDarkMode] = useState(false);

  // Modal states
  const [showAddBus, setShowAddBus] = useState(false);
  const [showAddRoute, setShowAddRoute] = useState(false);
  const [showAddBooking, setShowAddBooking] = useState(false);
  const [showAddUser, setShowAddUser] = useState(false);
  const [showAddPayment, setShowAddPayment] = useState(false);
  const [showAddStaff, setShowAddStaff] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  // Data states
  const [buses, setBuses] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);
  const [payments, setPayments] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loginHistory, setLoginHistory] = useState([]);
  const [staff, setStaff] = useState([]);

  // Profile Settings
  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    phone: "",
    bio: "",
    profilePicture: "",
  });

  // Security Settings
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  // Company Settings
  const [company, setCompany] = useState({
    name: "BusFlow Express",
    address: "Kigali, Rwanda",
    contactPhone: "+250 788 123 456",
    supportEmail: "support@busflow.com",
    website: "www.busflow.com",
  });

  // Payment Settings
  const [paymentSettings, setPaymentSettings] = useState({
    mobileMoneyEnabled: true,
    cardPaymentEnabled: true,
    currency: "RWF",
    taxPercentage: 18,
    refundPolicy: "Refunds within 24 hours",
  });

  // Notification Settings
  const [notificationSettings, setNotificationSettings] = useState({
    bookingNotifications: true,
    paymentAlerts: true,
    emailNotifications: true,
    smsNotifications: false,
    systemAlerts: true,
  });

  // System Preferences
  const [systemPrefs, setSystemPrefs] = useState({
    autoSeatTimeout: 15,
    cancellationRules: "Cancel 2 hours before",
    defaultLanguage: "English",
    timeZone: "Africa/Kigali",
  });

  // Settings tab state
  const [activeSettingsTab, setActiveSettingsTab] = useState("profile");

  // New Staff form
  const [newStaff, setNewStaff] = useState({
    name: "",
    email: "",
    role: "Manager",
  });

  // Form states
  const [newBus, setNewBus] = useState({
    name: "",
    plate: "",
    capacity: "",
    type: "",
    status: "Active",
  });
  const [newRoute, setNewRoute] = useState({
    from: "",
    to: "",
    distance: "",
    duration: "",
    price: "",
  });
  const [newBooking, setNewBooking] = useState({
    passenger: "",
    routeId: "",
    dateTime: "",
    seat: "",
    status: "Pending",
    amount: "",
  });
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    phone: "",
    role: "User",
  });
  const [newPayment, setNewPayment] = useState({
    bookingId: "",
    amount: "",
    status: "Pending",
  });

  // Check authentication and role on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (!storedUser) {
      navigate("/login");
      return;
    }

    const parsedUser = JSON.parse(storedUser);
    if (parsedUser.role !== "admin") {
      navigate("/");
      return;
    }

    setCurrentUser(parsedUser);
    setProfile({
      fullName: parsedUser.name || "",
      email: parsedUser.email || "",
      phone: parsedUser.phone || "",
      bio: parsedUser.bio || "",
      profilePicture: parsedUser.profilePicture || "",
    });

    const loginEntry = {
      id: Date.now(),
      email: parsedUser.email,
      timestamp: new Date().toLocaleString(),
      device: navigator.userAgent.substring(0, 50),
    };
    const existingHistory = JSON.parse(
      localStorage.getItem("loginHistory") || "[]",
    );
    existingHistory.unshift(loginEntry);
    localStorage.setItem(
      "loginHistory",
      JSON.stringify(existingHistory.slice(0, 10)),
    );
    setLoginHistory(existingHistory.slice(0, 10));

    // Load all data
    const savedBuses = localStorage.getItem("buses");
    if (savedBuses && JSON.parse(savedBuses).length > 0) {
      setBuses(JSON.parse(savedBuses));
    } else {
      setBuses([
        {
          id: 1,
          name: "Luxury Bus",
          plate: "RAB 123A",
          capacity: 50,
          type: "Luxury",
          status: "Active",
        },
      ]);
    }

    const savedRoutes = localStorage.getItem("routes");
    if (savedRoutes && JSON.parse(savedRoutes).length > 0) {
      setRoutes(JSON.parse(savedRoutes));
    } else {
      setRoutes([
        {
          id: 1,
          from: "Kigali",
          to: "Musanze",
          distance: "95km",
          duration: "2.5h",
          price: "5000",
        },
      ]);
    }

    const savedBookings = localStorage.getItem("bookings");
    if (savedBookings && JSON.parse(savedBookings).length > 0) {
      setBookings(JSON.parse(savedBookings));
    } else {
      setBookings([
        {
          id: "BK001",
          passenger: "John Doe",
          routeId: "Kigali - Musanze",
          dateTime: "2024-01-15 14:30",
          amount: "5000",
          status: "Confirmed",
        },
      ]);
    }

    const savedUsers = localStorage.getItem("systemUsers");
    if (savedUsers) setUsers(JSON.parse(savedUsers));

    const savedPayments = localStorage.getItem("payments");
    if (savedPayments) setPayments(JSON.parse(savedPayments));

    const savedNotifications = localStorage.getItem("notifications");
    if (savedNotifications) setNotifications(JSON.parse(savedNotifications));

    const savedStaff = localStorage.getItem("staff");
    if (savedStaff && JSON.parse(savedStaff).length > 0) {
      setStaff(JSON.parse(savedStaff));
    } else {
      setStaff([
        {
          id: 1,
          name: "Admin User",
          email: "admin@busflow.com",
          role: "Admin",
          status: "Active",
        },
      ]);
    }

    const savedDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedDarkMode);
  }, [navigate]);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    if (buses.length) localStorage.setItem("buses", JSON.stringify(buses));
  }, [buses]);
  useEffect(() => {
    if (routes.length) localStorage.setItem("routes", JSON.stringify(routes));
  }, [routes]);
  useEffect(() => {
    if (bookings.length)
      localStorage.setItem("bookings", JSON.stringify(bookings));
  }, [bookings]);
  useEffect(() => {
    localStorage.setItem("systemUsers", JSON.stringify(users));
  }, [users]);
  useEffect(() => {
    localStorage.setItem("payments", JSON.stringify(payments));
  }, [payments]);
  useEffect(() => {
    localStorage.setItem("staff", JSON.stringify(staff));
  }, [staff]);
  useEffect(() => {
    localStorage.setItem("notifications", JSON.stringify(notifications));
  }, [notifications]);
  useEffect(() => {
    localStorage.setItem("companySettings", JSON.stringify(company));
  }, [company]);
  useEffect(() => {
    localStorage.setItem("paymentSettings", JSON.stringify(paymentSettings));
  }, [paymentSettings]);
  useEffect(() => {
    localStorage.setItem(
      "notificationSettings",
      JSON.stringify(notificationSettings),
    );
  }, [notificationSettings]);
  useEffect(() => {
    localStorage.setItem("systemPreferences", JSON.stringify(systemPrefs));
  }, [systemPrefs]);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  const handleProfilePictureUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile({ ...profile, profilePicture: reader.result });
        if (currentUser) {
          const updatedUser = { ...currentUser, profilePicture: reader.result };
          localStorage.setItem("currentUser", JSON.stringify(updatedUser));
          setCurrentUser(updatedUser);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const saveProfile = () => {
    if (currentUser) {
      const updatedUser = {
        ...currentUser,
        name: profile.fullName,
        email: profile.email,
        phone: profile.phone,
        bio: profile.bio,
        profilePicture: profile.profilePicture,
      };
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));
      setCurrentUser(updatedUser);
      addNotification("Profile updated successfully!");
    }
  };

  const changePassword = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      addNotification("Passwords do not match!");
      return;
    }
    if (passwordData.newPassword.length < 6) {
      addNotification("Password must be at least 6 characters!");
      return;
    }
    if (currentUser) {
      const allUsers = JSON.parse(localStorage.getItem("users") || "[]");
      const userIndex = allUsers.findIndex((u) => u.id === currentUser.id);
      if (userIndex !== -1) {
        allUsers[userIndex].password = passwordData.newPassword;
        localStorage.setItem("users", JSON.stringify(allUsers));
        const updatedUser = {
          ...currentUser,
          password: passwordData.newPassword,
        };
        localStorage.setItem("currentUser", JSON.stringify(updatedUser));
        setCurrentUser(updatedUser);
      }
    }
    addNotification("Password changed successfully!");
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  const logoutFromAllDevices = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
    addNotification("Logged out from all devices");
  };

  const addStaffMember = () => {
    if (newStaff.name && newStaff.email) {
      const newId =
        staff.length > 0 ? Math.max(...staff.map((s) => s.id)) + 1 : 1;
      setStaff([
        ...staff,
        {
          id: newId,
          ...newStaff,
          status: "Active",
          createdAt: new Date().toISOString(),
        },
      ]);
      setNewStaff({ name: "", email: "", role: "Manager" });
      setShowAddStaff(false);
      addNotification(`New staff added: ${newStaff.name}`);
    }
  };

  const toggleStaffStatus = (id) => {
    setStaff(
      staff.map((s) =>
        s.id === id
          ? { ...s, status: s.status === "Active" ? "Inactive" : "Active" }
          : s,
      ),
    );
  };

  const deleteStaff = (id) => {
    setStaff(staff.filter((s) => s.id !== id));
  };

  const addBus = () => {
    if (newBus.name && newBus.plate) {
      const newId =
        buses.length > 0 ? Math.max(...buses.map((b) => b.id)) + 1 : 1;
      setBuses([...buses, { id: newId, ...newBus }]);
      setNewBus({
        name: "",
        plate: "",
        capacity: "",
        type: "",
        status: "Active",
      });
      setShowAddBus(false);
      addNotification(`New bus added: ${newBus.name}`);
    }
  };

  const addRoute = () => {
    if (newRoute.from && newRoute.to) {
      const newId =
        routes.length > 0 ? Math.max(...routes.map((r) => r.id)) + 1 : 1;
      setRoutes([...routes, { id: newId, ...newRoute }]);
      setNewRoute({ from: "", to: "", distance: "", duration: "", price: "" });
      setShowAddRoute(false);
      addNotification(`New route added: ${newRoute.from} → ${newRoute.to}`);
    }
  };

  const addBooking = () => {
    if (newBooking.passenger && newBooking.routeId) {
      const newId = `BK${Date.now()}`;
      setBookings([
        ...bookings,
        {
          id: newId,
          ...newBooking,
          dateTime: newBooking.dateTime || new Date().toLocaleString(),
        },
      ]);
      setNewBooking({
        passenger: "",
        routeId: "",
        dateTime: "",
        seat: "",
        status: "Pending",
        amount: "",
      });
      setShowAddBooking(false);
      addNotification(`New booking created for ${newBooking.passenger}`);
    }
  };

  const addUser = () => {
    if (newUser.name && newUser.email) {
      const newId =
        users.length > 0 ? Math.max(...users.map((u) => u.id), 0) + 1 : 1;
      setUsers([
        ...users,
        { id: newId, bookings: 0, status: "Active", ...newUser },
      ]);
      setNewUser({ name: "", email: "", phone: "", role: "User" });
      setShowAddUser(false);
      addNotification(`New user added: ${newUser.name}`);
    }
  };

  const addPayment = () => {
    if (newPayment.bookingId && newPayment.amount) {
      const newId = `PAY${Date.now()}`;
      setPayments([
        ...payments,
        {
          id: newId,
          ...newPayment,
          date: new Date().toISOString().split("T")[0],
        },
      ]);
      setNewPayment({ bookingId: "", amount: "", status: "Pending" });
      setShowAddPayment(false);
      addNotification(`Payment recorded for booking ${newPayment.bookingId}`);
    }
  };

  const addNotification = (message) => {
    const newNotif = {
      id: Date.now(),
      message,
      date: new Date().toLocaleString(),
      read: false,
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const deleteBus = (id) => setBuses(buses.filter((b) => b.id !== id));
  const deleteRoute = (id) => setRoutes(routes.filter((r) => r.id !== id));
  const deleteBooking = (id) =>
    setBookings(bookings.filter((b) => b.id !== id));
  const deleteUser = (id) => setUsers(users.filter((u) => u.id !== id));
  const deletePayment = (id) =>
    setPayments(payments.filter((p) => p.id !== id));

  const editBus = (bus) => {
    setNewBus(bus);
    setEditingItem(bus);
    setShowAddBus(true);
  };

  const saveEditBus = () => {
    if (editingItem) {
      setBuses(
        buses.map((b) =>
          b.id === editingItem.id ? { ...newBus, id: b.id } : b,
        ),
      );
      setShowAddBus(false);
      setEditingItem(null);
      setNewBus({
        name: "",
        plate: "",
        capacity: "",
        type: "",
        status: "Active",
      });
      addNotification(`Bus updated: ${newBus.name}`);
    }
  };

  const totalRevenue = payments.reduce(
    (sum, p) => sum + (parseInt(p.amount) || 0),
    0,
  );
  const stats = [
    {
      title: "Total Buses",
      value: buses.length,
      icon: FaBus,
      color: "bg-blue-500",
    },
    {
      title: "Total Bookings",
      value: bookings.length,
      icon: FaTicketAlt,
      color: "bg-purple-500",
    },
    {
      title: "Total Revenue",
      value: `RWF ${totalRevenue.toLocaleString()}`,
      icon: FaDollarSign,
      color: "bg-orange-500",
    },
    {
      title: "Active Routes",
      value: routes.length,
      icon: FaRoute,
      color: "bg-green-500",
    },
    {
      title: "Today's Trips",
      value: bookings.filter((b) =>
        b.dateTime?.startsWith(new Date().toISOString().split("T")[0]),
      ).length,
      icon: FaCalendarAlt,
      color: "bg-red-500",
    },
    {
      title: "Total Users",
      value: users.length,
      icon: FaUsers,
      color: "bg-yellow-500",
    },
  ];

  const chartData = [
    { month: "Jan", bookings: 65, revenue: 325000 },
    { month: "Feb", bookings: 78, revenue: 390000 },
    { month: "Mar", bookings: 92, revenue: 460000 },
    { month: "Apr", bookings: 85, revenue: 425000 },
    { month: "May", bookings: 110, revenue: 550000 },
    { month: "Jun", bookings: 125, revenue: 625000 },
  ];

  const pieData = [
    {
      name: "Completed",
      value: bookings.filter((b) => b.status === "Confirmed").length,
      color: "#10B981",
    },
    {
      name: "Pending",
      value: bookings.filter((b) => b.status === "Pending").length,
      color: "#F59E0B",
    },
    {
      name: "Cancelled",
      value: bookings.filter((b) => b.status === "Cancelled").length,
      color: "#EF4444",
    },
  ];

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: FaTachometerAlt },
    { id: "buses", label: "Manage Buses", icon: FaBus },
    { id: "routes", label: "Manage Routes", icon: FaRoute },
    { id: "bookings", label: "Manage Bookings", icon: FaTicketAlt },
    { id: "users", label: "Users", icon: FaUsers },
    { id: "reports", label: "Reports & Analytics", icon: FaFileAlt },
    { id: "payments", label: "Payments", icon: FaCreditCard },
    { id: "notifications", label: "Notifications", icon: FaBell },
    { id: "settings", label: "Settings", icon: FaCog },
  ];

  const settingsTabs = [
    { id: "profile", label: "Profile Settings", icon: FaUserCircle },
    { id: "security", label: "Security Settings", icon: FaLock },
    { id: "company", label: "Company Settings", icon: FaBuilding },
    { id: "payment", label: "Payment Settings", icon: FaCreditCard },
    { id: "notifications", label: "Notification Settings", icon: FaBell },
    { id: "appearance", label: "Appearance Settings", icon: FaPalette },
    { id: "staff", label: "User & Role Management", icon: FaUsers },
    { id: "system", label: "System Preferences", icon: FaGlobe },
  ];

  const renderSettings = () => (
    <div>
      <h2 className="text-2xl font-bold mb-6">Settings</h2>
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-80">
          <div
            className={`rounded-xl p-4 shadow-sm sticky top-24 ${darkMode ? "bg-neutral-900" : "bg-white"}`}>
            {settingsTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveSettingsTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors mb-2 ${
                  activeSettingsTab === tab.id
                    ? "bg-violet-600 text-white"
                    : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                }`}>
                <tab.icon className="text-lg" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 space-y-6">
          {activeSettingsTab === "profile" && (
            <div
              className={`rounded-xl p-6 shadow-sm ${darkMode ? "bg-neutral-900" : "bg-white"}`}>
              <h3 className="text-xl font-semibold mb-6">Profile Settings</h3>
              <div className="flex items-center gap-6 mb-6">
                <div className="relative">
                  {profile.profilePicture ? (
                    <img
                      src={profile.profilePicture}
                      alt="Profile"
                      className="w-24 h-24 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-violet-100 flex items-center justify-center">
                      <FaUserCircle className="text-5xl text-violet-600" />
                    </div>
                  )}
                  <label className="absolute bottom-0 right-0 bg-violet-600 p-2 rounded-full cursor-pointer hover:bg-violet-700">
                    <FaUpload className="text-white text-xs" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleProfilePictureUpload}
                      className="hidden"
                    />
                  </label>
                </div>
                <div>
                  <p className="font-semibold">Profile Picture</p>
                  <p className="text-sm text-neutral-500">
                    Click the camera icon to upload
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={profile.fullName}
                    onChange={(e) =>
                      setProfile({ ...profile, fullName: e.target.value })
                    }
                    className={`w-full px-4 py-2 rounded-lg border ${darkMode ? "bg-neutral-800 border-neutral-700" : "bg-white border-neutral-200"}`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) =>
                      setProfile({ ...profile, email: e.target.value })
                    }
                    className={`w-full px-4 py-2 rounded-lg border`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) =>
                      setProfile({ ...profile, phone: e.target.value })
                    }
                    className={`w-full px-4 py-2 rounded-lg border`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Bio / About
                  </label>
                  <textarea
                    rows="3"
                    value={profile.bio}
                    onChange={(e) =>
                      setProfile({ ...profile, bio: e.target.value })
                    }
                    className={`w-full px-4 py-2 rounded-lg border`}
                    placeholder="Tell us about yourself..."
                  />
                </div>
                <button
                  onClick={saveProfile}
                  className="bg-violet-600 text-white px-6 py-2 rounded-lg flex items-center gap-2">
                  <FaSave /> Save Changes
                </button>
              </div>
            </div>
          )}

          {activeSettingsTab === "security" && (
            <div
              className={`rounded-xl p-6 shadow-sm ${darkMode ? "bg-neutral-900" : "bg-white"}`}>
              <h3 className="text-xl font-semibold mb-6">Security Settings</h3>
              <div className="mb-8">
                <h4 className="font-semibold mb-4">Change Password</h4>
                <div className="space-y-4">
                  <input
                    type="password"
                    placeholder="Current Password"
                    value={passwordData.currentPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        currentPassword: e.target.value,
                      })
                    }
                    className={`w-full px-4 py-2 rounded-lg border`}
                  />
                  <input
                    type="password"
                    placeholder="New Password"
                    value={passwordData.newPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        newPassword: e.target.value,
                      })
                    }
                    className={`w-full px-4 py-2 rounded-lg border`}
                  />
                  <PasswordStrength password={passwordData.newPassword} />
                  <input
                    type="password"
                    placeholder="Confirm New Password"
                    value={passwordData.confirmPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        confirmPassword: e.target.value,
                      })
                    }
                    className={`w-full px-4 py-2 rounded-lg border`}
                  />
                  <button
                    onClick={changePassword}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg">
                    Update Password
                  </button>
                </div>
              </div>
              <div className="mb-8 p-4 rounded-lg border">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold">Two-Factor Authentication</h4>
                    <p className="text-sm text-neutral-500">
                      Add an extra layer of security
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={twoFactorEnabled}
                      onChange={() => setTwoFactorEnabled(!twoFactorEnabled)}
                    />
                    <div className="w-11 h-6 bg-neutral-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-violet-600"></div>
                  </label>
                </div>
              </div>
              <div className="mb-8">
                <h4 className="font-semibold mb-4">Login Activity History</h4>
                <div className="space-y-3">
                  {loginHistory &&
                    loginHistory.slice(0, 5).map((log) => (
                      <div
                        key={log.id}
                        className="p-3 rounded-lg bg-neutral-100 dark:bg-neutral-800">
                        <p className="text-sm">{log.timestamp}</p>
                        <p className="text-xs text-neutral-500">
                          Device: {log.device?.substring(0, 50)}...
                        </p>
                      </div>
                    ))}
                </div>
              </div>
              <button
                onClick={logoutFromAllDevices}
                className="bg-red-600 text-white px-6 py-2 rounded-lg">
                Logout from All Devices
              </button>
            </div>
          )}

          {activeSettingsTab === "company" && (
            <div
              className={`rounded-xl p-6 shadow-sm ${darkMode ? "bg-neutral-900" : "bg-white"}`}>
              <h3 className="text-xl font-semibold mb-6">Company Settings</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Company Name"
                  value={company.name}
                  onChange={(e) =>
                    setCompany({ ...company, name: e.target.value })
                  }
                  className={`w-full px-4 py-2 rounded-lg border`}
                />
                <textarea
                  rows="2"
                  placeholder="Office Address"
                  value={company.address}
                  onChange={(e) =>
                    setCompany({ ...company, address: e.target.value })
                  }
                  className={`w-full px-4 py-2 rounded-lg border`}
                />
                <input
                  type="tel"
                  placeholder="Contact Phone"
                  value={company.contactPhone}
                  onChange={(e) =>
                    setCompany({ ...company, contactPhone: e.target.value })
                  }
                  className={`w-full px-4 py-2 rounded-lg border`}
                />
                <input
                  type="email"
                  placeholder="Support Email"
                  value={company.supportEmail}
                  onChange={(e) =>
                    setCompany({ ...company, supportEmail: e.target.value })
                  }
                  className={`w-full px-4 py-2 rounded-lg border`}
                />
                <input
                  type="url"
                  placeholder="Website URL"
                  value={company.website}
                  onChange={(e) =>
                    setCompany({ ...company, website: e.target.value })
                  }
                  className={`w-full px-4 py-2 rounded-lg border`}
                />
                <button
                  onClick={() => addNotification("Company settings saved!")}
                  className="bg-violet-600 text-white px-6 py-2 rounded-lg">
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {activeSettingsTab === "payment" && (
            <div
              className={`rounded-xl p-6 shadow-sm ${darkMode ? "bg-neutral-900" : "bg-white"}`}>
              <h3 className="text-xl font-semibold mb-6">Payment Settings</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 rounded-lg border">
                  <div>
                    <p className="font-medium">Mobile Money</p>
                    <p className="text-sm text-neutral-500">
                      MTN, Airtel Money
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={paymentSettings.mobileMoneyEnabled}
                      onChange={(e) =>
                        setPaymentSettings({
                          ...paymentSettings,
                          mobileMoneyEnabled: e.target.checked,
                        })
                      }
                    />
                    <div className="w-11 h-6 bg-neutral-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-violet-600"></div>
                  </label>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg border">
                  <div>
                    <p className="font-medium">Card Payments</p>
                    <p className="text-sm text-neutral-500">Visa, Mastercard</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={paymentSettings.cardPaymentEnabled}
                      onChange={(e) =>
                        setPaymentSettings({
                          ...paymentSettings,
                          cardPaymentEnabled: e.target.checked,
                        })
                      }
                    />
                    <div className="w-11 h-6 bg-neutral-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-violet-600"></div>
                  </label>
                </div>
                <select
                  value={paymentSettings.currency}
                  onChange={(e) =>
                    setPaymentSettings({
                      ...paymentSettings,
                      currency: e.target.value,
                    })
                  }
                  className={`w-full px-4 py-2 rounded-lg border`}>
                  <option>RWF - Rwandan Franc</option>
                  <option>USD - US Dollar</option>
                </select>
                <input
                  type="number"
                  placeholder="Tax Percentage"
                  value={paymentSettings.taxPercentage}
                  onChange={(e) =>
                    setPaymentSettings({
                      ...paymentSettings,
                      taxPercentage: e.target.value,
                    })
                  }
                  className={`w-full px-4 py-2 rounded-lg border`}
                />
                <textarea
                  rows="3"
                  placeholder="Refund Policy"
                  value={paymentSettings.refundPolicy}
                  onChange={(e) =>
                    setPaymentSettings({
                      ...paymentSettings,
                      refundPolicy: e.target.value,
                    })
                  }
                  className={`w-full px-4 py-2 rounded-lg border`}
                />
                <button
                  onClick={() => addNotification("Payment settings saved!")}
                  className="bg-violet-600 text-white px-6 py-2 rounded-lg">
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {activeSettingsTab === "notifications" && (
            <div
              className={`rounded-xl p-6 shadow-sm ${darkMode ? "bg-neutral-900" : "bg-white"}`}>
              <h3 className="text-xl font-semibold mb-6">
                Notification Settings
              </h3>
              <div className="space-y-4">
                {[
                  {
                    key: "bookingNotifications",
                    label: "Booking Notifications",
                  },
                  { key: "paymentAlerts", label: "Payment Alerts" },
                  { key: "emailNotifications", label: "Email Notifications" },
                  { key: "smsNotifications", label: "SMS Notifications" },
                  { key: "systemAlerts", label: "System Alerts" },
                ].map((setting) => (
                  <div
                    key={setting.key}
                    className="flex justify-between items-center p-3 rounded-lg border">
                    <p className="font-medium">{setting.label}</p>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={notificationSettings[setting.key]}
                        onChange={(e) =>
                          setNotificationSettings({
                            ...notificationSettings,
                            [setting.key]: e.target.checked,
                          })
                        }
                      />
                      <div className="w-11 h-6 bg-neutral-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-violet-600"></div>
                    </label>
                  </div>
                ))}
                <button
                  onClick={() =>
                    addNotification("Notification settings saved!")
                  }
                  className="bg-violet-600 text-white px-6 py-2 rounded-lg">
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {activeSettingsTab === "appearance" && (
            <div
              className={`rounded-xl p-6 shadow-sm ${darkMode ? "bg-neutral-900" : "bg-white"}`}>
              <h3 className="text-xl font-semibold mb-6">
                Appearance Settings
              </h3>
              <div className="space-y-6">
                <div className="flex justify-between items-center p-3 rounded-lg border">
                  <div>
                    <p className="font-medium">Dark Mode</p>
                    <p className="text-sm text-neutral-500">
                      Switch between light and dark
                    </p>
                  </div>
                  <button
                    onClick={() => setDarkMode(!darkMode)}
                    className={`px-4 py-2 rounded-lg ${darkMode ? "bg-neutral-800 text-white" : "bg-neutral-200"}`}>
                    {darkMode ? <FaSun /> : <FaMoon />}
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeSettingsTab === "staff" && (
            <div
              className={`rounded-xl p-6 shadow-sm ${darkMode ? "bg-neutral-900" : "bg-white"}`}>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold">
                  User & Role Management
                </h3>
                <button
                  onClick={() => setShowAddStaff(true)}
                  className="bg-violet-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                  <FaPlus /> Add Staff
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead
                    className={darkMode ? "bg-neutral-800" : "bg-neutral-100"}>
                    <tr>
                      <th className="p-3">Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {staff.map((member) => (
                      <tr key={member.id} className="border-b">
                        <td className="p-3">{member.name}</td>
                        <td className="p-3">{member.email}</td>
                        <td className="p-3">{member.role}</td>
                        <td className="p-3">
                          <button
                            onClick={() => toggleStaffStatus(member.id)}
                            className={`px-2 py-1 rounded-full text-xs ${member.status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                            {member.status}
                          </button>
                        </td>
                        <td className="p-3">
                          <button
                            onClick={() => deleteStaff(member.id)}
                            className="text-red-600">
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeSettingsTab === "system" && (
            <div
              className={`rounded-xl p-6 shadow-sm ${darkMode ? "bg-neutral-900" : "bg-white"}`}>
              <h3 className="text-xl font-semibold mb-6">System Preferences</h3>
              <div className="space-y-4">
                <input
                  type="number"
                  placeholder="Auto Seat Timeout (minutes)"
                  value={systemPrefs.autoSeatTimeout}
                  onChange={(e) =>
                    setSystemPrefs({
                      ...systemPrefs,
                      autoSeatTimeout: e.target.value,
                    })
                  }
                  className={`w-full px-4 py-2 rounded-lg border`}
                />
                <textarea
                  rows="2"
                  placeholder="Cancellation Rules"
                  value={systemPrefs.cancellationRules}
                  onChange={(e) =>
                    setSystemPrefs({
                      ...systemPrefs,
                      cancellationRules: e.target.value,
                    })
                  }
                  className={`w-full px-4 py-2 rounded-lg border`}
                />
                <select
                  value={systemPrefs.defaultLanguage}
                  onChange={(e) =>
                    setSystemPrefs({
                      ...systemPrefs,
                      defaultLanguage: e.target.value,
                    })
                  }
                  className={`w-full px-4 py-2 rounded-lg border`}>
                  <option>English</option>
                  <option>Kinyarwanda</option>
                  <option>French</option>
                </select>
                <select
                  value={systemPrefs.timeZone}
                  onChange={(e) =>
                    setSystemPrefs({ ...systemPrefs, timeZone: e.target.value })
                  }
                  className={`w-full px-4 py-2 rounded-lg border`}>
                  <option>Africa/Kigali</option>
                  <option>Africa/Nairobi</option>
                  <option>UTC</option>
                </select>
                <button
                  onClick={() => addNotification("System preferences saved!")}
                  className="bg-violet-600 text-white px-6 py-2 rounded-lg">
                  Save Changes
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <Modal
        isOpen={showAddStaff}
        onClose={() => setShowAddStaff(false)}
        title="Add Staff Member"
        darkMode={darkMode}>
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Full Name"
            value={newStaff.name}
            onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
            className={`w-full p-2 rounded-lg border`}
          />
          <input
            type="email"
            placeholder="Email"
            value={newStaff.email}
            onChange={(e) =>
              setNewStaff({ ...newStaff, email: e.target.value })
            }
            className={`w-full p-2 rounded-lg border`}
          />
          <select
            value={newStaff.role}
            onChange={(e) => setNewStaff({ ...newStaff, role: e.target.value })}
            className={`w-full p-2 rounded-lg border`}>
            <option>Admin</option>
            <option>Manager</option>
            <option>Support</option>
          </select>
          <button
            onClick={addStaffMember}
            className="w-full bg-violet-600 text-white py-2 rounded-lg">
            Add Staff
          </button>
        </div>
      </Modal>
    </div>
  );

  const renderContent = () => {
    switch (activeMenu) {
      case "dashboard":
        return (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
              {stats.map((stat, idx) => (
                <div
                  key={idx}
                  className={`rounded-xl p-4 shadow-sm ${darkMode ? "bg-neutral-900" : "bg-white"}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-neutral-500">{stat.title}</p>
                      <p className="text-xl font-bold">{stat.value}</p>
                    </div>
                    <div
                      className={`${stat.color} p-2 rounded-full text-white`}>
                      <stat.icon className="text-sm" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <div
                className={`rounded-xl p-6 shadow-sm ${darkMode ? "bg-neutral-900" : "bg-white"}`}>
                <h3 className="font-semibold mb-4">Revenue Trends</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line dataKey="revenue" stroke="#10B981" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div
                className={`rounded-xl p-6 shadow-sm ${darkMode ? "bg-neutral-900" : "bg-white"}`}>
                <h3 className="font-semibold mb-4">Booking Trends</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <AreaChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      dataKey="bookings"
                      stroke="#8B5CF6"
                      fill="#8B5CF6"
                      opacity={0.1}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div
              className={`rounded-xl p-6 shadow-sm ${darkMode ? "bg-neutral-900" : "bg-white"}`}>
              <h3 className="font-semibold mb-4">Recent Bookings</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead
                    className={darkMode ? "bg-neutral-800" : "bg-neutral-100"}>
                    <tr>
                      <th className="p-3">ID</th>
                      <th>Passenger</th>
                      <th>Route</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.slice(0, 5).map((b) => (
                      <tr key={b.id} className="border-b">
                        <td className="p-3">{b.id}</td>
                        <td className="p-3">{b.passenger}</td>
                        <td className="p-3">{b.routeId}</td>
                        <td className="p-3">
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${b.status === "Confirmed" ? "bg-green-100 text-green-700" : b.status === "Pending" ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"}`}>
                            {b.status}
                          </span>
                        </td>
                        <td className="p-3">
                          <button
                            onClick={() => deleteBooking(b.id)}
                            className="text-red-600">
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case "buses":
        return (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Manage Buses</h2>
              <button
                onClick={() => {
                  setEditingItem(null);
                  setNewBus({
                    name: "",
                    plate: "",
                    capacity: "",
                    type: "",
                    status: "Active",
                  });
                  setShowAddBus(true);
                }}
                className="bg-violet-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                <FaPlus /> Add Bus
              </button>
            </div>
            <div
              className={`rounded-xl p-6 shadow-sm overflow-x-auto ${darkMode ? "bg-neutral-900" : "bg-white"}`}>
              <table className="w-full">
                <thead
                  className={darkMode ? "bg-neutral-800" : "bg-neutral-100"}>
                  <tr>
                    <th className="p-3">Name</th>
                    <th>Plate</th>
                    <th>Capacity</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {buses.map((bus) => (
                    <tr key={bus.id} className="border-b">
                      <td className="p-3">{bus.name}</td>
                      <td className="p-3">{bus.plate}</td>
                      <td className="p-3">{bus.capacity}</td>
                      <td className="p-3">{bus.type}</td>
                      <td className="p-3">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${bus.status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                          {bus.status}
                        </span>
                      </td>
                      <td className="p-3">
                        <div className="flex gap-2">
                          <button
                            onClick={() => editBus(bus)}
                            className="text-yellow-600">
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => deleteBus(bus.id)}
                            className="text-red-600">
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case "routes":
        return (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Manage Routes</h2>
              <button
                onClick={() => {
                  setShowAddRoute(true);
                }}
                className="bg-violet-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                <FaPlus /> Add Route
              </button>
            </div>
            <div
              className={`rounded-xl p-6 shadow-sm overflow-x-auto ${darkMode ? "bg-neutral-900" : "bg-white"}`}>
              <table className="w-full">
                <thead
                  className={darkMode ? "bg-neutral-800" : "bg-neutral-100"}>
                  <tr>
                    <th>From</th>
                    <th>To</th>
                    <th>Distance</th>
                    <th>Duration</th>
                    <th>Price</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {routes.map((route) => (
                    <tr key={route.id} className="border-b">
                      <td className="p-3">{route.from}</td>
                      <td className="p-3">{route.to}</td>
                      <td className="p-3">{route.distance}</td>
                      <td className="p-3">{route.duration}</td>
                      <td className="p-3">{route.price}</td>
                      <td className="p-3">
                        <button
                          onClick={() => deleteRoute(route.id)}
                          className="text-red-600">
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case "bookings":
        return (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Manage Bookings</h2>
              <button
                onClick={() => {
                  setShowAddBooking(true);
                }}
                className="bg-violet-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                <FaPlus /> Add Booking
              </button>
            </div>
            <div
              className={`rounded-xl p-6 shadow-sm overflow-x-auto ${darkMode ? "bg-neutral-900" : "bg-white"}`}>
              <table className="w-full text-sm">
                <thead
                  className={darkMode ? "bg-neutral-800" : "bg-neutral-100"}>
                  <tr>
                    <th>ID</th>
                    <th>Passenger</th>
                    <th>Route</th>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking) => (
                    <tr key={booking.id} className="border-b">
                      <td className="p-2">{booking.id}</td>
                      <td className="p-2">{booking.passenger}</td>
                      <td className="p-2">{booking.routeId}</td>
                      <td className="p-2">{booking.dateTime}</td>
                      <td className="p-2">{booking.amount}</td>
                      <td className="p-2">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${booking.status === "Confirmed" ? "bg-green-100" : booking.status === "Pending" ? "bg-yellow-100" : "bg-red-100"}`}>
                          {booking.status}
                        </span>
                      </td>
                      <td className="p-2">
                        <button
                          onClick={() => deleteBooking(booking.id)}
                          className="text-red-600">
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case "users":
        return (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Manage Users</h2>
              <button
                onClick={() => {
                  setShowAddUser(true);
                }}
                className="bg-violet-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                <FaUserPlus /> Add User
              </button>
            </div>
            <div
              className={`rounded-xl p-6 shadow-sm overflow-x-auto ${darkMode ? "bg-neutral-900" : "bg-white"}`}>
              <table className="w-full">
                <thead
                  className={darkMode ? "bg-neutral-800" : "bg-neutral-100"}>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b">
                      <td className="p-3">{user.name}</td>
                      <td className="p-3">{user.email}</td>
                      <td className="p-3">{user.phone}</td>
                      <td className="p-3">{user.role}</td>
                      <td className="p-3">
                        <span className="px-2 py-1 rounded-full text-xs bg-green-100">
                          {user.status || "Active"}
                        </span>
                      </td>
                      <td className="p-3">
                        <button
                          onClick={() => deleteUser(user.id)}
                          className="text-red-600">
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case "payments":
        return (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Payments</h2>
              <button
                onClick={() => {
                  setShowAddPayment(true);
                }}
                className="bg-violet-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                <FaMoneyBillWave /> Add Payment
              </button>
            </div>
            <div
              className={`rounded-xl p-6 shadow-sm overflow-x-auto ${darkMode ? "bg-neutral-900" : "bg-white"}`}>
              <table className="w-full">
                <thead
                  className={darkMode ? "bg-neutral-800" : "bg-neutral-100"}>
                  <tr>
                    <th>ID</th>
                    <th>Booking ID</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((payment) => (
                    <tr key={payment.id} className="border-b">
                      <td className="p-3">{payment.id}</td>
                      <td className="p-3">{payment.bookingId}</td>
                      <td className="p-3">{payment.amount}</td>
                      <td className="p-3">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${payment.status === "Completed" ? "bg-green-100" : "bg-yellow-100"}`}>
                          {payment.status}
                        </span>
                      </td>
                      <td className="p-3">{payment.date}</td>
                      <td className="p-3">
                        <button
                          onClick={() => deletePayment(payment.id)}
                          className="text-red-600">
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case "reports":
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6">Reports & Analytics</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div
                className={`rounded-xl p-6 shadow-sm ${darkMode ? "bg-neutral-900" : "bg-white"}`}>
                <h3 className="font-semibold mb-4">Booking Statistics</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) =>
                        `${name}: ${(percent * 100).toFixed(0)}%`
                      }
                      outerRadius={80}
                      dataKey="value">
                      {pieData.map((e, i) => (
                        <Cell key={i} fill={e.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div
                className={`rounded-xl p-6 shadow-sm ${darkMode ? "bg-neutral-900" : "bg-white"}`}>
                <h3 className="font-semibold mb-4">Revenue by Month</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="revenue" fill="#F59E0B" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div
              className={`rounded-xl p-6 shadow-sm ${darkMode ? "bg-neutral-900" : "bg-white"}`}>
              <h3 className="font-semibold mb-4">Summary</h3>
              <p>Total Revenue: RWF {totalRevenue.toLocaleString()}</p>
              <p>Total Bookings: {bookings.length}</p>
              <p>
                Active Users:{" "}
                {users.filter((u) => u.status !== "Inactive").length}
              </p>
            </div>
          </div>
        );

      case "notifications":
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6">Notifications</h2>
            <div
              className={`rounded-xl p-6 shadow-sm ${darkMode ? "bg-neutral-900" : "bg-white"}`}>
              {notifications.length === 0 ? (
                <p className="text-neutral-500">No notifications yet</p>
              ) : (
                notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className={`p-4 mb-3 rounded-lg border ${darkMode ? "border-neutral-800 hover:bg-neutral-800" : "border-neutral-200 hover:bg-neutral-50"}`}>
                    <p>{notif.message}</p>
                    <p className="text-xs text-neutral-500 mt-1">
                      {notif.date}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        );

      case "settings":
        return renderSettings();

      default:
        return <div>Content</div>;
    }
  };

  if (!currentUser) {
    return null;
  }

  return (
    <div
      className={`min-h-screen ${darkMode ? "bg-neutral-950" : "bg-neutral-100"}`}>
      <Modal
        isOpen={showAddBus}
        onClose={() => setShowAddBus(false)}
        title={editingItem ? "Edit Bus" : "Add New Bus"}
        darkMode={darkMode}>
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Bus Name"
            value={newBus.name}
            onChange={(e) => setNewBus({ ...newBus, name: e.target.value })}
            className={`w-full p-2 rounded-lg border ${darkMode ? "bg-neutral-800 border-neutral-700" : "bg-white"}`}
          />
          <input
            type="text"
            placeholder="Plate Number"
            value={newBus.plate}
            onChange={(e) => setNewBus({ ...newBus, plate: e.target.value })}
            className={`w-full p-2 rounded-lg border`}
          />
          <input
            type="number"
            placeholder="Capacity"
            value={newBus.capacity}
            onChange={(e) => setNewBus({ ...newBus, capacity: e.target.value })}
            className={`w-full p-2 rounded-lg border`}
          />
          <input
            type="text"
            placeholder="Type"
            value={newBus.type}
            onChange={(e) => setNewBus({ ...newBus, type: e.target.value })}
            className={`w-full p-2 rounded-lg border`}
          />
          <select
            value={newBus.status}
            onChange={(e) => setNewBus({ ...newBus, status: e.target.value })}
            className={`w-full p-2 rounded-lg border`}>
            <option>Active</option>
            <option>Maintenance</option>
            <option>Inactive</option>
          </select>
          <button
            onClick={editingItem ? saveEditBus : addBus}
            className="w-full bg-violet-600 text-white py-2 rounded-lg">
            {editingItem ? "Update" : "Add"} Bus
          </button>
        </div>
      </Modal>

      <Modal
        isOpen={showAddRoute}
        onClose={() => setShowAddRoute(false)}
        title="Add New Route"
        darkMode={darkMode}>
        <div className="space-y-3">
          <input
            type="text"
            placeholder="From City"
            value={newRoute.from}
            onChange={(e) => setNewRoute({ ...newRoute, from: e.target.value })}
            className={`w-full p-2 rounded-lg border`}
          />
          <input
            type="text"
            placeholder="To City"
            value={newRoute.to}
            onChange={(e) => setNewRoute({ ...newRoute, to: e.target.value })}
            className={`w-full p-2 rounded-lg border`}
          />
          <input
            type="text"
            placeholder="Distance"
            value={newRoute.distance}
            onChange={(e) =>
              setNewRoute({ ...newRoute, distance: e.target.value })
            }
            className={`w-full p-2 rounded-lg border`}
          />
          <input
            type="text"
            placeholder="Duration"
            value={newRoute.duration}
            onChange={(e) =>
              setNewRoute({ ...newRoute, duration: e.target.value })
            }
            className={`w-full p-2 rounded-lg border`}
          />
          <input
            type="text"
            placeholder="Price"
            value={newRoute.price}
            onChange={(e) =>
              setNewRoute({ ...newRoute, price: e.target.value })
            }
            className={`w-full p-2 rounded-lg border`}
          />
          <button
            onClick={addRoute}
            className="w-full bg-violet-600 text-white py-2 rounded-lg">
            Add Route
          </button>
        </div>
      </Modal>

      <Modal
        isOpen={showAddBooking}
        onClose={() => setShowAddBooking(false)}
        title="Add New Booking"
        darkMode={darkMode}>
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Passenger Name"
            value={newBooking.passenger}
            onChange={(e) =>
              setNewBooking({ ...newBooking, passenger: e.target.value })
            }
            className={`w-full p-2 rounded-lg border`}
          />
          <input
            type="text"
            placeholder="Route"
            value={newBooking.routeId}
            onChange={(e) =>
              setNewBooking({ ...newBooking, routeId: e.target.value })
            }
            className={`w-full p-2 rounded-lg border`}
          />
          <input
            type="datetime-local"
            value={newBooking.dateTime}
            onChange={(e) =>
              setNewBooking({ ...newBooking, dateTime: e.target.value })
            }
            className={`w-full p-2 rounded-lg border`}
          />
          <input
            type="text"
            placeholder="Seat Number"
            value={newBooking.seat}
            onChange={(e) =>
              setNewBooking({ ...newBooking, seat: e.target.value })
            }
            className={`w-full p-2 rounded-lg border`}
          />
          <input
            type="text"
            placeholder="Amount"
            value={newBooking.amount}
            onChange={(e) =>
              setNewBooking({ ...newBooking, amount: e.target.value })
            }
            className={`w-full p-2 rounded-lg border`}
          />
          <select
            value={newBooking.status}
            onChange={(e) =>
              setNewBooking({ ...newBooking, status: e.target.value })
            }
            className={`w-full p-2 rounded-lg border`}>
            <option>Pending</option>
            <option>Confirmed</option>
            <option>Cancelled</option>
          </select>
          <button
            onClick={addBooking}
            className="w-full bg-violet-600 text-white py-2 rounded-lg">
            Add Booking
          </button>
        </div>
      </Modal>

      <Modal
        isOpen={showAddUser}
        onClose={() => setShowAddUser(false)}
        title="Add New User"
        darkMode={darkMode}>
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Full Name"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            className={`w-full p-2 rounded-lg border`}
          />
          <input
            type="email"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            className={`w-full p-2 rounded-lg border`}
          />
          <input
            type="tel"
            placeholder="Phone"
            value={newUser.phone}
            onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
            className={`w-full p-2 rounded-lg border`}
          />
          <select
            value={newUser.role}
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            className={`w-full p-2 rounded-lg border`}>
            <option>User</option>
            <option>Admin</option>
            <option>Manager</option>
          </select>
          <button
            onClick={addUser}
            className="w-full bg-violet-600 text-white py-2 rounded-lg">
            Add User
          </button>
        </div>
      </Modal>

      <Modal
        isOpen={showAddPayment}
        onClose={() => setShowAddPayment(false)}
        title="Add Payment"
        darkMode={darkMode}>
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Booking ID"
            value={newPayment.bookingId}
            onChange={(e) =>
              setNewPayment({ ...newPayment, bookingId: e.target.value })
            }
            className={`w-full p-2 rounded-lg border`}
          />
          <input
            type="number"
            placeholder="Amount"
            value={newPayment.amount}
            onChange={(e) =>
              setNewPayment({ ...newPayment, amount: e.target.value })
            }
            className={`w-full p-2 rounded-lg border`}
          />
          <select
            value={newPayment.status}
            onChange={(e) =>
              setNewPayment({ ...newPayment, status: e.target.value })
            }
            className={`w-full p-2 rounded-lg border`}>
            <option>Pending</option>
            <option>Completed</option>
            <option>Failed</option>
          </select>
          <button
            onClick={addPayment}
            className="w-full bg-violet-600 text-white py-2 rounded-lg">
            Add Payment
          </button>
        </div>
      </Modal>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full shadow-lg z-30 transition-all duration-300 ${sidebarOpen ? "w-64" : "w-20"} ${darkMode ? "bg-neutral-900" : "bg-white"}`}>
        <div className="p-4 border-b flex items-center justify-between">
          {sidebarOpen && (
            <h1 className="font-bold text-violet-600">BusFlow Admin</h1>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-neutral-100">
            <FaBars />
          </button>
        </div>
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveMenu(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeMenu === item.id ? "bg-violet-600 text-white" : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"}`}>
              <item.icon className="text-lg" />
              {sidebarOpen && <span>{item.label}</span>}
            </button>
          ))}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50">
            <FaSignOutAlt className="text-lg" />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div
        className={`transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-20"}`}>
        <div
          className={`shadow-sm p-4 flex justify-between items-center sticky top-0 z-20 ${darkMode ? "bg-neutral-900" : "bg-white"}`}>
          <h2 className="text-xl font-semibold">
            {menuItems.find((m) => m.id === activeMenu)?.label || "Dashboard"}
          </h2>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="text-xl cursor-pointer hover:text-violet-600">
              {darkMode ? <FaSun /> : <FaMoon />}
            </button>
            <div className="flex items-center gap-2 cursor-pointer hover:bg-neutral-100 p-2 rounded-lg">
              {profile.profilePicture ? (
                <img
                  src={profile.profilePicture}
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <FaUserCircle className="text-2xl text-neutral-500" />
              )}
              {sidebarOpen && (
                <span className="hidden md:inline">
                  {currentUser?.name || "Admin"}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="p-6">{renderContent()}</div>
      </div>
    </div>
  );
}

export default AdminDashboard;
