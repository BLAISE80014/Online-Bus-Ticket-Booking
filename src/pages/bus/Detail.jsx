import React from "react";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Bus1 from "../../assets/Bus9.png";
import Destination from "../../components/destination/Destination";
import Department from "../../components/department/Department";
import Seat from "../../components/seat/Seat";
import TravelDateTime from "../../components/travel/TravelDateTime";

function Detail() {
  const location = useLocation();
  const busData = location.state || {
    name: "Luxury Bus",
    plate: "RAB 123A",
    rating: 4.5,
  };

  return (
    <div className="w-full lg:px-28 md:px-16 sm:px-7 px-4 mt-[13ch] mb-[10ch]">
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
        <div className="col-span-1 space-y-8">
          <img
            src={Bus1}
            alt="Detail img"
            className="w-full aspect-[3/2] rounded-md object-contain bg-neutral-200/60 dark:bg-neutral-900/40 p-4"
          />
        </div>

        <div className="space-y-4">
          <h1 className="text-3xl lg:text-4xl font-bold text-neutral-900 dark:text-neutral-50">
            {busData.name}
            <span className="text-base font-normal text-neutral-400 dark:text-neutral-500 ml-3">
              ({busData.plate})
            </span>
          </h1>
          <div className="flex items-center gap-x-2">
            <div className="flex items-center gap-x-1 text-sm text-yellow-500 dark:text-yellow-600">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>
            <p className="text-neutral-900 dark:text-neutral-200 text-sm font-normal">
              ({busData.rating})
            </p>
          </div>
          <p className="text-neutral-600 dark:text-neutral-300 text-sm font-normal leading-relaxed">
            Experience luxury travel with our premium buses featuring
            comfortable seating, air conditioning, WiFi, and entertainment
            systems. Our professional drivers ensure a safe and enjoyable
            journey to your destination. Book your seat today and travel in
            style and comfort.
          </p>
        </div>

        <div className="lg:col-span-1 space-y-8">
          <div className="space-y-6">
            <Destination />
            <Department />
            <TravelDateTime />
          </div>

          <Seat />

          <div className="flex">
            <Link
              to={"/bus/detail/checkout"}
              className="w-full lg:w-fit bg-violet-600 text-neutral-50 font-medium text-base px-6 py-3 rounded-md hover:bg-violet-700 ease-in-out duration-300 text-center">
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detail;
