import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Home,
  BookOpen,
  Library,
  CreditCard,
  Award,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/Button.jsx";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

function SideNavLink({ to, icon: IconComp, label, onClick, end = false }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      end={end}
      className={({ isActive }) =>
        cn(
          "flex items-center gap-2 px-3 py-2 rounded-md transition text-sm font-medium",
          isActive
            ? "bg-[#009966] text-white"
            : "text-gray-700 hover:bg-green-100"
        )
      }
    >
      {IconComp && (
        <IconComp
          className={cn(
            "h-4 w-4",
            "group-hover:text-white"
          )}
        />
      )}
      <span>{label}</span>
    </NavLink>
  );
}

export default function Sidebar({ isOpen = false, onClose = () => {} }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const studentLinks = [
    { to: "/dashboard", label: "Dashboard", icon: Home, end: true },
    { to: "/browsebooks", label: "Browse Books", icon: BookOpen },
    { to: "/mybooks", label: "My Books", icon: Library },
    { to: "/membershippayment", label: "Membership Payment", icon: CreditCard },
    { to: "/achievements", label: "Achievements", icon: Award },
    { to: "/profile", label: "Profile", icon: User },
  ];

  const adminLinks = [
    { to: "/admin/dashboard", label: "Dashboard", icon: Home, end: true },
    { to: "/admin/managebooks", label: "Manage Books", icon: BookOpen },
    { to: "/admin/manageusers", label: "Manage Users", icon: User },
    {
      to: "/admin/paymentrequests",
      label: "Payment Requests",
      icon: CreditCard,
    },
    { to: "/admin/borrowingrecord", label: "Borrowing Record", icon: Library },
  ];

  const links = user?.role === "admin" ? adminLinks : studentLinks;

  return (
    <div className="h-full bg-[#FFFFFF] border-r shadow-sm border-gray-200 flex flex-col justify-between p-4">
      <div>
        <div className="flex items-center gap-3 mb-3 shadow-[0_1px_20px_0_#1D77571A] rounded-lg p-2">
          <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-[#009966] shadow-sm">
            <BookOpen className="text-white h-6 w-6" />
          </div>
          <div className="leading-tight">
            <div className="font-semibold text-[#006045] text-sm">
              ASTUMSJ Library
            </div>
            <div className="text-xs text-[#189966]">
              {user?.role === "admin" ? "Admin Panel" : "Student Panel"}
            </div>
          </div>
        </div>

        <div className="h-[1px] w-full bg-[#5DDBA9]" />

        <nav className="flex flex-col gap-2 mt-3">
          {links.map((l) => (
            <SideNavLink key={l.to} {...l} onClick={onClose} />
          ))}
        </nav>
      </div>

      <div>
        <div className="flex flex-col gap-1 p-3 rounded-md border border-green-200 bg-[#ECFDF5] text-sm mb-3">
          <p className="font-semibold text-green-700">{user?.name || "User"}</p>
          <p className="text-gray-700 break-words">
            {user?.email || "user@example.com"}
          </p>
          <p>
            Role:{" "}
            <span className="text-green-600 font-medium capitalize">
              {user?.role || "student"}
            </span>
          </p>
        </div>
        <Button
          onClick={handleLogout}
          variant="ghost"
          className="w-full h-[7] flex items-center justify-center gap-2 text-[#006045] font-semibold border-[#A4F4CF] rounded-lg bg-[#ffffff] hover:bg-[#A4F4CF] hover:text-[#006045]"
        >
          Sign Out
        </Button>
      </div>
    </div>
  );
}
