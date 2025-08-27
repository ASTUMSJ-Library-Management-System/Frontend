import React from "react";
import { Menu, BookOpen } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export default function Header({ onMenuClick }) {
  const { user } = useAuth();

  return (
    <div className="md:hidden sticky top-0 z-40 bg-white border-b shadow-sm">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-lg bg-[#009966] flex items-center justify-center shadow">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <div className="leading-tight">
            <div className="font-semibold text-[#009966]">ASTUMSJ Library</div>
            <div className="text-xs text-[#189966]">
              {user?.role === "admin" ? "Admin Panel" : "Student Panel"}
            </div>
          </div>
        </div>

        <button
          onClick={onMenuClick}
          className="p-2 rounded-md hover:bg-gray-100 active:scale-95"
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6 text-gray-700" />
        </button>
      </div>
    </div>
  );
}
