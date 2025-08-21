import {
  Home,
  BookOpen,
  Wallet,
  CreditCard,
  User,
  LogOut,
} from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Sidebar() {
  return (
    <div className="h-screen w-64 bg-green-50 border-r flex flex-col justify-between p-4">
      {/* Logo */}
      <div>
        <div className="flex items-center gap-2 mb-6">
          <div className="h-10 w-10 flex items-center justify-center rounded-full bg-green-600">
            <BookOpen className="text-white h-6 w-6" />
          </div>
          <span className="font-semibold text-green-800">ASTUMSJ Library</span>
        </div>

        {/* Menu */}
        <nav className="flex flex-col gap-2 text-sm font-medium text-gray-700">
          <a
            href="#"
            className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-green-100"
          >
            <Home className="h-4 w-4 text-green-700" />
            Dashboard
          </a>

          <a
            href="#"
            className="flex items-center gap-2 px-3 py-2 rounded-md bg-green-600 text-white hover:bg-green-700"
          >
            <BookOpen className="h-4 w-4" />
            Borrow Books
          </a>

          <a
            href="#"
            className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-green-100"
          >
            <Wallet className="h-4 w-4 text-green-700" />
            My Books
          </a>

          <a
            href="#"
            className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-green-100"
          >
            <CreditCard className="h-4 w-4 text-green-700" />
            Membership Payment
          </a>

          <a
            href="#"
            className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-green-100"
          >
            <User className="h-4 w-4 text-green-700" />
            Profile
          </a>
        </nav>
      </div>

      {/* Bottom info */}
      <div>
        <div className="mb-4 text-xs text-gray-700 space-y-1">
          <p>
            <span className="font-semibold text-green-700">Student User</span>
          </p>
          <p>ID: <span className="text-gray-900">ASTU12345</span></p>
          <p>
            Payment:{" "}
            <span className="text-yellow-600 font-medium">Pending</span>
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
