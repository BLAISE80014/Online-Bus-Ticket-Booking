import React, { useState } from "react";
import { useBooking } from "../../context/BookingContext";
import { FaClock, FaBus, FaTicketAlt, FaUsers } from "react-icons/fa";

function Department() {
  const { booking, setDepartTime } = useBooking();
  const [departBus, setDepartBus] = useState(booking.departTime || "");

  const handleDepartBusChange = (e) => {
    const value = e.target.value;
    setDepartBus(value);
    setDepartTime(value);
  };

  // simple logic demo
  const seatCount = 12;
  const basePrice = 5000;

  const getArrivalTime = (time) => {
    if (!time) return "";
    const hour = parseInt(time);
    return `${hour + 4}:00 ${time.includes("PM") ? "PM" : "AM"}`;
  };

  const priceMultiplier = (time) => {
    if (!time) return 1;
    if (time.includes("AM")) return 1;
    return 1.2; // evening slightly expensive
  };

  return (
    <div className="w-full space-y-5 p-4 rounded-2xl bg-white dark:bg-neutral-900 shadow-lg hover:shadow-2xl transition-all duration-300">

      {/* TITLE */}
      <div className="flex items-center gap-2">
        <FaBus className="text-violet-600 text-xl animate-pulse" />
        <h2 className="text-xl font-semibold text-neutral-800 dark:text-neutral-100">
          Choose Departure Time
        </h2>
      </div>

      {/* SELECT */}
      <div className="relative group">
        <label className="block mb-2 font-semibold text-neutral-600 dark:text-neutral-300">
          Depart Time
        </label>

        <select
          value={departBus}
          onChange={handleDepartBusChange}
          className="w-full appearance-none px-4 h-12 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-gradient-to-r from-neutral-100 to-neutral-200 dark:from-neutral-900 dark:to-neutral-800 text-neutral-800 dark:text-white
          focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all duration-300 group-hover:scale-[1.01]"
        >
          <option value="">Select a Time</option>
          <option value="04:00 AM">04:00 AM</option>
          <option value="06:00 AM">06:00 AM</option>
          <option value="08:00 AM">08:00 AM</option>
          <option value="10:00 AM">10:00 AM</option>
          <option value="12:00 PM">12:00 PM</option>
          <option value="02:00 PM">02:00 PM</option>
          <option value="04:00 PM">04:00 PM</option>
          <option value="06:00 PM">06:00 PM</option>
          <option value="08:00 PM">08:00 PM</option>
          <option value="10:00 PM">10:00 PM</option>
          <option value="12:00 AM">12:00 AM</option>
        </select>
      </div>

      {/* STATUS BADGE */}
      {departBus && (
        <div className="flex flex-wrap gap-3">

          <span className="px-3 py-1 rounded-full text-xs bg-green-100 text-green-700">
            🟢 Available
          </span>

          {departBus.includes("AM") ? (
            <span className="px-3 py-1 rounded-full text-xs bg-yellow-100 text-yellow-700">
              🌅 Morning Trip
            </span>
          ) : (
            <span className="px-3 py-1 rounded-full text-xs bg-indigo-100 text-indigo-700">
              🌙 Evening Trip
            </span>
          )}

          <span className="px-3 py-1 rounded-full text-xs bg-violet-100 text-violet-700">
            VIP Service
          </span>
        </div>
      )}

      {/* INFO GRID */}
      {departBus && (
        <div className="grid grid-cols-2 gap-4 mt-4">

          {/* DEPARTURE */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 text-white shadow-md">
            <div className="flex items-center gap-2">
              <FaClock />
              <p className="text-sm">Departure</p>
            </div>
            <p className="text-lg font-bold">{departBus}</p>
          </div>

          {/* ARRIVAL */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-md">
            <div className="flex items-center gap-2">
              <FaClock />
              <p className="text-sm">Arrival</p>
            </div>
            <p className="text-lg font-bold">{getArrivalTime(departBus)}</p>
          </div>

          {/* SEATS */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-md">
            <div className="flex items-center gap-2">
              <FaUsers />
              <p className="text-sm">Seats</p>
            </div>
            <p className="text-lg font-bold">{seatCount} Available</p>
          </div>

          {/* PRICE */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md">
            <div className="flex items-center gap-2">
              <FaTicketAlt />
              <p className="text-sm">Price</p>
            </div>
            <p className="text-lg font-bold">
              RWF {Math.round(basePrice * priceMultiplier(departBus))}
            </p>
          </div>

        </div>
      )}

      {/* FOOT NOTE */}
      {departBus && (
        <p className="text-xs text-neutral-500 dark:text-neutral-400">
          ⚠ Please arrive 30 minutes before departure
        </p>
      )}
    </div>
  );
}

export default Department;