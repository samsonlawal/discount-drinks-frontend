"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Mail,
  KeyRound,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  RefreshCw,
  ShieldCheck,
  CircleCheck,
  ArrowLeft,
} from "lucide-react";
import { showErrorToast, showSuccessToast } from "@/utils/toaster";
import {
  useForgotPassword,
  useVerifyCode,
  useResetPassword,
} from "@/hooks/api/auth";

import "../../style.css";
import "../../auth.css";

type Step = "email" | "code" | "reset" | "success";

const STEPS = [
  { key: "email", label: "Email" },
  { key: "code", label: "Verify" },
  { key: "reset", label: "Reset" },
];

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");

  const { onForgotPassword, loading: forgotLoading } = useForgotPassword();
  const { onVerifyCode, loading: verifyLoading } = useVerifyCode();
  const { onResetPassword, loading: resetLoading } = useResetPassword();

  const loading = forgotLoading || verifyLoading || resetLoading;

  const stepIndex = STEPS.findIndex((s) => s.key === step);

  // Step 1: Send code to email
  const handleSendCode = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    onForgotPassword({
      payload: { email },
      successCallback: (message) => {
        showSuccessToast({ message: message || "Code sent to your email!" });
        setStep("code");
      },
      errorCallback: ({ message }) => {
        setError(message || "Failed to send code.");
      },
    });
  };

  // Step 2: Verify code
  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    onVerifyCode({
      payload: { email, code },
      successCallback: (message) => {
        showSuccessToast({ message: message || "Code verified!" });
        setStep("reset");
      },
      errorCallback: ({ message }) => {
        setError(message || "Invalid code.");
      },
    });
  };

  // Step 3: Reset password
  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    onResetPassword({
      payload: {
        email,
        code,
        new_password: newPassword,
        confirm_new_password: confirmPassword,
      },
      successCallback: (message) => {
        showSuccessToast({
          message: message || "Password reset successfully!",
        });
        setStep("success");
      },
      errorCallback: ({ message }) => {
        setError(message || "Failed to reset password.");
      },
    });
  };

  // Resend code
  const handleResendCode = () => {
    setError("");
    onForgotPassword({
      payload: { email },
      successCallback: (message) => {
        showSuccessToast({ message: message || "Code resent!" });
      },
      errorCallback: ({ message }) => {
        setError(message || "Failed to resend code.");
      },
    });
  };

  const getTitle = () => {
    switch (step) {
      case "email":
        return "Forgot Password";
      case "code":
        return "Verify Code";
      case "reset":
        return "New Password";
      case "success":
        return "All Done!";
    }
  };

  const getSubtitle = () => {
    switch (step) {
      case "email":
        return "Enter your email address and we'll send you a verification code.";
      case "code":
        return `We've sent a code to ${email}. Enter it below.`;
      case "reset":
        return "Create a new secure password for your account.";
      case "success":
        return "Your password has been reset successfully.";
    }
  };

  return (
    <main className="auth-page">
      <main className="auth-main">
        <div className="container">
          {/* Logo Navigation */}
          <div className="flex justify-center mb-6">
            <Link href="/">
              <Image 
                src="/images/logo.svg" 
                alt="Discount Drinks Logo" 
                width={180} 
                height={50} 
                priority 
                className="h-10 sm:h-12 w-auto" 
              />
            </Link>
          </div>

          <div className="auth-container">
            {/* Forgot Password Card */}
            <div className="auth-card">
              {/* Step Indicator */}
              {step !== "success" && (
                <div className="step-indicator">
                  {STEPS.map((s, i) => (
                    <React.Fragment key={s.key}>
                      <div
                        className={`step-dot ${
                          i < stepIndex
                            ? "completed"
                            : i === stepIndex
                            ? "active"
                            : ""
                        }`}
                      >
                        {i < stepIndex ? (
                          <CircleCheck size={16} />
                        ) : (
                          <span>{i + 1}</span>
                        )}
                      </div>
                      {i < STEPS.length - 1 && (
                        <div
                          className={`step-line ${
                            i < stepIndex ? "completed" : ""
                          }`}
                        />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              )}

              {/* Header */}
              <div className="auth-card-header">
                <h1 className="auth-title">{getTitle()}</h1>
                <p className="auth-subtitle">{getSubtitle()}</p>
              </div>

              {/* Error Alert */}
              {error && (
                <div className="auth-alert auth-alert--error">
                  <AlertCircle size={20} />
                  <span>{error}</span>
                </div>
              )}

              {/* ==================== STEP 1: EMAIL ==================== */}
              {step === "email" && (
                <form className="auth-form" onSubmit={handleSendCode}>
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
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary w-100 btn-submit"
                    disabled={loading}
                  >
                    {forgotLoading ? (
                      <span className="btn-loader">
                        <RefreshCw size={16} className="animate-spin" />
                      </span>
                    ) : (
                      <span>Send Verification Code</span>
                    )}
                  </button>
                </form>
              )}

              {/* ==================== STEP 2: CODE ==================== */}
              {step === "code" && (
                <form className="auth-form" onSubmit={handleVerifyCode}>
                  <div className="form-group">
                    <label htmlFor="code" className="form-label">
                      Verification Code
                      <span className="form-required" aria-label="required">
                        *
                      </span>
                    </label>
                    <div className="input-wrapper">
                      <KeyRound className="input-icon" />
                      <input
                        type="text"
                        id="code"
                        name="code"
                        className="form-input"
                        placeholder="Enter your code"
                        required
                        aria-required="true"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        autoComplete="one-time-code"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary w-100 btn-submit"
                    disabled={loading}
                  >
                    {verifyLoading ? (
                      <span className="btn-loader">
                        <RefreshCw size={16} className="animate-spin" />
                      </span>
                    ) : (
                      <span>Verify Code</span>
                    )}
                  </button>

                  <div className="resend-section">
                    <span className="resend-text">Didn&apos;t receive the code?</span>
                    <button
                      type="button"
                      className="resend-link"
                      onClick={handleResendCode}
                      disabled={forgotLoading}
                    >
                      Resend Code
                    </button>
                  </div>
                </form>
              )}

              {/* ==================== STEP 3: RESET ==================== */}
              {step === "reset" && (
                <form className="auth-form" onSubmit={handleResetPassword}>
                  {/* New Password */}
                  <div className="form-group">
                    <label htmlFor="new-password" className="form-label">
                      New Password
                      <span className="form-required" aria-label="required">
                        *
                      </span>
                    </label>
                    <div className="input-wrapper">
                      <Lock className="input-icon" />
                      <input
                        type={showPassword ? "text" : "password"}
                        id="new-password"
                        name="new_password"
                        className="form-input"
                        placeholder="Enter new password"
                        autoComplete="new-password"
                        required
                        aria-required="true"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
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

                  {/* Confirm Password */}
                  <div className="form-group">
                    <label htmlFor="confirm-password" className="form-label">
                      Confirm Password
                      <span className="form-required" aria-label="required">
                        *
                      </span>
                    </label>
                    <div className="input-wrapper">
                      <Lock className="input-icon" />
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        id="confirm-password"
                        name="confirm_new_password"
                        className="form-input"
                        placeholder="Confirm new password"
                        autoComplete="new-password"
                        required
                        aria-required="true"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                      <button
                        type="button"
                        className="password-toggle"
                        aria-label="Toggle password visibility"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        {showConfirmPassword ? <EyeOff /> : <Eye />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary w-100 btn-submit"
                    disabled={loading}
                  >
                    {resetLoading ? (
                      <span className="btn-loader">
                        <RefreshCw size={16} className="animate-spin" />
                      </span>
                    ) : (
                      <span>Reset Password</span>
                    )}
                  </button>
                </form>
              )}

              {/* ==================== SUCCESS ==================== */}
              {step === "success" && (
                <div className="success-view">
                  <div className="success-icon-wrapper">
                    <CircleCheck size={48} />
                  </div>
                  <p className="success-message">
                    Your password has been changed. You can now sign in with your
                    new password.
                  </p>
                  <Link
                    href="/auth/sign-in"
                    className="btn btn-primary w-100 btn-submit"
                  >
                    <span>Back to Sign In</span>
                  </Link>
                </div>
              )}

              {/* Back to Sign In (non-success) */}
              {step !== "success" && (
                <>
                  <div className="auth-divider">
                    <span>or</span>
                  </div>
                  <div className="auth-footer">
                    <p className="auth-footer-text">
                      Remember your password?{" "}
                      <Link href="/auth/sign-in" className="link-primary">
                        Sign in
                      </Link>
                    </p>
                  </div>
                </>
              )}

              {/* Security Notice */}
              <div className="security-notice">
                <ShieldCheck />
                <span>Your information is secure and encrypted</span>
              </div>
            </div>

            {/* Side Image/Info */}
            <div className="auth-side">
              <div className="auth-side-content">
                <h2 className="side-title">Reset Your Password</h2>
                <p className="side-text">
                  Follow the simple steps to securely reset your password and
                  regain access to your account.
                </p>

                <ul className="feature-list">
                  <li className="feature-item ">
                    {/* <CircleCheck /> */}
                    <span >Quick 3-step process</span>
                  </li>
                  <li className="feature-item">
                    <CircleCheck />
                    <span>Secure email verification</span>
                  </li>
                  <li className="feature-item">
                    <CircleCheck />
                    <span>Encrypted password storage</span>
                  </li>
                  <li className="feature-item">
                    <CircleCheck />
                    <span>24/7 account protection</span>
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
