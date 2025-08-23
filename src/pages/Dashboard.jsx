import React from "react";
import Sidebar from "../components/Side-bar";
import { BookOpen, Library, CreditCard, User } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 min-h-screen bg-[#71df7139] p-6">
        <h1 className="text-2xl font-bold text-[#009966]">Student Dashboard</h1>
        <p className="text-gray-700 mt-2">
          Welcome back, Student User! Manage your library activities here.
        </p>

        <div className="bg-yellow-100 border-l-4 border-yellow-400 text-yellow-700 p-4 mt-4 rounded-md">
          Your membership payment is{" "}
          <span className="font-semibold">pending</span>. Please wait for admin
          approval.
        </div>

        <div className="grid grid-cols-3 gap-4 mt-6">
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
        </div>

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

        <div className="grid grid-cols-4 gap-4 mt-6">
          <div className="bg-white p-4 rounded-lg shadow-md text-center hover:bg-[#F3FFF9] transition">
            <BookOpen className="w-8 h-8 text-[#009966] mx-auto mb-2" />
            <p className="font-medium text-[#009966]">Browse Books</p>
            <p className="text-sm text-gray-600">Find your next read</p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md text-center hover:bg-[#F3FFF9] transition">
            <Library className="w-8 h-8 text-[#009966] mx-auto mb-2" />
            <p className="font-medium text-[#009966]">My Books</p>
            <p className="text-sm text-gray-600">Manage borrowed books</p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md text-center hover:bg-[#F3FFF9] transition">
            <CreditCard className="w-8 h-8 text-[#009966] mx-auto mb-2" />
            <p className="font-medium text-[#009966]">Payment</p>
            <p className="text-sm text-gray-600">Manage membership</p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md text-center hover:bg-[#F3FFF9] transition">
            <User className="w-8 h-8 text-[#009966] mx-auto mb-2" />
            <p className="font-medium text-[#009966]">Profile</p>
            <p className="text-sm text-gray-600">Update your profile</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
