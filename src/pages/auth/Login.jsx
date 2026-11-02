import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Logo from "../../assets/logo.png";
import { apiRequest } from "../../utils/api";
import { useLanguage } from "../../context/LanguageContext";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { changeLanguage, t } = useLanguage();
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "passenger",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    setSuccess("");

    try {
      if (mode === "register") {
        if (form.name.trim().length < 2) {
          setError("Enter your full name.");
          return;
        }
        if (form.password !== form.confirmPassword) {
          setError("The passwords do not match.");
          return;
        }
        await apiRequest("/auth/register", {
          method: "POST",
          body: {
            name: form.name,
            email: form.email,
            phone: form.phone,
            password: form.password,
          },
        });
        setSuccess("Account created. You can now sign in.");
        setMode("login");
        setForm((prev) => ({
          ...prev,
          name: "",
          phone: "",
          password: "",
          confirmPassword: "",
          role: "passenger",
        }));
        return;
      }

      const { user, token } = await apiRequest("/auth/login", {
        method: "POST",
        body: {
          email: form.email,
          password: form.password,
          role: form.role,
        },
      });
      if (user.role === "passenger" && user.language) {
        changeLanguage(user.language);
      }
      localStorage.setItem("currentUser", JSON.stringify(user));
      localStorage.setItem("authToken", token);
      window.dispatchEvent(new Event("user-session-change"));
      setError("");
      const redirectTo =
        location.state?.from || (user.role === "admin" ? "/admin" : "/");
      navigate(redirectTo, { replace: true });
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSubmitting(false);
    }
  };

  const switchMode = (nextMode) => {
    setMode(nextMode);
    setError("");
    setSuccess("");
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 px-4 py-20 flex items-center justify-center">
      <div className="w-full max-w-md rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-8 shadow-xl">
        <div className="mb-8 text-center">
          <img
            src={Logo}
            alt="SmartBus logo"
            className="mx-auto mb-5 h-auto w-44 object-contain"
          />
          <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">
            {mode === "login" ? t("Welcome back") : t("Create your account")}
          </h1>
          <p className="mt-2 text-sm text-neutral-500">
            {mode === "login"
              ? t("Sign in to continue to your account.")
              : t("Register as a passenger to book and manage tickets.")}
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {mode === "login" && (
            <div>
              <label htmlFor="role" className="mb-2 block text-sm font-medium text-neutral-700 dark:text-neutral-200">
                {t("Login as")}
              </label>
              <select
                id="role"
                name="role"
                value={form.role}
                onChange={handleChange}
                className="w-full rounded-xl border border-neutral-200 bg-neutral-100 px-3 py-3 text-neutral-800 outline-none transition focus:border-violet-500 dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-100"
              >
                <option value="passenger">{t("Passenger")}</option>
                <option value="admin">{t("Admin")}</option>
              </select>
            </div>
          )}

          {mode === "register" && (
            <>
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-medium text-neutral-700 dark:text-neutral-200">
                  {t("Full name")}
                </label>
                <input id="name" name="name" value={form.name} onChange={handleChange} autoComplete="name" className="w-full rounded-xl border border-neutral-200 bg-neutral-100 px-3 py-3 text-neutral-800 outline-none focus:border-violet-500 dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-100" required />
              </div>
              <div>
                <label htmlFor="phone" className="mb-2 block text-sm font-medium text-neutral-700 dark:text-neutral-200">
                  {t("Phone number")}
                </label>
                <input id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange} autoComplete="tel" className="w-full rounded-xl border border-neutral-200 bg-neutral-100 px-3 py-3 text-neutral-800 outline-none focus:border-violet-500 dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-100" required />
              </div>
            </>
          )}

          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-neutral-700 dark:text-neutral-200">
              {t("Email address")}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              autoComplete="email"
              placeholder={form.role === "admin" ? "admin@busflow.com" : "you@example.com"}
              className="w-full rounded-xl border border-neutral-200 bg-neutral-100 px-3 py-3 text-neutral-800 outline-none transition focus:border-violet-500 dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-100"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-2 block text-sm font-medium text-neutral-700 dark:text-neutral-200">
              {t("Password")}
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              autoComplete={mode === "register" ? "new-password" : "current-password"}
              minLength={mode === "register" ? 8 : undefined}
              className="w-full rounded-xl border border-neutral-200 bg-neutral-100 px-3 py-3 text-neutral-800 outline-none transition focus:border-violet-500 dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-100"
              required
            />
          </div>

          {mode === "register" && (
            <div>
              <label htmlFor="confirmPassword" className="mb-2 block text-sm font-medium text-neutral-700 dark:text-neutral-200">
                {t("Confirm password")}
              </label>
              <input id="confirmPassword" name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} autoComplete="new-password" minLength={8} className="w-full rounded-xl border border-neutral-200 bg-neutral-100 px-3 py-3 text-neutral-800 outline-none focus:border-violet-500 dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-100" required />
            </div>
          )}

          {error ? (
            <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
              {error}
            </p>
          ) : null}
          {success ? (
            <p className="rounded-xl border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-700">
              {success}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-xl bg-violet-600 px-4 py-3 font-medium text-white transition hover:bg-violet-700"
          >
            {submitting
              ? t("Please wait...")
              : mode === "login"
                ? t("Sign In")
                : t("Create Passenger Account")}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-neutral-600 dark:text-neutral-300">
          {mode === "login" ? t("New passenger?") : t("Already registered?")}{" "}
          <button type="button" onClick={() => switchMode(mode === "login" ? "register" : "login")} className="font-semibold text-violet-600 hover:text-violet-700">
            {mode === "login" ? t("Create an account") : t("Sign In")}
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;
