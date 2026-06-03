import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthService } from "../../apis/auth.service";
import { CheckCircle, Mail, Lock, Phone, MapPin, User, Eye, EyeOff, ArrowLeft, Sparkles } from "lucide-react";

export default function Signup() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    address: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.fullName || !formData.email || !formData.mobile || !formData.password || !formData.address) {
      toast.error("Please fill in all fields.");
      setLoading(false);
      return;
    }
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      setLoading(false);
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match.");
      setLoading(false);
      return;
    }

    const payload = {
      name: formData.fullName,
      email: formData.email,
      phone: formData.mobile,
      password: formData.password,
      address: formData.address,
    };
    try {
      const response: any = await AuthService.register(payload);
      if (response?.statusCode === 201) {
        toast.success("Registration successful! Please login.");
        setSubmitted(true);
      } else {
        toast.error(response?.message || "Registration failed. Please try again.");
      }
    } catch {
      toast.error("An error occurred during registration. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-indigo-600 via-blue-600 to-violet-700 flex items-center justify-center p-4">
        {/* Decorative blobs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-violet-400/20 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl" />

        <div className="relative bg-white rounded-3xl shadow-2xl p-8 sm:p-12 max-w-md w-full text-center">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-green-500" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Welcome aboard!</h2>
          <p className="text-gray-500 mb-2">Your registration is complete.</p>
          <p className="text-sm text-gray-400 mb-8">
            We've sent a confirmation to your email. You're all set to explore YaadgarPal.
          </p>
          <Link
            to="/login"
            className="inline-flex items-center justify-center w-full px-6 py-3.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 transition-all duration-200 shadow-lg shadow-indigo-200 hover:shadow-indigo-300"
          >
            Proceed to Login
          </Link>
        </div>
      </div>
    );
  }

  const benefits = [
    { icon: "🎉", title: "Exclusive Offers", desc: "Access special deals and early bird offers" },
    { icon: "🔒", title: "Secure & Safe", desc: "Your data is encrypted and protected" },
    { icon: "🌟", title: "Earn Rewards", desc: "Collect points on every booking" },
    { icon: "⚡", title: "Quick Booking", desc: "Reserve venues in just a few clicks" },
    { icon: "💬", title: "24/7 Support", desc: "We're here to help anytime" },
    { icon: "🎁", title: "Welcome Bonus", desc: "Get credits on your first booking" },
  ];

  return (
    <div className="fixed inset-0 flex flex-col lg:flex-row overflow-hidden">
      {/* ─── LEFT PANEL: Branding (desktop only) ─── */}
      <div className="hidden lg:flex lg:w-[420px] xl:w-[480px] 2xl:w-[520px] flex-shrink-0 flex-col bg-gradient-to-br from-indigo-600 via-blue-600 to-violet-700 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-white/5 rounded-full translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-20 -left-16 w-64 h-64 bg-violet-500/20 rounded-full" />
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-blue-400/10 rounded-full translate-x-1/4 translate-y-1/4" />

        <div className="relative flex flex-col h-full p-8 xl:p-10">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-auto">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="text-white font-bold text-lg">YaadgarPal</span>
          </div>

          {/* Main copy */}
          <div className="py-10">
            <h1 className="text-3xl xl:text-4xl font-bold text-white leading-tight mb-4">
              Create memories<br />that last forever
            </h1>
            <p className="text-indigo-200 text-base leading-relaxed">
              Join thousands of users discovering amazing experiences and booking unforgettable venues.
            </p>
          </div>

          {/* Benefits */}
          <div className="space-y-3 mb-10">
            {benefits.map((b, i) => (
              <div key={i} className="flex items-center gap-3 bg-white/10 rounded-xl px-4 py-3 backdrop-blur-sm">
                <span className="text-xl flex-shrink-0">{b.icon}</span>
                <div>
                  <p className="text-white text-sm font-semibold leading-none mb-0.5">{b.title}</p>
                  <p className="text-indigo-200 text-xs">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Trust badge */}
          <div className="bg-white/10 rounded-xl px-4 py-3 text-center backdrop-blur-sm">
            <p className="text-indigo-100 text-sm">
              ✓ Trusted by <span className="font-bold text-white">50,000+</span> happy users
            </p>
          </div>
        </div>
      </div>

      {/* ─── RIGHT PANEL: Form ─── */}
      <div className="flex-1 flex flex-col bg-gray-50 overflow-y-auto">
        {/* Mobile top bar */}
        <div className="lg:hidden bg-gradient-to-r from-indigo-600 to-blue-600 px-4 py-4 flex items-center gap-3 flex-shrink-0">
          <Link to="/" className="text-white/80 hover:text-white transition">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-white" />
            <span className="text-white font-bold text-base">YaadgarPal</span>
          </div>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 flex flex-col">
          {/* Desktop back link */}
          <div className="hidden lg:flex items-center px-8 xl:px-12 pt-6">
            <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-indigo-600 hover:text-indigo-700 font-medium transition">
              <ArrowLeft className="w-4 h-4" />
              Back to home
            </Link>
          </div>

          {/* Form container */}
          <div className="flex-1 flex flex-col justify-center px-4 sm:px-8 lg:px-12 xl:px-16 py-6 lg:py-8 max-w-2xl w-full mx-auto lg:mx-0 lg:max-w-none">
            {/* Header */}
            <div className="mb-6 lg:mb-8">
              <h2 className="text-2xl sm:text-3xl lg:text-3xl font-bold text-gray-900 mb-1.5">Create your account</h2>
              <p className="text-gray-500 text-sm sm:text-base">Fill in the details below to get started</p>
            </div>

            {/* Form card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-7 lg:p-8">
              <form className="space-y-4 sm:space-y-5" onSubmit={handleSubmit}>
                {/* Row 1: Full Name + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Full Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-4 w-4 text-gray-400" />
                      </div>
                      <input
                        id="fullName"
                        name="fullName"
                        type="text"
                        placeholder="John Doe"
                        required
                        value={formData.fullName}
                        onChange={handleChange}
                        className="block w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-lg bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-4 w-4 text-gray-400" />
                      </div>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="you@example.com"
                        autoComplete="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="block w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-lg bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:bg-white transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Mobile Number */}
                <div>
                  <label htmlFor="mobile" className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Mobile Number
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      id="mobile"
                      name="mobile"
                      type="tel"
                      placeholder="+91 98765 43210"
                      required
                      value={formData.mobile}
                      onChange={handleChange}
                      className="block w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-lg bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:bg-white transition-all"
                    />
                  </div>
                </div>

                {/* Row 2: Password + Confirm Password */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-4 w-4 text-gray-400" />
                      </div>
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Min. 6 characters"
                        required
                        value={formData.password}
                        onChange={handleChange}
                        className="block w-full pl-9 pr-10 py-2.5 text-sm border border-gray-200 rounded-lg bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:bg-white transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-4 w-4 text-gray-400" />
                      </div>
                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Re-enter password"
                        required
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="block w-full pl-9 pr-10 py-2.5 text-sm border border-gray-200 rounded-lg bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:bg-white transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label htmlFor="address" className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Address
                  </label>
                  <div className="relative">
                    <div className="absolute top-3 left-3 pointer-events-none">
                      <MapPin className="h-4 w-4 text-gray-400" />
                    </div>
                    <textarea
                      id="address"
                      name="address"
                      rows={3}
                      placeholder="Enter your full address"
                      required
                      value={formData.address}
                      onChange={handleChange}
                      className="block w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-lg bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:bg-white transition-all resize-none"
                    />
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center py-3 px-4 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 shadow-lg shadow-indigo-100 hover:shadow-indigo-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Creating Account...
                    </div>
                  ) : (
                    "Create Account"
                  )}
                </button>

                {/* Login link */}
                <p className="text-center text-sm text-gray-500 pt-1">
                  Already have an account?{" "}
                  <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-700 transition">
                    Sign in here
                  </Link>
                </p>
              </form>
            </div>

            {/* Footer note */}
            <p className="text-center text-xs text-gray-400 mt-4 px-2">
              By creating an account, you agree to our{" "}
              <a href="#" className="text-indigo-500 hover:text-indigo-600">Terms & Conditions</a>{" "}
              and{" "}
              <a href="#" className="text-indigo-500 hover:text-indigo-600">Privacy Policy</a>
            </p>

            {/* Mobile benefits (compact strip) */}
            <div className="lg:hidden mt-6 grid grid-cols-2 gap-2.5">
              {benefits.slice(0, 4).map((b, i) => (
                <div key={i} className="bg-white rounded-xl p-3 border border-gray-100 flex items-center gap-2.5">
                  <span className="text-lg flex-shrink-0">{b.icon}</span>
                  <div>
                    <p className="text-xs font-semibold text-gray-800 leading-none mb-0.5">{b.title}</p>
                    <p className="text-xs text-gray-400 leading-tight">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}