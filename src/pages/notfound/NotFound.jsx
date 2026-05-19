import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="w-full min-h-[60vh] flex items-center justify-center px-4 mt-[8ch]">
      <div className="max-w-md w-full bg-neutral-200/60 dark:bg-neutral-900/70 rounded-xl p-6 text-center space-y-4">
        <h1 className="text-2xl font-bold">Page not found</h1>
        <p className="text-neutral-700 dark:text-neutral-200">
          The page you are looking for does not exist.
        </p>
        <Link
          to="/"
          className="inline-flex items-center justify-center bg-violet-600 text-neutral-50 px-4 py-2 rounded-md hover:bg-violet-700">
          Go Home
        </Link>
      </div>
    </div>
  );
}
