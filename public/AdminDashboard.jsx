import React, { useState } from "react";
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
  FaUserCircle,
  FaEye,
  FaEdit,
  FaTrash,
  FaPlus,
  FaSearch,
  FaCalendarAlt,
  FaDollarSign,
  FaChartLine,
  FaBell,
  FaEnvelope,
  FaDownload,
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

function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [showAddBus, setShowAddBus] = useState(false);
  const [showAddRoute, setShowAddRoute] = useState(false);

  // Sample data
  const stats = [
    {
      title: "Total Buses",
      value: "48",
      icon: FaBus,
      color: "bg-blue-500",
      change: "+12%",
      changeColor: "text-green-500",
    },
    {
      title: "Total Users",
      value: "12,847",
      icon: FaUsers,
      color: "bg-green-500",
      change: "+23%",
      changeColor: "text-green-500",
    },
    {
      title: "Total Bookings",
      value: "5,234",
      icon: FaTicketAlt,
      color: "bg-purple-500",
      change: "+8%",
      changeColor: "text-green-500",
    },
    {
      title: "Revenue",
      value: "₦2.4M",
      icon: FaDollarSign,
      color: "bg-orange-500",
      change: "+18%",
      changeColor: "text-green-500",
    },
  ];

  const recentBookings = [
    {
      id: "BK001",
      passenger: "John Doe",
      route: "Kigali - Musanze",
      date: "2024-01-15",
      amount: "₦5,000",
      status: "Completed",
    },
    {
      id: "BK002",
      passenger: "Jane Smith",
      route: "Kigali - Rubavu",
      date: "2024-01-14",
      amount: "₦7,500",
      status: "Pending",
    },
    {
      id: "BK003",
      passenger: "Paul Kagame",
      route: "Kigali - Huye",
      date: "2024-01-14",
      amount: "₦6,000",
      status: "Completed",
    },
    {
      id: "BK004",
      passenger: "Alice Uwase",
      route: "Musanze - Rubavu",
      date: "2024-01-13",
      amount: "₦4,500",
      status: "Cancelled",
    },
    {
      id: "BK005",
      passenger: "David Niyo",
      route: "Kigali - Nyagatare",
      date: "2024-01-13",
      amount: "₦8,000",
      status: "Completed",
    },
  ];

  const buses = [
    {
      id: 1,
      name: "Luxury Bus",
      plate: "RAB 123A",
      capacity: 50,
      type: "Luxury",
      status: "Active",
    },
    {
      id: 2,
      name: "Tourist Bus",
      plate: "RAB 456B",
      capacity: 60,
      type: "Tourist",
      status: "Active",
    },
    {
      id: 3,
      name: "Express Bus",
      plate: "RAB 789C",
      capacity: 55,
      type: "Express",
      status: "Maintenance",
    },
    {
      id: 4,
      name: "City Bus",
      plate: "RAB 012D",
      capacity: 65,
      type: "City",
      status: "Active",
    },
  ];

  const routes = [
    {
      id: 1,
      from: "Kigali",
      to: "Musanze",
      distance: "95km",
      duration: "2.5h",
      price: "₦5,000",
    },
    {
      id: 2,
      from: "Kigali",
      to: "Rubavu",
      distance: "150km",
      duration: "3.5h",
      price: "₦7,500",
    },
    {
      id: 3,
      from: "Kigali",
      to: "Huye",
      distance: "135km",
      duration: "3h",
      price: "₦6,500",
    },
    {
      id: 4,
      from: "Musanze",
      to: "Rubavu",
      distance: "110km",
      duration: "2.5h",
      price: "₦4,500",
    },
  ];

  const users = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "+250 788 123 456",
      bookings: 12,
      status: "Active",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "+250 788 234 567",
      bookings: 8,
      status: "Active",
    },
    {
      id: 3,
      name: "Paul Kagame",
      email: "paul@example.com",
      phone: "+250 788 345 678",
      bookings: 15,
      status: "Inactive",
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
    { name: "Completed", value: 3420, color: "#10B981" },
    { name: "Pending", value: 1250, color: "#F59E0B" },
    { name: "Cancelled", value: 564, color: "#EF4444" },
  ];

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: FaTachometerAlt },
    { id: "buses", label: "Manage Buses", icon: FaBus },
    { id: "routes", label: "Manage Routes", icon: FaRoute },
    { id: "bookings", label: "Manage Bookings", icon: FaTicketAlt },
    { id: "users", label: "Users", icon: FaUsers },
    { id: "reports", label: "Reports", icon: FaFileAlt },
    { id: "payments", label: "Payments", icon: FaCreditCard },
    { id: "settings", label: "Settings", icon: FaCog },
  ];

  const renderContent = () => {
    switch (activeMenu) {
      case "dashboard":
        return (
          <div>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="bg-white dark:bg-neutral-900 rounded-xl p-6 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-neutral-500 dark:text-neutral-400">
                        {stat.title}
                      </p>
                      <p className="text-2xl font-bold text-neutral-800 dark:text-neutral-100">
                        {stat.value}
                      </p>
                      <p className={`text-sm ${stat.changeColor} mt-1`}>
                        {stat.change} from last month
                      </p>
                    </div>
                    <div
                      className={`${stat.color} p-3 rounded-full text-white`}>
                      <stat.icon className="text-xl" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <div className="bg-white dark:bg-neutral-900 rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-100 mb-4">
                  Booking Trends
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="bookings"
                      stroke="#8B5CF6"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="#10B981"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white dark:bg-neutral-900 rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-100 mb-4">
                  Booking Status
                </h3>
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
                      fill="#8884d8"
                      dataKey="value">
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Recent Bookings */}
            <div className="bg-white dark:bg-neutral-900 rounded-xl p-6 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-100">
                  Recent Bookings
                </h3>
                <button className="text-violet-600 text-sm">View All</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-neutral-100 dark:bg-neutral-800">
                    <tr>
                      <th className="p-3 text-left text-sm font-semibold">
                        ID
                      </th>
                      <th className="p-3 text-left text-sm font-semibold">
                        Passenger
                      </th>
                      <th className="p-3 text-left text-sm font-semibold">
                        Route
                      </th>
                      <th className="p-3 text-left text-sm font-semibold">
                        Date
                      </th>
                      <th className="p-3 text-left text-sm font-semibold">
                        Amount
                      </th>
                      <th className="p-3 text-left text-sm font-semibold">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentBookings.map((booking) => (
                      <tr
                        key={booking.id}
                        className="border-b border-neutral-200 dark:border-neutral-800">
                        <td className="p-3 text-sm">{booking.id}</td>
                        <td className="p-3 text-sm">{booking.passenger}</td>
                        <td className="p-3 text-sm">{booking.route}</td>
                        <td className="p-3 text-sm">{booking.date}</td>
                        <td className="p-3 text-sm">{booking.amount}</td>
                        <td className="p-3 text-sm">
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              booking.status === "Completed"
                                ? "bg-green-100 text-green-700"
                                : booking.status === "Pending"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : "bg-red-100 text-red-700"
                            }`}>
                            {booking.status}
                          </span>
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
              <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100">
                Manage Buses
              </h2>
              <button
                onClick={() => setShowAddBus(true)}
                className="bg-violet-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                <FaPlus /> Add Bus
              </button>
            </div>
            <div className="bg-white dark:bg-neutral-900 rounded-xl p-6 shadow-sm overflow-x-auto">
              <table className="w-full">
                <thead className="bg-neutral-100 dark:bg-neutral-800">
                  <tr>
                    <th className="p-3 text-left">ID</th>
                    <th className="p-3 text-left">Bus Name</th>
                    <th className="p-3 text-left">Plate Number</th>
                    <th className="p-3 text-left">Capacity</th>
                    <th className="p-3 text-left">Type</th>
                    <th className="p-3 text-left">Status</th>
                    <th className="p-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {buses.map((bus) => (
                    <tr
                      key={bus.id}
                      className="border-b border-neutral-200 dark:border-neutral-800">
                      <td className="p-3">{bus.id}</td>
                      <td className="p-3">{bus.name}</td>
                      <td className="p-3">{bus.plate}</td>
                      <td className="p-3">{bus.capacity}</td>
                      <td className="p-3">{bus.type}</td>
                      <td className="p-3">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            bus.status === "Active"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}>
                          {bus.status}
                        </span>
                      </td>
                      <td className="p-3">
                        <div className="flex gap-2">
                          <button className="text-blue-600 hover:text-blue-800">
                            <FaEdit />
                          </button>
                          <button className="text-red-600 hover:text-red-800">
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
              <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100">
                Manage Routes
              </h2>
              <button
                onClick={() => setShowAddRoute(true)}
                className="bg-violet-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                <FaPlus /> Add Route
              </button>
            </div>
            <div className="bg-white dark:bg-neutral-900 rounded-xl p-6 shadow-sm overflow-x-auto">
              <table className="w-full">
                <thead className="bg-neutral-100 dark:bg-neutral-800">
                  <tr>
                    <th className="p-3 text-left">ID</th>
                    <th className="p-3 text-left">From</th>
                    <th className="p-3 text-left">To</th>
                    <th className="p-3 text-left">Distance</th>
                    <th className="p-3 text-left">Duration</th>
                    <th className="p-3 text-left">Price</th>
                    <th className="p-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {routes.map((route) => (
                    <tr
                      key={route.id}
                      className="border-b border-neutral-200 dark:border-neutral-800">
                      <td className="p-3">{route.id}</td>
                      <td className="p-3">{route.from}</td>
                      <td className="p-3">{route.to}</td>
                      <td className="p-3">{route.distance}</td>
                      <td className="p-3">{route.duration}</td>
                      <td className="p-3">{route.price}</td>
                      <td className="p-3">
                        <div className="flex gap-2">
                          <button className="text-blue-600 hover:text-blue-800">
                            <FaEdit />
                          </button>
                          <button className="text-red-600 hover:text-red-800">
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

      case "users":
        return (
          <div>
            <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100 mb-6">
              Manage Users
            </h2>
            <div className="bg-white dark:bg-neutral-900 rounded-xl p-6 shadow-sm overflow-x-auto">
              <table className="w-full">
                <thead className="bg-neutral-100 dark:bg-neutral-800">
                  <tr>
                    <th className="p-3 text-left">ID</th>
                    <th className="p-3 text-left">Name</th>
                    <th className="p-3 text-left">Email</th>
                    <th className="p-3 text-left">Phone</th>
                    <th className="p-3 text-left">Bookings</th>
                    <th className="p-3 text-left">Status</th>
                    <th className="p-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr
                      key={user.id}
                      className="border-b border-neutral-200 dark:border-neutral-800">
                      <td className="p-3">{user.id}</td>
                      <td className="p-3">{user.name}</td>
                      <td className="p-3">{user.email}</td>
                      <td className="p-3">{user.phone}</td>
                      <td className="p-3">{user.bookings}</td>
                      <td className="p-3">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            user.status === "Active"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="p-3">
                        <div className="flex gap-2">
                          <button className="text-blue-600 hover:text-blue-800">
                            <FaEye />
                          </button>
                          <button className="text-red-600 hover:text-red-800">
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

      default:
        return (
          <div className="bg-white dark:bg-neutral-900 rounded-xl p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100">
              {activeMenu} Section
            </h2>
            <p className="text-neutral-500 mt-4">
              Content for {activeMenu} will be displayed here.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-neutral-100 dark:bg-neutral-950">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-white dark:bg-neutral-900 shadow-lg z-30 transition-all duration-300 ${sidebarOpen ? "w-64" : "w-20"}`}>
        <div className="p-4 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
          <h1
            className={`font-bold text-violet-600 ${!sidebarOpen && "hidden"}`}>
            Admin Panel
          </h1>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800">
            {sidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        <nav className="p-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveMenu(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeMenu === item.id
                  ? "bg-violet-600 text-white"
                  : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
              }`}>
              <item.icon className="text-lg" />
              {sidebarOpen && <span>{item.label}</span>}
            </button>
          ))}
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20">
            <FaSignOutAlt className="text-lg" />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div
        className={`transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-20"}`}>
        {/* Top Bar */}
        <div className="bg-white dark:bg-neutral-900 shadow-sm p-4 flex justify-between items-center sticky top-0 z-20">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-semibold text-neutral-800 dark:text-neutral-100">
              {menuItems.find((m) => m.id === activeMenu)?.label || "Dashboard"}
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <FaBell className="text-neutral-500 text-xl cursor-pointer" />
            <FaEnvelope className="text-neutral-500 text-xl cursor-pointer" />
            <div className="flex items-center gap-2 cursor-pointer">
              <FaUserCircle className="text-2xl text-neutral-500" />
              <span className="hidden md:inline text-neutral-700 dark:text-neutral-300">
                Admin User
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">{renderContent()}</div>
      </div>
    </div>
  );
}

export default AdminDashboard;
