import React, { useEffect, useState } from "react";
import AppLayout from "../components/AppLayout";
import { BookOpen, Library, CreditCard, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import api from "@/lib/api";

// Reusable Components
const StatCard = ({ title, value, color = "green", extra }) => {
  const bgColor = {
    green: "bg-green-100 text-green-800",
    red: "bg-red-100 text-red-800",
    yellow: "bg-yellow-100 text-yellow-800",
    gray: "bg-gray-100 text-gray-800",
  }[color];

  return (
    <div className="bg-white p-5 rounded-xl shadow-md">
      <p className="text-gray-500">{title}</p>
      <h2 className="text-2xl font-bold text-[#009966]">{value ?? "--"}</h2>
      {extra && (
        <div className={`${bgColor} px-2 py-1 rounded text-sm font-semibold`}>
          {extra}
        </div>
      )}
    </div>
  );
};

const ActionCard = ({ icon: Icon, label, desc, onClick }) => (
  <button
    onClick={onClick}
    className="group bg-white p-5 rounded-xl shadow-md text-center hover:bg-[#009966] hover:text-white transition transform hover:scale-105"
  >
    <Icon className="w-8 h-8 text-[#009966] mx-auto mb-2 group-hover:text-white" />
    <p className="font-medium">{label}</p>
    <p className="text-sm">{desc}</p>
  </button>
);

const BorrowedBookCard = ({ book }) => (
  <div className="border-b border-gray-200 pb-4 mb-4">
    <p className="font-medium">{book.book?.title ?? "Unknown Title"}</p>
    <p className="text-sm text-gray-600">
      by {book.book?.author ?? "Unknown Author"}
    </p>
    <p className="text-xs text-gray-500">
      Borrowed: {new Date(book.borrowDate).toLocaleDateString()}
    </p>
    <div className="flex justify-between mt-2">
      <span
        className={`px-2 py-1 rounded text-xs font-semibold ${
          book.status === "Overdue"
            ? "bg-red-200 text-red-800"
            : "bg-yellow-200 text-yellow-800"
        }`}
      >
        {book.status}
      </span>
      <span className="text-sm text-gray-600">
        Due: {new Date(book.dueDate).toLocaleDateString()}
      </span>
    </div>
  </div>
);

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        setLoading(true);
        if (isAdmin) {
          const res = await api.get("/admin/stats");
          if (isMounted) {
            const data = res.data;
            setAdminStats({
              totalUsers: data.totalUsers,
              totalBooks: data.totalBooks,
              availableBooks: data.availableBooks, // Number of unique books with available copies
              availableCopies: data.availableCopies, // Total number of available copies
              pendingPayments: data.pendingPayments,
              activeBorrows: data.activeBorrows,
              overdueBorrows: data.overdueBorrows,
            });
          }
        } else {
          const res = await api.get("/user/me/summary");
          if (isMounted) {
            const data = res.data;
            setMemberSummary({
              booksBorrowed: data.booksBorrowed,
              availableBooks: data.availableBooks, // Number of unique books with available copies
              availableCopies: data.availableCopies, // Total number of available copies
              payment: data.payment,
              currentBorrows: data.currentBorrows,
            });
          }
        }
      } catch (e) {
        console.error("Dashboard fetch error", e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    return () => {
      isMounted = false;
    };
  }, [isAdmin]);

  const renderPaymentBanner = () => {
    const status = memberSummary?.payment?.status ?? "Unknown";
    const statusColors = {
      Approved: "bg-green-100 border-green-500 text-green-800",
      Pending: "bg-yellow-100 border-yellow-400 text-yellow-800",
      Rejected: "bg-red-100 border-red-500 text-red-800",
      Unknown: "bg-gray-100 border-gray-400 text-gray-800",
    };
    const className = statusColors[status] || statusColors.Unknown;

    return (
      <div
        className={`${className} border-l-4 p-4 mt-4 rounded-md text-sm md:text-base`}
      >
        Your membership payment is{" "}
        <span className="font-semibold">{status}</span>.
        {status === "Pending" && " Please wait for admin approval."}
        {status === "Rejected" && " Please contact the library or try again."}
        {status === "Approved" && " Enjoy borrowing books!"}
      </div>
    );
  };

  if (loading) {
    return (
      <AppLayout>
        <div className="flex justify-center items-center h-64 text-lg text-gray-500">
          Loading dashboard...
        </div>
      </AppLayout>
    );
  }

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

      {/* Stats */}
      {isAdmin ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            <StatCard title="Total Users" value={adminStats?.totalUsers} />
            <StatCard
              title="Total Books"
              value={adminStats?.totalBooks}
            />
            <StatCard
              title="Available Books"
              value={adminStats?.availableBooks}
            />
            <StatCard
              title="Available Copies"
              value={adminStats?.availableCopies}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          <StatCard
            title="Pending Payments"
            value={adminStats?.pendingPayments}
            color="yellow"
          />
          <StatCard
            title="Active Borrows"
            value={adminStats?.activeBorrows}
            color="green"
          />
          <StatCard
            title="Overdue Books"
            value={adminStats?.overdueBorrows}
            color="red"
          />
        </div>
        </>
      ) : (
        <div>
          {renderPaymentBanner()}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            <StatCard
              title="Books Borrowed"
              value={memberSummary?.booksBorrowed}
            />
            <StatCard
              title="Payment Status"
              value={memberSummary?.payment?.status ?? "Unknown"}
              color={
                memberSummary?.payment?.status === "Approved"
                  ? "green"
                  : memberSummary?.payment?.status === "Rejected"
                  ? "red"
                  : "yellow"
              }
            />
            <StatCard
              title="Available Books"
              value={memberSummary?.availableBooks}
            />
            <StatCard
              title="Available Copies"
              value={memberSummary?.availableCopies}
            />
          </div>

          {/* Borrowed Books */}
          <div className="bg-white p-6 rounded-xl shadow-md mt-6">
            <h2 className="text-lg font-semibold text-[#009966] mb-4">
              Currently Borrowed Books
            </h2>
            {(memberSummary?.currentBorrows?.length ?? 0) === 0 ? (
              <div className="text-gray-600">No active borrowed books.</div>
            ) : (
              memberSummary.currentBorrows.map((b) => (
                <BorrowedBookCard key={b.id} book={b} />
              ))
            )}
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
        {(isAdmin ? adminActions : studentActions).map((a) => (
          <ActionCard
            key={a.to}
            icon={a.icon}
            label={a.label}
            desc={a.desc}
            onClick={() => navigate(a.to)}
          />
        ))}
      </div>
    </AppLayout>
  );
}
