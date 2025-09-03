import React from "react";
import { Navbar, Footer } from "../components";
import { Outlet } from "react-router";
import AuthProvider from "../context/AuthProvider";
const MainLayout = () => {
  return (
    <AuthProvider>
      <div className="text-gray-300 flex flex-col h-screen">
        <Navbar />
        <main className="flex-grow flex flex-col">
          <Outlet />
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
};

export default MainLayout;
