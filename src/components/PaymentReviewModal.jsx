import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function PaymentReviewModal({ isOpen, onClose, paymentData }) {
  if (!paymentData) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] h[200px] bg-[#FFFFFF] p-8 rounded-rg shadow-lg">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-xl font-semibold text-[#006045] text-[19px]">
            Payment Review
          </DialogTitle>
          <p className="text-sm text-[#189966]">
            Review payment details and screenshot
          </p>
        </DialogHeader>

        {/* Student Information and Payment Details */}
        <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-sm text-gray-700 mb-2">
          <div className="text-[#006045]">
            <p className="font-semibold text-[#006045] text-[15px] mb-1">
              Student Information
            </p>
            <p>Name: {paymentData.name}</p>
            <p>Email: {paymentData.email}</p>
            <p>ID: {paymentData.id}</p>
          </div>
          <div className="text-[#006045]">
            <p className="font-semibold text-[#006045] mb-1 text-[15px]">
              Payment Details
            </p>
            <p>Amount: {paymentData.amount}</p>
            <p>Date: {paymentData.date}</p>
            <p>Ref: {paymentData.ref}</p>
          </div>
        </div>

        {/* Notes Section */}
        <div className="mb-1">
          <p className="font-semibold text-[#189966] text-[15px] mb-1">Notes</p>
          <div className="bg-[#E9F4F0] p-4 rounded-md text-sm text-[#009966]">
            <p>{paymentData.notes}</p>
          </div>
        </div>

        {/* Payment Screenshot */}
        <div className="text-left">
          <p className="font-bold text-[#189966] mb-1">Payment Screenshot</p>
          <div className="relative w-[300] h-[300] mx-auto  bg-[#ECFDF5] flex items-center justify-center">
            <img
              src="/payment successful.png"
              alt="Payment Screenshot"
              className="w-60 h-60 object-cover  border-[#ECFDF5] shadow-md"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center mt-8">
          <Button className="bg-[#09B255] mr-3  text-white font-medium gap-3 rounded-lg px-6 hover:bg-[#057435]">
            Approve Payment
          </Button>
          <Button className="bg-[#ffffff] ml-3 text-[#B80808] boarder-[#B80808] font-medium rounded-lg px-6 hover:bg-[#FFB7B4CF] hover:text-[#B80808] hover:border-[#B80808] border">
            Reject Payment
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
