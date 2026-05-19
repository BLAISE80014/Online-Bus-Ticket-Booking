import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaCopy, FaTicketAlt } from "react-icons/fa";
import Save from "../../assets/save.png";

function Offer() {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const offers = [
    {
      code: "GTECH08",
      discount: "40%",
      title: "Get 40% off on your first booking",
      validTill: "26th June 2026",
      description:
        "Use this code on your very first booking and get an amazing 40% discount. Limited to one use per customer.",
    },
    {
      code: "SAVE20",
      discount: "20%",
      title: "Summer Sale - 20% off on all routes",
      validTill: "30th August 2026",
      description:
        "Enjoy summer travels with 20% off on all bus routes across the country.",
    },
    {
      code: "GROUP10",
      discount: "15%",
      title: "Group booking? Get 15% off for 5+ passengers",
      validTill: "31st December 2026",
      description:
        "Traveling with friends or family? Book 5 or more seats and get 15% off your total booking.",
    },
    {
      code: "WEEKEND25",
      discount: "25%",
      title: "Weekend Getaway - 25% off",
      validTill: "31st December 2026",
      description:
        "Plan your weekend trips with our special weekend discount. Valid Friday to Sunday.",
    },
    {
      code: "STUDENT10",
      discount: "10%",
      title: "Student Special - 10% off",
      validTill: "31st December 2026",
      description:
        "Students get 10% off on all bookings. Valid student ID required at check-in.",
    },
  ];

  const handleCopy = (code, index) => {
    navigator.clipboard
      .writeText(code)
      .then(() => {
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
      })
      .catch((err) => console.log("Failed to copy", err));
  };

  return (
    <div className="w-full lg:px-28 md:px-16 sm:px-7 px-4 mt-[13ch] mb-[8ch]">
      <div className="text-center mb-10">
        <h1 className="text-3xl lg:text-4xl font-bold text-neutral-800 dark:text-neutral-100 mb-4">
          Special <span className="text-violet-600">Offers</span>
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
          Grab these exclusive deals and save big on your next bus journey
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {offers.map((offer, idx) => (
          <div
            key={idx}
            className="bg-neutral-200/60 dark:bg-neutral-900/40 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
            <div className="bg-violet-600/10 dark:bg-violet-800/20 px-6 py-3 border-b border-neutral-300 dark:border-neutral-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-x-2">
                  <FaTicketAlt className="text-violet-600" />
                  <span className="text-violet-600 font-semibold">
                    {offer.discount} OFF
                  </span>
                </div>
                <span className="text-xs text-neutral-500">
                  Valid till {offer.validTill}
                </span>
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-100 mb-2">
                {offer.title}
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                {offer.description}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-x-3">
                  <div className="bg-violet-500/10 dark:bg-violet-800/20 px-4 py-2 rounded-md border border-dashed border-neutral-300 dark:border-neutral-700">
                    {copiedIndex === idx ? (
                      <span className="text-green-600 text-sm font-medium">
                        ✓ Copied!
                      </span>
                    ) : (
                      <span className="text-violet-600 font-mono font-bold">
                        {offer.code}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => handleCopy(offer.code, idx)}
                    className="text-violet-600 hover:text-violet-700 transition-colors">
                    <FaCopy />
                  </button>
                </div>

                <Link
                  to="/bus"
                  className="text-sm bg-violet-600 text-white px-4 py-2 rounded-md hover:bg-violet-700 transition-colors">
                  Book Now
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Offer;
