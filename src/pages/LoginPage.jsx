import { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // ✅ add Link
import { motion as Motion } from "framer-motion";
import { BookOpen } from "lucide-react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Button } from "@/components/ui/Button";

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
      {/* Animate the card */}
      <Motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <Card className="rounded-2xl shadow-lg border border-[#009966]/20 bg-white">
          {/* Header */}
          <CardHeader className="text-center space-y-3">
            <Motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, type: "spring" }}
              className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#009966] shadow"
            >
              <BookOpen className="h-7 w-7 text-white" />
            </Motion.div>
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

              {/* Submit Button with hover animation */}
              <Motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  type="submit"
                  className="w-full bg-[#009966] hover:bg-[#007a52] text-white rounded-md py-2"
                >
                  Sign In
                </Button>
              </Motion.div>
            </form>

            {/* Footer link */}
            <p className="mt-4 text-center text-sm text-gray-600">
              Don’t have an account?{" "}
              <Link
                to="/signup" // ✅ correct route
                className="text-[#009966] font-semibold hover:underline"
              >
                Register here
              </Link>
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
      </Motion.div>
    </div>
  );
}
