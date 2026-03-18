"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    question: "How do I place an order on your website?",
    answer: "Simply browse our collection, add your preferred wines or drinks to your cart, and proceed to checkout to complete your purchase.",
  },
  {
    question: "Do I need an account to place an order?",
    answer: "Yes, creating an account allows you to confirm your orders",
  },
  {
    question: "Are your wines and drinks authentic?",
    answer: "Yes. All our products are sourced directly from trusted distributors and verified suppliers.",
  },
  {
    question: "Do you sell both alcoholic and non-alcoholic drinks?",
    answer: "Yes, we offer a wide range of alcoholic beverages as well as non-alcoholic options.",
  },
  {
    question: "Is there an age requirement to buy alcohol?",
    answer: "Yes. You must be of legal drinking age in the UK to purchase alcoholic beverages from our store.",
  },
  {
    question: "Do you verify age during delivery?",
    answer: "Yes. Our delivery partner may request a valid ID before handing over alcoholic drinks.",
  },
  {
    question: "Is it safe to pay on your website?",
    answer: "Yes. Our payment system uses secure encryption technology to protect your personal and payment information.",
  },
  {
    question: "Can I pay on delivery?",
    answer: "Depending on your location, cash or card payment on delivery may be available.",
  },
  {
    question: "Where do you deliver to?",
    answer: "We currently only sell and deliver drinks within the UK",
  },
  {
    question: "How long does delivery take?",
    answer: "Delivery usually takes between 24 hours and also depending on your location.",
  },
  {
    question: "How much does delivery cost?",
    answer: "Delivery is free",
  },
  {
    question: "What if I receive a damaged bottle?",
    answer: "If your order arrives damaged and unopend, please contact our support team immediately with photos and we will arrange a replacement or refund.",
  },
  {
    question: "Can I return a product after delivery?",
    answer: "Returns may be accepted for unopened products within a specific timeframe. Please check our return policy.",
  },
  {
    question: "What if I receive the wrong item?",
    answer: "Contact us and we will quickly arrange an exchange or refund.",
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <main className="pt-[80px] px-4 min-h-screen bg-[var(--white)]">
      <div className="container mx-auto max-w-6xl">
{/* <div className="text-center mb-12 pb-[30px]">

</div> */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-20 items-start">

          {/* Left Column - Intro & Contact */}
          <div className="md:col-span-5 md:sticky md:top-20">
            <h1 className="text-4xl lg:text-5xl font-bold text-[var(--eerie-black)] mb-3 tracking-tight leading-tight">
              Frequently Asked Questions
            </h1>
            <p className="text-[var(--sonic-silver)] text-lg mb-8 leading-relaxed">
              Find answers to common questions about our products, ordering, and delivery. Can't find what you're looking for? 
            </p>
            
           
          </div>

          {/* Right Column - Accordion */}
          <div className="md:col-span-7 space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`border border-[var(--cultured)] rounded-xl overflow-hidden transition-all duration-200 ${
                  openIndex === index ? "bg-[var(--eerie-black)]" : "bg-[var(--white)]"
                }`}
              >
                <button
                  className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none focus-visible:bg-[var(--cultured)]"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={openIndex === index}
                >
                  <span className={`font-semibold pr-4 text-left ${openIndex === index ? "text-[var(--white)]" : "text-[var(--eerie-black)]"}`}>
                    {faq.question}
                  </span>
                  {openIndex === index ? (
                    <ChevronUp className="w-5 h-5 text-[var(--white)] shrink-0 transition-transform duration-200" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-[var(--sonic-silver)] shrink-0 transition-transform duration-200" />
                  )}
                </button>

                <div
                  className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
                    openIndex === index ? "max-h-96 pb-5 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="border-[var(--cultured)]">
                    <p className="text-[var(--white)] font-light leading-relaxed opacity-90">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
            <div 
              className="my-20 px-10 py-14 md:py-16 rounded-xl border border-gray-100 bg-[var(--cultured)] bg-cover bg-center bg-no-repeat relative overflow-hidden"
              style={{ backgroundImage: "url('/images/newsletter-bg.png')" }}
            >
              <div className="relative z-10 flex flex-col md:flex-row justify-between items-center md:items-center gap-6 text-center md:text-left">
                <div className="flex flex-col items-center md:items-start">
                  <h3 className="text-xl md:text-3xl font-semibold text-[var(--eerie-black)] mb-2">Have more questions?</h3>
                  <p className="text-[var(--sonic-silver)] max-w-md">Our support team is here to help you with any inquiries.</p>
                </div>

                <a 
                  href="/contact" 
                  className="btn btn-primary w-max shrink-0"
                >
                  Contact Us
                </a>
              </div>
            </div>
      </div>
    </main>
  );
}
