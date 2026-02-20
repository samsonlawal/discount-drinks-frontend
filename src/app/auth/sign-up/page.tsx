"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  RefreshCw,
  ShieldCheck,
  CheckCircle,
} from "lucide-react";
import { showErrorToast, showSuccessToast } from "@/utils/toaster";
import { useRegister } from "@/hooks/api/auth";

import "../../style.css";
import "../../auth.css";

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  // const [loading, setLoading] = useState(false);

  const { loading, onRegister } = useRegister();


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const {name, username, email, password} = formData

      onRegister({
        payload: { name, username, email, password },
        successCallback: () => {
          showSuccessToast({ message: "🚀 Sign Up Successful!" });
          console.log(formData);
        },
        errorCallback: ({ message }) => {
          showErrorToast({ message });
          // console.log(formik.values);
          
        }, 
      });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear error when user types
    if (error) setError("");
  };

  return (
    <main className="auth-page">
      {/* Main Auth Section */}
      <main className="auth-main">
        <div className="container">
          <div className="auth-container">
            {/* Sign Up Card */}
            <div className="auth-card">
              {/* Header */}
              <div className="auth-card-header">
                <h1 className="auth-title">Create Account</h1>
                <p className="auth-subtitle">
                  Join us to get exclusive offers and discounts
                </p>
              </div>

              {/* Alert Messages */}
              {error && (
                <div className="auth-alert auth-alert--error">
                  <AlertCircle />
                  <span>{error}</span>
                </div>
              )}

              {/* Sign Up Form */}
              <form className="auth-form" onSubmit={handleSubmit}>
                {/* Name Field */}
                <div className="form-group">
                  <label htmlFor="name" className="form-label">
                    Full Name
                    <span className="form-required" aria-label="required">
                      *
                    </span>
                  </label>
                  <div className="input-wrapper">
                    <User className="input-icon" />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="form-input"
                      placeholder="John Doe"
                      autoComplete="fullname"
                      required
                      aria-required="true"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    Email Address
                    <span className="form-required" aria-label="required">
                      *
                    </span>
                  </label>
                  <div className="input-wrapper">
                    <Mail className="input-icon" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="form-input"
                      placeholder="you@example.com"
                      autoComplete="email"
                      required
                      aria-required="true"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>


                                <div className="form-group">
                  <label htmlFor="name" className="form-label">
                    Username
                    <span className="form-required" aria-label="required">
                      *
                    </span>
                  </label>
                  <div className="input-wrapper">
                    <User className="input-icon" />
                    <input
                      type="text"
                      id="username"
                      name="username"
                      className="form-input"
                      placeholder="Username"
                      autoComplete="username"
                      required
                      aria-required="true"
                      value={formData.username}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="form-group">
                  <label htmlFor="password" className="form-label">
                    Password
                    <span className="form-required" aria-label="required">
                      *
                    </span>
                  </label>
                  <div className="input-wrapper">
                    <Lock className="input-icon" />
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      className="form-input"
                      placeholder="Create a password"
                      // autoComplete="new-password"
                      required
                      aria-required="true"
                      value={formData.password}
                      onChange={handleChange}
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      aria-label="Toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff /> : <Eye />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password Field */}
                <div className="form-group">
                  <label htmlFor="confirmPassword" className="form-label">
                    Confirm Password
                    <span className="form-required" aria-label="required">
                      *
                    </span>
                  </label>
                  <div className="input-wrapper">
                    <Lock className="input-icon" />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmPassword"
                      name="confirmPassword"
                      className="form-input"
                      placeholder="Confirm your password"
                      // autoComplete="new-password"
                      required
                      aria-required="true"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      aria-label="Toggle password visibility"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff /> : <Eye />}
                    </button>
                  </div>
                </div>

                {/* Terms Checkbox */}
                <div className="form-options">
                  <label className="checkbox-label w-full">
                    <input type="checkbox" required />
                    <span className="w-full flex flex-row flex-1">
                      I agree to the{" "}
                      <Link href="/terms" className="link-text">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy" className="link-text">
                        Privacy Policy
                      </Link>
                    </span>
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="btn btn-primary w-100 btn-submit"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="btn-loader">
                    <RefreshCw size={16} className="animate-spin" />
                    </span>
                  ) : (
                    <span>Create Account</span>
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="auth-divider">
                <span>or</span>
              </div>

              {/* Sign In Link */}
              <div className="auth-footer">
                <p className="auth-footer-text">
                  Already have an account?{" "}
                  <Link href="/auth/sign-in" className="link-primary">
                    Sign in
                  </Link>
                </p>
              </div>

              {/* Security Notice */}
              <div className="security-notice">
                <ShieldCheck />
                <span>Your information is secure and encrypted</span>
              </div>
            </div>

            {/* Side Image/Info */}
            <div className="auth-side">
              <div className="auth-side-content">
                <h2 className="side-title">Join Our Community</h2>
                <p className="side-text">
                  Create your account today and unlock exclusive benefits tailored just for you.
                </p>

                <ul className="feature-list">
                  <li className="feature-item">
                    <CheckCircle />
                    <span>Exclusive member discounts</span>
                  </li>
                  <li className="feature-item">
                    <CheckCircle />
                    <span>Order tracking & history</span>
                  </li>
                  <li className="feature-item">
                    <CheckCircle />
                    <span>Faster checkout process</span>
                  </li>
                  <li className="feature-item">
                    <CheckCircle />
                    <span>Personalized recommendations</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </main>
  );
}
