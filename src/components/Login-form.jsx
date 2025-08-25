import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";

export function RegisterForm({ className, ...props }) {
  return (
    <div
      className={`flex flex-col gap-6 w-full max-w-md mx-auto min-h-[400px] ${
        className || ""
      }`}
      {...props}
    >
      <Card className="w-full rounded-2xl shadow-lg border border-[#009966]/20 bg-white">
        <CardHeader className="text-center">
          <div className="flex justify-center ">
            <div className="h-20 w-40 flex items-center justify-center">
              <img src="/Frame.png" alt="Logo" />
            </div>
          </div>
          <CardTitle className="text-[#006045] text-2xl font-bold">
            Join ASTUMSJ Library
          </CardTitle>
          <CardDescription className="text-[#189966] mt-2">
            Create your student account to access library services
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="  space-y-4">
              <div className="grid border-[#A4F4CF] gap-2">
                <Label className="text-[#008952B2] font-bold" htmlFor="name">
                  Full Name
                </Label>
                <Input
                  className="border-[#A4F4CF] focus:ring-2 focus:ring-green-500"
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label className="text-[#008952B2] font-bold" htmlFor="email">
                  Email
                </Label>
                <Input
                  className="border-[#A4F4CF] focus:ring-2 focus:ring-green-500"
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label
                  className="text-[#008952B2] font-bold"
                  htmlFor="studentId"
                >
                  Student ID
                </Label>
                <Input
                  className="border-[#A4F4CF] focus:ring-2 focus:ring-green-500"
                  id="studentId"
                  type="text"
                  placeholder="Enter your Student ID"
                  required
                />
              </div>
              <div className="grid gap-2 relative">
                <Label
                  className="text-[#008952B2] font-bold"
                  htmlFor="department"
                >
                  Department
                </Label>
                <Select>
                  <SelectTrigger
                    id="department"
                    className="bg-white border border-[#A4F4CF] rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <SelectValue
                      type="text"
                      placeholder="Select your department"
                    />
                  </SelectTrigger>
                  <SelectContent
                    position="popper"
                    className="bg-white border-[#A4F4CF] "
                  >
                    <SelectItem value="engineering">Engineering</SelectItem>
                    <SelectItem value="science">Science</SelectItem>
                    <SelectItem value="business">Business</SelectItem>
                    <SelectItem value="arts">Arts</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label
                  className="text-[#008952B2] font-bold"
                  htmlFor="password"
                >
                  Password
                </Label>
                <Input
                  className="border-[#A4F4CF] focus:ring-2 focus:ring-green-500"
                  id="password"
                  type="password"
                  placeholder="Create Password"
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label
                  className="text-[#008952B2] font-bold"
                  htmlFor="confirmPassword"
                >
                  Confirm Password
                </Label>
                <Input
                  className="border-[#A4F4CF] focus:ring-2 focus:ring-green-500"
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-150%  bg-[#009966] text-[#FFFFFF] font-bold text-[15px] hover:bg-[#22b67b] rounded-md"
            >
              Sign In
            </Button>

            <div className="text-center text-[#189966] text-sm ">
              Don’t have an account?{" "}
              <a href="#" className="text-[#189966] font-bold hover:underline">
                Register here
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
