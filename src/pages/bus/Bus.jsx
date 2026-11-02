import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { useLanguage } from "../../context/LanguageContext";

function Bus() {
  const navigate = useNavigate();
  const { booking, setBus } = useBooking();
  const { t } = useLanguage();
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
      company: "SmartBus Travels",
    },
    {
      id: 2,
      name: "Deluxe Bus",
      plate: "RAB 102B",
      passengers: 50,
      image: Bus0,
      type: "deluxe",
      price: 850,
      company: "City Rider",
    },
    {
      id: 3,
      name: "Luxury Bus",
      plate: "RAB 103C",
      passengers: 40,
      image: Bus3,
      type: "luxury",
      price: 1200,
      company: "Royal Connect",
    },
    {
      id: 4,
      name: "Express Bus",
      plate: "RAB 104D",
      passengers: 55,
      image: Bus4,
      type: "tourist",
      price: 680,
      company: "FastLine Express",
    },
    {
      id: 5,
      name: "City Bus",
      plate: "RAB 105E",
      passengers: 60,
      image: Bus7,
      type: "tourist",
      price: 500,
      company: "Urban Transit",
    },
    {
      id: 6,
      name: "Premium Bus",
      plate: "RAB 106F",
      passengers: 45,
      image: Bus6,
      type: "luxury",
      price: 1500,
      company: "Premium Ride",
    },
    {
      id: 7,
      name: "Standard Bus",
      plate: "RAB 107G",
      passengers: 65,
      image: Bus2,
      type: "tourist",
      price: 600,
      company: "Comfort Coaches",
    },
    {
      id: 8,
      name: "Sleeper Bus",
      plate: "RAB 108H",
      passengers: 35,
      image: Bus5,
      type: "luxury",
      price: 1800,
      company: "Night Star",
    },
    {
      id: 9,
      name: "Executive Coach",
      plate: "RAB 109J",
      passengers: 30,
      image: Bus77,
      type: "luxury",
      price: 1950,
      company: "Voyage Elite",
    },
    {
      id: 10,
      name: "Safari Bus",
      plate: "RAB 110K",
      passengers: 42,
      image: Bus9,
      type: "deluxe",
      price: 980,
      company: "Safari Motors",
    },
    {
      id: 11,
      name: "Family Shuttle",
      plate: "RAB 111L",
      passengers: 38,
      image: Bus10,
      type: "tourist",
      price: 720,
      company: "GreenLine",
    },
    {
      id: 12,
      name: "Highway Bus",
      plate: "RAB 112M",
      passengers: 47,
      image: Bus12,
      type: "deluxe",
      price: 890,
      company: "Highway Travel",
    },
    {
      id: 13,
      name: "Luxury Max",
      plate: "RAB 113N",
      passengers: 34,
      image: Bus00,
      type: "luxury",
      price: 2100,
      company: "Max Ride",
    },
    {
      id: 14,
      name: "Airport Express",
      plate: "RAB 114P",
      passengers: 52,
      image: Bus8,
      type: "tourist",
      price: 650,
      company: "Airport Transit",
    },
    {
      id: 15,
      name: "VIP Coach",
      plate: "RAB 115Q",
      passengers: 29,
      image: Bus11,
      type: "luxury",
      price: 2200,
      company: "VIP Journey",
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
    setBus(bus.type, bus.id, bus.price, bus.name, bus);
    navigate("/bus/detail", {
      state: {
        id: bus.id,
        name: bus.name,
        plate: bus.plate,
        rating: 4.5,
        price: bus.price,
        company: bus.company,
        image: bus.image,
        type: bus.type,
      },
    });
  };

  return (
    <div className="w-full lg:px-28 md:px-16 sm:px-7 px-4 mt-[13ch] mb-[8ch] space-y-10">
      <div className="w-full bg-neutral-200/60 dark:bg-neutral-900/40 rounded-md px-6 py-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <div className="flex items-center gap-x-2.5">
            <input
              type="text"
              id="search"
              placeholder={t("Search Buses...")}
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
              <option value="">{t("All Bus Types")}</option>
              <option value="tourist">Tourist Bus</option>
              <option value="deluxe">Deluxe Bus</option>
              <option value="luxury">Luxury Bus</option>
            </select>
          </div>
        </div>
      </div>

      <div className="text-sm text-neutral-500 dark:text-neutral-500">
        {filteredBuses.length} {t("buses found")}
        {booking.from && booking.to && ` from ${booking.from} to ${booking.to}`}
      </div>

      {filteredBuses.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-neutral-300 bg-neutral-100 p-10 text-center text-neutral-600 dark:border-neutral-700 dark:bg-neutral-900/40 dark:text-neutral-300">
          {t("No buses match your current search. Try a different route or bus type.")}
        </div>
      ) : (
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
                  <span className="bg-violet-600/10 text-violet-700 dark:text-violet-300 px-2 py-1 text-xs rounded-full">
                    {bus.type}
                  </span>
                </div>

                <p className="text-sm text-neutral-500">
                  {bus.company} · {bus.plate}
                </p>

                <div className="flex items-center justify-between text-sm text-neutral-600 dark:text-neutral-300">
                  <span>{bus.passengers} seats</span>
                  <span>RWF {bus.price}</span>
                </div>

                <button
                  type="button"
                  className="w-full rounded-lg bg-violet-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-violet-700">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Bus;
