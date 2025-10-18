import React from "react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button.jsx";
import { Book, LayoutDashboard, Users } from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/manage-books", label: "Books", icon: Book },
  { href: "/manage-users", label: "Users", icon: Users },
];

export function Sidebar({ className }) {
  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Admin Panel
          </h2>
          <div className="space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                className={({ isActive }) =>
                  cn("w-full", !isActive && "hover:bg-accent hover:text-accent-foreground")
                }
              >
                {({ isActive }) => ( // This is the correct way to use the render prop
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    className="w-full justify-start"
                  >
                    <item.icon className="mr-2 h-4 w-4" />
                    <span>{item.label}</span>
                  </Button>
                )}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}