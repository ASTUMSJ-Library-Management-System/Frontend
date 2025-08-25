import React from "react";
import Sidebar from "../components/Side-bar.jsx";

const MembershipPayment = () => {
  return (
    <div className="flex min-h-screen bg-[#EDFDF7]">
      <Sidebar />

      <div className="flex-1 w-full p-6 space-y-6 overflow-hidden">
        <div>
          <h1 className="text-2xl font-bold  text-[#006045]">
            Membership Payment
          </h1>
          <p className="text-sm text-[#189966]">
            Pay your membership fee to access borrowing services.
          </p>
        </div>

        <div className="bg-[#FFFFFFCF] rounded-lg shadow-sm border border-gray-200 p-4">
          <h2 className="text-sm font-medium  text-[16px] text-[#006045]">
            Payment Status
          </h2>
          <h3 className="mt-4 px-3 py-1 rounded-md text-[#189966] text-xs text-[15px] font-medium ">
            Current Status :
          </h3>
          <span className="bg-[#FFE550CF] text-[#997B18] text-[10px] px-3 py-1 rounded-md text-xs font-medium">
            Pending
          </span>
        </div>

        <div className="bg-[#FFFFFFCF] rounded-lg shadow-sm border border-gray-200 p-4 space-y-4">
          <h2 className="text-sm font-semibold text-[#189966] text-[20px]">
            Payment Information
          </h2>
          <p className="text-sm text-[#189966] text-[15px] mb-1 font-normal">
            Membership fee: 50.00 Birr/month
          </p>

          <div className="bg-[#ECFDF5] p-3 rounded-md">
            <h3 className="text-sm font-medium text-[#189966] text-[20px]">
              Payment Methods
            </h3>
            <p className="text-sm font-semibold text-[#189966]">
              Bank Transfer{" "}
              <span className="text-[[#189966]">
                : Account 100012345678 ASTUMSJ Library
              </span>{" "}
              <br />
              cash
              <span className="text-[[#189966]">
                {" "}
                : Visit the library office for help next hours{" "}
              </span>
            </p>
          </div>

          <div className="bg-[#ECF4FD] p-3 rounded-md">
            <h3 className="text-sm font-medium text-[#0051FF] text-[20px]">
              Instructions
            </h3>
            <ul className="list-decimal ml-4 text-sm text-[#0051FF] font-normal text-[17px] space-y-1">
              <li>Make payment using any of the mentioned options</li>
              <li>Take a screenshot of your transaction receipt</li>
              <li>Upload the screenshot below for verification</li>
              <li>Wait until your payment status is verified</li>
            </ul>
          </div>
        </div>

        <div className="bg-[#FFFFFFCF] rounded-lg shadow-sm border border-gray-200 p-4 space-y-4">
          <div className="space-y-0">
            <h2 className="text-sm font-semibold text-[#006045] text-[20px]">
              Submit Payment Proof
            </h2>
            <p className="text-sm text-[#189966]  text-[17px] font-normal">
              Upload your payment screenshot for verification
            </p>
          </div>

          <form className="space-y-3">
            <div>
              <label className="block text-sm text-[#189966] text-[15px] font-semibold mb-1">
                Payment Screenshot *
              </label>
              <input
                type="file"
                className="w-full text-sm text-gray-600 border border-gray-300 rounded-md px-3 py-2"
              />
              <h3 className="text-[#189966] text-[14px] font-normal">
                Upload a clear image of your payment receipt or transaction
                confirmation
              </h3>
            </div>

            <div>
              <label className="block text-sm text-[#189966] text-[15px] font-semibold mb-1">
                Transaction Reference *
              </label>
              <input
                type="text"
                placeholder="Transaction reference"
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700"
              />
            </div>

            <div>
              <label className="block text-sm text-[#189966] text-[15px] font-semibold mb-1">
                Additional Notes (Optional)
              </label>
              <input
                type="text"
                placeholder="Optional details"
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-md font-medium text-sm hover:bg-green-700 transition"
            >
              Submit Payment Proof
            </button>
          </form>
        </div>

        <div className="bg-[#FFFFFFCF] rounded-lg shadow-sm border border-gray-200 p-4 space-y-2">
          <h2 className="text-sm font-semibold text-[#189966] text-[20px]">
            Payment History
          </h2>

          <div className="flex items-center justify-between bg-[#ECFDF5] px-4 py-3 rounded-2xl shadow-sm border border-gray-200">
            <div>
              <p className="text-sm font-semibold text-[#189966]">
                September Fee - 2024
              </p>
              <p className="text-xs text-[#189966]">Submitted: Sep 15, 2024</p>
            </div>

            <span className="bg-[#FFE550CF] text-[#997B18] px-3 py-1 rounded-full text-xs font-medium">
              Pending
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MembershipPayment;
