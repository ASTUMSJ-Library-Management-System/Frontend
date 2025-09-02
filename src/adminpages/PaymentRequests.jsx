import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import AppLayout from "../components/AppLayout";
import PaymentReviewModal from "../components/PaymentReviewModal";
import { paymentAPI } from "../lib/api";
import { toast } from "sonner";

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
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const paymentsData = await paymentAPI.getPayments();
      console.log("Fetched payments data:", paymentsData);
      setPayments(paymentsData);
    } catch (error) {
      toast.error(error.message || "Failed to fetch records.");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (paymentId, newStatus) => {
    try {
      await paymentAPI.updatePaymentStatus(paymentId, newStatus);
      await fetchPayments();
      toast.success(`Payment ${newStatus.toLowerCase()} successfully!`);
    } catch (error) {
      toast.error(error.message || "Failed to update status.");
    }
  };

  const pendingRequests = payments.filter(
    (payment) => payment.status === "Pending"
  );

  const allRequests = payments;

  const handleReviewClick = (payment) => {
    setSelectedPayment(payment);
    setIsModalOpen(true);
  };

  if (loading) {
    return (
      <AppLayout>
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Loading payments...</div>
        </div>
      </AppLayout>
    );
  }

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
              {pendingRequests.length === 0 ? (
                <p className="text-[#997B18] text-center py-4">
                  No pending payments
                </p>
              ) : (
                pendingRequests.map((request) => (
                  <div
                    key={request._id}
                    className="flex items-center justify-between p-4 border border-[#D9B85F] rounded-lg bg-[#FFFCEA] shadow-sm"
                  >
                    <div className="flex flex-col gap-1 text-sm">
                      <p className="font-medium mb-2 text-[#997F18]">
                        {request.userId?.username ||
                          request.user?.username ||
                          request.userId?.name ||
                          request.user?.name ||
                          "Unknown User"}
                      </p>
                      <p className="text-[#997F18] font-normal">
                        {request.userId?.email ||
                          request.user?.email ||
                          "No email"}{" "}
                        • Amount: Br50 • Submitted:{" "}
                        {new Date(request.createdAt).toLocaleDateString()}
                      </p>
                      <p className="text-[#997F18] font-normal">
                        Ref: {request.reference || "No reference"}
                      </p>
                    </div>
                    <Button
                      onClick={() => handleReviewClick(request)}
                      className="bg-[#FFFCEA] hover:bg-[#ecdc82] text-[#997B18] border border-[#FAD91C] font-medium rounded-lg px-6 shadow-sm"
                    >
                      Review
                    </Button>
                  </div>
                ))
              )}
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
              {allRequests.length === 0 ? (
                <p className="text-[#189966] text-center py-4">
                  No payment requests found
                </p>
              ) : (
                allRequests.map((request) => (
                  <div
                    key={request._id}
                    className={`flex items-center justify-between p-4 rounded-lg shadow-sm ${
                      request.status === "Pending"
                        ? "bg-[#FFE550CF] border-[#FAD91C] font-semibold text-[#997B18]"
                        : request.status === "Approved"
                        ? "bg-[#C9FAE3] text-[#189966] font-semibold border-[#A4F4CF]"
                        : request.status === "Rejected"
                        ? "bg-[#FFB7B4CF] text-[#C3090C] font-semibold border-[#FAD91C]"
                        : ""
                    }`}
                  >
                    <div
                      className={`flex flex-col gap-1 text-sm ${
                        request.status === "Rejected"
                          ? "text-[#C3090C]"
                          : "text-[#189966]"
                      }`}
                    >
                      <p className="font-medium">
                        {request.userId?.username ||
                          request.user?.username ||
                          request.userId?.name ||
                          request.user?.name ||
                          "Unknown User"}
                      </p>
                      <p className="font-normal">
                        {request.userId?.email ||
                          request.user?.email ||
                          "No email"}{" "}
                        • Br50 •{" "}
                        {new Date(request.createdAt).toLocaleDateString()}
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
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modal */}
      <PaymentReviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        paymentData={selectedPayment}
        onStatusUpdate={handleStatusUpdate}
      />
    </AppLayout>
  );
}
