import React from "react";
import { Navbar, Footer } from "../components";
import { Outlet } from "react-router";
const MainLayout = () => {
  return (
    <div className="bg-blue-500 text-gray-300 flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow flex flex-col">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
