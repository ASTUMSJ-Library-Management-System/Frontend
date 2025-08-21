import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Logging in with:", email, password);
    navigate("/dashboard");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#ECFDF5] px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <Card className="rounded-2xl shadow-lg border border-[#009966]/20 bg-white">
          {/* Header */}
          <CardHeader className="text-center space-y-3">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#009966] shadow">
              <BookOpen className="h-7 w-7 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-[#009966]">
              Sign In
            </CardTitle>
            <p className="text-sm text-gray-600">
              Sign in to access the library management system
            </p>
          </CardHeader>

          {/* Content */}
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div>
                <Label htmlFor="email" className="text-[#009966]">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="border-[#009966]/30 focus:ring-[#009966] focus:border-[#009966]"
                />
              </div>

              {/* Password */}
              <div>
                <Label htmlFor="password" className="text-[#009966]">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="border-[#009966]/30 focus:ring-[#009966] focus:border-[#009966]"
                />
              </div>

              {/* Submit */}
              <Button
                type="submit"
                className="w-full bg-[#009966] hover:bg-[#007a52] text-white rounded-md py-2"
              >
                Sign In
              </Button>
            </form>

            {/* Footer link */}
            <p className="mt-4 text-center text-sm text-gray-600">
              Don’t have an account?{" "}
              <a
                href="/register"
                className="text-[#009966] font-semibold hover:underline"
              >
                Register here
              </a>
            </p>
          </CardContent>

          {/* Demo credentials */}
          <CardFooter>
            <div className="w-full rounded-md bg-[#009966]/10 p-3 text-sm text-[#009966]">
              <p className="font-semibold">Demo Credentials:</p>
              <p>
                Admin: <span className="font-mono">admin@astu.edu.et</span> /{" "}
                <span className="font-mono">admin123</span>
              </p>
              <p>Student: any email / any password</p>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
