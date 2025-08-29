import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AppLayout from "../components/AppLayout";
import PaymentReviewModal from "../components/PaymentReviewModal";

const pendingRequests = [
  {
    name: "Ahmed Hassan",
    email: "ahmed@student.edu",
    id: "ST001",
    amount: "Br50",
    submitted: "1/15/2024",
    ref: "TXN123456789",
    notes: "Paid via mobile money",
    date: "1/15/2024",
  },
  {
    name: "Seid Nasir",
    email: "seid@student.edu",
    id: "ST002",
    amount: "Br50",
    submitted: "1/15/2024",
    ref: "TXN123456790",
    notes: "Paid via bank transfer",
    date: "1/15/2024",
  },
  {
    name: "Seid Nasir",
    email: "seid@student.edu",
    id: "ST003",
    amount: "Br50",
    submitted: "1/15/2024",
    ref: "TXN123456791",
    notes: "Paid via bank transfer",
    date: "1/15/2024",
  },
];

const allRequests = [
  {
    name: "Lina T",
    email: "lina@student.edu",
    amount: "Br50",
    submitted: "1/15/2024",
    status: "Pending",
  },
  {
    name: "Tursina Ishak",
    email: "tursina@student.edu",
    amount: "Br50",
    submitted: "1/15/2024",
    status: "Approved",
  },
  {
    name: "Khulud M",
    email: "kulud@student.edu",
    amount: "Br50",
    submitted: "1/15/2024",
    status: "Rejected",
  },
];

const getStatusBadgeColor = (status) => {
  switch (status) {
    case "Pending":
      return "bg-[#FFF9E6] text-[#FFB000]";
    case "Approved":
      return "bg-[#D9F3EA] text-[#006045]";
    case "Rejected":
      return "bg-[#FBE8E9] text-[#CB3A31]";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export default function PaymentsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);

  // Function to handle the "Review" button click
  const handleReviewClick = (payment) => {
    setSelectedPayment(payment);
    setIsModalOpen(true);
  };

  return (
    <AppLayout>
      <div className="flex-1 px-8 py-6 bg-[#EDFDF7]">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#006045]">
            Payment Requests
          </h1>
          <p className="text-[#189966] mt-1">
            Review and approve student membership payments.
          </p>
        </div>

        {/* Pending Payment Requests */}
        <Card className="w-full rounded-lg border border-[#D9B85F] bg-[#FFFFFFCF] shadow-sm mb-6">
          <CardContent className="p-6">
            <h2 className="font-semibold text-[#997B18] mb-4">
              Pending Payment Requests
            </h2>
            <p className="text-[#B28816] font-normal text-sm mb-6">
              These payments require your immediate attention
            </p>

            <div className="space-y-4">
              {pendingRequests.map((request, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border border-[#D9B85F] rounded-lg bg-[#FFFCEA] shadow-sm "
                >
                  <div className="flex flex-col gap-1 text-sm">
                    <p className="font-medium mb-2 text-[#997F18]">
                      {request.name}
                    </p>
                    <p className="text-[#997F18] font-normal">
                      {request.email} • ID: {request.id} • Amount:{" "}
                      {request.amount} • Submitted: {request.submitted}
                    </p>
                    <p className="text-[#997F18] font-normal">
                      Ref: {request.ref}
                    </p>
                  </div>
                  <Button
                    onClick={() => handleReviewClick(request)}
                    className="bg-[#FFFCEA] hover:bg-[#ecdc82] text-[#997B18] border border-[#FAD91C] font-medium rounded-lg px-6 shadow-sm"
                  >
                    Review
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* All Payment Requests */}
        <Card className="w-full rounded-lg border border-[#189966] bg-[#FFFFFFCF] shadow-gray-200">
          <CardContent className="p-6">
            <h2 className="font-semibold text-[#189966] mb-4">
              All Payment Requests
            </h2>
            <p className="text-[#189966] font-normal text-sm mb-6">
              Complete history of payment requests
            </p>

            <div className="space-y-4">
              {allRequests.map((request, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-4 border-[#ECFDF5] rounded-lg shadow-sm shadow-grey-200 bg-[#ECFDF5] 
                  ${(
                    <div className="shadow-grey-100 rounded-lg p-4">
                      request.status === "Pending" ? "bg-[#FFE550CF]
                      border-[#FAD91C] font-semibold text-[#997B18]" :
                      request.status === "Approved" ? "bg-[#C9FAE3]
                      text-[#189966] font-semibold border-[#A4F4CF]" :
                      request.status === "Rejected" ? "bg-[#FFB7B4CF]
                      text-[#C3090C] font-semibold border-[#FAD91C]" : ""
                    </div>
                  )} border`}
                >
                  <div className="flex flex-col gap-1 text-sm">
                    <p className="font-medium text-[#189966]">{request.name}</p>
                    <p className="text-[#189966] font-normal">
                      {request.email} • {request.amount} • {request.submitted}
                    </p>
                  </div>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-md font-medium w-fit ${getStatusBadgeColor(
                      request.status
                    )}`}
                  >
                    {request.status}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      {/* Render the modal component here */}
      <PaymentReviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        paymentData={selectedPayment}
      />
    </AppLayout>
  );
}
