import React from "react";
import {
  FaBus,
  FaUsers,
  FaClock,
  FaShieldAlt,
  FaSearch,
  FaTicketAlt,
  FaChair,
  FaHistory,
  FaUserCog,
  FaRegClock,
  FaMobileAlt,
  FaCheckCircle,
  FaGlobe,
} from "react-icons/fa";
import { MdOutlineDashboard, MdOutlineSecurity } from "react-icons/md";
import { GiPayMoney, GiThreeLeaves } from "react-icons/gi";
import { Link } from "react-router-dom";

function About() {
  const stats = [
    {
      icon: FaBus,
      value: "50+",
      label: "Modern Buses",
      color: "text-violet-600",
    },
    {
      icon: FaUsers,
      value: "100K+",
      label: "Happy Customers",
      color: "text-violet-600",
    },
    {
      icon: FaClock,
      value: "98%",
      label: "On-Time Performance",
      color: "text-green-600",
    },
    {
      icon: FaGlobe,
      value: "15+",
      label: "Cities Connected",
      color: "text-blue-600",
    },
  ];

  const features = [
    {
      icon: FaSearch,
      title: "Route Search",
      desc: "Quickly find available bus routes between any two cities with real-time schedules.",
    },
    {
      icon: FaTicketAlt,
      title: "Online Booking",
      desc: "Book your bus tickets instantly from anywhere, 24/7 without visiting the station.",
    },
    {
      icon: FaChair,
      title: "Seat Selection",
      desc: "Choose your preferred seat from an interactive seat map before booking.",
    },
    {
      icon: FaHistory,
      title: "Booking History",
      desc: "View all your past and upcoming bookings in one organized dashboard.",
    },
    {
      icon: FaUserCog,
      title: "Admin Management",
      desc: "Powerful admin panel to manage buses, routes, schedules, and bookings.",
    },
    {
      icon: GiPayMoney,
      title: "Secure Payments",
      desc: "Multiple payment options with secure transaction processing.",
    },
  ];

  const benefits = [
    {
      icon: FaRegClock,
      title: "Save Time",
      desc: "Book your tickets in minutes, not hours. No more waiting in long queues.",
    },
    {
      icon: GiThreeLeaves,
      title: "Avoid Queues",
      desc: "Skip the station lines completely with our digital booking system.",
    },
    {
      icon: FaMobileAlt,
      title: "Easy Access",
      desc: "Book from any device - phone, tablet, or computer. Always available.",
    },
    {
      icon: MdOutlineSecurity,
      title: "Better Management",
      desc: "Track your bookings, get reminders, and manage your travel plans easily.",
    },
  ];

  const users = [
    {
      role: "Passengers",
      icon: FaUsers,
      desc: "Travelers who want easy, quick, and reliable bus ticket booking from anywhere.",
    },
    {
      role: "Bus Operators",
      icon: FaBus,
      desc: "Bus companies that want to digitize their operations and reach more customers.",
    },
    {
      role: "Administrators",
      icon: MdOutlineDashboard,
      desc: "Platform managers who oversee routes, schedules, and system operations.",
    },
  ];

  return (
    <div className="w-full lg:px-28 md:px-16 sm:px-7 px-4 mt-[13ch] mb-[8ch]">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-100 mb-4">
          About <span className="text-violet-600">Us</span>
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto text-lg">
          Your trusted partner for comfortable and reliable bus travel across
          Rwanda
        </p>
      </div>

      {/* Overview Section */}
      <div className="bg-gradient-to-r from-violet-50 to-indigo-50 dark:from-violet-950/30 dark:to-indigo-950/30 rounded-2xl p-8 mb-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100 mb-4 flex items-center gap-2">
            <FaGlobe className="text-violet-600" />
            Overview
          </h2>
          <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed mb-4">
            Our Bus Ticket Booking System is a modern digital platform that
            allows users to book bus tickets online, view available routes, and
            select their preferred seats without ever having to visit a bus
            station. Whether you're planning a weekend getaway or a business
            trip, our system makes the entire process seamless and hassle-free.
          </p>
          <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
            With just a few clicks, you can search for available buses, compare
            prices, choose your seat, and complete your booking - all from the
            comfort of your home or on the go.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100 flex items-center gap-2">
            <FaCheckCircle className="text-violet-600" />
            Our Mission
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed text-lg">
            To make transportation easier, faster, and more convenient through
            digital booking. We strive to revolutionize the way people travel by
            providing a reliable, efficient, and user-friendly platform that
            connects passengers with bus operators seamlessly.
          </p>
          <div className="bg-violet-50 dark:bg-violet-950/30 rounded-xl p-6 mt-4">
            <p className="text-neutral-700 dark:text-neutral-300 italic">
              "Making every journey a pleasant experience, from booking to
              arrival."
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100 flex items-center gap-2">
            <MdOutlineDashboard className="text-violet-600" />
            Our Vision
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed text-lg">
            To become the leading digital transportation platform in Africa,
            connecting thousands of passengers with reliable bus services while
            continuously innovating to improve the travel experience through
            technology.
          </p>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="text-center p-6 bg-neutral-200/60 dark:bg-neutral-900/60 rounded-xl hover:scale-105 transition-transform duration-300">
            <stat.icon className={`text-4xl ${stat.color} mx-auto mb-3`} />
            <h3 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100">
              {stat.value}
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Users Section */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100 mb-6 text-center">
          Who Is This System For?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {users.map((user, index) => (
            <div
              key={index}
              className="bg-neutral-200/60 dark:bg-neutral-900/60 rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
              <user.icon className="text-4xl text-violet-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-neutral-800 dark:text-neutral-100 mb-2">
                {user.role}
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                {user.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100 mb-6 text-center">
          Key Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-neutral-100 to-neutral-200/40 dark:from-neutral-900/40 dark:to-neutral-900/20 rounded-xl p-6 hover:shadow-md transition-all duration-300 group">
              <feature.icon className="text-3xl text-violet-600 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-100 mb-2">
                {feature.title}
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Benefits Section */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100 mb-6 text-center">
          Why Choose Us?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="text-center p-6 bg-violet-50 dark:bg-violet-950/20 rounded-xl">
              <div className="w-12 h-12 bg-violet-100 dark:bg-violet-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <benefit.icon className="text-xl text-violet-600" />
              </div>
              <h3 className="text-base font-semibold text-neutral-800 dark:text-neutral-100 mb-2">
                {benefit.title}
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                {benefit.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Project Note */}
      <div className="bg-amber-50 dark:bg-amber-950/20 border-l-4 border-amber-500 rounded-r-xl p-6 mb-12">
        <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-100 mb-2">
          📚 Project Note
        </h3>
        <p className="text-neutral-600 dark:text-neutral-400">
          This is an educational/student project built for learning web
          development purposes. It demonstrates modern web technologies
          including React, Tailwind CSS, and responsive design principles. The
          system is designed to showcase how a real-world bus booking platform
          would function.
        </p>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-violet-600 to-indigo-600 rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">
          Ready to Travel With Us?
        </h2>
        <p className="text-violet-100 mb-6 max-w-md mx-auto">
          Book your bus ticket today and experience the difference of digital
          booking
        </p>
        <Link
          to="/bus"
          className="inline-block bg-white text-violet-600 px-8 py-3 rounded-md font-semibold hover:bg-violet-50 transition-colors">
          Book Your Seat Now
        </Link>
      </div>
    </div>
  );
}

export default About;
