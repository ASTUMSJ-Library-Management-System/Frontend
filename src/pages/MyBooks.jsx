import React, { useEffect, useMemo, useState } from "react";
import AppLayout from "../components/AppLayout";
import { X, Eye, Search, CheckCircle2 } from "lucide-react";
import { motion as Motion, AnimatePresence } from "framer-motion";

export default function MyBooks() {
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("borrowedBooks")) || [];
    setBorrowedBooks(stored);
  }, []);

  const handleReturn = (id) => {
    const updated = borrowedBooks.filter((b) => b.id !== id);
    setBorrowedBooks(updated);
    localStorage.setItem("borrowedBooks", JSON.stringify(updated));

    setToast("Book returned successfully!");
    setTimeout(() => setToast(null), 3000);
  };

  const counts = useMemo(() => {
    const toLower = (s) => (s ? String(s).toLowerCase() : "");
    return {
      total: borrowedBooks.length,
      borrowed: borrowedBooks.filter((b) => toLower(b.status) === "borrowed")
        .length,
      pending: borrowedBooks.filter((b) => toLower(b.status) === "pending")
        .length,
      overdue: borrowedBooks.filter((b) => toLower(b.status) === "overdue")
        .length,
    };
  }, [borrowedBooks]);

  const getBadge = (label, count, colorClasses, setsTo) => (
    <button
      key={label}
      onClick={() => setStatusFilter(setsTo)}
      className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${colorClasses} transition
        ${
          statusFilter === setsTo
            ? "ring-2 ring-offset-1 ring-[#009966]"
            : "hover:opacity-90"
        }`}
      type="button"
    >
      {label}
      <span className="ml-1 opacity-70">({count})</span>
    </button>
  );

  const statusPillClasses = (status) => {
    const s = String(status || "").toLowerCase();
    if (s === "borrowed")
      return "bg-green-100 text-green-800 border border-green-200";
    if (s === "pending")
      return "bg-yellow-100 text-yellow-800 border border-yellow-200";
    if (s === "overdue") return "bg-red-100 text-red-800 border border-red-200";
    return "bg-gray-100 text-gray-700 border border-gray-200";
  };

  const filteredBooks = borrowedBooks.filter((b) => {
    const q = searchTerm.trim().toLowerCase();
    const matchSearch =
      !q ||
      [b.title, b.author, b.studentName, b.studentId]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(q));
    const matchStatus =
      statusFilter === "All"
        ? true
        : String(b.status).toLowerCase() === statusFilter.toLowerCase();
    return matchSearch && matchStatus;
  });

  return (
    <AppLayout>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-5">
        <h1 className="text-3xl font-bold text-[#009966]">Borrowed Books</h1>
        <div className="flex flex-wrap items-center gap-2">
          {getBadge("Total", counts.total, "bg-teal-100 text-teal-800", "All")}
          {getBadge(
            "Borrowed",
            counts.borrowed,
            "bg-green-100 text-green-800",
            "Borrowed"
          )}
          {getBadge(
            "Pending",
            counts.pending,
            "bg-yellow-100 text-yellow-800",
            "Pending"
          )}
          {getBadge(
            "Overdue",
            counts.overdue,
            "bg-red-100 text-red-800",
            "Overdue"
          )}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div className="relative w-full sm:max-w-xl">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by student name, book, title, or student ID"
            className="w-full h-11 pl-9 pr-3 rounded-xl border bg-white shadow-sm
                       focus:outline-none focus:ring-2 focus:ring-[#009966]"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-full sm:w-48 h-11 px-3 rounded-xl border bg-white shadow-sm
                     focus:outline-none focus:ring-2 focus:ring-[#009966]"
        >
          <option>All</option>
          <option>Borrowed</option>
          <option>Pending</option>
          <option>Overdue</option>
        </select>
      </div>

      {!borrowedBooks.length && (
        <p className="text-gray-600 text-lg">
          You have not borrowed any books yet.
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBooks.map((book) => (
          <div
            key={book.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-lg transition overflow-hidden flex flex-col"
          >
            <div className="relative bg-gray-50">
              <img
                src={book.image}
                alt={book.title}
                className="w-full h-56 object-contain p-4 block"
              />
              <span
                className={`pointer-events-none absolute top-3 right-3 z-10 rounded-full px-3 py-1 text-xs font-semibold shadow-sm ring-1 ring-black/5 ${statusPillClasses(
                  book.status
                )}`}
              >
                {book.status}
              </span>
            </div>

            <div className="p-6 flex flex-col flex-1">
              <h3 className="text-lg font-semibold truncate">{book.title}</h3>
              <p className="text-gray-500 text-sm mb-2 truncate">
                {book.author}
              </p>
              <p className="text-gray-600 text-xs mb-4">
                Borrowed: {new Date(book.borrowedDate).toLocaleDateString()} |
                Due: {new Date(book.dueDate).toLocaleDateString()}
              </p>

              <div className="mt-auto flex gap-2">
                <button
                  onClick={() => setSelectedBook(book)}
                  className="flex-1 bg-[#D0FAE5] text-gray-800 px-4 py-2 rounded-lg font-medium
                             hover:bg-[#A8EFD1] transition flex items-center justify-center gap-2"
                >
                  <Eye size={16} /> View Details
                </button>
                <button
                  onClick={() => handleReturn(book.id)}
                  className="flex-1 bg-gradient-to-r from-[#ff6b6b] to-[#ff4757] text-white font-semibold
                             px-4 py-2 rounded-lg hover:scale-105 transition-transform flex items-center justify-center gap-2"
                >
                  <X size={16} /> Return
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedBook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setSelectedBook(null)}
          />
          <div className="relative bg-white rounded-2xl shadow-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6">
            <button
              onClick={() => setSelectedBook(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
            >
              <X size={22} />
            </button>
            <h2 className="text-2xl font-bold mb-2">{selectedBook.title}</h2>
            <p className="text-gray-600 mb-4">{selectedBook.author}</p>
            <p className="text-gray-700 mb-4">{selectedBook.longDescription}</p>
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
              <div>
                <span className="font-medium">Language:</span>{" "}
                {selectedBook.language}
              </div>
              <div>
                <span className="font-medium">ISBN:</span> {selectedBook.isbn}
              </div>
              <div>
                <span className="font-medium">Copies:</span>{" "}
                {selectedBook.available}
              </div>
              <div>
                <span className="font-medium">Status:</span>{" "}
                {selectedBook.status}
              </div>
            </div>
            <img
              src={selectedBook.image}
              alt={selectedBook.title}
              className="w-full h-60 object-contain bg-gray-50"
            />
          </div>
        </div>
      )}

      <AnimatePresence>
        {toast && (
          <Motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.4 }}
            className="fixed bottom-6 right-6 bg-white border border-green-200 shadow-lg rounded-xl px-5 py-3 flex items-center gap-3 z-[9999]"
          >
            <CheckCircle2 className="text-green-600 w-6 h-6" />
            <span className="text-gray-700 font-medium">{toast}</span>
          </Motion.div>
        )}
      </AnimatePresence>
    </AppLayout>
  );
}
