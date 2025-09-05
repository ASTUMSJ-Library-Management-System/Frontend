// src/pages/MyBooks.jsx
import React, { useEffect, useMemo, useState } from "react";
import AppLayout from "../components/AppLayout";
import {
  X,
  Eye,
  Search,
  ChevronDown,
  Star,
  Pencil,
  Trash2,
} from "lucide-react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { borrowAPI, reviewAPI } from "../lib/api";
import { toast, Toaster } from "sonner";

const FALLBACK_IMG =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200"><rect width="100%25" height="100%25" fill="%23f3f4f6"/><text x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-size="16" fill="%239ca3af">No Image</text></svg>';

// Helper: read user id from JWT (no dependency on localStorage.user)
function getMyUserIdFromToken() {
  const token = localStorage.getItem("token");
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split(".")[1] || ""));
    // common JWT payload keys
    return payload.id || payload._id || payload.userId || payload.sub || null;
  } catch {
    return null;
  }
}

export default function MyBooks() {
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBook, setSelectedBook] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // ⭐ & 💬
  const [ratings, setRatings] = useState({}); // per bookId: my rating value
  const [avgRatings, setAvgRatings] = useState({}); // per bookId: average rating
  const [ratingsCount, setRatingsCount] = useState({}); // per bookId: count of ratings
  const [commentsByBook, setCommentsByBook] = useState({});
  const [newComment, setNewComment] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingText, setEditingText] = useState("");

  const myUserId = getMyUserIdFromToken();

  useEffect(() => {
    fetchMyBorrows();
  }, []);

  const fetchMyBorrows = async () => {
    try {
      setLoading(true);
      const borrowsData = await borrowAPI.getMyBorrows();
      setBorrowedBooks(borrowsData);
    } catch {
      toast.error("Failed to fetch borrowed books.");
    } finally {
      setLoading(false);
    }
  };

  // 🔄 Load reviews when opening a book
  const fetchReviews = async (bookId) => {
    try {
      const data = await reviewAPI.getReviews(bookId);

      // Prefer backend-provided myRating; fallback to computing
      const myRating =
        data.myRating ||
        data.ratings?.find(
          (r) => r.userId === myUserId || r.userId?._id === myUserId
        )?.value ||
        0;

      setRatings((prev) => ({ ...prev, [bookId]: myRating }));
      setAvgRatings((prev) => ({ ...prev, [bookId]: data.avgRating || 0 }));
      setRatingsCount((prev) => ({
        ...prev,
        [bookId]: data.ratingsCount || 0,
      }));
      setCommentsByBook((prev) => ({ ...prev, [bookId]: data.comments || [] }));
    } catch {
      toast.error("Failed to fetch reviews.");
    }
  };

  const handleRequestReturn = async (borrowId) => {
    try {
      await borrowAPI.requestReturn(borrowId);
      await fetchMyBorrows();
      toast.success(
        "📘 Return request submitted. Waiting for librarian approval."
      );
    } catch {
      toast.error("Failed to request return. Please try again.");
    }
  };

  // ⭐ Ratings (no front-end login guard; rely on token + 401 interceptor)
  const handleRate = async (bookId, star) => {
    try {
      const current = ratings[bookId] || 0;
      const updated = current === star ? 0 : star;

      if (updated === 0) {
        await reviewAPI.removeRating(bookId);
        toast.success("⭐ Your rating was removed.");
        setRatings((prev) => ({ ...prev, [bookId]: 0 }));
      } else {
        const res = await reviewAPI.addRating(bookId, updated);
        toast.success(`⭐ You rated this book ${updated}/5`);
        // use server-calculated values to keep UI consistent
        setRatings((prev) => ({ ...prev, [bookId]: res.myRating || updated }));
        setAvgRatings((prev) => ({ ...prev, [bookId]: res.avgRating || 0 }));
        setRatingsCount((prev) => ({
          ...prev,
          [bookId]: res.ratingsCount || 0,
        }));
      }
    } catch {
      toast.error("Failed to update rating.");
    }
  };

  // 💬 Comments (no front-end login guard; rely on token + 401 interceptor)
  const handleAddComment = async (bookId) => {
    if (!newComment.trim()) return;
    try {
      const res = await reviewAPI.addComment(bookId, newComment.trim());
      setCommentsByBook((prev) => ({
        ...prev,
        [bookId]: res.comments || [],
      }));
      setNewComment("");
      toast.success("💬 Comment added.");
    } catch {
      toast.error("Failed to add comment.");
    }
  };

  const handleDeleteComment = async (bookId, id) => {
    try {
      const res = await reviewAPI.deleteComment(bookId, id);
      setCommentsByBook((prev) => ({
        ...prev,
        [bookId]: res.comments || [],
      }));
      toast.success("🗑️ Comment deleted.");
    } catch {
      toast.error("Failed to delete comment.");
    }
  };

  const handleEditComment = (id, text) => {
    setEditingCommentId(id);
    setEditingText(text);
  };

  const handleSaveComment = async (bookId, id) => {
    try {
      const res = await reviewAPI.editComment(bookId, id, editingText.trim());
      setCommentsByBook((prev) => ({
        ...prev,
        [bookId]: res.comments || [],
      }));
      setEditingCommentId(null);
      setEditingText("");
      toast.success("✏️ Comment updated.");
    } catch {
      toast.error("Failed to update comment.");
    }
  };

  // 📊 Counters
  const counts = useMemo(() => {
    const toLower = (s) => (s ? String(s).toLowerCase() : "");
    return {
      total: borrowedBooks.length,
      borrowed: borrowedBooks.filter((b) => toLower(b.status) === "active")
        .length,
      pending: borrowedBooks.filter((b) => toLower(b.status) === "pending")
        .length,
      overdue: borrowedBooks.filter((b) => toLower(b.status) === "overdue")
        .length,
    };
  }, [borrowedBooks]);

  const statusPillClasses = (status) => {
    const s = String(status || "").toLowerCase();
    if (s === "active")
      return "bg-green-100 text-green-800 border border-green-200";
    if (s === "pending")
      return "bg-yellow-100 text-yellow-800 border border-yellow-200";
    if (s === "overdue") return "bg-red-100 text-red-800 border border-red-200";
    if (s === "returned")
      return "bg-blue-100 text-blue-800 border border-blue-200";
    return "bg-gray-100 text-gray-700 border border-gray-200";
  };

  const filteredBooks = borrowedBooks.filter((b) => {
    const q = searchTerm.trim().toLowerCase();
    const matchSearch =
      !q ||
      [b.bookId?.title, b.bookId?.author, b.userId?.name, b.userId?.studentId]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(q));
    const matchStatus =
      statusFilter === "All"
        ? true
        : String(b.status).toLowerCase() === statusFilter.toLowerCase();
    return matchSearch && matchStatus;
  });

  if (loading) {
    return (
      <AppLayout>
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Loading your borrowed books...</div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <Toaster position="top-right" richColors closeButton />

      {/* Header & Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-5">
        <h1 className="text-3xl font-bold text-[#009966]">Borrowed Books</h1>
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setStatusFilter("All")}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${
              statusFilter === "All"
                ? "ring-2 ring-offset-1 ring-[#009966]"
                : "bg-teal-100 text-teal-800"
            }`}
          >
            Total ({counts.total})
          </button>
          <button
            onClick={() => setStatusFilter("Active")}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${
              statusFilter === "Active"
                ? "ring-2 ring-offset-1 ring-[#009966]"
                : "bg-green-100 text-green-800"
            }`}
          >
            Borrowed ({counts.borrowed})
          </button>
          <button
            onClick={() => setStatusFilter("Pending")}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${
              statusFilter === "Pending"
                ? "ring-2 ring-offset-1 ring-[#009966]"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            Pending ({counts.pending})
          </button>
          <button
            onClick={() => setStatusFilter("Overdue")}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${
              statusFilter === "Overdue"
                ? "ring-2 ring-offset-1 ring-[#009966]"
                : "bg-red-100 text-red-800"
            }`}
          >
            Overdue ({counts.overdue})
          </button>
        </div>
      </div>

      {/* Search + Filter */}
      <div className="mb-8">
        <div className="rounded-2xl border border-[#A4F4CF] bg-gradient-to-br from-[#EEFFF7] to-[#F7FFFB] p-3 sm:p-4 shadow-sm">
          <div className="flex flex-col sm:flex-row items-stretch gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by student name, book, title, or student ID"
                className="w-full h-12 pl-9 pr-3 rounded-xl bg-white/90 ring-1 ring-inset ring-[#A4F4CF]/60
                           focus:outline-none focus:ring-2 focus:ring-[#009966] placeholder:text-gray-400"
              />
            </div>

            <div className="relative w-full sm:w-56">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="appearance-none w-full h-12 px-3 pr-9 rounded-xl bg-white/90 ring-1 ring-inset ring-[#A4F4CF]/60
                           focus:outline-none focus:ring-2 focus:ring-[#009966] text-gray-700"
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Pending">Pending</option>
                <option value="Overdue">Overdue</option>
                <option value="Returned">Returned</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      {!borrowedBooks.length && (
        <p className="text-gray-600 text-lg">
          You have not borrowed any books yet.
        </p>
      )}

      {/* Books Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredBooks.map((borrow) => (
            <Motion.div
              key={borrow._id}
              layout
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition overflow-hidden flex flex-col"
            >
              <div className="relative bg-gray-50">
                <img
                  src={borrow.bookId?.image || FALLBACK_IMG}
                  alt={borrow.bookId?.title || "Book"}
                  className="w-full h-56 object-contain p-4 block"
                  onError={(e) => {
                    e.currentTarget.src = FALLBACK_IMG;
                  }}
                />
                <span
                  className={`absolute top-3 right-3 z-10 rounded-full px-3 py-1 text-xs font-semibold shadow-sm ring-1 ring-black/5 ${statusPillClasses(
                    borrow.status
                  )}`}
                >
                  {borrow.status}
                </span>
              </div>

              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-lg font-semibold truncate">
                  {borrow.bookId?.title || "Unknown Book"}
                </h3>
                <p className="text-gray-500 text-sm mb-2 truncate">
                  {borrow.bookId?.author || "Unknown Author"}
                </p>
                <p className="text-gray-600 text-xs mb-4">
                  Borrowed: {new Date(borrow.borrowDate).toLocaleDateString()} |
                  Due: {new Date(borrow.dueDate).toLocaleDateString()}
                </p>

                <div className="mt-auto flex gap-2">
                  <button
                    onClick={() => {
                      setSelectedBook(borrow);
                      if (borrow.bookId?._id) fetchReviews(borrow.bookId._id);
                    }}
                    className="flex-1 bg-[#D0FAE5] text-gray-800 px-4 py-2 rounded-lg font-medium
                             hover:bg-[#A8EFD1] transition flex items-center justify-center gap-2"
                  >
                    <Eye size={16} /> View Details
                  </button>
                  {borrow.status !== "Returned" && (
                    <button
                      onClick={() => handleRequestReturn(borrow._id)}
                      className="flex-1 bg-gradient-to-r from-[#ff6b6b] to-[#ff4757] text-white font-semibold
                                 px-4 py-2 rounded-lg hover:scale-105 transition-transform flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                      disabled={borrow.status === "Pending"}
                    >
                      <X size={16} />{" "}
                      {borrow.status === "Pending"
                        ? "Pending Approval"
                        : "Request Return"}
                    </button>
                  )}
                </div>
              </div>
            </Motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Modal (reviews) */}
      <AnimatePresence>
        {selectedBook && (
          <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div
              className="absolute inset-0 bg-black/30"
              onClick={() => setSelectedBook(null)}
            />
            <Motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative bg-white rounded-2xl shadow-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6"
            >
              <button
                onClick={() => setSelectedBook(null)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
              >
                <X size={22} />
              </button>

              <h2 className="text-2xl font-bold mb-2">
                {selectedBook.bookId?.title || "Unknown Book"}
              </h2>
              <p className="text-gray-600 mb-4">
                {selectedBook.bookId?.author || "Unknown Author"}
              </p>
              <p className="text-gray-700 mb-4">
                {selectedBook.bookId?.description || "No description available"}
              </p>

              <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                <div>
                  <span className="font-medium">Language:</span>{" "}
                  {selectedBook.bookId?.language || "Unknown"}
                </div>
                <div>
                  <span className="font-medium">ISBN:</span>{" "}
                  {selectedBook.bookId?.isbn || "Unknown"}
                </div>
                <div>
                  <span className="font-medium">Status:</span>{" "}
                  {selectedBook.status}
                </div>
                <div>
                  <span className="font-medium">Due Date:</span>{" "}
                  {new Date(selectedBook.dueDate).toLocaleDateString()}
                </div>
              </div>

              <img
                src={selectedBook.bookId?.image || FALLBACK_IMG}
                alt={selectedBook.bookId?.title || "Book"}
                className="w-full h-60 object-contain bg-gray-50 mb-6"
                onError={(e) => {
                  e.currentTarget.src = FALLBACK_IMG;
                }}
              />

              {/* Rating */}
              <div className="mb-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-700 mb-2">
                    Rate this book:
                  </h3>
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">
                      {avgRatings[selectedBook.bookId._id] ?? 0}/5
                    </span>{" "}
                    ({ratingsCount[selectedBook.bookId._id] ?? 0} ratings)
                  </div>
                </div>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => handleRate(selectedBook.bookId._id, star)}
                      className="focus:outline-none"
                    >
                      <Star
                        className={`h-7 w-7 transition-transform ${
                          (ratings[selectedBook.bookId._id] || 0) >= star
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        } hover:scale-110`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Comments */}
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">Comments:</h3>
                <div className="flex gap-2 mb-4">
                  <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Write a comment..."
                    className="flex-1 px-3 py-2 border border-[#A4F4CF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009966]"
                  />
                  <button
                    onClick={() => handleAddComment(selectedBook.bookId._id)}
                    className="px-4 py-2 bg-[#009966] text-white rounded-lg hover:bg-[#007a52]"
                  >
                    Add
                  </button>
                </div>

                <div className="space-y-3">
                  {(commentsByBook[selectedBook.bookId._id] || []).map((c) => {
                    const isMine =
                      c.userId === myUserId || c.userId?._id === myUserId;
                    const author =
                      (typeof c.userId === "object" && c.userId?.name) ||
                      (isMine ? "You" : "User");
                    return (
                      <div
                        key={c._id}
                        className="flex justify-between items-center border border-[#A4F4CF] rounded-lg p-2"
                      >
                        {editingCommentId === c._id ? (
                          <div className="flex-1 flex gap-2">
                            <input
                              value={editingText}
                              onChange={(e) => setEditingText(e.target.value)}
                              className="flex-1 px-2 py-1 border border-[#A4F4CF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009966]"
                            />
                            <button
                              onClick={() =>
                                handleSaveComment(
                                  selectedBook.bookId._id,
                                  c._id
                                )
                              }
                              className="px-3 py-1 bg-[#009966] text-white rounded-lg text-sm"
                            >
                              Save
                            </button>
                          </div>
                        ) : (
                          <>
                            <div className="flex-1">
                              <span className="block text-sm text-gray-500">
                                {author}
                              </span>
                              <span className="block">{c.text}</span>
                            </div>
                            <div className="flex gap-2">
                              {isMine && (
                                <>
                                  <button
                                    onClick={() =>
                                      handleEditComment(c._id, c.text)
                                    }
                                    className="text-gray-500 hover:text-[#009966]"
                                  >
                                    <Pencil size={16} />
                                  </button>
                                  <button
                                    onClick={() =>
                                      handleDeleteComment(
                                        selectedBook.bookId._id,
                                        c._id
                                      )
                                    }
                                    className="text-gray-500 hover:text-red-500"
                                  >
                                    <Trash2 size={16} />
                                  </button>
                                </>
                              )}
                            </div>
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </Motion.div>
          </Motion.div>
        )}
      </AnimatePresence>
    </AppLayout>
  );
}
