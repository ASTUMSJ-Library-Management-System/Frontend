import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
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
      <Motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <Card className="rounded-2xl shadow-lg border border-[#009966]/20 bg-white">
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

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder=" "
                  className="peer border-[#009966]/30 focus:ring-[#009966] focus:border-[#009966] placeholder-transparent"
                />
                <Label
                  htmlFor="email"
                  className="absolute left-3 top-2 text-gray-500 text-sm transition-all 
                             peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-400 
                             peer-placeholder-shown:text-base 
                             peer-focus:top-[-8px] peer-focus:text-xs peer-focus:text-[#009966] 
                             bg-white px-1"
                >
                  Email
                </Label>
              </div>

              <div className="relative">
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder=" "
                  className="peer border-[#009966]/30 focus:ring-[#009966] focus:border-[#009966] placeholder-transparent"
                />
                <Label
                  htmlFor="password"
                  className="absolute left-3 top-2 text-gray-500 text-sm transition-all 
                             peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-400 
                             peer-placeholder-shown:text-base 
                             peer-focus:top-[-8px] peer-focus:text-xs peer-focus:text-[#009966] 
                             bg-white px-1"
                >
                  Password
                </Label>
              </div>

              <Motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  type="submit"
                  className="w-full bg-[#009966] hover:bg-[#007a52] text-white rounded-md py-2"
                >
                  Sign In
                </Button>
              </Motion.div>
            </form>

            <p className="mt-4 text-center text-sm text-gray-600">
              Don’t have an account?{" "}
              <Link
                to="/signup"
                className="text-[#009966] font-semibold hover:underline"
              >
                Register here
              </Link>
            </p>
          </CardContent>

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
