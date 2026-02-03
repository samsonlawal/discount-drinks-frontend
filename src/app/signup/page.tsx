"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

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
    <main className="min-h-screen flex items-center justify-center py-20 bg-cultured">
      <div className="container">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <Link href="/" className="inline-block mb-6">
              <Image
                src="/images/logo.svg"
                alt="DiscountDrinks logo"
                width={130}
                height={31}
              />
            </Link>
            <h1 className="text-fs-2 font-semibold text-eerie-black mb-2">
              Create Account
            </h1>
            <p className="text-sonic-silver">
              Join us today and start shopping
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="name"
                className="block text-eerie-black font-medium mb-2"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full h-12 px-4 border border-cultured rounded-md focus:outline-none focus:border-ocean-green transition-colors"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-eerie-black font-medium mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full h-12 px-4 border border-cultured rounded-md focus:outline-none focus:border-ocean-green transition-colors"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-eerie-black font-medium mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={8}
                className="w-full h-12 px-4 border border-cultured rounded-md focus:outline-none focus:border-ocean-green transition-colors"
                placeholder="At least 8 characters"
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-eerie-black font-medium mb-2"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                minLength={8}
                className="w-full h-12 px-4 border border-cultured rounded-md focus:outline-none focus:border-ocean-green transition-colors"
                placeholder="Confirm your password"
              />
            </div>

            <div className="flex items-start">
              <input
                type="checkbox"
                required
                className="mr-2 mt-1"
                id="terms"
              />
              <label htmlFor="terms" className="text-sm text-sonic-silver">
                I agree to the{" "}
                <Link
                  href="/terms"
                  className="text-ocean-green hover:underline"
                >
                  Terms & Conditions
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="text-ocean-green hover:underline"
                >
                  Privacy Policy
                </Link>
              </label>
            </div>

            <button type="submit" className="btn btn-primary w-full">
              Create Account
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sonic-silver">
              Already have an account?{" "}
              <Link
                href="/signin"
                className="text-ocean-green font-medium hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
