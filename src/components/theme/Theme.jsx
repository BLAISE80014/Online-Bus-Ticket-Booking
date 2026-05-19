import React, { useState, useEffect } from "react";
import { FaMoon, FaSun } from "react-icons/fa6";

const Theme = () => {
  // Iyi function igena theme ikoresheje localStorage
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      return savedTheme;
    }
    // Niba nta theme ibitswe, reba niba system ikoresha dark mode
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
    return "light";
  });

  // Iyi useEffect ikoreshwa mugihe theme ihindutse
  useEffect(() => {
    const root = document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.add("light");
      root.classList.remove("dark");
    }

    // Bika theme muri localStorage
    localStorage.setItem("theme", theme);

    // Debug: Check if class is applied
    console.log("Theme changed to:", theme);
    console.log("Root classes:", root.classList);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  return (
    <button
      onClick={toggleTheme}
      className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center hover:scale-110 transition-transform duration-300"
      aria-label="Toggle theme">
      {theme === "dark" ? (
        <FaSun className="text-yellow-400 text-lg" />
      ) : (
        <FaMoon className="text-gray-700 text-lg" />
      )}
    </button>
  );
};

export default Theme;
