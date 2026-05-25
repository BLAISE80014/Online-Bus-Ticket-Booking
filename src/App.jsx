import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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

import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import AdminDashboard from "./pages/admin/AdminDashboard";

import { BookingProvider } from "./context/BookingContext";

function App() {
  return (
    <Router>
      <BookingProvider>
        <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-800 dark:text-neutral-200 flex flex-col">
          <Routes>
            {/* Auth routes without Navbar/Footer */}
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />

            {/* Protected Admin route */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* Main routes with Navbar and Footer */}
            <Route
              path="/*"
              element={
                <>
                  <Navbar />
                  <main className="flex-1">
                    <Routes>
                      <Route path="/" element={<HomeContainer />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/category" element={<Category />} />

                      <Route path="/bus" element={<Bus />} />
                      <Route path="/bus/detail" element={<Detail />} />
                      <Route
                        path="/bus/detail/checkout"
                        element={<Checkout />}
                      />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </main>
                  <Footer />
                </>
              }
            />
          </Routes>
        </div>
      </BookingProvider>
    </Router>
  );
}

export default App;
