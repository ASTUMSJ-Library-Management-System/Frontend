import React, { useEffect, useState } from "react";
import AppLayout from "../components/AppLayout";
import { BookOpen, Library, CreditCard, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import api from "@/lib/api";

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  const studentActions = [
    {
      to: "/browsebooks",
      label: "Browse Books",
      desc: "Find your next read",
      icon: BookOpen,
    },
    {
      to: "/mybooks",
      label: "My Books",
      desc: "Manage borrowed books",
      icon: Library,
    },
    {
      to: "/membershippayment",
      label: "Payment",
      desc: "Manage membership",
      icon: CreditCard,
    },
    {
      to: "/profile",
      label: "Profile",
      desc: "Update your profile",
      icon: User,
    },
  ];

  const adminActions = [
    {
      to: "/admin/managebooks",
      label: "Manage Books",
      desc: "Add, edit, or remove books",
      icon: BookOpen,
    },
    {
      to: "/admin/manageusers",
      label: "Manage Users",
      desc: "View and manage users",
      icon: User,
    },
    {
      to: "/admin/paymentrequests",
      label: "Payment Requests",
      desc: "Approve or reject payments",
      icon: CreditCard,
    },
    {
      to: "/admin/borrowingrecord",
      label: "Borrowing Records",
      desc: "Track borrowed books",
      icon: Library,
    },
  ];

  const [adminStats, setAdminStats] = useState(null);
  const [memberSummary, setMemberSummary] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        if (isAdmin) {
          const res = await api.get("/admin/stats");
          if (isMounted) {
            const data = res.data;
            const uniqueBooks = new Set(
              (data.books ?? [])
                .filter((b) => b.availableCopies > 0)
                .map((b) => b.id)
            ).size;
            const totalAvailableCopies = (data.books ?? []).reduce(
              (sum, b) => sum + (b.availableCopies || 0),
              0
            );
            setAdminStats({
              ...data,
              availableBooks: uniqueBooks,
              availableCopies: totalAvailableCopies,
            });
          }
        } else {
          const res = await api.get("/user/me/summary");
          if (isMounted) {
            const data = res.data;
            const uniqueBooks = new Set(
              (data.books ?? [])
                .filter((b) => b.availableCopies > 0)
                .map((b) => b.id)
            ).size;
            const totalAvailableCopies = (data.books ?? []).reduce(
              (sum, b) => sum + (b.availableCopies || 0),
              0
            );
            setMemberSummary({
              ...data,
              availableBooks: uniqueBooks,
              availableCopies: totalAvailableCopies,
            });
          }
        }
      } catch (e) {
        console.error("Dashboard fetch error", e);
      }
    };
    fetchData();
    return () => {
      isMounted = false;
    };
  }, [isAdmin]);

  const renderPaymentBanner = () => {
    const status = memberSummary?.payment?.status ?? "Unknown";
    if (status === "Pending") {
      return (
        <div className="bg-yellow-100 border-l-4 border-yellow-400 text-yellow-800 p-4 mt-4 rounded-md text-sm md:text-base">
          Your membership payment is{" "}
          <span className="font-semibold">Pending</span>. Please wait for admin
          approval.
        </div>
      );
    }
    if (status === "Rejected") {
      return (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-800 p-4 mt-4 rounded-md text-sm md:text-base">
          Your membership payment was{" "}
          <span className="font-semibold">Rejected</span>. Please contact the
          library or try again.
        </div>
      );
    }
    if (status === "Approved") {
      return (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-800 p-4 mt-4 rounded-md text-sm md:text-base">
          Your membership payment has been{" "}
          <span className="font-semibold">Approved</span>. Enjoy borrowing
          books!
        </div>
      );
    }
    return (
      <div className="bg-gray-100 border-l-4 border-gray-400 text-gray-800 p-4 mt-4 rounded-md text-sm md:text-base">
        Payment status unknown. Please check your account.
      </div>
    );
  };

  return (
    <AppLayout>
      <h1 className="text-2xl md:text-3xl font-bold text-[#009966]">
        {isAdmin ? "Admin Dashboard" : "Student Dashboard"}
      </h1>
      <p className="text-gray-700 mt-2">
        {isAdmin
          ? "Welcome back, Admin! Manage your library system here."
          : "Welcome back, Student! Manage your library activities here."}
      </p>

      {/* Admin Dashboard */}
      {isAdmin ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <div className="bg-white p-5 rounded-xl shadow-md">
            <p className="text-gray-500">Total Users</p>
            <h2 className="text-2xl font-bold text-[#009966]">
              {adminStats?.totalUsers ?? "--"}
            </h2>
          </div>
          <div className="bg-white p-5 rounded-xl shadow-md">
            <p className="text-gray-500">Available Books</p>
            <h2 className="text-2xl font-bold text-[#009966]">
              {adminStats?.availableBooks ?? "--"}
            </h2>
          </div>
          <div className="bg-white p-5 rounded-xl shadow-md">
            <p className="text-gray-500">Available Copies</p>
            <h2 className="text-2xl font-bold text-[#009966]">
              {adminStats?.availableCopies ?? "--"}
            </h2>
          </div>
          <div className="bg-white p-5 rounded-xl shadow-md">
            <p className="text-gray-500">Pending Payments</p>
            <span className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded text-sm font-semibold">
              {adminStats?.pendingPayments ?? "--"} Requests
            </span>
          </div>
        </div>
      ) : (
        // Student Dashboard
        <div>
          {renderPaymentBanner()}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            <div className="bg-white p-5 rounded-xl shadow-md">
              <p className="text-gray-500">Books Borrowed</p>
              <h2 className="text-2xl font-bold text-[#009966]">
                {memberSummary?.booksBorrowed ?? "--"}
              </h2>
            </div>
            <div className="bg-white p-5 rounded-xl shadow-md">
              <p className="text-gray-500">Payment Status</p>
              <span
                className={`px-2 py-1 rounded text-sm font-semibold ${
                  memberSummary?.payment?.status === "Approved"
                    ? "bg-green-200 text-green-800"
                    : memberSummary?.payment?.status === "Rejected"
                    ? "bg-red-200 text-red-800"
                    : "bg-yellow-200 text-yellow-800"
                }`}
              >
                {memberSummary?.payment?.status ?? "Unknown"}
              </span>
            </div>
            <div className="bg-white p-5 rounded-xl shadow-md">
              <p className="text-gray-500">Available Books</p>
              <h2 className="text-2xl font-bold text-[#009966]">
                {memberSummary?.availableBooks ?? "--"}
              </h2>
            </div>
            <div className="bg-white p-5 rounded-xl shadow-md">
              <p className="text-gray-500">Available Copies</p>
              <h2 className="text-2xl font-bold text-[#009966]">
                {memberSummary?.availableCopies ?? "--"}
              </h2>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md mt-6">
            <h2 className="text-lg font-semibold text-[#009966] mb-4">
              Currently Borrowed Books
            </h2>
            {(memberSummary?.currentBorrows?.length ?? 0) === 0 ? (
              <div className="text-gray-600">No active borrowed books.</div>
            ) : (
              memberSummary.currentBorrows.map((b) => (
                <div key={b.id} className="border-b border-gray-200 pb-4 mb-4">
                  <p className="font-medium">
                    {b.book?.title ?? "Unknown Title"}
                  </p>
                  <p className="text-sm text-gray-600">
                    by {b.book?.author ?? "Unknown Author"}
                  </p>
                  <p className="text-xs text-gray-500">
                    Borrowed: {new Date(b.borrowDate).toLocaleDateString()}
                  </p>
                  <div className="flex justify-between mt-2">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        b.status === "Overdue"
                          ? "bg-red-200 text-red-800"
                          : "bg-yellow-200 text-yellow-800"
                      }`}
                    >
                      {b.status}
                    </span>
                    <span className="text-sm text-gray-600">
                      Due: {new Date(b.dueDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
        {(isAdmin ? adminActions : studentActions).map((a) => (
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
