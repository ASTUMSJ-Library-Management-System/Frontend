import React from "react";
import AppLayout from "../components/AppLayout.jsx";
import bukhari from "../assets/bukhari.png";
import ibn from "../assets/ibn.png";

const borrowedBooks = [
  {
    id: 1,
    title: "Sahih Al-Bukhari",
    author: "Imam Bukhari",
    image: bukhari,
    status: "Approved",
    borrowedDate: new Date(),
    dueDate: new Date(new Date().setDate(new Date().getDate() + 14)),
  },
  {
    id: 2,
    title: "Ibn Teymiyah",
    author: "Ibn Teymiyah",
    image: ibn,
    status: "Pending",
    borrowedDate: new Date(),
    dueDate: new Date(new Date().setDate(new Date().getDate() + 14)),
  },
];

const statusColors = {
  Approved: "bg-green-100 text-green-700",
  Pending: "bg-yellow-100 text-yellow-700",
  Denied: "bg-red-100 text-red-700",
};

export default function MyBooks() {
  return (
    <AppLayout>
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-[#009966]">
        My Books
      </h1>

      {borrowedBooks.length === 0 ? (
        <p className="text-gray-600 text-base md:text-lg">
          You haven’t borrowed any books yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {borrowedBooks.map((book) => (
            <div
              key={book.id}
              className="relative bg-white rounded-2xl shadow-md hover:shadow-lg transition flex flex-col overflow-hidden"
            >
              {/* Status Badge */}
              <span
                className={`absolute top-3 right-3 px-3 py-1 text-xs font-semibold rounded-full ${
                  statusColors[book.status]
                }`}
              >
                {book.status}
              </span>

              {/* Image */}
              <div className="flex justify-center p-4 bg-gray-50">
                <img
                  src={book.image}
                  alt={book.title}
                  className="h-48 sm:h-56 md:h-60 w-auto object-contain rounded-lg"
                />
              </div>

              {/* Info */}
              <div className="p-4 flex flex-col flex-1">
                <h3 className="text-lg md:text-xl font-semibold line-clamp-1 mb-1">
                  {book.title}
                </h3>
                <p className="text-gray-700 text-sm md:text-base mb-2">
                  {book.author}
                </p>
                <p className="text-gray-500 text-xs md:text-sm">
                  Borrowed: {book.borrowedDate.toLocaleDateString()} <br />
                  Due: {book.dueDate.toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </AppLayout>
  );
}
