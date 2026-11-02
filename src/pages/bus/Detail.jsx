import React, { useEffect } from "react";
import {
  FaStar,
  FaWifi,
  FaSnowflake,
  FaChargingStation,
  FaMapMarkerAlt,
  FaCouch,
  FaBus,
  FaClock,
  FaRoute,
  FaShieldAlt,
} from "react-icons/fa";

import { Link, useLocation } from "react-router-dom";

import Bus1 from "../../assets/Bus9.png";

import Destination from "../../components/destination/Destination";
import Department from "../../components/department/Department";
import Seat from "../../components/seat/Seat";
import TravelDateTime from "../../components/travel/TravelDateTime";
import { useBooking } from "../../context/BookingContext";

function Detail() {
  const location = useLocation();
  const { setBus, booking } = useBooking();

  const busData = location?.state || {
    id: 1,
    name: "Luxury Express",
    plate: "RAB 123A",
    rating: 4.8,
    price: booking.busPrice || 0,
    type: "luxury",
    company: "SmartBus Travels",
    image: Bus1,
  };

  const tripPrice = Number(busData.price ?? booking.busPrice ?? 0);
  const canCheckout =
    Boolean(booking.from) &&
    Boolean(booking.to) &&
    Boolean(booking.travelDate) &&
    Boolean(booking.departTime) &&
    booking.selectedSeats.length > 0 &&
    tripPrice > 0;

  useEffect(() => {
    if (location.state) {
      setBus(
        busData.type || "luxury",
        busData.id || "selected-bus",
        tripPrice,
        busData.name || "Luxury Express",
        busData,
      );
    }
  }, []);

  const features = [
    {
      icon: <FaWifi />,
      title: "Free WiFi",
    },
    {
      icon: <FaSnowflake />,
      title: "Air Conditioning",
    },
    {
      icon: <FaChargingStation />,
      title: "Charging Ports",
    },
    {
      icon: <FaBus />,
      title: "Entertainment",
    },
    {
      icon: <FaCouch />,
      title: "Comfort Seats",
    },
    {
      icon: <FaMapMarkerAlt />,
      title: "GPS Tracking",
    },
  ];

  const reviews = [
    {
      name: "Patrick",
      comment: "Very comfortable and clean bus.",
    },
    {
      name: "Alice",
      comment: "Professional driver and smooth trip.",
    },
    {
      name: "Kevin",
      comment: "Amazing experience with luxury seats.",
    },
  ];

  return (
    <div className="w-full lg:px-28 md:px-16 sm:px-7 px-4 mt-[13ch] mb-[10ch]">
      {/* TOP SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* IMAGE SECTION */}
        <div className="space-y-5">
          {/* MAIN IMAGE */}
          <div className="bg-white dark:bg-neutral-900 rounded-3xl shadow-lg p-5">
            <img
              src={Bus1}
              alt="Bus"
              className="w-full aspect-[3/2] object-contain rounded-2xl"
            />
          </div>

          {/* IMAGE GALLERY */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-md p-2">
              <img
                src={Bus1}
                alt="Bus"
                className="rounded-xl hover:scale-105 transition duration-300"
              />
            </div>

            <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-md p-2">
              <img
                src={Bus1}
                alt="Bus"
                className="rounded-xl hover:scale-105 transition duration-300"
              />
            </div>

            <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-md p-2">
              <img
                src={Bus1}
                alt="Bus"
                className="rounded-xl hover:scale-105 transition duration-300"
              />
            </div>
          </div>
        </div>

        {/* BUS DETAILS */}
        <div className="space-y-6">
          {/* BUS NAME */}
          <div>
            <h1 className="text-4xl font-bold text-neutral-900 dark:text-white">
              {busData.name}

              <span className="ml-3 text-lg font-normal text-neutral-500">
                ({busData.plate})
              </span>
            </h1>

            {/* RATINGS */}
            <div className="flex items-center gap-2 mt-4">
              <div className="flex gap-1 text-yellow-500">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>

              <p className="text-sm dark:text-neutral-300">
                ({busData.rating})
              </p>
            </div>

            {/* DESCRIPTION */}
            <p className="mt-5 text-neutral-600 dark:text-neutral-300 leading-relaxed">
              Experience luxury travel with our premium buses featuring
              comfortable seating, air conditioning, WiFi, charging ports, and
              entertainment systems. Enjoy safe and professional transport
              services with comfort and style.
            </p>
          </div>

          {/* PRICE SECTION */}
          <div className="bg-violet-600 text-white rounded-3xl shadow-lg p-6">
            <p className="uppercase tracking-wider text-sm">Ticket Price</p>

            <h2 className="text-4xl font-bold mt-2">RWF {tripPrice}</h2>
          </div>

          {/* JOURNEY INFO */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white dark:bg-neutral-900 shadow-md rounded-2xl p-5">
              <div className="flex items-center gap-2 text-violet-600">
                <FaClock />
                <p className="font-semibold">Departure</p>
              </div>

              <h3 className="mt-3 text-lg font-bold dark:text-white">
                {booking.departTime || "Select a departure"}
              </h3>
            </div>

            <div className="bg-white dark:bg-neutral-900 shadow-md rounded-2xl p-5">
              <div className="flex items-center gap-2 text-violet-600">
                <FaClock />
                <p className="font-semibold">Arrival</p>
              </div>

              <h3 className="mt-3 text-lg font-bold dark:text-white">
                {busData.routeInfo?.arrivalTime || "Not set"}
              </h3>
            </div>

            <div className="bg-white dark:bg-neutral-900 shadow-md rounded-2xl p-5">
              <div className="flex items-center gap-2 text-violet-600">
                <FaRoute />
                <p className="font-semibold">Duration</p>
              </div>

              <h3 className="mt-3 text-lg font-bold dark:text-white">
                {busData.routeInfo?.duration || "Not set"}
              </h3>
            </div>

            <div className="bg-white dark:bg-neutral-900 shadow-md rounded-2xl p-5">
              <div className="flex items-center gap-2 text-violet-600">
                <FaMapMarkerAlt />
                <p className="font-semibold">Distance</p>
              </div>

              <h3 className="mt-3 text-lg font-bold dark:text-white">
                {busData.routeInfo?.distance || "Not set"}
              </h3>
            </div>
          </div>

          {/* ROUTE */}
          <div className="bg-white dark:bg-neutral-900 shadow-md rounded-2xl p-5">
            <h2 className="text-xl font-bold dark:text-white">Route</h2>

            <p className="mt-3 text-violet-600 font-semibold text-lg">
              {booking.from || "Select departure"} → {booking.to || "Select destination"}
            </p>
          </div>
        </div>
      </div>

      {/* FEATURES SECTION */}
      <div className="mt-16">
        <h2 className="text-3xl font-bold dark:text-white mb-8">
          Bus Features
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white dark:bg-neutral-900 rounded-2xl shadow-md p-6 text-center hover:-translate-y-2 transition duration-300">
              <div className="text-3xl text-violet-600 flex justify-center">
                {feature.icon}
              </div>

              <h3 className="mt-4 font-semibold dark:text-white">
                {feature.title}
              </h3>
            </div>
          ))}
        </div>
      </div>

      {/* BOOKING SECTION */}
      <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* BOOKING FORM */}
        <div className="bg-white dark:bg-neutral-900 rounded-3xl shadow-lg p-8 space-y-6">
          <h2 className="text-3xl font-bold dark:text-white">Book Your Seat</h2>

          <Destination />

          <Department />

          <TravelDateTime />

          <Seat />

        </div>

        {/* BOOKING SUMMARY */}
        <div className="bg-white dark:bg-neutral-900 rounded-3xl shadow-lg p-8">
          <h2 className="text-3xl font-bold dark:text-white mb-8">
            Booking Summary
          </h2>

          <div className="space-y-5">
            <div className="flex justify-between">
              <span className="text-neutral-500">Selected Seat</span>

              <span className="font-semibold dark:text-white">
                {booking.selectedSeats.length
                  ? booking.selectedSeats.join(", ")
                  : "None"}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-neutral-500">Travel Date</span>

              <span className="font-semibold dark:text-white">
                {booking.travelDate || "Not selected"}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-neutral-500">Ticket Quantity</span>

              <span className="font-semibold dark:text-white">
                {booking.selectedSeats.length} Ticket(s)
              </span>
            </div>

            <hr className="dark:border-neutral-700" />

            <div className="flex justify-between text-2xl font-bold">
              <span className="dark:text-white">Total</span>

              <span className="text-violet-600">
                RWF {(booking.selectedSeats.length * tripPrice).toLocaleString()}
              </span>
            </div>

            {/* CHECKOUT BUTTON */}
            <Link
              to={canCheckout ? "/bus/detail/checkout" : "#"}
              onClick={(event) => {
                if (!canCheckout) event.preventDefault();
              }}
              aria-disabled={!canCheckout}
              className={`mt-8 block w-full text-center py-4 rounded-2xl font-semibold text-lg shadow-lg transition-all duration-300 ${
                canCheckout
                  ? "bg-violet-600 text-white hover:bg-violet-700 hover:scale-[1.02]"
                  : "cursor-not-allowed bg-neutral-300 text-neutral-500"
              }`}>
              {tripPrice > 0 ? "Proceed to Checkout" : "Fare not configured"}
            </Link>
          </div>
        </div>
      </div>

      {/* CUSTOMER REVIEWS */}
      <div className="mt-16">
        <h2 className="text-3xl font-bold dark:text-white mb-8">
          Customer Reviews
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-white dark:bg-neutral-900 rounded-2xl shadow-lg p-6">
              <div className="flex gap-1 text-yellow-500">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>

              <h3 className="mt-4 text-xl font-bold dark:text-white">
                {review.name}
              </h3>

              <p className="mt-3 text-neutral-500">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>

      {/* POLICIES */}
      <div className="mt-16 bg-white dark:bg-neutral-900 rounded-3xl shadow-lg p-8">
        <div className="flex items-center gap-3 mb-6">
          <FaShieldAlt className="text-violet-600 text-2xl" />

          <h2 className="text-3xl font-bold dark:text-white">
            Travel Policies
          </h2>
        </div>

        <ul className="space-y-4 text-neutral-600 dark:text-neutral-300">
          <li>• Arrive 30 minutes before departure</li>

          <li>• No smoking inside the bus</li>

          <li>• Carry valid ID card</li>

          <li>• Keep luggage safely</li>
        </ul>
      </div>
    </div>
  );
}

export default Detail;
