import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button.jsx";
import { Menu } from "lucide-react";
import { Sidebar } from "./Sidebar";
import { UserNav } from "@/components/UserNav";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[240px] p-0">
              <Sidebar />
            </SheetContent>
          </Sheet>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <UserNav />
        </div>
      </div>
    </header>
  );
}