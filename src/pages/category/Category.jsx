import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaTicketAlt,
  FaSearch,
  FaChair,
  FaHistory,
  FaCreditCard,
  FaTachometerAlt,
  FaRegClock,
  FaUsers,
  FaMobileAlt,
  FaShieldAlt,
  FaBus,
  FaStar,
  FaClock,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaWhatsapp,
  FaEnvelope,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaGift,
  FaRocket,
  FaChartLine,
  FaHeadset,
  FaUserGraduate,
  FaBuilding,
  FaLeaf,
  FaHeart,
  FaGlobe,
  FaCrown,
  FaDollarSign,
  FaCalendarAlt,
  FaClipboardList,
  FaBell,
  FaQrcode,
} from "react-icons/fa";
import {
  GiThreeLeaves,
  GiPayMoney,
  GiReceiveMoney,
  GiArchiveResearch,
  GiBusStop,
} from "react-icons/gi";
import {
  MdOutlineDashboardCustomize,
  MdElectricBolt,
  MdOutlineSecurity,
} from "react-icons/md";
import { IoMdTrendingUp, IoMdHappy } from "react-icons/io";
import { TbBusStop, TbRoute } from "react-icons/tb";

// Import images
import Bus1 from "../../assets/Bus1.png";
import Bus2 from "../../assets/Bus6.png";
import Bus3 from "../../assets/Bus8.png";

function Category() {
  const [activeTab, setActiveTab] = useState("services");
  const [hoveredCard, setHoveredCard] = useState(null);

  const tabs = [
    { id: "services", label: "Our Services", icon: FaTicketAlt },
    { id: "benefits", label: "Benefits", icon: FaRocket },
    { id: "features", label: "Features", icon: FaStar },
    { id: "testimonials", label: "Testimonials", icon: FaUsers },
  ];

  const services = [
    {
      icon: FaTicketAlt,
      title: "Online Ticket Booking",
      description:
        "Book bus tickets easily from anywhere without visiting the station. 24/7 availability with instant confirmation.",
      color: "text-violet-600",
      bgColor: "bg-violet-50 dark:bg-violet-950/30",
      badge: "Popular",
      price: "Free",
    },
    {
      icon: FaSearch,
      title: "Smart Route Search",
      description:
        "Search available routes, destinations, and departure times with real-time updates and price comparison.",
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-950/30",
      badge: "New",
      price: "Free",
    },
    {
      icon: FaChair,
      title: "Interactive Seat Selection",
      description:
        "View 2D/3D bus layouts and choose your preferred seats - window, aisle, or front seats.",
      color: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-950/30",
      badge: "Premium",
      price: "Free",
    },
    {
      icon: FaHistory,
      title: "Smart Booking Management",
      description:
        "View, cancel, reschedule, or manage all your bookings from one centralized dashboard.",
      color: "text-orange-600",
      bgColor: "bg-orange-50 dark:bg-orange-950/30",
      badge: "Popular",
      price: "Free",
    },
    {
      icon: FaCreditCard,
      title: "Secure Multi-Payments",
      description:
        "Support for Mobile Money, Credit/Debit Cards, Bank Transfer, and Cash on departure.",
      color: "text-red-600",
      bgColor: "bg-red-50 dark:bg-red-950/30",
      badge: "Secure",
      price: "Free",
    },
    {
      icon: MdOutlineDashboardCustomize,
      title: "Advanced Admin Dashboard",
      description:
        "Powerful dashboard to manage buses, routes, bookings, generate reports, and analytics.",
      color: "text-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-950/30",
      badge: "Enterprise",
      price: "Free",
    },
    {
      icon: FaBell,
      title: "Real-time Notifications",
      description:
        "Get SMS, Email, and Push notifications for booking confirmation, reminders, and updates.",
      color: "text-pink-600",
      bgColor: "bg-pink-50 dark:bg-pink-950/30",
      badge: "New",
      price: "Free",
    },
    {
      icon: FaQrcode,
      title: "Digital E-Tickets",
      description:
        "Receive QR code tickets that can be scanned directly from your phone - no printing needed.",
      color: "text-indigo-600",
      bgColor: "bg-indigo-50 dark:bg-indigo-950/30",
      badge: "Eco-friendly",
      price: "Free",
    },
    {
      icon: FaHeadset,
      title: "24/7 Customer Support",
      description:
        "Dedicated support team available via phone, WhatsApp, email, and live chat.",
      color: "text-teal-600",
      bgColor: "bg-teal-50 dark:bg-teal-950/30",
      badge: "Premium",
      price: "Free",
    },
  ];

  const benefits = [
    {
      icon: FaRegClock,
      title: "Save 70% of Your Time",
      description:
        "Book tickets in under 2 minutes instead of spending hours in queues. Average booking time: 90 seconds.",
      iconColor: "text-violet-600",
      stat: "70%",
      statLabel: "Time Saved",
    },
    {
      icon: GiThreeLeaves,
      title: "Zero Queue, Zero Stress",
      description:
        "Skip station lines completely. Book from home, office, or anywhere with internet access.",
      iconColor: "text-green-600",
      stat: "100%",
      statLabel: "Queue Free",
    },
    {
      icon: FaMobileAlt,
      title: "Anytime, Anywhere Access",
      description:
        "Available on all devices - Desktop, Tablet, and Mobile. Book 24/7, even at 3 AM!",
      iconColor: "text-blue-600",
      stat: "24/7",
      statLabel: "Availability",
    },
    {
      icon: FaChartLine,
      title: "Smarter Travel Planning",
      description:
        "Compare prices, check bus ratings, read reviews, and plan your journey efficiently.",
      iconColor: "text-orange-600",
      stat: "500+",
      statLabel: "Daily Bookings",
    },
    {
      icon: FaDollarSign,
      title: "Best Price Guarantee",
      description:
        "Get the best deals and exclusive discounts on early bookings and group travel.",
      iconColor: "text-emerald-600",
      stat: "40%",
      statLabel: "Discounts",
    },
    {
      icon: MdOutlineSecurity,
      title: "Safe & Secure",
      description:
        "Your data and payments are protected with enterprise-grade encryption and security.",
      iconColor: "text-red-600",
      stat: "100%",
      statLabel: "Secure",
    },
  ];

  const features = [
    {
      icon: FaGlobe,
      title: "Multi-language Support",
      desc: "Available in English, French, Kinyarwanda",
    },
    {
      icon: FaCalendarAlt,
      title: "Flexible Scheduling",
      desc: "Book days, weeks, or months in advance",
    },
    {
      icon: FaClipboardList,
      title: "Digital Receipts",
      desc: "Get instant booking confirmation via email/SMS",
    },
    {
      icon: FaUserGraduate,
      title: "Student Discounts",
      desc: "Special discounts for students with valid ID",
    },
    {
      icon: FaBuilding,
      title: "Corporate Accounts",
      desc: "Special plans for companies and organizations",
    },
    {
      icon: FaGift,
      title: "Rewards Program",
      desc: "Earn points on every booking and redeem later",
    },
  ];

  const testimonials = [
    {
      name: "Jean Paul",
      role: "Regular Traveler",
      comment:
        "This platform changed the way I travel! Booking is so easy and fast.",
      rating: 5,
      location: "Kigali",
    },
    {
      name: "Marie Claire",
      role: "Business Woman",
      comment: "I travel weekly for business and this system is a lifesaver.",
      rating: 5,
      location: "Musanze",
    },
    {
      name: "David Niyonsaba",
      role: "Student",
      comment: "Student discounts are amazing! The app is very user-friendly.",
      rating: 4,
      location: "Rubavu",
    },
    {
      name: "Alice Uwase",
      role: "Tourist Guide",
      comment:
        "Great platform for tourists! Easy to navigate and find bus schedules.",
      rating: 5,
      location: "Huye",
    },
  ];

  const categories = [
    {
      name: "Private Bus",
      image: Bus1,
      route: "/bus",
      type: "private",
      features: ["AC", "WiFi", "Refreshments"],
      price: "Premium",
    },
    {
      name: "Tourist Bus",
      image: Bus2,
      route: "/bus",
      type: "tourist",
      features: ["AC", "Entertainment", "Guide"],
      price: "Standard",
    },
    {
      name: "Government Bus",
      image: Bus3,
      route: "/bus",
      type: "government",
      features: ["Economy", "Regular", "Budget"],
      price: "Economy",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="w-full lg:px-28 md:px-16 sm:px-7 px-4 mb-[8ch] mt-[13ch]">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative mb-16 overflow-hidden rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 p-8 md:p-12">
        <div className="relative z-10 text-center text-white">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="inline-block mb-4">
            <FaRocket className="text-5xl" />
          </motion.div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Digital Bus Booking
            <span className="block text-yellow-300"> Made Simple</span>
          </h1>
          <p className="text-lg md:text-xl text-violet-100 max-w-2xl mx-auto">
            Your one-stop platform for all bus travel needs - fast, secure, and
            convenient
          </p>
        </div>
      </motion.div>

      {/* Tab Navigation */}
      <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-10">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 rounded-full font-medium transition-all duration-300 ${
              activeTab === tab.id
                ? "bg-violet-600 text-white shadow-lg scale-105"
                : "bg-neutral-200/60 dark:bg-neutral-900/60 text-neutral-600 dark:text-neutral-400 hover:bg-violet-100 dark:hover:bg-violet-900/40"
            }`}>
            <tab.icon className="text-sm md:text-base" />
            <span className="text-sm md:text-base">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Services Tab */}
      <AnimatePresence mode="wait">
        {activeTab === "services" && (
          <motion.div
            key="services"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}>
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-neutral-800 dark:text-neutral-100 mb-3">
                Our <span className="text-violet-600">Premium Services</span>
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400">
                Everything you need for a seamless travel experience
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -8 }}
                  onHoverStart={() => setHoveredCard(index)}
                  onHoverEnd={() => setHoveredCard(null)}
                  className={`${service.bgColor} rounded-xl p-6 transition-all duration-300 hover:shadow-xl relative overflow-hidden group cursor-pointer`}>
                  {service.badge && (
                    <div
                      className={`absolute top-4 right-4 ${
                        service.badge === "Popular"
                          ? "bg-violet-600"
                          : service.badge === "New"
                            ? "bg-green-500"
                            : service.badge === "Premium"
                              ? "bg-amber-500"
                              : service.badge === "Secure"
                                ? "bg-blue-500"
                                : "bg-purple-500"
                      } text-white text-xs px-2 py-1 rounded-full`}>
                      {service.badge}
                    </div>
                  )}
                  <div
                    className={`w-14 h-14 rounded-full ${service.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <service.icon className={`text-3xl ${service.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-800 dark:text-neutral-100 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed mb-3">
                    {service.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-green-600 dark:text-green-500 font-medium">
                      {service.price}
                    </span>
                    <span className="text-xs text-violet-600 dark:text-violet-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      Learn more →
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Benefits Tab */}
        {activeTab === "benefits" && (
          <motion.div
            key="benefits"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}>
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-neutral-800 dark:text-neutral-100 mb-3">
                Why <span className="text-violet-600">Choose Us?</span>
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400">
                The smart choice for modern travelers
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  className="bg-gradient-to-br from-neutral-100 to-neutral-200/40 dark:from-neutral-900/40 dark:to-neutral-900/20 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 rounded-full bg-white dark:bg-neutral-800 flex items-center justify-center flex-shrink-0 shadow-md`}>
                      <benefit.icon
                        className={`text-2xl ${benefit.iconColor}`}
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-100 mb-1">
                        {benefit.title}
                      </h3>
                      <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-2">
                        {benefit.description}
                      </p>
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-bold text-violet-600">
                          {benefit.stat}
                        </span>
                        <span className="text-xs text-neutral-500">
                          {benefit.statLabel}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Features Tab */}
        {activeTab === "features" && (
          <motion.div
            key="features"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}>
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-neutral-800 dark:text-neutral-100 mb-3">
                Exclusive <span className="text-violet-600">Features</span>
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400">
                Advanced capabilities for better experience
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  className="bg-white dark:bg-neutral-900/40 rounded-xl p-6 border border-neutral-200 dark:border-neutral-800 hover:border-violet-300 dark:hover:border-violet-700 transition-all">
                  <feature.icon className="text-3xl text-violet-600 mb-4" />
                  <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-100 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                    {feature.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Testimonials Tab */}
        {activeTab === "testimonials" && (
          <motion.div
            key="testimonials"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}>
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-neutral-800 dark:text-neutral-100 mb-3">
                What Our <span className="text-violet-600">Customers Say</span>
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400">
                Trusted by thousands of happy travelers
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  className="bg-neutral-200/60 dark:bg-neutral-900/60 rounded-xl p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 flex items-center justify-center text-white font-bold text-xl">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-neutral-800 dark:text-neutral-100">
                        {testimonial.name}
                      </h4>
                      <p className="text-xs text-neutral-500">
                        {testimonial.role} • {testimonial.location}
                      </p>
                    </div>
                  </div>
                  <div className="flex mb-3">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={`text-sm ${i < testimonial.rating ? "text-yellow-500" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed italic">
                    "{testimonial.comment}"
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bus Categories */}
      <div className="mt-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-neutral-800 dark:text-neutral-100 mb-3">
            Explore Bus <span className="text-violet-600">Categories</span>
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400">
            Choose the perfect bus for your journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group">
              <Link
                to={category.route}
                state={{ busType: category.type }}
                className="bg-neutral-200/60 dark:bg-neutral-900/40 block rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
                <div className="relative overflow-hidden bg-gradient-to-br from-violet-100 to-indigo-100 dark:from-violet-950/50 dark:to-indigo-950/50">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full aspect-video object-contain p-6 group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-white dark:bg-neutral-900 px-2 py-1 rounded-full text-xs font-semibold text-violet-600 shadow-md">
                    {category.price}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-100 mb-2">
                    {category.name}
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {category.features.map((feature, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 px-2 py-1 rounded-full">
                        {feature}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-neutral-500 dark:text-neutral-400">
                      Starting from
                    </span>
                    <span className="text-lg font-bold text-violet-600">
                      RWF 5,000
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="mt-16 bg-gradient-to-r from-violet-600 via-indigo-600 to-violet-600 rounded-2xl p-8 text-center relative overflow-hidden group">
        <div className="relative z-10">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Ready to Start Your Journey?
          </h3>
          <p className="text-violet-100 mb-6 max-w-md mx-auto">
            Join over 100,000+ happy customers who trust us for their daily
            travel needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/bus"
              className="bg-white text-violet-600 px-8 py-3 rounded-md font-semibold hover:bg-violet-50 transition-all transform hover:scale-105">
              Book Your Seat Now
            </Link>
            <Link
              to="/about"
              className="border-2 border-white text-white px-8 py-3 rounded-md font-semibold hover:bg-white/10 transition-all">
              Learn More
            </Link>
          </div>
          <div className="flex justify-center gap-6 mt-6 text-white/60">
            <FaWhatsapp className="hover:text-green-400 cursor-pointer transition-colors" />
            <FaFacebook className="hover:text-blue-400 cursor-pointer transition-colors" />
            <FaTwitter className="hover:text-blue-300 cursor-pointer transition-colors" />
            <FaInstagram className="hover:text-pink-400 cursor-pointer transition-colors" />
          </div>
        </div>
      </motion.div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
        <div className="text-center p-4 bg-gradient-to-br from-violet-50 to-indigo-50 dark:from-violet-950/20 dark:to-indigo-950/20 rounded-xl">
          <FaBus className="text-2xl text-violet-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-neutral-800 dark:text-neutral-100">
            50+
          </p>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            Modern Buses
          </p>
        </div>
        <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-xl">
          <FaUsers className="text-2xl text-green-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-neutral-800 dark:text-neutral-100">
            100K+
          </p>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            Happy Customers
          </p>
        </div>
        <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20 rounded-xl">
          <GiReceiveMoney className="text-2xl text-orange-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-neutral-800 dark:text-neutral-100">
            24/7
          </p>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            Support Available
          </p>
        </div>
        <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 rounded-xl">
          <FaRegClock className="text-2xl text-blue-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-neutral-800 dark:text-neutral-100">
            98%
          </p>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            On-Time Performance
          </p>
        </div>
      </div>
    </div>
  );
}

export default Category;
