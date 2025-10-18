import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import { BookOpen, Eye, EyeOff, Mail } from "lucide-react";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Button } from "@/components/ui/Button.jsx";
import { useAuth } from "@/hooks/useAuth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showForgot, setShowForgot] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetSent, setResetSent] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await login({ email, password });
      if (result.success) {
        navigate("/dashboard");
      } else {
        setError(result.error || "Invalid email or password.");
      }
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotSubmit = (e) => {
    e.preventDefault();
    if (!resetEmail) return;
    setResetSent(true);
    setTimeout(() => {
      setResetSent(false);
      setShowForgot(false);
      setResetEmail("");
    }, 3000);
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
              Access your library management account
            </p>
          </CardHeader>

          <CardContent>
            {!showForgot && (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email */}
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder=" "
                    autoComplete="email"
                    aria-invalid={!!error}
                    className="peer pr-10 border-[#009966]/30 focus:ring-[#009966] focus:border-[#009966] placeholder-transparent"
                  />
                  <Label
                    htmlFor="email"
                    className="
                      pointer-events-none absolute left-3 bg-white px-1
                      transition-all text-gray-500
                      peer-placeholder-shown:top-2 peer-placeholder-shown:text-base
                      peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#009966]
                      peer-[&:not(:placeholder-shown)]:-top-2
                      peer-[&:not(:placeholder-shown)]:text-xs
                    "
                  >
                    Email
                  </Label>
                </div>

                {/* Password */}
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder=" "
                    autoComplete="current-password"
                    aria-invalid={!!error}
                    className="peer pr-12 border-[#009966]/30 focus:ring-[#009966] focus:border-[#009966] placeholder-transparent"
                  />
                  <Label
                    htmlFor="password"
                    className="
                      pointer-events-none absolute left-3 bg-white px-1
                      transition-all text-gray-500
                      peer-placeholder-shown:top-2 peer-placeholder-shown:text-base
                      peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#009966]
                      peer-[&:not(:placeholder-shown)]:-top-2
                      peer-[&:not(:placeholder-shown)]:text-xs
                    "
                  >
                    Password
                  </Label>

                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 outline-none focus:ring-2 focus:ring-[#009966]"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                <div className="text-right -mt-4">
                  <button
                    type="button"
                    onClick={() => setShowForgot(true)}
                    className="text-sm text-[#009966] hover:underline"
                  >
                    Forgot your password?
                  </button>
                </div>

                {error && (
                  <p className="text-red-600 text-sm text-center">{error}</p>
                )}

                <Motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#009966] hover:bg-[#007a52] text-white rounded-md py-2 disabled:opacity-70"
                  >
                    {loading ? "Signing in..." : "Sign In"}
                  </Button>
                </Motion.div>
              </form>
            )}

            {/* Forgot password form */}
            {showForgot && (
              <form onSubmit={handleForgotSubmit} className="space-y-6">
                <div className="relative">
                  <Input
                    id="resetEmail"
                    type="email"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    required
                    placeholder=" "
                    autoComplete="email"
                    className="peer pr-10 border-[#009966]/30 focus:ring-[#009966] focus:border-[#009966] placeholder-transparent"
                  />
                  <Label
                    htmlFor="resetEmail"
                    className="
                      pointer-events-none absolute left-3 bg-white px-1
                      transition-all text-gray-500
                      peer-placeholder-shown:top-2 peer-placeholder-shown:text-base
                      peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#009966]
                      peer-[&:not(:placeholder-shown)]:-top-2
                      peer-[&:not(:placeholder-shown)]:text-xs
                    "
                  >
                    Enter your email
                  </Label>
                </div>

                <Motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Button
                    type="submit"
                    disabled={!resetEmail}
                    className="w-full bg-[#009966] hover:bg-[#007a52] text-white rounded-md py-2 disabled:opacity-70 flex items-center justify-center gap-2"
                  >
                    <Mail size={16} /> Send Reset Link
                  </Button>
                </Motion.div>

                {resetSent && (
                  <p className="text-green-600 text-sm text-center">
                    A reset link has been sent to your email.
                  </p>
                )}

                <p className="text-center">
                  <button
                    type="button"
                    onClick={() => setShowForgot(false)}
                    className="text-gray-500 hover:underline text-sm"
                  >
                    Back to login
                  </button>
                </p>
              </form>
            )}

            {/* Footer */}
            <div className="mt-6 text-center text-sm text-gray-600">
              <p>
                Don’t have an account?{" "}
                <Link
                  to="/signup"
                  className="text-[#009966] font-semibold hover:underline"
                >
                  Register here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </Motion.div>
    </div>
  );
}
