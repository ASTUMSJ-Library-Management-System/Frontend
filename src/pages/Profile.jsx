import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { X } from "lucide-react";
import AppLayout from "../components/AppLayout";
import { useAuth } from "@/hooks/useAuth";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

const formatDate = (date) => {
  return new Date(date).toISOString().split("T")[0];
};

const CenterModal = ({ isOpen, onClose, title, children }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <Motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-black/40" onClick={onClose}></div>

          <Motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="relative bg-white rounded-2xl shadow-lg w-full max-w-lg mx-4 p-6"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-[#006045]">{title}</h2>
              <X
                size={22}
                className="cursor-pointer text-gray-600 hover:text-gray-800"
                onClick={onClose}
              />
            </div>
            {children}
          </Motion.div>
        </Motion.div>
      )}
    </AnimatePresence>
  );
};

export default function ProfilePage() {
  const { user } = useAuth();
  const [editOpen, setEditOpen] = useState(false);
  const [passwordOpen, setPasswordOpen] = useState(false);

  const today = formatDate(new Date());
  const oneMonthLater = formatDate(
    new Date(new Date().setMonth(new Date().getMonth() + 1))
  );

  const [profile, setProfile] = useState({
    name: user?.name || "Guest User",
    studentId: user?.studentId || "N/A",
    email: user?.email || "N/A",
    department: user?.department || "N/A",
    phone: user?.phone || "N/A",
    joinDate: user?.joinDate || today,
    membershipExpiry: user?.membershipExpiry || oneMonthLater,
    status: user?.status || "Pending",
    photo: user?.photo || "",
  });

  const [password, setPassword] = useState({
    current: "",
    newPassword: "",
    confirm: "",
  });

  const handleProfileSave = (e) => {
    e.preventDefault();
    setEditOpen(false);

    toast.success("Profile updated successfully!", {
      description: "Your personal information has been saved.",
      duration: 3000,
    });
  };

  const handlePasswordSave = (e) => {
    e.preventDefault();
    if (password.newPassword !== password.confirm) {
      toast.error("Passwords do not match!", {
        description: "Please make sure both new password fields are identical.",
        duration: 3000,
      });
      return;
    }

    setPasswordOpen(false);

    toast.success("Password changed successfully!", {
      description: "You can now use your new password to log in.",
      duration: 3000,
    });
  };

  return (
    <AppLayout>
      <div className="flex-1 px-4 md:px-8 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-[#006045]">Profile</h1>
          <Button
            onClick={() => setEditOpen(true)}
            className="bg-[#00A16B] hover:bg-[#22b67b] text-white font-medium rounded-lg px-6"
          >
            Edit Profile
          </Button>
        </div>

        <Card className="w-full rounded-2xl border border-[#D9F3EA] bg-white shadow-md mb-6">
          <CardContent className="p-6">
            <h2 className="font-semibold text-[#006045] mb-4">
              Personal Information
            </h2>
            <div className="flex flex-col md:flex-row gap-10 md:gap-20">
              <div className="flex flex-col items-start gap-1">
                <div className="flex items-center gap-4 mb-2">
                  {profile.photo ? (
                    <img
                      src={profile.photo}
                      alt="Profile"
                      className="h-16 w-16 rounded-full object-cover border-2 border-[#00A16B]"
                    />
                  ) : (
                    <div className="h-16 w-16 min-w-[64px] rounded-full bg-[#A4F4CF] flex items-center justify-center text-xl font-bold text-[#006045]">
                      {profile.name?.charAt(0) || "U"}
                    </div>
                  )}

                  <div className="flex flex-col">
                    <div className="font-medium text-gray-900">
                      {profile.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {profile.studentId}
                    </div>
                    <span
                      className={`mt-1 text-xs px-2 py-0.5 rounded-md font-medium w-fit ${
                        profile.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {profile.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-16 text-sm">
                <div>
                  <p className="font-semibold text-[#006045]">Email</p>
                  <p className="text-gray-900 mt-1">{profile.email}</p>
                </div>
                <div>
                  <p className="font-semibold text-[#006045]">Department</p>
                  <p className="text-gray-900 mt-1">{profile.department}</p>
                </div>
                <div>
                  <p className="font-semibold text-[#006045]">Phone</p>
                  <p className="text-gray-900 mt-1">{profile.phone}</p>
                </div>
                <div>
                  <p className="font-semibold text-[#006045]">Join Date</p>
                  <p className="text-gray-900 mt-1">{profile.joinDate}</p>
                </div>
                <div>
                  <p className="font-semibold text-[#006045]">
                    Membership Expiry
                  </p>
                  <p className="text-gray-900 mt-1">
                    {profile.membershipExpiry}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="w-full rounded-2xl border border-[#D9F3EA] bg-white shadow-md">
          <CardContent className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-0">
            <div>
              <h2 className="font-semibold text-[#006045]">Security Setting</h2>
              <p className="text-gray-600 text-sm mt-2">
                Password <br />
                <span className="text-xs text-gray-500">
                  Last changed 20 days ago
                </span>
              </p>
            </div>
            <Button
              onClick={() => setPasswordOpen(true)}
              className="bg-[#009966] hover:bg-[#22b67b] text-white font-medium rounded-lg px-6"
            >
              Change Password
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Edit Profile Modal */}
      <CenterModal
        isOpen={editOpen}
        onClose={() => setEditOpen(false)}
        title="Edit Profile"
      >
        <form onSubmit={handleProfileSave} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Profile Photo
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setProfile({ ...profile, photo: reader.result });
                  };
                  reader.readAsDataURL(file);
                }
              }}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              required
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#00A16B] focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              required
              value={profile.email}
              onChange={(e) =>
                setProfile({ ...profile, email: e.target.value })
              }
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#00A16B] focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone
            </label>
            <input
              type="tel"
              required
              value={profile.phone}
              onChange={(e) =>
                setProfile({ ...profile, phone: e.target.value })
              }
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#00A16B] focus:outline-none"
            />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              onClick={() => setEditOpen(false)}
              className="px-5 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 
               active:bg-gray-300 transition font-medium shadow-sm"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="px-5 py-2 rounded-lg bg-[#00A16B] text-white hover:bg-[#22b67b] 
               active:bg-[#008f5e] transition font-medium shadow-sm"
            >
              Save
            </Button>
          </div>
        </form>
      </CenterModal>

      {/* Change Password Modal */}
      <CenterModal
        isOpen={passwordOpen}
        onClose={() => setPasswordOpen(false)}
        title="Change Password"
      >
        <form onSubmit={handlePasswordSave} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Current Password
            </label>
            <input
              type="password"
              required
              value={password.current}
              onChange={(e) =>
                setPassword({ ...password, current: e.target.value })
              }
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#00A16B] focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <input
              type="password"
              required
              minLength={6}
              value={password.newPassword}
              onChange={(e) =>
                setPassword({ ...password, newPassword: e.target.value })
              }
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#00A16B] focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              required
              value={password.confirm}
              onChange={(e) =>
                setPassword({ ...password, confirm: e.target.value })
              }
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#00A16B] focus:outline-none"
            />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              onClick={() => setPasswordOpen(false)}
              className="px-5 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 
               active:bg-gray-300 transition font-medium shadow-sm"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="px-5 py-2 rounded-lg bg-[#009966] text-white hover:bg-[#22b67b] 
               active:bg-[#008f5e] transition font-medium shadow-sm"
            >
              Change Password
            </Button>
          </div>
        </form>
      </CenterModal>
    </AppLayout>
  );
}
