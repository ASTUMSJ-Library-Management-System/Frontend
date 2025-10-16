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

export default function MyBooks() {
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBook, setSelectedBook] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([]);
  const [reviewStats, setReviewStats] = useState(null);
  const [userReview, setUserReview] = useState(null);
  const [reviewLoading, setReviewLoading] = useState(false);

  useEffect(() => {
    fetchMyBorrows();
  }, []);

  const fetchMyBorrows = async () => {
    try {
      setLoading(true);
      const borrowsData = await borrowAPI.getMyBorrows();
      setBorrowedBooks(borrowsData);
    } catch (error) {
      toast.error(error?.message || "Failed to fetch borrowed books.");
    } finally {
      setLoading(false);
    }
  };

  const handleRequestReturn = async (borrowId) => {
    try {
      await borrowAPI.requestReturn(borrowId);
      await fetchMyBorrows();
      toast.success(
        "📘 Return request submitted. Waiting for librarian approval."
      );
    } catch (error) {
      toast.error(
        error?.message || "Failed to request return. Please try again."
      );
    }
  };

  const fetchBookReviews = async (bookId) => {
    try {
      setReviewLoading(true);
      const [reviewsData, statsData, userReviewData] = await Promise.all([
        reviewAPI.getBookReviews(bookId, 1, 10),
        reviewAPI.getBookReviewStats(bookId),
        reviewAPI.getUserReview(bookId),
      ]);
      
      setReviews(reviewsData.reviews);
      setReviewStats(statsData);
      setUserReview(userReviewData);
      
      if (userReviewData) {
        setRating(userReviewData.rating);
        setComment(userReviewData.comment);
      } else {
        setRating(0);
        setComment("");
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
      toast.error("Failed to load reviews");
    } finally {
      setReviewLoading(false);
    }
  };

  const handleRate = (star) => {
    setRating(star);
  };

  const handleSaveReview = async () => {
    if (!selectedBook || !rating || !comment.trim()) {
      toast.error("Please provide both rating and comment");
      return;
    }

    try {
      setReviewLoading(true);
      await reviewAPI.createOrUpdateReview(selectedBook.bookId._id, rating, comment);
      await fetchBookReviews(selectedBook.bookId._id);
      toast.success("⭐ Your review has been saved!");
    } catch (error) {
      console.error("Error saving review:", error);
      toast.error(error.message || "Failed to save review");
    } finally {
      setReviewLoading(false);
    }
  };

  const handleDeleteReview = async () => {
    if (!userReview) return;

    try {
      setReviewLoading(true);
      await reviewAPI.deleteReview(userReview._id);
      setUserReview(null);
      setRating(0);
      setComment("");
      await fetchBookReviews(selectedBook.bookId._id);
      toast.success("🗑️ Review deleted successfully");
    } catch (error) {
      console.error("Error deleting review:", error);
      toast.error(error.message || "Failed to delete review");
    } finally {
      setReviewLoading(false);
    }
  };

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
          {filteredBooks.map((book) => (
            <Motion.div
              key={book._id}
              layout
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition overflow-hidden flex flex-col"
            >
              <div className="relative bg-gray-50">
                <img
                  src={book.bookId?.image || "https://via.placeholder.com/150"}
                  alt={book.bookId?.title || "Book"}
                  className="w-full h-56 object-contain p-4 block"
                />
                <span
                  className={`absolute top-3 right-3 z-10 rounded-full px-3 py-1 text-xs font-semibold shadow-sm ring-1 ring-black/5 ${statusPillClasses(
                    book.status
                  )}`}
                >
                  {book.status}
                </span>
              </div>

              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-lg font-semibold truncate">
                  {book.bookId?.title || "Unknown Book"}
                </h3>
                <p className="text-gray-500 text-sm mb-2 truncate">
                  {book.bookId?.author || "Unknown Author"}
                </p>
                <p className="text-gray-600 text-xs mb-4">
                  Borrowed: {new Date(book.borrowDate).toLocaleDateString()} |
                  Due: {new Date(book.dueDate).toLocaleDateString()}
                </p>

                <div className="mt-auto flex gap-2">
                  <button
                    onClick={() => {
                      setSelectedBook(book);
                      fetchBookReviews(book.bookId._id);
                    }}
                    className="flex-1 bg-[#D0FAE5] text-gray-800 px-4 py-2 rounded-lg font-medium
                               hover:bg-[#A8EFD1] transition flex items-center justify-center gap-2"
                  >
                    <Eye size={16} /> View Details
                  </button>
                  {book.status !== "Returned" && (
                    <button
                      onClick={() => handleRequestReturn(book._id)}
                      className="flex-1 bg-gradient-to-r from-[#ff6b6b] to-[#ff4757] text-white font-semibold
                                 px-4 py-2 rounded-lg hover:scale-105 transition-transform flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                      disabled={book.status === "Pending"}
                    >
                      <X size={16} />{" "}
                      {book.status === "Pending"
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

      {/* Modal */}
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
                  {selectedBook.bookId?.ISBN || selectedBook.bookId?.isbn || "Unknown"}
                </div>
                <div>
                  <span className="font-medium">Category:</span>{" "}
                  {selectedBook.bookId?.category || "Unknown"}
                </div>
                <div>
                  <span className="font-medium">Publication Year:</span>{" "}
                  {selectedBook.bookId?.publicationYear || "Unknown"}
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
                src={
                  selectedBook.bookId?.image ||
                  "https://via.placeholder.com/150"
                }
                alt={selectedBook.bookId?.title || "Book"}
                className="w-full h-60 object-contain bg-gray-50 mb-6"
              />

              {/* Review Statistics */}
              {reviewStats && (
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-gray-700 mb-2">Book Rating</h3>
                  <div className="flex items-center gap-4">
                    <div className="text-3xl font-bold text-[#009966]">
                      {reviewStats.averageRating.toFixed(1)}
                    </div>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-5 w-5 ${
                            star <= Math.round(reviewStats.averageRating)
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <div className="text-sm text-gray-600">
                      ({reviewStats.totalReviews} review{reviewStats.totalReviews !== 1 ? 's' : ''})
                    </div>
                  </div>
                </div>
              )}

              {/* User Review Section */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-700 mb-2">
                  {userReview ? "Your Review" : "Write a Review"}
                </h3>
                
                {/* Rating */}
                <div className="flex gap-2 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => handleRate(star)}
                      className="focus:outline-none"
                      disabled={reviewLoading}
                    >
                      <Star
                        className={`h-7 w-7 transition-transform ${
                          rating >= star
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        } hover:scale-110 ${reviewLoading ? 'opacity-50' : ''}`}
                      />
                    </button>
                  ))}
                </div>

                {/* Comment */}
                <div className="flex gap-2 mb-4">
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Write your review..."
                    className="flex-1 px-3 py-2 border border-[#A4F4CF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009966] resize-none"
                    rows={3}
                    disabled={reviewLoading}
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={handleSaveReview}
                    disabled={reviewLoading || !rating || !comment.trim()}
                    className="px-4 py-2 bg-[#009966] text-white rounded-lg hover:bg-[#007a52] disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {reviewLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Saving...
                      </>
                    ) : (
                      <>
                        <Star size={16} />
                        {userReview ? "Update Review" : "Save Review"}
                      </>
                    )}
                  </button>
                  
                  {userReview && (
                    <button
                      onClick={handleDeleteReview}
                      disabled={reviewLoading}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>
                  )}
                </div>
              </div>

              {/* Other Reviews */}
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">
                  Other Reviews ({reviews.length})
                </h3>
                
                {reviewLoading ? (
                  <div className="flex justify-center py-4">
                    <div className="w-6 h-6 border-2 border-[#009966] border-t-transparent rounded-full animate-spin"></div>
                  </div>
                ) : reviews.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">No reviews yet</p>
                ) : (
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {reviews.map((review) => (
                      <div
                        key={review._id}
                        className="border border-[#A4F4CF] rounded-lg p-3"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <div className="font-medium text-sm">
                            {review.user?.name || "Anonymous"}
                          </div>
                          <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`h-4 w-4 ${
                                  star <= review.rating
                                    ? "text-yellow-400 fill-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <div className="text-xs text-gray-500">
                            {new Date(review.createdAt).toLocaleDateString()}
                            {review.isEdited && " (edited)"}
                          </div>
                        </div>
                        <p className="text-sm text-gray-700">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Motion.div>
          </Motion.div>
        )}
      </AnimatePresence>
    </AppLayout>
  );
}
