import React, { useState } from "react";
import AppLayout from "@/components/AppLayout";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function ManageUsers() {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Temkin Abdulmelik",
      studentId: "UGR/25555/14",
      email: "temkinabd@gmail.com",
      department: "Bio Medical",
      currentBorrowed: 2,
      totalBorrowed: 12,
      status: "Pending",
    },
    {
      id: 2,
      name: "Tursina Yisehak",
      studentId: "UGR/35555/15",
      email: "tu@gmail.com",
      department: "Bio Medical",
      currentBorrowed: 2,
      totalBorrowed: 12,
      status: "Approved",
    },
    {
      id: 3,
      name: "Lina Temam",
      studentId: "UGR/45555/14",
      email: "linat@gmail.com",
      department: "Computer Science",
      currentBorrowed: 1,
      totalBorrowed: 6,
      status: "Rejected",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("All Departments");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [selectedUser, setSelectedUser] = useState(null);

  const handleApprove = (id) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, status: "Approved" } : u))
    );
  };
  const handleReject = (id) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, status: "Rejected" } : u))
    );
  };
  const handleDelete = (id) =>
    setUsers((prev) => prev.filter((u) => u.id !== id));

  const filteredUsers = users.filter((u) => {
    const q = searchTerm.toLowerCase();
    const matchesSearch =
      u.name.toLowerCase().includes(q) ||
      u.studentId.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q);
    const matchesDept =
      departmentFilter === "All Departments" ||
      u.department === departmentFilter;
    const matchesStatus =
      statusFilter === "All Status" || u.status === statusFilter;
    return matchesSearch && matchesDept && matchesStatus;
  });

  const statusColors = {
    Approved: "bg-green-100 text-green-700",
    Pending: "bg-yellow-100 text-yellow-700",
    Rejected: "bg-red-100 text-red-700",
  };

  return (
    <AppLayout>
      <div className="min-h-screen bg-gradient-to-b from-[#F6FFFB] to-[#E9FBF4]">
        <div className="p-6 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">
            <h1 className="text-[28px] font-bold text-[#006045]">
              Manage Users
            </h1>
            <div className="flex gap-2 flex-wrap">
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#33FF994D] text-[#189966]">
                Total: {users.length}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#3374FF4D] text-[#435CFF]">
                Approved: {users.filter((u) => u.status === "Approved").length}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#FF333E4D] text-[#FF4347]">
                Rejected: {users.filter((u) => u.status === "Rejected").length}
              </span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-3 mb-6 bg-white/90 backdrop-blur-sm rounded-2xl border border-[#D9F3EA] p-4">
            <input
              type="text"
              placeholder="Search by name, email, or student ID"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 border border-[#A4F4CF] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#009966]"
            />
            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="border border-[#A4F4CF] rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#009966]"
            >
              <option>All Departments</option>
              <option>Bio Medical</option>
              <option>Computer Science</option>
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-[#A4F4CF] rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#009966]"
            >
              <option>All Status</option>
              <option>Approved</option>
              <option>Pending</option>
              <option>Rejected</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUsers.map((user, i) => (
              <Motion.div
                key={user.id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.25, delay: i * 0.04 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative bg-white rounded-2xl shadow-md hover:shadow-xl p-5 border border-[#E7F7F0] ring-1 ring-transparent hover:ring-[#A4F4CF] transition"
              >
                <span
                  className={`absolute top-3 right-3 px-2 py-1 rounded-md text-xs font-medium ${
                    statusColors[user.status]
                  }`}
                >
                  {user.status}
                </span>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#00A16B] flex items-center justify-center text-white font-bold">
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <h2 className="font-semibold text-lg text-[#082]">
                      {user.name}
                    </h2>
                    <p className="text-sm text-gray-500">{user.studentId}</p>
                  </div>
                </div>
                <div className="mt-3 text-sm text-gray-700 space-y-1.5">
                  <p>
                    <span className="font-medium text-[#006045]">Email:</span>{" "}
                    {user.email}
                  </p>
                  <p>
                    <span className="font-medium text-[#006045]">
                      Department:
                    </span>{" "}
                    {user.department}
                  </p>
                  <p>
                    <span className="font-medium text-[#006045]">
                      Currently Borrowed:
                    </span>{" "}
                    {user.currentBorrowed} books
                  </p>
                  <p>
                    <span className="font-medium text-[#006045]">
                      Total Borrowed:
                    </span>{" "}
                    {user.totalBorrowed} books
                  </p>
                </div>
                <div className="flex gap-2 flex-wrap mt-4">
                  <button
                    onClick={() => setSelectedUser(user)}
                    className="flex-1 bg-emerald-50 text-emerald-700 px-3 py-2 rounded-lg hover:bg-emerald-100 transition"
                  >
                    Details
                  </button>
                  {user.status === "Pending" && (
                    <>
                      <button
                        onClick={() => handleApprove(user.id)}
                        className="flex-1 bg-emerald-600 text-white px-3 py-2 rounded-lg hover:bg-emerald-700 transition"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(user.id)}
                        className="flex-1 bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition"
                      >
                        Reject
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="w-full bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 transition"
                  >
                    Delete Student
                  </button>
                </div>
              </Motion.div>
            ))}
          </div>

          <AnimatePresence>
            {selectedUser && (
              <Motion.div
                className="fixed inset-0 z-[200] flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div
                  onClick={() => setSelectedUser(null)}
                  className="absolute inset-0 bg-black/30 backdrop-blur-md"
                  style={{
                    backdropFilter: "blur(6px)",
                    WebkitBackdropFilter: "blur(6px)",
                  }}
                />
                <Motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.96, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  className="relative w-[92%] max-w-md bg-white rounded-2xl shadow-2xl border border-[#E7F7F0] p-6"
                >
                  <button
                    onClick={() => setSelectedUser(null)}
                    aria-label="Close details"
                    className="absolute right-3 top-3 rounded-md p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                  >
                    <X size={18} />
                  </button>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-full bg-[#00A16B] flex items-center justify-center text-white font-bold">
                      {selectedUser.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-[#006045]">
                        {selectedUser.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {selectedUser.studentId}
                      </p>
                    </div>
                  </div>
                  <div className="text-sm text-gray-700 space-y-2">
                    <p>
                      <span className="font-medium text-[#006045]">Email:</span>{" "}
                      {selectedUser.email}
                    </p>
                    <p>
                      <span className="font-medium text-[#006045]">
                        Department:
                      </span>{" "}
                      {selectedUser.department}
                    </p>
                    <p>
                      <span className="font-medium text-[#006045]">
                        Currently Borrowed:
                      </span>{" "}
                      {selectedUser.currentBorrowed} books
                    </p>
                    <p>
                      <span className="font-medium text-[#006045]">
                        Total Borrowed:
                      </span>{" "}
                      {selectedUser.totalBorrowed} books
                    </p>
                    <p>
                      <span className="font-medium text-[#006045]">
                        Status:
                      </span>{" "}
                      {selectedUser.status}
                    </p>
                  </div>
                  <div className="flex justify-end mt-6">
                    <button
                      onClick={() => setSelectedUser(null)}
                      className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
                    >
                      Close
                    </button>
                  </div>
                </Motion.div>
              </Motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </AppLayout>
  );
}
