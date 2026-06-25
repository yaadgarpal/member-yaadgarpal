import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthService } from "../../apis/auth.service";


export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
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
  }
};



  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
          {error}
        </div>
      )}
      
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email address
        </label>
        <div className="mt-1">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <div className="mt-1">
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={formData.password}
            onChange={handleChange}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="mt-2 text-right">
            <Link
                to="/forgot-password"
                className="text-sm text-indigo-600 hover:text-indigo-500"
                >
                Forgot Password?
            </Link>
        </div>
      </div>

      <div>
        <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
            login
        </button>
      </div>

      <div className="text-center mt-4">
        <span className="text-sm text-gray-600">Don't have an account? </span>
        <Link to="/signup" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
          Sign up here
        </Link>
      </div>
    </form>
  );
}
