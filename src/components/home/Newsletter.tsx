"use client";

import React, { useState } from "react";
import { Mail, ArrowRight } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log("Newsletter subscription:", email);
    setEmail("");
  };

  return (
    <section className="section newsletter">
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
              />
            </div>

            <button type="submit" className="btn btn-primary">
              <span>Subscribe</span>

              <ArrowRight size={20} aria-hidden="true" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
