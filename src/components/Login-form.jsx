import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "@/hooks/useAuth";
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
export function RegisterForm({ className, ...props }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [department, setDepartment] = useState("");
  const navigate = useNavigate();
  const { register: registerUser } = useAuth();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const onSubmit = async (data) => {
    if (!department) {
      setError("Please select a department");
      return;
    }

    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const userData = { ...data, department };
      const result = await registerUser(userData);
      
      if (result.success) {
        setSuccess("Registration successful! Redirecting to dashboard...");
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      } else {
        setError(result.error);
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const departments = [
    { value: "engineering", label: "Engineering" },
    { value: "science", label: "Science" },
    { value: "business", label: "Business" },
    { value: "arts", label: "Arts" },
  ];

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="shadow-lg border-0">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="h-20 w-20 flex items-center justify-center rounded-full bg-green-600 shadow-lg">
              <img src="/Frame.png" alt="Logo" className="h-12 w-12" />
            </div>
          </div>
          
          <CardTitle className="text-[#006045] text-2xl font-bold">
            Join ASTUMSJ Library
          </CardTitle>
          <CardDescription className="text-green-700">
            Create your student account to access library services
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md">
              <p className="text-green-600 text-sm">{success}</p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="text-[#008952B2] space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  className={cn(
                    "border-gray-300 focus:border-green-500 focus:ring-green-500",
                    errors.name && "border-red-500 focus:border-red-500 focus:ring-red-500"
                  )}
                  {...register("name", {
                    required: "Full name is required",
                    minLength: {
                      value: 2,
                      message: "Name must be at least 2 characters"
                    }
                  })}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs">{errors.name.message}</p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className={cn(
                    "border-gray-300 focus:border-green-500 focus:ring-green-500",
                    errors.email && "border-red-500 focus:border-red-500 focus:ring-red-500"
                  )}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address"
                    }
                  })}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs">{errors.email.message}</p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="studentId">Student ID</Label>
                <Input
                  id="studentId"
                  type="text"
                  placeholder="Enter your Student ID"
                  className={cn(
                    "border-gray-300 focus:border-green-500 focus:ring-green-500",
                    errors.studentId && "border-red-500 focus:border-red-500 focus:ring-red-500"
                  )}
                  {...register("studentId", {
                    required: "Student ID is required",
                    minLength: {
                      value: 5,
                      message: "Student ID must be at least 5 characters"
                    }
                  })}
                />
                {errors.studentId && (
                  <p className="text-red-500 text-xs">{errors.studentId.message}</p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="department">Department</Label>
                
                <select
                  value={department}
                  onChange={(e) => {
                    console.log('Department selected:', e.target.value);
                    setDepartment(e.target.value);
                  }}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                >
                  <option value="">Select your department</option>
                  {departments.map((dept) => (
                    <option key={dept.value} value={dept.value}>
                      {dept.label}
                    </option>
                  ))}
                </select>
                
                {!department && (
                  <p className="text-red-500 text-xs">Department is required</p>
                )}
                {department && (
                  <p className="text-green-500 text-xs">Selected: {department}</p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Create Password"
                  className={cn(
                    "border-gray-300 focus:border-green-500 focus:ring-green-500",
                    errors.password && "border-red-500 focus:border-red-500 focus:ring-red-500"
                  )}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters"
                    }
                  })}
                />
                {errors.password && (
                  <p className="text-red-500 text-xs">{errors.password.message}</p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  className={cn(
                    "border-gray-300 focus:border-green-500 focus:ring-green-500",
                    errors.confirmPassword && "border-red-500 focus:border-red-500 focus:ring-red-500"
                  )}
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === password || "Passwords do not match"
                  })}
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs">{errors.confirmPassword.message}</p>
                )}
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Creating Account...
                </div>
              ) : (
                "Create Account"
              )}
            </Button>

            <div className="text-center text-sm mt-2">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-green-700 font-semibold hover:underline"
              >
                Sign in here
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
