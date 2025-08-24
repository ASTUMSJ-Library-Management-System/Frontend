import React from "react";
import Sidebar from "../components/Side-bar";
import {
  BookOpen,
  Library,
  CreditCard,
  User,
  Users,
  BookCheck,
  AlertTriangle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const isAdmin = user?.role === "admin";

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 min-h-screen bg-[#71df7139] p-6">
        <h1 className="text-2xl font-bold text-[#009966]">
          {isAdmin ? "Admin Dashboard" : "Student Dashboard"}
        </h1>
        <p className="text-gray-700 mt-2">
          Welcome back, {user?.name || "User"}!{" "}
          {isAdmin
            ? "Manage the library system here."
            : "Manage your library activities here."}
        </p>

        {!isAdmin && (
          <div className="bg-yellow-100 border-l-4 border-yellow-400 text-yellow-700 p-4 mt-4 rounded-md">
            Your membership payment is{" "}
            <span className="font-semibold">pending</span>. Please wait for
            admin approval.
          </div>
        )}

        {/* Stats Section */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          {isAdmin ? (
            <>
              <div className="bg-white p-4 rounded-lg shadow-md">
                <p className="text-gray-500">Total Users</p>
                <h2 className="text-2xl font-bold text-[#009966]">156</h2>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-md">
                <p className="text-gray-500">Total Books</p>
                <h2 className="text-2xl font-bold text-[#009966]">1,247</h2>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-md">
                <p className="text-gray-500">Active Loans</p>
                <h2 className="text-2xl font-bold text-[#009966]">89</h2>
              </div>
            </>
          ) : (
            <>
              <div className="bg-white p-4 rounded-lg shadow-md">
                <p className="text-gray-500">Books Borrowed</p>
                <h2 className="text-2xl font-bold text-[#009966]">2</h2>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-md">
                <p className="text-gray-500">Payment Status</p>
                <span className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded text-sm font-semibold">
                  Pending
                </span>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-md">
                <p className="text-gray-500">Available Books</p>
                <h2 className="text-2xl font-bold text-[#009966]">1,247</h2>
              </div>
            </>
          )}
        </div>

        {isAdmin ? (
          /* Admin Content */
          <div className="bg-white p-4 rounded-lg shadow-md mt-6">
            <h2 className="text-lg font-semibold text-[#009966] mb-3">
              System Overview
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <div className="border-b border-gray-200 pb-3 mb-3">
                <p className="font-medium text-red-600">Pending Approvals</p>
                <p className="text-sm text-gray-600">12 membership payments</p>
                <p className="text-sm text-gray-500">5 book return requests</p>
              </div>

              <div className="border-b border-gray-200 pb-3 mb-3">
                <p className="font-medium text-orange-600">Overdue Books</p>
                <p className="text-sm text-gray-600">8 books overdue</p>
                <p className="text-sm text-gray-500">Total fines: $45.50</p>
              </div>
            </div>
          </div>
        ) : (
          /* Student Content */
          <div className="bg-white p-4 rounded-lg shadow-md mt-6">
            <h2 className="text-lg font-semibold text-[#009966] mb-3">
              Currently Borrowed Books
            </h2>

            <div className="border-b border-gray-200 pb-3 mb-3">
              <p className="font-medium">Sahih Al-Bukhari</p>
              <p className="text-sm text-gray-600">by Imam Bukhari</p>
              <p className="text-sm text-gray-500">Borrowed: 11/15/2025</p>
              <div className="flex justify-between mt-1">
                <span className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded text-xs font-semibold">
                  30 days
                </span>
                <span className="text-sm text-gray-600">Due: 12/15/2025</span>
              </div>
            </div>

            <div>
              <p className="font-medium">Tafsir Ibn Kathir - Vol 1</p>
              <p className="text-sm text-gray-600">by Ibn Kathir</p>
              <p className="text-sm text-gray-500">Borrowed: 11/10/2025</p>
              <div className="flex justify-between mt-1">
                <span className="bg-red-200 text-red-800 px-2 py-1 rounded text-xs font-semibold">
                  Overdue
                </span>
                <span className="text-sm text-gray-600">Due: 1/24/2025</span>
              </div>
            </div>
          </div>
        )}

        {/* Quick Actions Section */}
        <div className="grid grid-cols-4 gap-4 mt-6">
          {isAdmin ? (
            <>
              <button
                onClick={() => navigate("/users")}
                className="group bg-white p-4 rounded-lg shadow-md text-center 
                           hover:bg-[#009966] hover:text-white transition 
                           transform hover:scale-105 cursor-pointer"
              >
                <Users className="w-8 h-8 text-[#009966] mx-auto mb-2 group-hover:text-white" />
                <p className="font-medium">Manage Users</p>
                <p className="text-sm">View all users</p>
              </button>

              <button
                onClick={() => navigate("/books")}
                className="group bg-white p-4 rounded-lg shadow-md text-center 
                           hover:bg-[#009966] hover:text-white transition 
                           transform hover:scale-105 cursor-pointer"
              >
                <BookCheck className="w-8 h-8 text-[#009966] mx-auto mb-2 group-hover:text-white" />
                <p className="font-medium">Manage Books</p>
                <p className="text-sm">Add/edit books</p>
              </button>

              <button
                onClick={() => navigate("/loans")}
                className="group bg-white p-4 rounded-lg shadow-md text-center 
                           hover:bg-[#009966] hover:text-white transition 
                           transform hover:scale-105 cursor-pointer"
              >
                <Library className="w-8 h-8 text-[#009966] mx-auto mb-2 group-hover:text-white" />
                <p className="font-medium">Manage Loans</p>
                <p className="text-sm">Track all loans</p>
              </button>

              <button
                onClick={() => navigate("/reports")}
                className="group bg-white p-4 rounded-lg shadow-md text-center 
                           hover:bg-[#009966] hover:text-white transition 
                           transform hover:scale-105 cursor-pointer"
              >
                <AlertTriangle className="w-8 h-8 text-[#009966] mx-auto mb-2 group-hover:text-white" />
                <p className="font-medium">Reports</p>
                <p className="text-sm">System reports</p>
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate("/borrowbook")}
                className="group bg-white p-4 rounded-lg shadow-md text-center 
                           hover:bg-[#009966] hover:text-white transition 
                           transform hover:scale-105 cursor-pointer"
              >
                <BookOpen className="w-8 h-8 text-[#009966] mx-auto mb-2 group-hover:text-white" />
                <p className="font-medium">Browse Books</p>
                <p className="text-sm">Find your next read</p>
              </button>

              <button
                onClick={() => navigate("/my-books")}
                className="group bg-white p-4 rounded-lg shadow-md text-center 
                           hover:bg-[#009966] hover:text-white transition 
                           transform hover:scale-105 cursor-pointer"
              >
                <Library className="w-8 h-8 text-[#009966] mx-auto mb-2 group-hover:text-white" />
                <p className="font-medium">My Books</p>
                <p className="text-sm">Manage borrowed books</p>
              </button>

              <button
                onClick={() => navigate("/membership-payment")}
                className="group bg-white p-4 rounded-lg shadow-md text-center 
                           hover:bg-[#009966] hover:text-white transition 
                           transform hover:scale-105 cursor-pointer"
              >
                <CreditCard className="w-8 h-8 text-[#009966] mx-auto mb-2 group-hover:text-white" />
                <p className="font-medium">Payment</p>
                <p className="text-sm">Manage membership</p>
              </button>

              <button
                onClick={() => navigate("/profile")}
                className="group bg-white p-4 rounded-lg shadow-md text-center 
                           hover:bg-[#009966] hover:text-white transition 
                           transform hover:scale-105 cursor-pointer"
              >
                <User className="w-8 h-8 text-[#009966] mx-auto mb-2 group-hover:text-white" />
                <p className="font-medium">Profile</p>
                <p className="text-sm">Update your profile</p>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
