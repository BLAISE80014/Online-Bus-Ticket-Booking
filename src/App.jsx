import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

import HomeContainer from "./pages/home_container/HomeContainer";
import Bus from "./pages/bus/Bus";
import Detail from "./pages/bus/Detail";
import Checkout from "./pages/checkout/Checkout";
import About from "./pages/about/About";
import Category from "./pages/category/Category";
import NotFound from "./pages/notfound/NotFound";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Login from "./pages/auth/Login";
import Account from "./pages/account/Account";

import { BookingProvider } from "./context/BookingContext";
import { LanguageProvider } from "./context/LanguageContext";

function AppShell() {
  const location = useLocation();
  const [apiError, setApiError] = useState("");
  const showLayout = !["/login", "/admin"].includes(location.pathname);

  useEffect(() => {
    const showError = (event) => setApiError(event.detail);
    const clearError = () => setApiError("");
    window.addEventListener("api-error", showError);
    window.addEventListener("api-success", clearError);
    return () => {
      window.removeEventListener("api-error", showError);
      window.removeEventListener("api-success", clearError);
    };
  }, []);

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-800 dark:text-neutral-200 flex flex-col">
      {apiError && (
        <div
          role="alert"
          className="fixed bottom-4 right-4 z-[100] max-w-md rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 shadow-lg"
        >
          <div className="flex items-start justify-between gap-4">
            <span>{apiError}</span>
            <button type="button" onClick={() => setApiError("")} aria-label="Dismiss">
              ×
            </button>
          </div>
        </div>
      )}
      {showLayout && <Navbar />}
      <main className="flex-1">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            element={<ProtectedRoute />}
          >
            <Route path="/" element={<HomeContainer />} />
            <Route path="/about" element={<About />} />
            <Route path="/category" element={<Category />} />
            <Route path="/bus" element={<Bus />} />
            <Route path="/bus/detail" element={<Detail />} />
            <Route path="/bus/detail/checkout" element={<Checkout />} />
            <Route
              path="/account"
              element={
                <ProtectedRoute requiredRole="passenger">
                  <Account />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </main>
      {showLayout && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <LanguageProvider>
        <BookingProvider>
          <AppShell />
        </BookingProvider>
      </LanguageProvider>
    </Router>
  );
}

export default App;
