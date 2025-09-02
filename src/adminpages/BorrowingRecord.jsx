import React, { useState, useEffect } from "react";
import AppLayout from "@/components/AppLayout";
import Pagination from "@/components/Pagination";
import { borrowAPI } from "../lib/api";
import { Toaster, toast } from "sonner";

export default function BorrowingRecords() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [isModalOpen, setIsModalOpen] = useState(false);
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
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const statusColors = {
    Active: "bg-blue-100 text-blue-600",
    Pending: "bg-yellow-100 text-yellow-600",
    Returned: "bg-green-100 text-green-600",
    Overdue: "bg-red-100 text-red-600",
  };

  const handleDetailsClick = (record) => {
    setSelectedRecord(record);
    setIsModalOpen(true);
  };

  const handleApprove = async (recordId) => {
    try {
      await borrowAPI.approveReturn(recordId);
      await fetchBorrowRecords();
      toast.success("Return approved.");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDecline = async (recordId) => {
    try {
      await borrowAPI.declineReturn(recordId);
      await fetchBorrowRecords();
      toast.success("Return request declined.");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRecord(null);
  };

  const filteredRecords = records.filter((rec) => {
    const searchMatch =
      rec.userId?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.bookId?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.userId?.studentId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.bookId?.author?.toLowerCase().includes(searchTerm.toLowerCase());

    const statusMatch =
      statusFilter === "All Status" || rec.status === statusFilter;

    return searchMatch && statusMatch;
  });

  const getBookDetails = (bookId) => {
    return records.find((record) => record.bookId?._id === bookId)?.bookId;
  };

  const Modal = ({ record, onClose }) => {
    if (!record) return null;

    const bookDetails = getBookDetails(record.bookId?._id);

    return (
      <div className="fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center z-50 transition-opacity duration-300 ease-in-out opacity-100">
        <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full transform transition-transform duration-300 ease-in-out scale-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-[#006045]">Record Details</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
          <div className="space-y-2">
            <p>
              <span className="font-semibold">Student:</span> {record.userId?.name || "Unknown User"}
            </p>
            <p>
              <span className="font-semibold">Student ID:</span>{" "}
              {record.userId?.studentId || "No ID"}
            </p>
            <p>
              <span className="font-semibold">Book:</span> {record.bookId?.title || "Unknown Book"}
            </p>
            <p>
              <span className="font-semibold">Author:</span> {record.bookId?.author || "Unknown Author"}
            </p>
            {bookDetails && (
              <>
                <p>
                  <span className="font-semibold">Year:</span>{" "}
                  {bookDetails.year}
                </p>
                <p>
                  <span className="font-semibold">ISBN:</span>{" "}
                  {bookDetails.isbn}
                </p>
                <p>
                  <span className="font-semibold">Language:</span>{" "}
                  {bookDetails.language}
                </p>
                <p>
                  <span className="font-semibold">Category:</span>{" "}
                  {bookDetails.category}
                </p>
                <p>
                  <span className="font-semibold">Description:</span>{" "}
                  {bookDetails.description}
                </p>
              </>
            )}
            <p>
              <span className="font-semibold">Borrowed Date:</span>{" "}
              {new Date(record.borrowDate).toLocaleDateString()}
            </p>
            <p>
              <span className="font-semibold">Due Date:</span> {new Date(record.dueDate).toLocaleDateString()}
            </p>
            {record.status === "Returned" && (
              <p>
                <span className="font-semibold">Returned Date:</span>{" "}
                {new Date(record.updatedAt).toLocaleDateString()}
              </p>
            )}
            <p>
              <span className="font-semibold">Status:</span>{" "}
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  statusColors[record.status] || "bg-gray-100 text-gray-800"
                }`}
              >
                {record.status}
              </span>
            </p>
          </div>
          <div className="mt-4 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-[#009966] text-white rounded-md hover:bg-[#006045]"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <AppLayout>
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Loading borrowing records...</div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="p-6 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-[35px] text-[#006045] font-bold">
            Borrowing Records
          </h1>
          <div className="flex gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#33FF994D] text-[#189966]">
              Total: {records.length}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#3374FF4D] text-[#435CFF]">
              Borrowed: {records.filter((r) => r.status === "Active").length}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#FF333E4D] text-[#FF4347]">
              Overdue: {records.filter((r) => r.status === "Overdue").length}
            </span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-3 mb-6 bg-white p-4 pt-5 rounded-lg border border-[#A4F4CF]">
          <div className="relative w-full md:flex-1">
            <input
              type="text"
              placeholder="Search by student name, book, author, or student ID"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-4 pr-4 py-[1px] border border-[#A4F4CF] rounded-lg focus:ring-2 focus:ring-[#009966] focus:outline-none"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-[#A4F4CF] px-4 rounded-lg py-[1px]
              focus:ring-2 focus:ring-[#009966] focus:border-[#009966]
              hover:border-[#009966] cursor-pointer outline-none"
          >
            <option>All Status</option>
            <option>Active</option>
            <option>Pending</option>
            <option>Returned</option>
            <option>Overdue</option>
          </select>
        </div>

        <div className="space-y-4">
          {filteredRecords.length > 0 ? (
            filteredRecords.map((rec) => (
              <div
                key={rec._id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-4"
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
                      <p className="font-semibold text-[#189966]">{rec.userId?.name || "Unknown User"}</p>
                      <p className="text-sm text-[#189966]">{rec.userId?.studentId || "No ID"}</p>
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

                <div className="mt-6">
                  <p className="font-medium text-[#016549]">{rec.bookId?.title || "Unknown Book"}</p>
                  <p className="text-sm text-[#009966]">by {rec.bookId?.author || "Unknown Author"}</p>
                </div>

                <div className="grid grid-cols-3 text-sm text-[#000000B2] mt-2">
                  <p>Borrowed: {new Date(rec.borrowDate).toLocaleDateString()}</p>
                  <p>Due: {new Date(rec.dueDate).toLocaleDateString()}</p>
                  {rec.status === "Returned" && <p>Returned: {new Date(rec.updatedAt).toLocaleDateString()}</p>}
                </div>

                <div className="flex justify-between mt-4 gap-4">
                  <button
                    onClick={() => handleDetailsClick(rec)}
                    className="px-4 w-[90%] py-2 bg-[#D0FAE5] hover:bg-[#009966] hover:text-white text-[#009966] font-semibold rounded-md"
                  >
                    Details
                  </button>
                  {rec.status === "Pending" ? (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleApprove(rec._id)}
                        className="px-4 py-2 bg-[#00CA7A] text-white rounded-md hover:bg-green-600"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleDecline(rec._id)}
                        className="px-4 py-2 bg-[#FF6B6B] text-white rounded-md hover:bg-red-600"
                      >
                        Decline
                      </button>
                    </div>
                  ) : (
                    rec.status !== "Returned" && (
                      <span className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md">No pending action</span>
                    )
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-center mt-20 font-bold text-[#006045]">
              No records found.
            </p>
          )}
        </div>
        <Pagination totalPages={6} />
      </div>
      {isModalOpen && <Modal record={selectedRecord} onClose={closeModal} />}
      <Toaster position="bottom-center" richColors />
    </AppLayout>
  );
}
