import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaPhone, FaSignOutAlt, FaUserCircle } from "react-icons/fa";

import Logo from "../../assets/logo.png";
import Theme from "../theme/Theme";
import { useLanguage } from "../../context/LanguageContext";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();
  const { t } = useLanguage();

  useEffect(() => {
    const refreshUser = () => {
      const storedUser = localStorage.getItem("currentUser");
      setCurrentUser(storedUser ? JSON.parse(storedUser) : null);
    };
    refreshUser();
    window.addEventListener("storage", refreshUser);
    window.addEventListener("user-session-change", refreshUser);
    return () => {
      window.removeEventListener("storage", refreshUser);
      window.removeEventListener("user-session-change", refreshUser);
    };
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/bus", label: "Bus" },
    { href: "/category", label: "Services" },
  ];

  const handleClick = () => {
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="w-full h-[8ch] bg-neutral-100 dark:bg-neutral-900 flex items-center md:flex-row lg:px-28 md:px-16 sm:px-7 px-4 fixed top-0 z-50">
      {/* Logo section */}
      <Link to={"/"} className="mr-16" onClick={handleClose}>
        <img src={Logo} alt="logo" className="w-28 h-auto object-contain" />
      </Link>

      {/* Navigation links */}
      <div
        className={`${open ? "flex absolute top-14 left-0 w-full h-auto md:h-auto md:relative" : "hidden"} flex-1 md:flex flex-col md:flex-row gap-x-5 gap-y-2 md:items-center md:p-0 sm:p-4 p-4 justify-between md:bg-transparent bg-neutral-100 md:shadow-none shadow-md rounded-md`}>
        <ul className="list-none flex md:items-center items-start gap-x-5 gap-y-1 flex-wrap md:flex-row flex-col text-base text-neutral-600 dark:text-neutral-500 font-medium">
          {navLinks.map((link, index) => (
            <li key={index}>
              <Link
                to={link.href}
                onClick={handleClose}
                className="hover:text-violet-600 ease-in-out duration-300">
                {t(link.label)}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex md:items-center items-start gap-x-5 gap-y-2 flex-wrap md:flex-row flex-col text-base font-medium text-neutral-800">
          <div className="relative bg-violet-600 rounded-md px-8 py-2 w-fit cursor-pointer">
            <div className="absolute top-[50%] -left-6 translate-y-[-50%] w-9 h-9 rounded-full bg-violet-600 border-4 border-neutral-100 dark:border-neutral-900 flex items-center justify-center">
              <FaPhone className="text-neutral-50 text-sm" />
            </div>
            <div className="space-y-0.5">
              <p className="text-xs text-neutral-200 font-light">{t("Need Help?")}</p>
              <p className="text-xs font-normal text-neutral-50 tracking-wide">
                +250 796261912
              </p>
            </div>
          </div>

          {/* Theme */}
          <Theme />
          {currentUser ? (
            <div className="flex items-center gap-3">
              {currentUser.role === "passenger" ? (
                <Link
                  to="/account"
                  onClick={handleClose}
                  className="flex items-center gap-2 text-sm text-neutral-700 hover:text-violet-600 dark:text-neutral-200"
                >
                  <FaUserCircle />
                  <span>{currentUser.name || t("My account")}</span>
                </Link>
              ) : (
                <Link
                  to="/admin"
                  onClick={handleClose}
                  className="text-sm text-neutral-700 hover:text-violet-600 dark:text-neutral-200"
                >
                  {t("Admin dashboard")}
                </Link>
              )}
              <button
                type="button"
                onClick={() => {
                  localStorage.removeItem("currentUser");
                  window.dispatchEvent(new Event("user-session-change"));
                  setOpen(false);
                  navigate("/");
                }}
                className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700"
              >
                <FaSignOutAlt />
                <span>{t("Logout")}</span>
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              onClick={handleClose}
              className="rounded-md bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-700"
            >
              {t("Login / Register")}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
