import React, { useState, useEffect } from "react";
import { FaMoon, FaSun } from "react-icons/fa6";

const Theme = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="dark:text-white text-black w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
      {theme === "dark" ? <FaMoon /> : <FaSun />}
    </button>
  );
};

export default Theme;
