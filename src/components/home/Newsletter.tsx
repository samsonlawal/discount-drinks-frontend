"use client";

import React from "react";
import { Mail, ArrowRight, CheckCircle, Loader2 } from "lucide-react";
import { useNewsletter } from "@/hooks/api/useNewsletter";

export default function Newsletter() {
  const { email, setEmail, isSubmitting, submitted, error, handleSubmit } =
    useNewsletter();

  return (
    <section className="section newsletter my-20">
      <div className="container">
        <div
          className="newsletter-card"
          style={{ backgroundImage: "url('/images/newsletter-bg.png')" }}
        >
          <h2 className="card-title">Subscribe Newsletter</h2>

          <p className="card-text">
            Enter your email below to be the first to know about new product
            launches and wine selections.
          </p>

          {submitted ? (
            <div className="newsletter-success">
              <CheckCircle size={22} />
              <span>You&apos;re subscribed! Check your inbox for a welcome email.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="card-form">
              <div className="input-wrapper">
                <Mail size={20} />

                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field"
                  disabled={isSubmitting}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={18} className="spin" />
                    <span>Subscribing…</span>
                  </>
                ) : (
                  <>
                    <span>Subscribe</span>
                    <ArrowRight size={20} aria-hidden="true" />
                  </>
                )}
              </button>
            </form>
          )}

          {error && <p className="newsletter-error">{error}</p>}
        </div>
      </div>
    </section>
  );
}
