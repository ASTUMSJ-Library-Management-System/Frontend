import React, { useState, useEffect, useMemo } from "react";
import AppLayout from "@/components/AppLayout";
import Pagination from "@/components/Pagination";
import { borrowAPI } from "../lib/api";
import { Toaster, toast } from "sonner";
import { motion as Motion, AnimatePresence } from "framer-motion";

export default function BorrowingRecords() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [selectedRecord, setSelectedRecord] = useState(null);

  useEffect(() => {
    fetchBorrowRecords();
  }, []);

  const fetchBorrowRecords = async () => {
    try {
      setLoading(true);
      const borrowData = await borrowAPI.getBorrows();
      setRecords(borrowData);
    } catch (error) {
      toast.error(error.message || " Failed to fetch records.");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (recordId) => {
    try {
      await borrowAPI.approveReturn(recordId);
      await fetchBorrowRecords();
      toast.success(" Return approved.");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDecline = async (recordId) => {
    try {
      await borrowAPI.declineReturn(recordId);
      await fetchBorrowRecords();
      toast.warning(" Return request declined.");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleMarkAsReturned = async (recordId, recordStatus) => {
    try {
      if (recordStatus === "Active") {
        toast.info("No return request from student.");
        return;
      }

      await borrowAPI.markAsReturned(recordId);
      await fetchBorrowRecords();
      toast.success("📦 Book marked as returned.");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const statusColors = {
    Active: "bg-blue-100 text-blue-600",
    Pending: "bg-yellow-100 text-yellow-600",
    Returned: "bg-green-100 text-green-600",
    Overdue: "bg-red-100 text-red-600",
  };

  const filteredRecords = useMemo(() => {
    return records.filter((rec) => {
      const searchMatch =
        rec.userId?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rec.bookId?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rec.userId?.studentId
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        rec.bookId?.author?.toLowerCase().includes(searchTerm.toLowerCase());

      const statusMatch =
        statusFilter === "All Status" || rec.status === statusFilter;

      return searchMatch && statusMatch;
    });
  }, [records, searchTerm, statusFilter]);

  const RecordModal = ({ record, onClose }) => {
    if (!record) return null;

    return (
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
        <Motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="bg-white p-6 rounded-2xl shadow-xl max-w-md w-full"
        >
          <div className="flex justify-between items-center mb-4 border-b pb-2">
            <h2 className="text-xl font-bold text-[#006045]">Record Details</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-xl"
            >
              ✕
            </button>
          </div>

          <div className="flex gap-4 items-center bg-[#F9FFFB] p-3 rounded-lg shadow-sm">
            <div className="w-16 h-20 bg-gray-200 flex items-center justify-center text-gray-500 rounded-md text-sm">
              No Cover
            </div>
            <div>
              <p className="font-semibold text-[#016549] text-lg">
                {record.bookId?.title || "Unknown Book"}
              </p>
              <p className="text-sm text-[#009966]">
                by {record.bookId?.author || "Unknown Author"}
              </p>
            </div>
          </div>

          <div className="bg-[#F3FCF8] p-3 rounded-lg shadow-sm mt-3">
            <p>
              <span className="font-semibold">👤 Student:</span>{" "}
              {record.userId?.name || "Unknown User"}
            </p>
            <p>
              <span className="font-semibold">🎓 ID:</span>{" "}
              {record.userId?.studentId || "No ID"}
            </p>
          </div>

          <div className="bg-[#FFFDF5] p-3 rounded-lg space-y-1 mt-3">
            <p>
              <span className="font-semibold"> Borrowed:</span>{" "}
              {new Date(record.borrowDate).toLocaleDateString()}
            </p>
            <p>
              <span className="font-semibold"> Due:</span>{" "}
              {new Date(record.dueDate).toLocaleDateString()}
            </p>
            {record.status === "Returned" && (
              <p>
                <span className="font-semibold"> Returned:</span>{" "}
                {new Date(record.updatedAt).toLocaleDateString()}
              </p>
            )}
            <p>
              <span className="font-semibold"> Status:</span>{" "}
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  statusColors[record.status] || "bg-gray-100 text-gray-800"
                }`}
              >
                {record.status}
              </span>
            </p>
          </div>

          <div className="mt-6 flex gap-3 justify-end">
            {record.status === "Pending" && (
              <>
                <button
                  onClick={() => handleApprove(record._id)}
                  className="px-4 py-2 bg-[#00CA7A] text-white rounded-lg hover:bg-green-600"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleDecline(record._id)}
                  className="px-4 py-2 bg-[#FF6B6B] text-white rounded-lg hover:bg-red-600"
                >
                  Decline
                </button>
              </>
            )}

            {(record.status === "Active" || record.status === "Overdue") && (
              <button
                onClick={() => handleMarkAsReturned(record._id, record.status)}
                className="px-4 py-2 bg-[#009966] text-white rounded-lg hover:bg-[#006045]"
              >
                Mark as Returned
              </button>
            )}

            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            >
              Close
            </button>
          </div>
        </Motion.div>
      </div>
    );
  };

  if (loading) {
    return (
      <AppLayout>
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-[#006045] font-medium">
            Loading borrowing records...
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="p-6 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-[32px] text-[#006045] font-bold">
            Borrowing Records
          </h1>
          <div className="flex gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#33FF994D] text-[#189966]">
              Total: {records.length}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#3374FF4D] text-[#435CFF]">
              Active: {records.filter((r) => r.status === "Active").length}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#FF333E4D] text-[#FF4347]">
              Overdue: {records.filter((r) => r.status === "Overdue").length}
            </span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-3 mb-6 bg-white p-4 rounded-lg border border-[#A4F4CF]">
          <input
            type="text"
            placeholder="Search by student, book, or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-4 pr-4 py-2 border border-[#A4F4CF] rounded-lg focus:ring-2 focus:ring-[#009966] focus:outline-none"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-[#A4F4CF] px-4 rounded-lg py-2 focus:ring-2 focus:ring-[#009966] cursor-pointer"
          >
            <option>All Status</option>
            <option>Active</option>
            <option>Pending</option>
            <option>Returned</option>
            <option>Overdue</option>
          </select>
        </div>

        <AnimatePresence>
          {filteredRecords.length > 0 ? (
            filteredRecords.map((rec) => (
              <Motion.div
                key={rec._id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4"
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-[#C9FAE3] text-[#189966] flex items-center justify-center font-semibold">
                      {rec.userId?.name
                        ?.split(" ")
                        .map((n) => n[0])
                        .join("") || "U"}
                    </div>
                    <div>
                      <p className="font-semibold text-[#189966]">
                        {rec.userId?.name || "Unknown User"}
                      </p>
                      <p className="text-sm text-[#189966]">
                        {rec.userId?.studentId || "No ID"}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      statusColors[rec.status] || "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {rec.status}
                  </span>
                </div>

                <div className="mt-4">
                  <p className="font-medium text-[#016549]">
                    {rec.bookId?.title || "Unknown Book"}
                  </p>
                  <p className="text-sm text-[#009966]">
                    by {rec.bookId?.author || "Unknown Author"}
                  </p>
                </div>

                <div className="grid grid-cols-3 text-sm text-[#000000B2] mt-2">
                  <p>
                    Borrowed: {new Date(rec.borrowDate).toLocaleDateString()}
                  </p>
                  <p>Due: {new Date(rec.dueDate).toLocaleDateString()}</p>
                  {rec.status === "Returned" && (
                    <p>
                      Returned: {new Date(rec.updatedAt).toLocaleDateString()}
                    </p>
                  )}
                </div>

                <div className="flex justify-between mt-4 gap-4">
                  <button
                    onClick={() => setSelectedRecord(rec)}
                    className="px-4 py-2 w-full bg-[#D0FAE5] hover:bg-[#009966] hover:text-white text-[#009966] font-semibold rounded-md"
                  >
                    Details
                  </button>
                </div>
              </Motion.div>
            ))
          ) : (
            <p className="text-center mt-20 font-bold text-[#006045]">
              No records found.
            </p>
          )}
        </AnimatePresence>

        <Pagination totalPages={6} />
      </div>

      <AnimatePresence>
        {selectedRecord && (
          <RecordModal
            record={selectedRecord}
            onClose={() => setSelectedRecord(null)}
          />
        )}
      </AnimatePresence>

      <Toaster position="top-right" richColors />
    </AppLayout>
  );
}
