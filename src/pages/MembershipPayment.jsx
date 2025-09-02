import React, { useState, useEffect } from "react";
import AppLayout from "../components/AppLayout";
import { toast } from "sonner";
import { studentPaymentAPI } from "../lib/api";

const MembershipPayment = () => {
  const [loading, setLoading] = useState(false);
  const [screenshot, setScreenshot] = useState(null);
  const [transactionRef, setTransactionRef] = useState("");
  const [notes, setNotes] = useState("");
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [isPaid, setIsPaid] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    fetchPaymentData();
  }, []);

  const fetchPaymentData = async () => {
    try {
      setInitialLoading(true);
      const [paymentsData, paymentStatus] = await Promise.all([
        studentPaymentAPI.getMyPayments(),
        studentPaymentAPI.checkPaymentStatus()
      ]);
      setPaymentHistory(paymentsData);
      setIsPaid(paymentStatus.isPaid);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setInitialLoading(false);
    }
  };

  // Determine current status based on latest payment or subscription status
  const currentStatus = isPaid 
    ? "Active Subscription" 
    : paymentHistory.length > 0 
      ? paymentHistory[0].status 
      : "Not Submitted";

  const statusStyles = {
    Pending: "bg-[#FFE550CF] text-[#997B18]",
    Approved: "bg-[#D0FAE5] text-[#006045]",
    Rejected: "bg-red-100 text-red-700",
    "Active Subscription": "bg-green-100 text-green-700",
    "Not Submitted": "bg-gray-200 text-gray-600",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!screenshot || !transactionRef) {
      toast.error(
        "Please upload a screenshot and enter the transaction reference."
      );
      return;
    }

    // Do not block on client; backend enforces one approved payment per month

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('screenshot', screenshot);
      formData.append('reference', transactionRef);
      if (notes) {
        formData.append('notes', notes);
      }

      await studentPaymentAPI.submitPayment(formData);
      
      toast.success("Payment proof submitted! Pending admin verification.");

      // Reset form
      setScreenshot(null);
      setTransactionRef("");
      setNotes("");

      // Refresh payment data
      await fetchPaymentData();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <AppLayout>
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Loading payment information...</div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="flex-1 min-h-screen bg-[#EDFDF7]">
        <div className="flex-1 w-full p-6 space-y-6 overflow-hidden">
          {/* Page Title */}
          <div>
            <h1 className="text-2xl font-bold text-[#006045]">
              Membership Payment
            </h1>
            <p className="text-sm text-[#189966]">
              Pay your membership fee to access borrowing services.
            </p>
          </div>

          {/* Payment Status */}
          <div className="bg-[#FFFFFFCF] rounded-lg shadow-sm border border-gray-200 p-4">
            <h2 className="text-sm font-medium text-[16px] text-[#006045]">
              Payment Status
            </h2>
            <div className="mt-2 flex items-center gap-2">
              <span className="text-[#189966] font-medium">
                Current Status:
              </span>
              <span
                className={`text-xs px-3 py-1 rounded-full font-semibold ${statusStyles[currentStatus]}`}
              >
                {currentStatus}
              </span>
            </div>
            {isPaid ? (
              <p className="text-sm text-green-600 mt-2">
                ✅ Your payment is approved for this month. One approved payment covers a full month.
              </p>
            ) : currentStatus === 'Rejected' ? (
              <p className="text-sm text-red-600 mt-2">
                Your last payment was rejected. You can submit a new payment for this month.
              </p>
            ) : null}
          </div>

          {/* Payment Instructions */}
          <div className="bg-[#ECF4FD] p-4 rounded-md border border-[#BEE3F8] shadow-sm">
            <h3 className="text-lg font-semibold text-[#0051FF] mb-2">
              Payment Instructions
            </h3>
            <ol className="list-decimal ml-5 space-y-1 text-[#0051FF] text-sm">
              <li>
                Make the membership payment using any of the available methods:
                <ul className="list-disc ml-5 mt-1 text-[#0051FF] text-sm">
                  <li>
                    <strong>Bank Transfer:</strong> Transfer 50.00 Birr to
                    Account <span className="font-mono">100012345678</span>{" "}
                    (ASTUMSJ Library)
                  </li>
                  <li>
                    <strong>Cash Payment:</strong> Visit the library office
                    during working hours to pay in person
                  </li>
                </ul>
              </li>
              <li>
                Take a clear screenshot or photo of your payment receipt or
                transaction confirmation.
              </li>
              <li>
                Upload the screenshot in the "Submit Payment Proof" section
                below.
              </li>
              <li>Enter the transaction reference number in the form.</li>
              <li>Optionally, provide additional notes if needed.</li>
              <li>
                Click <strong>Submit Payment Proof</strong> and wait for the
                admin to verify your payment.
              </li>
            </ol>
            <p className="text-sm text-gray-600 mt-2">
              Once verified, your payment status will change from{" "}
              <span className="font-semibold text-[#997B18]">Pending</span> to{" "}
              <span className="font-semibold text-green-600">Approved</span>.
            </p>
          </div>

          {/* Submit Payment Proof - Only hide if an approved payment exists this month */}
          {!isPaid && (
            <div className="bg-[#FFFFFFCF] rounded-lg shadow-sm border border-gray-200 p-4 space-y-4">
              <h2 className="text-sm font-semibold text-[#006045] text-[20px]">
                Submit Payment Proof
              </h2>
              <p className="text-sm text-[#189966] text-[17px] font-normal">
                Upload your payment screenshot for verification
              </p>
              <form className="space-y-3" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-sm text-[#189966] text-[15px] font-semibold mb-1">
                    Payment Screenshot *
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setScreenshot(e.target.files[0])}
                    className="w-full text-sm text-gray-600 border border-gray-300 rounded-md px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#189966] text-[15px] font-semibold mb-1">
                    Transaction Reference *
                  </label>
                  <input
                    type="text"
                    value={transactionRef}
                    onChange={(e) => setTransactionRef(e.target.value)}
                    placeholder="Transaction reference"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#189966] text-[15px] font-semibold mb-1">
                    Additional Notes (Optional)
                  </label>
                  <input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Optional details"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-2 rounded-md font-medium text-white transition ${
                    loading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-700"
                  }`}
                >
                  {loading ? "Submitting..." : "Submit Payment Proof"}
                </button>
              </form>
            </div>
          )}

          {/* Active Subscription Message */}
          {isPaid && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 text-lg">✓</span>
                </div>
                <div>
                  <h3 className="text-green-800 font-semibold">Active Subscription</h3>
                  <p className="text-green-700 text-sm">
                    You have an approved membership payment for this month. You can now borrow up to 3 books from the library.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Payment History */}
          <div className="bg-[#FFFFFFCF] rounded-lg shadow-sm border border-gray-200 p-4 space-y-4">
            <h2 className="text-sm font-semibold text-[#189966] text-[20px]">
              Payment History
            </h2>

            {paymentHistory.length === 0 ? (
              <p className="text-gray-600">No payments submitted yet.</p>
            ) : (
              <div className="space-y-3">
                {paymentHistory.map((payment) => (
                  <div
                    key={payment._id}
                    className="flex items-center justify-between bg-[#ECFDF5] px-4 py-3 rounded-2xl shadow-sm border border-gray-200"
                  >
                    <div>
                      <p className="text-sm font-semibold text-[#189966]">
                        Membership Fee - {new Date(payment.createdAt).toLocaleString("default", {
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                      <p className="text-xs text-[#189966]">
                        Submitted: {new Date(payment.createdAt).toLocaleDateString()}
                      </p>
                      {payment.reference && (
                        <p className="text-xs text-gray-500">
                          Ref: {payment.reference}
                        </p>
                      )}
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        statusStyles[payment.status]
                      }`}
                    >
                      {payment.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default MembershipPayment;
