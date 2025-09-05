import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";

import MembershipPayment from "./pages/MembershipPayment";
import Home from "./pages/Home";
import MyBooks from "./pages/MyBooks";
import Profile from "./pages/Profile";
import BrowseBooks from "./pages/BrowseBooks";
import Dashboard from "./pages/Dashboard";
import Achievements from "./pages/Achievements";
import SignupForm from "./pages/SignupForm";
import LoginPage from "./pages/LoginPage";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

import ManageBooks from "./adminpages/ManageBooks";
import ManageUsers from "./adminpages/ManageUsers";
import PaymentRequests from "./adminpages/PaymentRequests";
import BorrowingRecord from "./adminpages/BorrowingRecord";

export default function App() {
  return (
    <>
      <Toaster position="top-right" richColors />

      <Routes>
        <Route path="/" element={<Navigate to="/Home" replace />} />

        <Route path="/Home" element={<Home />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute onlyStudent>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/Achievements"
          element={
            <ProtectedRoute onlyStudent>
              <Achievements />
            </ProtectedRoute>
          }
        />
        <Route
          path="/browsebooks"
          element={
            <ProtectedRoute onlyStudent>
              <BrowseBooks />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mybooks"
          element={
            <ProtectedRoute onlyStudent>
              <MyBooks />
            </ProtectedRoute>
          }
        />
        <Route
          path="/membershippayment"
          element={
            <ProtectedRoute onlyStudent>
              <MembershipPayment />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute onlyStudent>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* Admin-only routes */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute requireAdmin>
              <Dashboard type="admin" />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/managebooks"
          element={
            <ProtectedRoute requireAdmin>
              <ManageBooks />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/manageusers"
          element={
            <ProtectedRoute requireAdmin>
              <ManageUsers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/paymentrequests"
          element={
            <ProtectedRoute requireAdmin>
              <PaymentRequests />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/borrowingrecord"
          element={
            <ProtectedRoute requireAdmin>
              <BorrowingRecord />
            </ProtectedRoute>
          }
        />

        {/* 404 Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
