import React from "react";
import { Navbar, Footer } from "../components";
import { Outlet } from "react-router";
import { EventProvider, AuthProvider } from "../context";
import { ToastContainer } from "react-toastify";

const MainLayout = () => {
  return (
    <AuthProvider>
      <div className="text-gray-300 flex flex-col h-screen">
        <Navbar />
        <EventProvider>
          <main className="flex-grow flex flex-col">
            <Outlet />
          </main>
        </EventProvider>
        <Footer />
        <ToastContainer position="bottom-right" />
      </div>
    </AuthProvider>
  );
};

export default MainLayout;
