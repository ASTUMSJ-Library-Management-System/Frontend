import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Facebook, Instagram, Twitter } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-gray-50 font-inter ">
      <style>
        {`
          html {
            scroll-behavior: smooth;
          }
        `}
      </style>

      <header className="relative flex-shrink-0 h-screen w-80% overflow-hidden">
        <img
          src="/aqsa.jpg"
          alt="Al Aqsa Mosque"
          className="absolute  inset-0 w-full h-full object-cover z-0"
        />

        <div className="absolute inset-0  opacity-60 z-10"></div>

        <nav className="fixed top-0 left-0 right-0 p-6 flex justify-between rounded-3xl mt-4 mr-3 ml-3 items-center z-50 bg-[#006045] shadow-lg">
          <div className="flex items-center gap-3">
            <img src="/Frame.png" alt="ASTUMSJ Logo" className="h-10 w-10" />
            <span className="text-xl font-bold text-white">ASTUMSJ</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-white">
            <a href="#about" className="hover:text-green-200 transition">
              About
            </a>
            <a href="#Sector" className="hover:text-green-200 transition">
              Sector
            </a>
            <a href="#resources" className="hover:text-green-200 transition">
              Resources
            </a>
            <a href="#contact" className="hover:text-green-200 transition">
              Contact
            </a>
          </div>
          <div className="flex items-center gap-4">
            <button className="bg-white text-[#006045] font-semibold py-2 px-4 rounded-lg hover:bg-gray-100 transition">
              Log In
            </button>
            <button className="bg-[#A4F4CF] text-[#006045] font-semibold py-2 px-4 rounded-lg hover:bg-[#85E2B6] transition">
              Sign Up
            </button>
          </div>
        </nav>

        <div className="relative z-20 text-center text-white flex flex-col items-center justify-center h-full px-4 pt-24">
          <h1 className="text-4xl md:text-6xl  font-extrabold mb-4 leading-tight drop-shadow-md">
            A Community of Faith and Learning
          </h1>
          <p className="text-lg md:text-xl font-medium mb-8">
            Empowering students to grow spiritually and academically.
          </p>
        </div>
      </header>

      <main className="py-16 md:py-24">
        <section
          id="about"
          className="container mx-auto px-4 md:px-8 max-w-7xl mb-24"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#006045] text-center mb-12">
            Our Mission
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-8 text-center transition transform hover:scale-105">
              <div className="h-16 w-16 bg-[#009966] text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 12l10 5 10-5M2 17l10 5 10-5" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#006045] mb-2">
                Community
              </h3>
              <p className="text-gray-700">
                Fostering a welcoming and supportive environment where students
                can connect and grow together in faith.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-8 text-center transition transform hover:scale-105">
              <div className="h-16 w-16 bg-[#009966] text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <path d="M14 2v6h6" />
                  <path d="M8 13h8M8 17h8M12 9v8" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#006045] mb-2">
                Education
              </h3>
              <p className="text-gray-700">
                Providing resources and study circles to deepen understanding of
                our faith's teachings and scriptures.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-8 text-center transition transform hover:scale-105">
              <div className="h-16 w-16 bg-[#009966] text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM12 16h-.01M12 12V8" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#006045] mb-2">
                Service
              </h3>
              <p className="text-gray-700">
                Engaging in meaningful service projects to benefit both the
                university and the wider community.
              </p>
            </div>
          </div>
        </section>

        <section id="Sector" className="bg-[#ECFDF5] py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-8 max-w-7xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#006045] text-center mb-12">
              Sectors
            </h2>
            <div className="flex overflow-x-auto gap-6 pb-6 scroll-container">
              <div className="flex-shrink-0 w-80 bg-white rounded-xl card-shadow overflow-hidden transition transform hover:scale-105">
                <img
                  src="/qira'at.jpg"
                  alt="qira'at Circle"
                  className="w-full h-44 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-[#006045] mb-2">
                    Qira'at and Dawa sectors
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Every Tuesday at 6:00 PM
                  </p>
                  <p className="text-gray-700 text-sm mb-4">
                    Join us for a discussion on scripture and its application in
                    modern life.
                  </p>
                  <a
                    href="#"
                    className="inline-block bg-[#A4F4CF] text-[#006045] font-semibold py-2 px-4 rounded-lg hover:bg-[#85E2B6] transition text-sm"
                  >
                    Learn More
                  </a>
                </div>
              </div>

              <div className="flex-shrink-0 w-80 bg-white rounded-xl card-shadow overflow-hidden transition transform hover:scale-105">
                <img
                  src="/finance.jpg"
                  alt="finance Project"
                  className="w-full h-44 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-[#006045] mb-2">
                    Social sector
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Saturday, October 28th, 9:00 AM
                  </p>
                  <p className="text-gray-700 text-sm mb-4">
                    Help us give back by volunteering at the local community
                    garden.
                  </p>
                  <a
                    href="#"
                    className="inline-block bg-[#A4F4CF] text-[#006045] font-semibold py-2 px-4 rounded-lg hover:bg-[#85E2B6] transition text-sm"
                  >
                    Learn More
                  </a>
                </div>
              </div>

              <div className="flex-shrink-0 w-80 bg-white rounded-xl card-shadow overflow-hidden transition transform hover:scale-105">
                <img
                  src="/social.jpg"
                  alt="social sevice"
                  className="w-full h-44 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-[#006045] mb-2">
                    Finance sector
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Monday, November 6th, 7:00 PM
                  </p>
                  <p className="text-gray-700 text-sm mb-4">
                    Join us to hear from a renowned scholar on the topic of
                    faith and science.
                  </p>
                  <a
                    href="#"
                    className="inline-block bg-[#A4F4CF] text-[#006045] font-semibold py-2 px-4 rounded-lg hover:bg-[#85E2B6] transition text-sm"
                  >
                    Learn More
                  </a>
                </div>
              </div>

              <div className="flex-shrink-0 w-80 bg-white rounded-xl card-shadow overflow-hidden transition transform hover:scale-105">
                <img
                  src="/general.jpg"
                  alt="leaders"
                  className="w-full h-44 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-[#006045] mb-2">
                    General Amir sector
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Monday, November 6th, 7:00 PM
                  </p>
                  <p className="text-gray-700 text-sm mb-4">
                    Join us to hear from a renowned scholar on the topic of
                    faith and science.
                  </p>
                  <a
                    href="#"
                    className="inline-block bg-[#A4F4CF] text-[#006045] font-semibold py-2 px-4 rounded-lg hover:bg-[#85E2B6] transition text-sm"
                  >
                    Learn More
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="resources"
          className="container mx-auto px-4 md:px-8 max-w-7xl py-16 md:py-24"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#006045] text-center mb-12">
            Our Resources
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <a
              href="#"
              className="bg-white p-6 rounded-xl shadow-lg flex items-center gap-4 hover:bg-green-50 transition transform hover:scale-105"
            >
              <div className="h-12 w-12 bg-[#009966] text-white rounded-lg flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM12 16h-.01M12 12V8" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-[#006045]">
                  Tutorial Schedule
                </h3>
                <p className="text-gray-700 text-sm">
                  Access daily Tutor times for campus.
                </p>
              </div>
            </a>
            <a
              href="#"
              className="bg-white p-6 rounded-xl shadow-lg flex items-center gap-4 hover:bg-green-50 transition transform hover:scale-105"
            >
              <div className="h-12 w-12 bg-[#009966] text-white rounded-lg flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <path d="M14 2v6h6" />
                  <path d="M8 13h8M8 17h8M12 9v8" />
                </svg>
              </div>
              <div className="flex-1" onClick={() => navigate("/login")}>
                <h3 className="text-lg font-semibold text-[#006045]">
                  Library Access
                </h3>
                <p className="text-gray-700 text-sm">
                  Explore our collection of religious texts.
                </p>
              </div>
            </a>
            <a
              href="#"
              className="bg-white p-6 rounded-xl shadow-lg flex items-center gap-4 hover:bg-green-50 transition transform hover:scale-105"
            >
              <div className="h-12 w-12 bg-[#009966] text-white rounded-lg flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <path d="M14 2v6h6" />
                  <path d="M8 13h8M8 17h8M12 9v8" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-[#006045]">
                  Articles & Videos
                </h3>
                <p className="text-gray-700 text-sm">
                  In-depth content to help you grow your faith.
                </p>
              </div>
            </a>
          </div>
        </section>
      </main>

      <footer
        id="contact"
        className="bg-[#006045] shadow-lg rounded-3xl mr-3 ml-3 pb-4 text-white py-12"
      >
        <div className="container mx-auto px-4 md:px-8 max-w-5xl flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-8">
          <div className="flex flex-col gap-2">
            <a href="#about" className="hover:text-green-200 transition">
              About Us
            </a>
            <a href="#Sector" className="hover:text-green-200 transition">
              Sector
            </a>
            <a href="#resources" className="hover:text-green-200 transition">
              Resources
            </a>
          </div>

          <div className="flex gap-4">
            <a href="https://t.me/ASTU_MSJ" target="_blank">
              <img
                src="https://img.shields.io/static/v1?message=Telegram&logo=telegram&label=&color=2CA5E0&logoColor=white&labelColor=&style=for-the-badge"
                height="30"
              />
            </a>
            <a href="https://facebook.com" className="hover:text-blue-400">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="https://instagram.com" className="hover:text-pink-400">
              <Instagram className="w-5 h-5" />
            </a>
          </div>

          <p className="text-sm text-green-200">
            &copy; ASTUMSJ organaization .2025 All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};
export default Home;
