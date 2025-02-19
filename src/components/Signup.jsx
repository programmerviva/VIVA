import { useState } from "react";
import authService from "../appwrite/auth";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";
import { Button, Input, Logo } from "./index.js";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const create = async (data) => {
    setError("");
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(login(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="w-full max-w-md bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-2xl p-8 sm:p-10 border border-gray-600/30">
        {/* Logo Section */}
        <div className="mb-8 flex justify-center">
          <span className="inline-block w-full max-w-[140px] transition-transform duration-300 hover:scale-110">
            <Logo width="100%" />
          </span>
        </div>

        {/* Header Section */}
        <h2 className="text-center text-2xl sm:text-3xl font-bold text-amber-50 leading-tight mb-3 animate-fade-in">
          Create Your Account
        </h2>

        <p className="mb-8 text-center text-base text-gray-300/90">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-orange-400 hover:text-orange-300 transition-colors duration-200 hover:underline focus:outline-none focus:ring-2 focus:ring-orange-400 rounded-sm"
          >
            Sign In
          </Link>
        </p>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30 backdrop-blur-sm animate-shake">
            <p className="text-red-400 text-center text-sm font-medium">
              {error}
            </p>
          </div>
        )}

        {/* Form Section */}
        <form onSubmit={handleSubmit(create)} className="space-y-5">
          <Input
            label="Full Name"
            placeholder="Enter your full name"
            className="text-gray-100 bg-gray-700/50 border-gray-600/50 focus:border-orange-400 focus:ring-orange-400/30 placeholder-gray-400"
            {...register("name", {
              required: "Full name is required",
            })}
          />
          <Input
            label="Email"
            placeholder="Enter your email"
            type="email"
            className="text-gray-100 bg-gray-700/50 border-gray-600/50 focus:border-orange-400 focus:ring-orange-400/30 placeholder-gray-400"
            {...register("email", {
              required: "Email is required",
              validate: {
                matchPattern: (value) =>
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                  "Please enter a valid email address",
              },
            })}
          />
          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            className="text-gray-100 bg-gray-700/50 border-gray-600/50 focus:border-orange-400 focus:ring-orange-400/30 placeholder-gray-400"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
          />
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium py-3.5 rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-gray-800"
          >
            Create Account
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
