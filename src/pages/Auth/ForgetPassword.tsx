import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import toast from "react-hot-toast";
import { AuthService } from "../../apis/auth.service";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await AuthService.forgotPassword({ email });
      toast.success("Reset link sent to your email");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to send reset link"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
        <div className="bg-white shadow-lg rounded-2xl p-8 border border-orange-100">

            <div className="flex justify-center mb-5">
            <div className="h-16 w-16 rounded-full bg-orange-100 flex items-center justify-center">
                <Lock className="h-8 w-8 text-orange-600" />
            </div>
            </div>

            <h2 className="text-2xl font-bold text-center text-gray-800">
            Recover Your Account
            </h2>

            <p className="text-center text-gray-500 mt-2 mb-8">
            Don't worry. Your memories are safe with us.
            Enter your registered email address and we'll send you a password reset link.
            </p>

            <form onSubmit={handleSubmit}>
            <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
            </label>

            <div className="relative mb-6">
                <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />

                <input
                type="email"
                required
                placeholder="Enter your registered email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-xl font-medium transition-all disabled:opacity-50"
            >
                {loading ? "Sending..." : "Send Reset Link"}
            </button>
            </form>

            <div className="text-center mt-6">
            <Link
                to="/login"
                className="text-sm text-orange-600 hover:text-orange-700 font-medium"
            >
                ← Back to Login
            </Link>
            </div>
        </div>
        </div>
  );
}