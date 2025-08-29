import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AppLayout from "../components/AppLayout";

export default function ProfilePage() {
  return (
    <AppLayout>
      <div className="flex-1 px-8 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-[#006045]">Profile</h1>
          <Button className="bg-[#00A16B] hover:bg-[#22b67b] text-white font-medium rounded-lg px-6">
            Edit Profile
          </Button>
        </div>

        {/* Personal Information */}
        <Card className="w-full h-full rounded-lg border border-[#D9F3EA] bg-white shadow-sm mb-6">
          <CardContent className="p-6">
            <h2 className="font-semibold text-[#006045] mb-2">
              Personal Information
            </h2>
            <div className="flex flex-col md:flex-row gap-10 md:gap-20">
              {/* Left: Avatar and Info */}
              <div className="flex flex-col items-start gap-1">
                <div className="flex items-center gap-4 mb-2">
                  <div className="h-16 w-16 min-w-[64px] rounded-full bg-[#A4F4CF] flex items-center justify-center text-xl font-bold text-[#006045]">
                    SU
                  </div>
                  <div className="flex flex-col">
                    <div className="font-medium text-gray-900">
                      Temkin Abdulmelik
                    </div>
                    <div className="text-sm text-gray-500">UGR/25555/14</div>
                    <span className="mt-1 text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-md font-medium w-fit">
                      Pending
                    </span>
                  </div>
                </div>
              </div>

              {/* Right: Details Grid */}
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-16 text-sm">
                <div>
                  <p className="font-semibold text-[#006045]">Email</p>
                  <p className="text-gray-900 mt-1">abc@dfg.hi</p>
                </div>
                <div>
                  <p className="font-semibold text-[#006045]">Department</p>
                  <p className="text-gray-900 mt-1">CSE</p>
                </div>
                <div>
                  <p className="font-semibold text-[#006045]">Phone</p>
                  <p className="text-gray-900 mt-1">+251908976543</p>
                </div>
                <div>
                  <p className="font-semibold text-[#006045]">Join Date</p>
                  <p className="text-gray-900 mt-1">1/2/2002</p>
                </div>
                <div>
                  <p className="font-semibold text-[#006045]">
                    Membership Expired
                  </p>
                  <p className="text-gray-900 mt-1">12/31/2025</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security Setting */}
        <Card className="w-full rounded-lg border border-[#D9F3EA] bg-[#ffffff] shadow-sm">
          <CardContent className="p-6 flex justify-between items-center">
            <div>
              <h2 className="font-semibold text-[#006045]">Security Setting</h2>
              <p className="text-gray-600 text-sm mt-2">
                Password <br />
                <span className="text-xs text-gray-500">
                  Last changed 20 days ago
                </span>
              </p>
            </div>
            <Button className="bg-[#009966] hover:bg-[#22b67b] text-white font-medium rounded-lg px-6">
              Change Password
            </Button>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
