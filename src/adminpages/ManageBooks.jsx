import React, { useEffect, useMemo, useState } from "react";
import { Search, Plus, Pencil, Trash, X, ChevronDown } from "lucide-react";
import { bookAPI } from "../lib/api";
import AppLayout from "../components/AppLayout";
import Pagination from "@/components/Pagination";
import { toast, Toaster } from "sonner";

export default function ManageBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [expandedDesc, setExpandedDesc] = useState({}); // Read More / Read Less

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const booksData = await bookAPI.getBooks();
      setBooks(booksData);
    } catch (error) {
      toast.error(error.message || " Failed to fetch records.");
    } finally {
      setLoading(false);
    }
  };

  const categoryOptions = useMemo(() => {
    const map = new Map();
    books.forEach((b) => {
      const c = (b?.category || "").toString().trim();
      if (c) {
        const key = c.toLowerCase();
        if (!map.has(key)) map.set(key, c);
      }
    });
    const unique = Array.from(map.values()).sort((a, b) =>
      a.localeCompare(b, undefined, { sensitivity: "base" })
    );
    return ["All", ...unique];
  }, [books]);

  const filteredBooks = books.filter((book) => {
    const needle = searchTerm.toLowerCase();
    const matchesSearch =
      (book.title || "").toLowerCase().includes(needle) ||
      (book.author || "").toLowerCase().includes(needle) ||
      ((book.ISBN || book.isbn || "") + "").toLowerCase().includes(needle);
    const matchesCategory =
      category === "All" || (book.category || "") === category;
    return matchesSearch && matchesCategory;
  });

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      try {
        await bookAPI.deleteBook(id);
        await fetchBooks();
        toast.success("Book deleted successfully!");
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  const handleSave = async (formElData) => {
    const title = formElData.get("title").trim();
    const author = formElData.get("author").trim();
    const isbn = formElData.get("isbn").trim();
    const category = formElData.get("category").trim();
    const totalCopies = parseInt(formElData.get("copies").trim());
    const year = formElData.get("year").trim();
    const language = formElData.get("language").trim();
    const description = formElData.get("description").trim();
    const imageFile = formElData.get("image");

    if (
      !title ||
      !author ||
      !isbn ||
      !category ||
      !totalCopies ||
      !year ||
      !language
    ) {
      toast.error("Please fill all required fields.");
      return false;
    }

    if (isbn.length < 10) {
      toast.error("ISBN must be at least 10 characters long.");
      return false;
    }

    if (totalCopies <= 0) {
      toast.error("Total copies must be greater than 0.");
      return false;
    }

    try {
      const fd = new FormData();
      fd.append("title", title);
      fd.append("author", author);
      fd.append("ISBN", isbn);
      fd.append("category", category);
      fd.append("totalCopies", String(totalCopies));
      fd.append("publicationYear", String(parseInt(year)));
      fd.append("language", language);
      fd.append("description", description);
      if (imageFile && imageFile instanceof File && imageFile.size > 0) {
        fd.append("image", imageFile);
      }

      if (editingBook) {
        await bookAPI.updateBook(editingBook._id, fd);
        toast.success("Book updated successfully!");
      } else {
        await bookAPI.addBook(fd);
        toast.success("Book added successfully!");
      }

      await fetchBooks();
      setEditingBook(null);
      setIsModalOpen(false);
      return true;
    } catch (error) {
      toast.error(error.message);
      return false;
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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Manage Books</h1>
        <button
          onClick={() => {
            setEditingBook(null);
            setIsModalOpen(true);
          }}
          className="bg-[#009966] text-white font-medium px-4 py-2 rounded-md hover:bg-[#007a52] flex items-center gap-2 shadow"
        >
          <Plus className="w-4 h-4" />
          Add New Book
        </button>
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
                {categoryOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBooks.map((book) => (
          <div
            key={book._id}
            className="bg-white rounded-2xl shadow p-4 flex flex-col border border-gray-100"
          >
            <div className="flex justify-between items-start">
              <span
                className={`px-3 py-1 text-xs font-semibold rounded-lg ${
                  book.availableCopies > 0
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {book.availableCopies > 0 ? "Available" : "Unavailable"}
              </span>
              <span className="text-xs text-gray-500">
                {book.availableCopies}/{book.totalCopies} copies
              </span>
            </div>

            <div className="mt-3 mb-3 w-full">
              <img
                src={
                  book.image ||
                  "https://via.placeholder.com/300x400?text=No+Cover"
                }
                alt={book.title}
                className="w-full h-44 object-contain"
              />
            </div>

            <h2 className="text-lg font-semibold text-gray-800 line-clamp-2">
              {book.title}
            </h2>
            <p className="text-sm text-gray-600">by {book.author}</p>
            <div className="mt-1 grid grid-cols-2 gap-x-2 text-xs text-gray-500">
              <span>Year: {book.publicationYear || book.year}</span>
              <span>Lang: {book.language}</span>
              <span className="col-span-2">Category: {book.category}</span>
              <span className="col-span-2">ISBN: {book.ISBN || book.isbn}</span>
            </div>

            {book.description && (
              <p className="text-sm text-gray-700 mt-2">
                {expandedDesc[book._id]
                  ? book.description
                  : book.description?.length > 140
                  ? `${book.description.slice(0, 140)}...`
                  : book.description}
                {book.description?.length > 140 && (
                  <button
                    onClick={() =>
                      setExpandedDesc((prev) => ({
                        ...prev,
                        [book._id]: !prev[book._id],
                      }))
                    }
                    className="ml-1 text-[#009966] hover:underline font-medium"
                  >
                    {expandedDesc[book._id] ? "Read Less" : "Read More"}
                  </button>
                )}
              </p>
            )}

            <div className="mt-auto pt-4 flex gap-2">
              <button
                onClick={() => {
                  setEditingBook(book);
                  setIsModalOpen(true);
                }}
                className="flex items-center gap-1 px-3 py-1.5 rounded-md bg-[#E5F7EF] text-[#009966] hover:bg-[#d6f2e6] cursor-pointer shadow-sm"
              >
                <Pencil className="w-4 h-4 text-[#009966]" />
                Edit
              </button>
              <button
                onClick={() => handleDelete(book._id)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-md bg-[#FEECEC] text-[#FF3B30] hover:bg-[#fcd6d6] cursor-pointer shadow-sm"
              >
                <Trash className="w-4 h-4 text-[#FF3B30]" />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <Pagination totalPages={6} />

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm z-50 px-4">
          <div className="bg-white rounded-2xl shadow-xl w-[95%] max-w-2xl p-6 sm:p-8 relative border border-gray-100 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => {
                setEditingBook(null);
                setIsModalOpen(false);
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-[#009966]">
              {editingBook ? "Edit Book" : "Add New Book"}
            </h2>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                handleSave(formData);
              }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <div className="flex flex-col">
                <label className="text-sm font-medium text-[#009966] mb-1">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  name="title"
                  type="text"
                  defaultValue={editingBook?.title || ""}
                  required
                  className="border border-green-300 rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-green-400 focus:outline-none"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-medium text-[#009966] mb-1">
                  Author <span className="text-red-500">*</span>
                </label>
                <input
                  name="author"
                  type="text"
                  defaultValue={editingBook?.author || ""}
                  required
                  className="border border-green-300 rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-green-400 focus:outline-none"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-medium text-[#009966] mb-1">
                  ISBN <span className="text-red-500">*</span>
                </label>
                <input
                  name="isbn"
                  type="text"
                  defaultValue={editingBook?.ISBN || editingBook?.isbn || ""}
                  required
                  minLength={10}
                  className="border border-green-300 rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-green-400 focus:outline-none"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-medium text-[#009966] mb-1">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  name="category"
                  defaultValue={editingBook?.category || ""}
                  required
                  className="border border-green-300 rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-green-400 focus:outline-none"
                >
                  <option value="">Select Category</option>
                  <option>Hadith</option>
                  <option>History</option>
                  <option>Poetry</option>
                  <option>Comparative Religion</option>
                  <option>Quran</option>
                </select>
              </div>

              <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-[#009966] mb-1">
                    Total Copies <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="copies"
                    type="number"
                    defaultValue={editingBook?.totalCopies || ""}
                    required
                    min="1"
                    className="border border-green-300 rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-green-400 focus:outline-none"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-sm font-medium text-[#009966] mb-1">
                    Published Year <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="year"
                    type="number"
                    defaultValue={
                      editingBook?.publicationYear || editingBook?.year || ""
                    }
                    required
                    min="1500"
                    max={new Date().getFullYear()}
                    className="border border-green-300 rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-green-400 focus:outline-none"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-sm font-medium text-[#009966] mb-1">
                    Language <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="language"
                    type="text"
                    defaultValue={editingBook?.language || ""}
                    required
                    className="border border-green-300 rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-green-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex flex-col md:col-span-2">
                <label className="text-sm font-medium text-[#009966] mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  rows="3"
                  defaultValue={editingBook?.description || ""}
                  className="border border-green-300 rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-green-400 focus:outline-none"
                ></textarea>
              </div>

              <div className="flex flex-col md:col-span-2">
                <label className="text-sm font-medium text-[#009966] mb-1">
                  Cover Image
                </label>
                <input
                  name="image"
                  type="file"
                  accept="image/*"
                  className="border border-green-300 rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-green-400 focus:outline-none"
                />
                {editingBook?.image && (
                  <img
                    src={editingBook.image}
                    alt="Current cover"
                    className="mt-2 h-24 object-contain"
                  />
                )}
              </div>

              <div className="md:col-span-2 flex justify-end mt-4">
                <button
                  type="submit"
                  className="bg-[#009966] text-white px-6 py-2 rounded-lg shadow-md hover:bg-[#007a52] transition w-full sm:w-auto"
                >
                  {editingBook ? "Save Changes" : "Add Book"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <Toaster position="bottom-center" richColors />
    </AppLayout>
  );
}
