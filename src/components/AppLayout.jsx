import React, { useState } from "react";
import Sidebar from "./Side-bar";
import Header from "./Header";
import { useAuth } from "@/hooks/useAuth";

export default function AppLayout({ children }) {
  const [open, setOpen] = useState(false);

  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  return (
    <div className="flex min-h-screen w-full bg-[#F5FAF7]">
      <Sidebar isAdmin={isAdmin} isOpen={open} onClose={() => setOpen(false)} />

      <div className="flex-1 md:ml-64">
        <Header onMenuClick={() => setOpen(true)} />

        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
