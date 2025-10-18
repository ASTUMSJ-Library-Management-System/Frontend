import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/Button.jsx";
import { Toaster, toast } from "sonner";

export default function PaymentReviewModal({ isOpen, onClose, paymentData, onStatusUpdate }) {
  if (!paymentData) {
    return null;
  }

  const handleApprove = async () => {
    try {
      await onStatusUpdate(paymentData._id, "Approved");
      toast.success("Payment approved successfully!");
      onClose();
    } catch (error) {
      toast.error("Failed to approve payment: " + error.message);
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[500px] max-h-[80vh] overflow-y-auto bg-[#FFFFFF] p-8 rounded-lg shadow-lg">
          <DialogHeader className="mb-4">
            <DialogTitle className="text-xl font-semibold text-[#006045] text-[19px]">
              Payment Review
            </DialogTitle>
            <p className="text-sm text-[#189966]">
              Review payment details and screenshot
            </p>
          </DialogHeader>

          {/* Student Information and Payment Details */}
          <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-sm text-gray-700 mb-4">
            <div className="text-[#006045]">
              <p className="font-semibold text-[#006045] text-[15px] mb-1">
                Student Information
              </p>
              <p>Name: {paymentData.userId?.username || paymentData.user?.username || paymentData.userId?.name || paymentData.user?.name || "Unknown User"}</p>
              <p>Email: {paymentData.userId?.email || paymentData.user?.email || "No email"}</p>
              <p>Student ID: {paymentData.userId?.studentId || paymentData.user?.studentId || "No ID"}</p>
            </div>
            <div className="text-[#006045]">
              <p className="font-semibold text-[#006045] mb-1 text-[15px]">
                Payment Details
              </p>
              <p>Amount: Br50</p>
              <p>Date: {new Date(paymentData.createdAt).toLocaleDateString()}</p>
              <p>Ref: {paymentData.reference || "No reference"}</p>
              <p>Status: {paymentData.status}</p>
            </div>
          </div>

          {/* Notes Section */}
          {paymentData.notes && (
            <div className="mb-4">
              <p className="font-semibold text-[#189966] text-[15px] mb-1">
                Notes
              </p>
              <div className="bg-[#E9F4F0] p-4 rounded-md text-sm text-[#009966]">
                <p>{paymentData.notes}</p>
              </div>
            </div>
          )}

          {/* Payment Screenshot */}
          <div className="text-left mb-4">
            <p className="font-bold text-[#189966] mb-2">Payment Screenshot</p>
            <div className="relative w-full bg-[#ECFDF5] flex items-center justify-center rounded-lg border border-gray-200">
              {paymentData.screenshotUrl ? (
                <img
                  src={paymentData.screenshotUrl}
                  alt="Payment Screenshot"
                  className="w-full max-h-80 object-contain rounded-lg"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/300x200?text=Screenshot+Not+Available";
                  }}
                />
              ) : (
                <div className="w-full h-48 flex items-center justify-center text-gray-500">
                  <p>No screenshot available</p>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end items-center mt-6">
            <Button
              onClick={handleApprove}
              className="bg-[#09B255] text-white font-medium gap-3 rounded-lg px-6 hover:bg-[#057435]"
            >
              Approve Payment
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      <Toaster position="bottom-center" richColors />
    </>
  );
}
