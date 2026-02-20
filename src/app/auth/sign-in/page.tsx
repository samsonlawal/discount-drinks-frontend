"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
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
import "../../style.css";
import "../../auth.css";
import { useLogin } from "@/hooks/api/auth";

export default function SignInPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

    const { loading, onLogin } = useLogin();
  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle sign in logic
    onLogin({
      payload: formData,
      successCallback: () => {
        showSuccessToast({ message: "🚀 Sign In Successful!" });
      },
      errorCallback: (error: Error | any) => {
        showErrorToast({ message: error?.message });
      },
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <main className="auth-page">
      {/* Main Auth Section */}
      <main className="auth-main">
        <div className="container">
          <div className="auth-container">
            {/* Sign In Card */}
            <div className="auth-card">
              {/* Header */}
              <div className="auth-card-header">
                <h1 className="auth-title">Welcome Back</h1>
                <p className="auth-subtitle">
                  Sign in to your account to continue
                </p>
              </div>

              {/* Alert Messages */}
              <div
                className="auth-alert"
                data-auth-alert
                style={{ display: "none" }}
              >
                <AlertCircle />
                <span data-alert-message></span>
              </div>

              {/* Sign In Form */}
              <form className="auth-form" onSubmit={handleSubmit}>
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
                      aria-describedby="email-error"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <span
                    className="form-error"
                    id="email-error"
                    data-email-error
                  ></span>
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
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      required
                      aria-required="true"
                      aria-describedby="password-error"
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
                  <span
                    className="form-error"
                    id="password-error"
                    data-password-error
                  ></span>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="form-options w-full">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="remember"
                      data-remember-checkbox
                    />
                    <span>Remember me</span>
                  </label>
                  <Link href="/forgot-password" className="link-text">
                    Forgot password?
                  </Link>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="btn btn-primary w-100 btn-submit"
                  data-submit-btn
                  disabled={loading}
                >
                  {loading ? (
                    <span
                    className="btn-loader"

                  >
                    <RefreshCw size={16} className="animate-spin" />
                  </span>
                  ) : (
                    <span data-submit-text>Sign In</span>
                  )}
                  
                </button>
              </form>

              {/* Demo Credentials Info */}
              {/* <div className="demo-info">
                <p className="demo-title">Demo Credentials:</p>
                <p className="demo-text">
                  Email: <strong>demo@discountdrinks.com</strong>
                </p>
                <p className="demo-text">
                  Password: <strong>Demo123!</strong>
                </p>
              </div> */}

              {/* Divider */}
              <div className="py-5 flex justify-center items-center">
                <span>or</span>
              </div>

              {/* Sign Up Link */}
              <div className="auth-footer">
                <p className="auth-footer-text">
                  Don&apos;t have an account?
                  <Link href="/auth/signup" className="link-primary">
                    Sign up
                  </Link>
                </p>
              </div>

              {/* Security Notice */}
              <div className="security-notice">
                <ShieldCheck />
                <span>Your information is secure and encrypted</span>
              </div>
            </div>

            {/* Side Image/Info (Optional) */}
            <div className="auth-side">
              <div className="auth-side-content">
                <h2 className="side-title">Start Shopping Today</h2>
                <p className="side-text">
                  Access exclusive deals, track your orders, and enjoy a
                  personalized shopping experience.
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
