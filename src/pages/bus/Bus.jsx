import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Bus1 from "../../assets/Bus1.png";
import Bus00 from "../../assets/back/Buss1.jpeg";
import Bus2 from "../../assets/back/Bus2.jpeg";
import Bus3 from "../../assets/Bus3.png";
import Bus4 from "../../assets/back/Bus4.jpeg";
import Bus5 from "../../assets/back/Bus5.jpeg";
import Bus6 from "../../assets/Bus6.png";
import Bus7 from "../../assets/back/Bus7.jpeg";
import Bus77 from "../../assets/Buss7.png";
import Bus0 from "../../assets/back/Bus8.jpeg";
import Bus8 from "../../assets/Bus8.png";
import Bus9 from "../../assets/back/Bus9.jpeg";
import Bus10 from "../../assets/Bus10.png";
import Bus11 from "../../assets/back/Bus11.jpeg";
import Bus12 from "../../assets/back/Bus12.jpeg";
import { FaSearch } from "react-icons/fa";
import { useBooking } from "../../context/BookingContext";

function Bus() {
  const navigate = useNavigate();
  const { booking } = useBooking();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");

  const buses = [
    {
      id: 1,
      name: "Tourist Bus",
      plate: "RAB 101A",
      passengers: 60,
      image: Bus1,
      type: "tourist",
      price: 750,
    },
    {
      id: 2,
      name: "Deluxe Bus",
      plate: "RAB 102B",
      passengers: 50,
      image: Bus0,
      type: "deluxe",
      price: 850,
    },
    {
      id: 3,
      name: "Luxury Bus",
      plate: "RAB 103C",
      passengers: 40,
      image: Bus3,
      type: "luxury",
      price: 1200,
    },
    {
      id: 4,
      name: "Express Bus",
      plate: "RAB 104D",
      passengers: 55,
      image: Bus4,
      type: "tourist",
      price: 680,
    },
    {
      id: 5,
      name: "City Bus",
      plate: "RAB 105E",
      passengers: 60,
      image: Bus7,
      type: "tourist",
      price: 500,
    },
    {
      id: 6,
      name: "Premium Bus",
      plate: "RAB 106F",
      passengers: 45,
      image: Bus6,
      type: "luxury",
      price: 1500,
    },
    {
      id: 7,
      name: "Standard Bus",
      plate: "RAB 107G",
      passengers: 65,
      image: Bus2,
      type: "tourist",
      price: 600,
    },
    {
      id: 8,
      name: "Sleeper Bus",
      plate: "RAB 108H",
      passengers: 35,
      image: Bus5,
      type: "luxury",
      price: 1800,
    },
    {
      id: 8,
      name: "Sleeper Bus",
      plate: "RAB 108H",
      passengers: 35,
      image: Bus77,
      type: "luxury",
      price: 1800,
    },
    {
      id: 8,
      name: "Sleeper Bus",
      plate: "RAB 108H",
      passengers: 35,
      image: Bus9,
      type: "luxury",
      price: 1800,
    },
    {
      id: 8,
      name: "Sleeper Bus",
      plate: "RAB 108H",
      passengers: 35,
      image: Bus10,
      type: "luxury",
      price: 1800,
    },
    {
      id: 8,
      name: "Sleeper Bus",
      plate: "RAB 108H",
      passengers: 35,
      image: Bus5,
      type: "luxury",
      price: 1800,
    },
    {
      id: 8,
      name: "Sleeper Bus",
      plate: "RAB 108H",
      passengers: 35,
      image: Bus12,
      type: "luxury",
      price: 1800,
    },
    {
      id: 8,
      name: "Sleeper Bus",
      plate: "RAB 108H",
      passengers: 35,
      image: Bus5,
      type: "luxury",
      price: 1800,
    },
    {
      id: 8,
      name: "Luxily Bus",
      plate: "RAB 108H",
      passengers: 35,
      image: Bus00,
      type: "luxury",
      price: 1800,
    },
    {
      id: 8,
      name: "Sleeper Bus",
      plate: "RAB 108H",
      passengers: 35,
      image: Bus5,
      type: "luxury",
      price: 1800,
    },
    {
      id: 8,
      name: "Sleeper Bus",
      plate: "RAB 108H",
      passengers: 35,
      image: Bus11,
      type: "luxury",
      price: 1800,
    },
    {
      id: 8,
      name: "Sleeper Bus",
      plate: "RAB 108H",
      passengers: 35,
      image: Bus8,
      type: "luxury",
      price: 1800,
    },
  ];

  const filteredBuses = buses.filter((bus) => {
    const matchesSearch = bus.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "" || bus.type === selectedType;
    return matchesSearch && matchesType;
  });

  const handleBusClick = (bus) => {
    navigate("/bus/detail", {
      state: { name: bus.name, plate: bus.plate, rating: 4.5 },
    });
  };

  return (
    <div className="w-full lg:px-28 md:px-16 sm:px-7 px-4 mt-[13ch] mb-[8ch] space-y-10">
      {/* Search and Filter */}
      <div className="w-full bg-neutral-200/60 dark:bg-neutral-900/40 rounded-md px-6 py-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <div className="flex items-center gap-x-2.5">
            <input
              type="text"
              id="search"
              placeholder="Search Buses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full appearance-none text-neutral-800 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-600 bg-neutral-200/60 dark:bg-neutral-900/60 px-3 h-12 border border-neutral-200 dark:border-neutral-900 rounded-md focus:outline-none focus:bg-neutral-100 dark:focus:bg-neutral-900"
            />
            <button className="bg-violet-600 h-11 px-4 rounded-md text-neutral-50 font-normal hover:bg-violet-700 transition-colors">
              <FaSearch />
            </button>
          </div>

          <div className="md:col-span-2">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full appearance-none text-neutral-800 dark:text-neutral-100 bg-neutral-200/60 dark:bg-neutral-900/60 px-3 h-12 border border-neutral-200 dark:border-neutral-900 rounded-md focus:outline-none focus:bg-neutral-100 dark:focus:bg-neutral-900">
              <option value="">All Bus Types</option>
              <option value="tourist">Tourist Bus</option>
              <option value="deluxe">Deluxe Bus</option>
              <option value="luxury">Luxury Bus</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results info */}
      <div className="text-sm text-neutral-500 dark:text-neutral-500">
        Found {filteredBuses.length} bus{filteredBuses.length !== 1 ? "es" : ""}
        {booking.from && booking.to && ` from ${booking.from} to ${booking.to}`}
      </div>

      {/* Bus Cards */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBuses.map((bus) => (
          <div
            key={bus.id}
            onClick={() => handleBusClick(bus)}
            className="w-full bg-neutral-200/60 dark:bg-neutral-900/40 rounded-xl p-4 cursor-pointer hover:scale-105 transition-transform duration-300">
            <img
              src={bus.image}
              alt={bus.name}
              className="w-full h-[220px] object-cover rounded-lg"
            />
            <div className="px-3 py-4 space-y-4">
              <div className="flex items-center justify-between">
                <h1 className="text-xl font-semibold text-neutral-800 dark:text-neutral-50">
                  {bus.name}
                </h1>
                <p className="text-sm font-normal text-neutral-600 dark:text-neutral-400">
                  {bus.passengers} seats
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-neutral-500 dark:text-neutral-500">
                  {bus.plate}
                </p>
                <p className="text-lg font-bold text-violet-600">
                  Rs. {bus.price}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredBuses.length === 0 && (
        <div className="text-center py-12">
          <p className="text-neutral-500 dark:text-neutral-500">
            No buses found matching your criteria.
          </p>
        </div>
      )}
    </div>
  );
}

export default Bus;
