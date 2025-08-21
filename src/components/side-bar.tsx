import {
  Home,
  BookOpen,
  Wallet,
  CreditCard,
  User,
  LogOut,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="h-screen w-64 bg-[#FFFFFF] border-r flex flex-col justify-between p-4">
      <div className="bg-[#FFFFFF]">
        {/* Sidebar Top */}
        <div className="flex items-center gap-3 mb-2 shadow-[10px_1px_60px_0px_#1D77571A]">
         <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-green-600 shadow-sm">
         <BookOpen className="text-white h-6 w-6" />
         </div>

         {/* Title + Subtitle */}
         <div className="flex flex-col leading-tight">
          <span className="font-semibold text-[#006045] text-sm">ASTUMSJ Library</span>
          <span className="text-xs text-[#189966]">Student Panel</span>
         </div>
        </div>
       <div className="h-[0.5px] w-full bg-[#5DDBA9]"></div>

        {/* Menu */}
        <nav className="flex flex-col gap-2 text-sm font-medium text-gray-700">
          <Link
            to="/Dashboard"
            className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-green-100"
          >
            <Home className="h-4 w-4 text-green-700" />
            Dashboard
          </Link>

          <Link
            to="/Borrowbook"
            className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-green-100"
          >
            <BookOpen className="h-4 w-4" />
            Borrow Books
          </Link>

          <Link
            to="/MyBooks"
            className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-green-100"
          >
            <Wallet className="h-4 w-4 text-green-700" />
            My Books
          </Link>

          <Link
            to="/MembershipPayment"
            className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-green-100"
          >
            <CreditCard className="h-4 w-4 text-green-700" />
            Membership Payment
          </Link>

          <Link
            to="/Profile"
            className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-green-100"
          >
            <User className="h-4 w-4 text-green-700" />
            Profile
          </Link>
        </nav>
      </div>

      
      <div>
        <div className="flex flex-col items-start gap-1 p-3 rounded-md border border-green-200 bg-[#ECFDF5] text-sm w-full mb-4">
          <p className="font-semibold text-green-700">Student User</p>
          <p className="text-gray-700">temkin@astu.edu.et</p>
          <p>
            Payment: <span className="text-yellow-600 font-medium">pending</span>
          </p>
        </div>


        <Button
          variant="outline"
          className="w-full flex items-center gap-2 text-red-600 border-red-600 hover:bg-red-600 hover:text-white"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </div>
  )
}
