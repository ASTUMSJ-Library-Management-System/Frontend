import React, { useState } from "react";
import Sidebar from "./Side-bar";
import Header from "./Header";

export default function AppLayout({ children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen w-full bg-[#F5FAF7]">
      <Sidebar isOpen={open} onClose={() => setOpen(false)} />

      <div className="flex-1 md:ml-64">
        <Header onMenuClick={() => setOpen(true)} />

        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
