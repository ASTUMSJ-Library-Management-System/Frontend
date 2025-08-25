import React from "react";
import AppLayout from "../components/AppLayout";
import { BookOpen, Library, CreditCard, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const actions = [
    {
      icon: BookOpen,
      label: "Browse Books",
      desc: "Find your next read",
      to: "/browsebooks",
    },
    {
      icon: Library,
      label: "My Books",
      desc: "Manage borrowed books",
      to: "/mybooks",
    },
    {
      icon: CreditCard,
      label: "Payment",
      desc: "Manage membership",
      to: "/membershippayment",
    },
    {
      icon: User,
      label: "Profile",
      desc: "Update your profile",
      to: "/profile",
    },
  ];

  return (
    <AppLayout>
      <h1 className="text-2xl md:text-3xl font-bold text-[#009966]">
        Student Dashboard
      </h1>
      <p className="text-gray-700 mt-2">
        Welcome back, Student User! Manage your library activities here.
      </p>

      {/* Warning */}
      <div className="bg-yellow-100 border-l-4 border-yellow-400 text-yellow-800 p-4 mt-4 rounded-md text-sm md:text-base">
        Your membership payment is{" "}
        <span className="font-semibold">pending</span>. Please wait for admin
        approval.
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        <div className="bg-white p-5 rounded-xl shadow-md">
          <p className="text-gray-500">Books Borrowed</p>
          <h2 className="text-2xl font-bold text-[#009966]">2</h2>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-md">
          <p className="text-gray-500">Payment Status</p>
          <span className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded text-sm font-semibold">
            Pending
          </span>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-md">
          <p className="text-gray-500">Available Books</p>
          <h2 className="text-2xl font-bold text-[#009966]">1,247</h2>
        </div>
      </div>

      {/* Borrowed */}
      <div className="bg-white p-6 rounded-xl shadow-md mt-6">
        <h2 className="text-lg font-semibold text-[#009966] mb-4">
          Currently Borrowed Books
        </h2>

        <div className="border-b border-gray-200 pb-4 mb-4">
          <p className="font-medium">Sahih Al-Bukhari</p>
          <p className="text-sm text-gray-600">by Imam Bukhari</p>
          <p className="text-xs text-gray-500">Borrowed: Nov 15, 2025</p>
          <div className="flex justify-between mt-2">
            <span className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded text-xs font-semibold">
              30 days left
            </span>
            <span className="text-sm text-gray-600">Due: Dec 15, 2025</span>
          </div>
        </div>

        <div>
          <p className="font-medium">Tafsir Ibn Kathir - Vol 1</p>
          <p className="text-sm text-gray-600">by Ibn Kathir</p>
          <p className="text-xs text-gray-500">Borrowed: Nov 10, 2025</p>
          <div className="flex justify-between mt-2">
            <span className="bg-red-200 text-red-800 px-2 py-1 rounded text-xs font-semibold">
              Overdue
            </span>
            <span className="text-sm text-gray-600">Due: Jan 24, 2025</span>
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
        {actions.map((a) => (
          <button
            key={a.to}
            onClick={() => navigate(a.to)}
            className="group bg-white p-5 rounded-xl shadow-md text-center hover:bg-[#009966] hover:text-white transition transform hover:scale-105"
          >
            <a.icon className="w-8 h-8 text-[#009966] mx-auto mb-2 group-hover:text-white" />
            <p className="font-medium">{a.label}</p>
            <p className="text-sm">{a.desc}</p>
          </button>
        ))}
      </div>
    </AppLayout>
  );
}
