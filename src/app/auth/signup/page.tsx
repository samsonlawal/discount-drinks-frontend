"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle } from "lucide-react";

import "../../style.css";
import "../../auth.css";

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle sign up logic
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log("Sign up:", formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <main className="auth-page">
      <main className="auth-main">
        <div className="container">
          <div className="auth-container">
            {/* Sign Up Card */}
            <div className="auth-card">
              {/* Header */}
              <div className="auth-card-header">
                <h1 className="auth-title">Create Account</h1>
                <p className="auth-subtitle">
                  Sign up functionality coming soon!
                </p>
              </div>

              {/* Placeholder Content */}
              <div className="demo-info">
                <p className="demo-title">Sign Up Feature - Coming Soon</p>
                <p className="demo-text">
                  User registration functionality will be implemented in the
                  next phase. For now, you can use the demo account to test the
                  sign-in system.
                </p>
              </div>

              {/* Back to Sign In */}
              <Link href="/auth/signin" className="btn btn-primary w-100">
                Back to Sign In
              </Link>

              {/* Divider */}
              <div className="auth-divider">
                <span>or</span>
              </div>

              {/* Sign In Link */}
              <div className="auth-footer">
                <p className="auth-footer-text">
                  Already have an account?{" "}
                  <Link href="/auth/signin" className="link-primary">
                    Sign in
                  </Link>
                </p>
              </div>
            </div>

            {/* Side Image/Info */}
            <div className="auth-side">
              <div className="auth-side-content">
                <h2 className="side-title">Join Our Community</h2>
                <p className="side-text">
                  Create your account and unlock exclusive benefits and
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
