"use client";

import React from "react";
import { Mail, Phone, MapPin, Send, AlertCircle } from "lucide-react";
import { useContact } from "@/hooks/api/useContact";

export default function ContactPage() {
  const {
    formData,
    isSubmitting,
    submitted,
    error,
    handleChange,
    handleSubmit
  } = useContact();

  return (
    <main className="pt-[80px] pb-24 px-4 min-h-screen bg-[var(--white)]">
      <div className="container mx-auto max-w-6xl">
        
        {/* Header Section */}


        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* Left Column - Contact Info */}
          <div className="lg:col-span-5 space-y-4">
                    <div className="text-left mb-7 max-w-2xl mx-auto">
          <h1 className="text-4xl lg:text-5xl font-bold text-[var(--eerie-black)] mb-1 tracking-tight leading-tight">
            Get in Touch
          </h1>
          <p className="text-[var(--sonic-silver)] text-lg leading-relaxed pb-2">
            Have a question about an order, wholesale pricing, or our product range? 
            We'd love to hear from you. Fill out the form below and our team will get back to you promptly.
          </p>

                    <p className="text-[var(--ocean-green)] text-lg leading-relaxed">

            For more secure methods of communication, email us at discountdrinks@gmail.com
          </p>
        </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-[var(--cultured)] rounded-2xl p-8 lg:p-10">
              <h3 className="text-2xl font-semibold text-[var(--eerie-black)] mb-8">Send us a Message</h3>
              
              {submitted ? (
                <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
                  <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="w-8 h-8" />
                  </div>
                  <h4 className="text-2xl font-semibold text-green-800 mb-2">Message Sent!</h4>
                  <p className="text-green-700">
                    Thank you for reaching out. We have received your message and will get back to you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3 text-red-700">
                      <AlertCircle className="w-5 h-5 flex-shrink-0" />
                      <p className="text-sm font-medium">{error}</p>
                    </div>
                  )}
                  {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> */}
                    <div className="space-y-2">
                      <label htmlFor="name" className="block text-sm font-medium text-[var(--eerie-black)]">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-[var(--cultured)] focus:outline-none focus:ring-2 focus:ring-[var(--middle-blue-green)] focus:border-transparent transition-all bg-[var(--cultured)] text-[var(--eerie-black)] placeholder-gray-400"
                        placeholder="John Doe"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="email" className="block text-sm font-medium text-[var(--eerie-black)]">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-[var(--cultured)] focus:outline-none focus:ring-2 focus:ring-[var(--middle-blue-green)] focus:border-transparent transition-all bg-[var(--cultured)] text-[var(--eerie-black)] placeholder-gray-400"
                        placeholder="john@example.com"
                      />
                    </div>
                  {/* </div> */}

                  <div className="space-y-2">
                    <label htmlFor="subject" className="block text-sm font-medium text-[var(--eerie-black)]">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-[var(--cultured)] focus:outline-none focus:ring-2 focus:ring-[var(--middle-blue-green)] focus:border-transparent transition-all bg-[var(--cultured)] text-[var(--eerie-black)] placeholder-gray-400"
                      placeholder="How can we help you?"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="block text-sm font-medium text-[var(--eerie-black)]">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 rounded-lg border border-[var(--cultured)] focus:outline-none focus:ring-2 focus:ring-[var(--middle-blue-green)] focus:border-transparent transition-all bg-[var(--cultured)] text-[var(--eerie-black)] placeholder-gray-400 resize-none"
                      placeholder="Please provide as much detail as possible..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`
                      w-full sm:w-auto px-10 py-4 rounded-lg font-semibold text-[var(--white)] transition-all duration-300 flex items-center justify-center gap-2
                      ${isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-[var(--eerie-black)] hover:bg-[var(--middle-blue-green)] hover:-translate-y-1 hover:shadow-lg"}
                    `}
                  >
                    {isSubmitting ? (
                      <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    ) : (
                      <>
                        Send Message
                        <Send className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
          
        </div>
      </div>
    </main>
  );
}
