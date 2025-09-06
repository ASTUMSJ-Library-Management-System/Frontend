import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "../components/AppLayout";
import { Eye, Plus, X, Search, Star } from "lucide-react";
import { studentBookAPI, borrowAPI, reviewAPI } from "../lib/api";
import { toast } from "sonner";

export default function BrowseBooks() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    hasMembership: true,
    borrowedThisMonth: 2,
    monthlyLimit: 3,
    isstudent: true,
  });

  const [borrowedBooks, setBorrowedBooks] = useState(
    JSON.parse(localStorage.getItem("borrowedBooks")) || []
  );

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBook, setSelectedBook] = useState(null);

  // ✅ Review state (same shape as MyBooks)
  const [avgRating, setAvgRating] = useState(0);
  const [ratingsCount, setRatingsCount] = useState(0);
  const [comments, setComments] = useState([]);
  const [myRating, setMyRating] = useState(null);
  const [commentText, setCommentText] = useState("");

  const [expandedReviews, setExpandedReviews] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    localStorage.setItem("borrowedBooks", JSON.stringify(borrowedBooks));
  }, [borrowedBooks]);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const booksData = await studentBookAPI.getBooks();
      setBooks(booksData);
    } catch {
      toast.error("Failed to fetch books");
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async (bookId) => {
    try {
      const res = await reviewAPI.getReviews(bookId);
      setAvgRating(res.avgRating || 0);
      setRatingsCount(res.ratingsCount || 0);
      setComments(res.comments || []);
      setMyRating(res.myRating || null);
    } catch {
      toast.error("Failed to load reviews");
      setAvgRating(0);
      setRatingsCount(0);
      setComments([]);
      setMyRating(null);
    }
  };

  const handleBorrow = async (book) => {
    if (!user.hasMembership) {
      toast.error("Membership required. Redirecting to payment...");
      setTimeout(() => navigate("/membershippayment"), 1500);
      return;
    }
    if (!user.isstudent) {
      toast.error("wait for admin's student approval.");
      return;
    }

    if (user.borrowedThisMonth >= user.monthlyLimit) {
      toast.error("Monthly borrow limit reached.");
      return;
    }

    if (book.availableCopies <= 0) {
      toast.error("This book is currently unavailable.");
      return;
    }

    try {
      await borrowAPI.borrowBook(book._id);

      const dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + 14);

      const updatedBorrowed = [
        ...borrowedBooks,
        { ...book, status: "Pending", borrowedDate: new Date(), dueDate },
      ];
      setBorrowedBooks(updatedBorrowed);

      setUser((prev) => ({
        ...prev,
        borrowedThisMonth: prev.borrowedThisMonth + 1,
      }));

      toast.success(`📚 "${book.title}" borrowed successfully!`, {
        description: `Return by: ${dueDate.toLocaleDateString()}\nRemaining borrows this month: ${
          user.monthlyLimit - (user.borrowedThisMonth + 1)
        }`,
        duration: 4000,
      });

      await fetchBooks();
      navigate("/mybooks");
    } catch {
      toast.error("Failed to borrow book");
    }
  };

  // ✅ Submit rating
  const handleRating = async (bookId, value) => {
    try {
      await reviewAPI.addRating(bookId, value);
      setMyRating(value);
      toast.success("Rating submitted!");
      fetchReviews(bookId);
    } catch {
      toast.error("Failed to submit rating");
    }
  };

  // ✅ Submit comment
  const handleComment = async (bookId) => {
    if (!commentText.trim()) return;
    try {
      await reviewAPI.addComment(bookId, { text: commentText });
      toast.success("Comment added!");
      setCommentText("");
      fetchReviews(bookId);
    } catch {
      toast.error("Failed to add comment");
    }
  };

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (book.ISBN || book.isbn || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesCategory = category === "All" || book.category === category;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <AppLayout>
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Loading books...</div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <h1 className="text-2xl md:text-3xl font-bold text-[#009966] mb-2">
        Browse Books
      </h1>
      <p className="text-gray-600 mb-6">
        Discover and borrow books from our Islamic library collection
      </p>

      {/* Search + Category */}
      <div className="mb-8">
        <div className="rounded-2xl border border-[#A4F4CF] bg-gradient-to-br from-[#EEFFF7] to-[#F7FFFB] p-3 sm:p-4 shadow-sm">
          <div className="flex flex-col sm:flex-row items-stretch gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by Title, Author, or ISBN"
                className="w-full h-12 pl-9 pr-3 rounded-xl bg-white/90 ring-1 ring-inset ring-[#A4F4CF]/60
                     focus:outline-none focus:ring-2 focus:ring-[#009966] placeholder:text-gray-400"
              />
            </div>

            <div className="relative w-full sm:w-56">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="appearance-none w-full h-12 px-3 pr-9 rounded-xl bg-white/90 ring-1 ring-inset ring-[#A4F4CF]/60
                     focus:outline-none focus:ring-2 focus:ring-[#009966] text-gray-700"
              >
                <option value="All">All Categories</option>
                {[...new Set(books.map((b) => b.category))].map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <svg
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBooks.map((book) => (
          <div
            key={book._id}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition flex flex-col relative"
          >
            <span className="absolute top-3 left-3 bg-[#E6F7F1] text-[#009966] text-xs font-medium px-3 py-1 rounded-full">
              {book.category}
            </span>

            <span
              className={`absolute top-3 right-3 px-3 py-1 text-xs font-semibold rounded-full ${
                book.availableCopies > 0
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {book.availableCopies > 0 ? "Available" : "Not Available"}
            </span>

            <img
              src={book.image || "https://via.placeholder.com/150"}
              alt={book.title}
              className="w-full h-56 object-contain p-4"
            />

            <div className="p-4 flex flex-col flex-1">
              <h3 className="text-lg font-semibold line-clamp-1">
                {book.title}
              </h3>
              <p className="text-sm text-gray-600 mb-2">{book.author}</p>

              <button
                onClick={() => {
                  setSelectedBook(book);
                  fetchReviews(book._id);
                }}
                className="mt-auto flex items-center justify-center gap-2 bg-[#D0FAE5] text-gray-800 px-4 py-2 rounded-lg font-medium hover:bg-[#A8EFD1] transition"
              >
                <Eye size={18} /> View Detail
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedBook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
            onClick={() => setSelectedBook(null)}
          />
          <div className="relative bg-white rounded-2xl shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto flex flex-col md:flex-row">
            <div className="flex-1 p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-[#E6F7F1] text-[#009966] text-xs font-medium px-3 py-1 rounded-full">
                  {selectedBook.category}
                </span>
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full ${
                    selectedBook.availableCopies > 0
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {selectedBook.availableCopies > 0
                    ? "Available"
                    : "Not Available"}
                </span>
              </div>

              <h2 className="text-xl font-bold">{selectedBook.title}</h2>
              <p className="text-sm text-gray-500 mb-3">
                by {selectedBook.author} •{" "}
                {selectedBook.publicationYear || selectedBook.year}
              </p>

              {/* Rating summary */}
              <div className="flex items-center gap-2 mb-4">
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                <span className="font-medium">{avgRating.toFixed(1)}</span>
                <span className="text-sm text-gray-500">
                  ({ratingsCount} ratings)
                </span>
              </div>

              <p className="text-gray-700 text-sm leading-relaxed mb-4">
                {selectedBook.description}
              </p>

              {/* Borrow */}
              <button
                onClick={() => handleBorrow(selectedBook)}
                className="bg-[#D0FAE5] text-gray-800 px-5 py-2 rounded-lg font-medium hover:bg-[#A8EFD1] transition flex items-center gap-2 mb-6"
              >
                <Plus size={18} /> Borrow This Book
              </button>

              {/* --- Reviews --- */}
              <div className="border-t pt-4">
                <h3 className="text-lg font-semibold mb-2">Student Reviews</h3>

                {/* Rating stars input */}
                {borrowedBooks.some((b) => b._id === selectedBook._id) && (
                  <div className="flex items-center gap-1 mb-3">
                    {[1, 2, 3, 4, 5].map((val) => (
                      <Star
                        key={val}
                        className={`w-6 h-6 cursor-pointer ${
                          val <= (myRating || 0)
                            ? "text-yellow-500 fill-yellow-500"
                            : "text-gray-300"
                        }`}
                        onClick={() => handleRating(selectedBook._id, val)}
                      />
                    ))}
                  </div>
                )}

                {/* Comment input */}
                {borrowedBooks.some((b) => b._id === selectedBook._id) && (
                  <div className="flex gap-2 mb-4">
                    <input
                      type="text"
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      placeholder="Write a comment..."
                      className="flex-1 border rounded-lg px-3 py-2 text-sm"
                    />
                    <button
                      onClick={() => handleComment(selectedBook._id)}
                      className="bg-[#009966] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#007a55]"
                    >
                      Post
                    </button>
                  </div>
                )}

                {/* Comments list */}
                {comments.length === 0 && (
                  <p className="text-sm text-gray-500">No comments yet.</p>
                )}

                {comments
                  .slice(0, expandedReviews ? comments.length : 3)
                  .map((c) => (
                    <div key={c._id} className="mb-3">
                      <p className="text-sm text-gray-700">{c.text}</p>
                      <span className="text-xs text-gray-400">
                        —{" "}
                        {(typeof c.userId === "object" && c.userId?.name) ||
                          "Student"}
                      </span>
                    </div>
                  ))}

                {comments.length > 3 && (
                  <button
                    onClick={() => setExpandedReviews(!expandedReviews)}
                    className="text-sm text-[#009966] hover:underline"
                  >
                    {expandedReviews ? "Show Less" : "See All Comments"}
                  </button>
                )}
              </div>
            </div>

            <div className="flex-1 bg-gray-50 flex items-center justify-center p-6">
              <img
                src={selectedBook.image || "https://via.placeholder.com/150"}
                alt={selectedBook.title}
                className="max-h-72 md:max-h-80 w-auto object-contain"
              />
            </div>

            <button
              onClick={() => setSelectedBook(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
            >
              <X size={22} />
            </button>
          </div>
        </div>
      )}
    </AppLayout>
  );
}
