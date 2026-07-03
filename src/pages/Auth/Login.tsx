import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  LogIn,
} from "lucide-react";
import { AuthService } from "../../apis/auth.service";


export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError("");

  if (!formData.email || !formData.password) {
    setError("Please fill in all fields.");
    return;
  }

  try {
    setLoading(true);
    const response = await AuthService.login({
        email: formData.email,
        password: formData.password,
        });

        localStorage.setItem(
        "token",
        response.data.token
        );

        localStorage.setItem(
        "user",
        JSON.stringify(response.data.member)
        );

    toast.success("Login Successful");

    navigate("/dashboard");
  } catch (error: any) {
    console.error(error);

    setError(
      error?.response?.data?.message ||
      "Invalid email or password"
    );

    toast.error(
      error?.response?.data?.message ||
      "Login Failed"
    );
  } finally{
    setLoading(false);
  }
};



  return (
    
    <form
  onSubmit={handleSubmit}
  className="space-y-6 rounded-2xl bg-white p-8 shadow-xl border border-gray-100"
>
      {error && (
  <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
    <div className="flex items-center gap-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 text-red-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 9v2m0 4h.01M5.07 19h13.86c1.54 0 2.5-1.67 1.73-3L13.73 4c-.77-1.33-2.69-1.33-3.46 0L3.34 16c-.77 1.33.19 3 1.73 3z"
        />
      </svg>

      <p className="text-sm font-medium text-red-600">
        {error}
      </p>
    </div>
  </div>
)
}
      
      <div>
        <label
            htmlFor="email"
            className="block text-sm font-semibold text-gray-700 mb-2"
        >
            Email Address
        </label>

        <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />

            <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 shadow-sm hover:border-purple-400"
            />
        </div>
        </div>

      <div>
        <label
            htmlFor="password"
            className="block text-sm font-semibold text-gray-700 mb-2"
        >
            Password
        </label>

        <div className="relative">

            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />

            <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            required
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 shadow-sm hover:border-purple-400"
            />

            <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-purple-600"
            >
            {showPassword ? (
                <EyeOff className="h-5 w-5" />
            ) : (
                <Eye className="h-5 w-5" />
            )}
            </button>

        </div>

        <div className="mt-3 flex justify-end">
            <Link
            to="/forgot-password"
            className="text-sm font-medium text-purple-600 hover:text-purple-700"
            >
            Forgot Password?
            </Link>
        </div>
        </div>
    
        <div>
        <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 py-3.5 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
        >
            {loading ? (
            <>
                <svg
                className="h-5 w-5 animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                >
                <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                ></circle>

                <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v3a5 5 0 00-5 5H4z"
                ></path>
                </svg>

                Signing In...
            </>
            ) : (
            <>
                <LogIn className="h-5 w-5" />
                Sign In
            </>
            )}
        </button>
        </div>
      

      <div className="pt-4 border-t border-gray-200">

  <p className="text-center text-sm text-gray-600">
    Don't have an account?
  </p>

  <Link
    to="/signup"
    className="mt-3 flex justify-center rounded-xl border border-purple-600 py-3 font-semibold text-purple-600 transition hover:bg-purple-600 hover:text-white"
  >
    Create New Account
  </Link>

</div>
    </form>
  );
}
