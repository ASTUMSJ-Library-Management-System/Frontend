import React, { useEffect, useState, useMemo } from "react";
import AppLayout from "@/components/AppLayout";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import api from "@/lib/api";
import { toast } from "sonner";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("All Departments");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [selectedUser, setSelectedUser] = useState(null);

  // Load users
  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      try {
        setLoading(true);
        const res = await api.get("/admin/users");
        if (!isMounted) return;

        const mapped = res.data.map((u) => ({
          id: u._id,
          name: u.name,
          studentId: u.studentId,
          email: u.email,
          department: u.department,
          currentBorrowed: u.currentBorrowed ?? 0,
          totalBorrowed: u.totalBorrowed ?? 0,
          status: u.status ?? "Pending",
          role: u.role,
          idPhotoUrl: u.idPhotoUrl || null,
        }));

        setUsers(mapped);
      } catch (e) {
        console.error("Failed to load users", e);
        toast.error(e.message || "Failed to load users");
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    load();
    return () => {
      isMounted = false;
    };
  }, []);

  // --- API Updates ---
  const updateUserStatus = async (id, status) => {
    try {
      await api.patch(`/admin/users/${id}/status`, { status });
      setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, status } : u)));
      toast.success(`User marked as ${status}`);
    } catch (e) {
      console.error("Failed to update status", e);
      toast.error(e.message || "Failed to update status");
    }
  };

  const deleteUser = async (id) => {
    try {
      await api.delete(`/admin/users/${id}`);
      setUsers((prev) => prev.filter((u) => u.id !== id));
      toast.success("User deleted successfully");
    } catch (e) {
      console.error("Failed to delete user", e);
      toast.error(e.message || "Failed to delete user");
    }
  };

  // --- Filters ---
  const departmentOptions = useMemo(() => {
    const depts = Array.from(new Set(users.map((u) => u.department))).filter(
      Boolean
    );
    return ["All Departments", ...depts];
  }, [users]);

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

          {loading && <div className="text-gray-600">Loading users...</div>}

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
              {departmentOptions.map((dept) => (
                <option key={dept}>{dept}</option>
              ))}
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
                  {user.idPhotoUrl ? (
                    <img
                      src={user.idPhotoUrl}
                      alt="ID"
                      className="w-12 h-12 rounded-full object-cover border"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-[#00A16B] flex items-center justify-center text-white font-bold">
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                  )}
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
                    <span className="font-medium text-[#006045]">Role:</span>{" "}
                    {user.role}
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
                        onClick={() => updateUserStatus(user.id, "Approved")}
                        className="flex-1 bg-emerald-600 text-white px-3 py-2 rounded-lg hover:bg-emerald-700 transition"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => updateUserStatus(user.id, "Rejected")}
                        className="flex-1 bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition"
                      >
                        Reject
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => deleteUser(user.id)}
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
                    className="absolute right-3 top-3 rounded-md p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                  >
                    <X size={18} />
                  </button>

                  {selectedUser.idPhotoUrl && (
                    <div className="mb-4 flex justify-center">
                      <img
                        src={selectedUser.idPhotoUrl}
                        alt="ID Photo"
                        className="w-32 h-32 object-cover rounded-xl border"
                      />
                    </div>
                  )}

                  <div className="text-center mb-4">
                    <h3 className="text-lg font-semibold text-[#006045]">
                      {selectedUser.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {selectedUser.studentId}
                    </p>
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
                      <span className="font-medium text-[#006045]">Role:</span>{" "}
                      {selectedUser.role}
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
