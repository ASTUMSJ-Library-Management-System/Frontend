import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "../components/AppLayout";
import { Eye, Plus, X, Search } from "lucide-react";
import { studentBookAPI, borrowAPI } from "../lib/api";
import { toast } from "sonner";

export default function BrowseBooks() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    hasMembership: true,
    borrowedThisMonth: 2,
    monthlyLimit: 3,
  });

  const [borrowedBooks, setBorrowedBooks] = useState(
    JSON.parse(localStorage.getItem("borrowedBooks")) || []
  );

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBook, setSelectedBook] = useState(null);
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
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (book.ISBN || book.isbn || "").toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === "All" || book.category === category;
    return matchesSearch && matchesCategory;
  });



  const handleBorrow = async (book) => {
    if (!user.hasMembership) {
      toast.error("Membership required", {
        description: "Please pay your membership fee to borrow books.",
      });
      navigate("/membershippayment");
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

      const quotes = [
        "“Reading is a light for the soul.” – Enjoy your journey!",
        "“Seek knowledge from the cradle to the grave.”",
        "“A book is a garden you can carry in your pocket.”",
        "“Knowledge is the key to guidance.”",
      ];
      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

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
        description: `${randomQuote}\nReturn by: ${dueDate.toLocaleDateString()}\nRemaining borrows this month: ${
          user.monthlyLimit - (user.borrowedThisMonth + 1)
        }`,
        duration: 4000,
      });

      // Refresh books to update availability
      await fetchBooks();
      navigate("/mybooks");
    } catch (error) {
      toast.error(error.message);
    }
  };

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

      <div className="flex flex-col md:flex-row items-center gap-3 mb-6">
        <div className="relative w-full md:flex-1">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search by Title, Author, or ISBN"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#009966] focus:outline-none"
          />
        </div>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border px-4 py-2 rounded-lg focus:ring-2 focus:ring-[#009966] focus:border-[#009966] hover:border-[#009966] cursor-pointer outline-none"
        >
          <option value="All">All Categories</option>
          {[...new Set(books.map((b) => b.category))].map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

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
              <p className="text-sm text-gray-700 line-clamp-2 flex-1">
                {book.description}
              </p>

              <button
                onClick={() => setSelectedBook(book)}
                className="mt-4 flex items-center justify-center gap-2 bg-[#D0FAE5] text-gray-800 px-4 py-2 rounded-lg font-medium hover:bg-[#A8EFD1] transition"
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
                  {selectedBook.availableCopies > 0 ? "Available" : "Not Available"}
                </span>
              </div>

              <h2 className="text-xl font-bold">{selectedBook.title}</h2>
              <p className="text-sm text-gray-500 mb-3">
                by {selectedBook.author} • {selectedBook.publicationYear || selectedBook.year}
              </p>
              <p className="text-gray-700 text-sm leading-relaxed mb-4">
                {selectedBook.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600 mb-6">
                <p>
                  <span className="font-medium">Language:</span>{" "}
                  {selectedBook.language}
                </p>
                <p>
                  <span className="font-medium">ISBN:</span> {selectedBook.ISBN || selectedBook.isbn}
                </p>
                <p>
                  <span className="font-medium">Copies:</span>{" "}
                  {selectedBook.availableCopies}/{selectedBook.totalCopies}
                </p>
              </div>

              <button
                onClick={() => handleBorrow(selectedBook)}
                className="bg-[#D0FAE5] text-gray-800 px-5 py-2 rounded-lg font-medium hover:bg-[#A8EFD1] transition flex items-center gap-2"
              >
                <Plus size={18} /> Borrow This Book
              </button>
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
