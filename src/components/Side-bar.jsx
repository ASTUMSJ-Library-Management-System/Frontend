import {
  Home,
  BookOpen,
  Library,
  CreditCard,
  User,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="h-screen w-64 bg-[#FFFFFF] border-r shadow-sm border border-gray-200 flex flex-col justify-between p-4">
      <div>
        <div className="flex items-center gap-3 mb-2 shadow-[10px_1px_60px_0px_#1D77571A]">
          <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-green-600 shadow-sm">
            <BookOpen className="text-white h-6 w-6" />
          </div>

          <div className="flex flex-col leading-tight">
            <span className="font-semibold text-[#006045] text-[18px] text-sm mb-0">
              ASTUMSJ Library
            </span>
            <span className="text-xs text-[15px] text-[#189966]">
              Student Panel
            </span>
          </div>
        </div>
        <div className="h-[0.5px] w-full bg-[#5DDBA9]"></div>

        <nav className="flex flex-col gap-2 text-sm font-medium text-gray-700 mt-2">
          <Link
            to="/Dashboard"
            className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-[#D0FAE5]"
          >
            <Home className="h-4 w-4 " />
            <p className="text-[#006045] "> Dashboard</p>
          </Link>

          <Link
            to="/Browsebook"
            className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-[#D0FAE5]"
          >
            <BookOpen className="h-4 w-4 " />
            <p className="text-[#006045] ">Browse Books</p>
          </Link>

          <Link
            to="/MyBooks"
            className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-[#D0FAE5]"
          >
            <Library className="h-4 w-4 " />
            <p className="text-[#006045] ">My Books</p>
          </Link>

          <Link
            to="/MembershipPayment"
            className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-[#D0FAE5]"
          >
            <CreditCard className="h-4 w-4 " />
            <p className="text-[#006045] ">Membership Payment</p>
          </Link>

          <Link
            to="/Profile"
            className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-[#D0FAE5]"
          >
            <User className="h-4 w-4 " />
            <p className="text-[#006045] "> Profile</p>
          </Link>
        </nav>
      </div>

      <div>
        <div className="flex flex-col items-start gap-1 p-3 rounded-md border shadow-sm  border-gray-300  bg-[#ECFDF5] text-sm w-full mb-4">
          <p className="font-semibold text-green-700">Student User</p>
          <p className="text-gray-700">temkin@astu.edu.et</p>
          <p>
            Payment: <span className="text-[#CCAF0E] font-medium">pending</span>
          </p>
        </div>

        <Button
          variant="outline"
          className="w-full flex items-center gap-2 text-red-800 font-semibold border-red-800 rounded-lg hover:bg-red-200 hover:text-red-800"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </div>
  );
}
