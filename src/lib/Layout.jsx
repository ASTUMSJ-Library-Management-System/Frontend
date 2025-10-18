import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "@/components/Side-bar.jsx";
import { Header } from "./Header";

export function Layout() {
  return (
    <>
      <Header />
      <div className="container grid md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        {/* Desktop Sidebar - hidden on mobile */}
        <aside className="hidden border-r md:block">
          <Sidebar />
        </aside>
        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </>
  );
}