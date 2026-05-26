import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="w-full min-h-[70vh] flex items-center justify-center px-4 mt-[8ch]">
      <div className="max-w-2xl w-full bg-gradient-to-br from-neutral-100 to-neutral-200/50 dark:from-neutral-900/80 dark:to-neutral-800/50 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden">
        {/* Decorative top bar */}
        <div className="h-2 bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500"></div>

        <div className="p-8 md:p-10 text-center space-y-6">
          {/* Custom 404 Illustration */}
          <div className="relative w-48 h-48 mx-auto">
            <svg
              viewBox="0 0 200 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full">
              {/* Background circle */}
              <circle
                cx="100"
                cy="100"
                r="90"
                fill="url(#gradientBg)"
                opacity="0.1"
              />
              <circle
                cx="100"
                cy="100"
                r="70"
                stroke="url(#gradientBorder)"
                strokeWidth="3"
                strokeDasharray="8 8"
                fill="none"
              />

              {/* Magnifying glass */}
              <circle
                cx="85"
                cy="85"
                r="28"
                stroke="#8b5cf6"
                strokeWidth="6"
                fill="none"
              />
              <line
                x1="105"
                y1="105"
                x2="130"
                y2="130"
                stroke="#8b5cf6"
                strokeWidth="6"
                strokeLinecap="round"
              />

              {/* Question mark */}
              <text
                x="100"
                y="160"
                textAnchor="middle"
                fontSize="40"
                fontWeight="bold"
                fill="#8b5cf6"
                fontFamily="Arial, sans-serif">
                ?
              </text>

              {/* 404 text */}
              <text
                x="100"
                y="55"
                textAnchor="middle"
                fontSize="24"
                fontWeight="bold"
                fill="#6b7280"
                fontFamily="Arial, sans-serif">
                404
              </text>

              {/* Floating particles */}
              <circle cx="40" cy="50" r="3" fill="#a78bfa" opacity="0.6">
                <animate
                  attributeName="cy"
                  values="50;45;50"
                  dur="3s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx="160" cy="70" r="2" fill="#c4b5fd" opacity="0.6">
                <animate
                  attributeName="cy"
                  values="70;65;70"
                  dur="2.5s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx="150" cy="140" r="3" fill="#a78bfa" opacity="0.6">
                <animate
                  attributeName="cy"
                  values="140;135;140"
                  dur="3.5s"
                  repeatCount="indefinite"
                />
              </circle>

              {/* Gradients definition */}
              <defs>
                <linearGradient id="gradientBg" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#6366f1" />
                </linearGradient>
                <linearGradient id="gradientBorder" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#6366f1" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Text content */}
          <div className="space-y-3">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
              Lost in Space?
            </h1>
            <p className="text-neutral-600 dark:text-neutral-300 text-lg">
              Oops! The page you're looking for has wandered off into the
              digital wilderness.
            </p>
          </div>

          {/* Error details */}
          <div className="bg-neutral-200/50 dark:bg-neutral-800/50 rounded-lg p-4 space-y-1">
            <p className="text-sm text-neutral-500 dark:text-neutral-400 font-mono">
              Error 404: Page Not Found
            </p>
            <p className="text-xs text-neutral-400 dark:text-neutral-500">
              The requested URL{" "}
              <span className="font-mono">{window.location.pathname}</span> does
              not exist.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-6 py-2.5 rounded-lg hover:from-violet-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              Go Back Home
            </Link>

            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center justify-center gap-2 border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 px-6 py-2.5 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-all duration-200">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Go Back
            </button>
          </div>

          {/* Helpful links */}
          <div className="pt-4 text-sm text-neutral-500 dark:text-neutral-400">
            <p>Need help? Try these instead:</p>
            <div className="flex flex-wrap gap-3 justify-center mt-2">
              <Link
                to="/"
                className="text-violet-600 dark:text-violet-400 hover:underline">
                Homepage
              </Link>
              <span className="text-neutral-300 dark:text-neutral-600">•</span>
              <Link
                to="/about"
                className="text-violet-600 dark:text-violet-400 hover:underline">
                About Us
              </Link>
              <span className="text-neutral-300 dark:text-neutral-600">•</span>
              <Link
                to="/contact"
                className="text-violet-600 dark:text-violet-400 hover:underline">
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
