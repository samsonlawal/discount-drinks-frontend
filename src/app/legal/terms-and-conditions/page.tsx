"use client";

import React from "react";
import { Mail, Phone, ExternalLink } from "lucide-react";

const sections = [
  {
    id: 1,
    title: "About These Terms",
    content: "These Terms & Conditions govern your use of this website and any purchases made through it. By using our website, you agree to be bound by these Terms.",
  },
  {
    id: 2,
    title: "Eligibility",
    content: "By placing an order, you confirm that:\n- You are legally capable of entering into a binding contract\n- You are 18 years or older where purchasing alcohol\n- We reserve the right to refuse service at our discretion.",
  },
  {
    id: 3,
    title: "Licensing & Legal Compliance",
    content: "The sale of alcohol is regulated under the Licensing Act 2003. For online sales, the transaction is deemed to take place at the licensed premises where the alcohol is dispatched. You acknowledge that:\n- Alcohol may only be sold from appropriately licensed premises\n- Age verification may be required at the point of sale and/or delivery",
  },
  {
    id: 4,
    title: "Products",
    content: "All products are subject to availability. We reserve the right to:\n- Withdraw products at any time\n- Limit quantities\n- Amend product descriptions",
  },
  {
    id: 5,
    title: "Pricing",
    content: "All prices are displayed in GBP (£) and include VAT where applicable. We reserve the right to:\n- Change prices without notice\n- Pricing errors may result in order cancellation",
  },
  {
    id: 6,
    title: "Orders",
    content: "An order is only accepted once we issue an order confirmation. We may cancel orders where:\n- Payment is not authorised\n- There is a pricing or product error\n- Age verification requirements are not met",
  },
  {
    id: 7,
    title: "Delivery",
    content: "Delivery times are estimates only. For alcohol deliveries:\n- Valid identification may be required upon delivery\n- Delivery may be refused if age cannot be verified\n- Orders may be returned if delivery conditions are not met",
  },
  {
    id: 8,
    title: "Cancellation Rights",
    content: "Under UK consumer law, you may cancel your order within 14 days of receipt, subject to statutory exceptions. The right to cancel does not apply to:\n- Opened or unsealed goods\n- Perishable products\n- Goods unsuitable for return due to health or hygiene reasons",
  },
  {
    id: 9,
    title: "Returns & Refunds",
    content: "You are entitled to a refund or replacement where goods are:\n- Not as described\n- Incorrectly supplied\nRefunds will be processed using the original payment method.",
  },
  {
    id: 10,
    title: "Responsible Use",
    content: "You agree that you will not:\n- Purchase alcohol on behalf of persons under 18\n- Misuse the website\n- Provide false information",
  },
  {
    id: 11,
    title: "Intellectual Property",
    content: "All content on this website is owned by or licensed to us and is protected by intellectual property laws. You may not reproduce or distribute content without permission.",
  },
  {
    id: 12,
    title: "Limitation of Liability",
    content: "Nothing in these Terms excludes liability for:\n- Death or personal injury caused by negligence\n- Fraud or fraudulent misrepresentation\nSubject to the above, we shall not be liable for indirect or consequential losses.",
  },
  {
    id: 13,
    title: "Privacy",
    content: "Your use of this website is also governed by our Privacy Policy.",
  },
  {
    id: 14,
    title: "Governing Law",
    content: "These Terms are governed by the laws of England and Wales. Any disputes shall be subject to the exclusive jurisdiction of the courts of England and Wales.",
  },
  {
    id: 15,
    title: "Contact",
    content: "For enquiries: support@discountdrinksandmoreltd.co.uk",
  }
];

export default function TermsPage() {
  return (
    <main className="py-[40px] px-4 min-h-screen bg-[var(--white)]">
      <div className="container mx-auto max-w-6xl py-12 md:py-12">
        
        <div className="max-w-4xl mx-auto flex flex-col gap-16">
          
          {/* Header Section */}
          <div className="w-full">
            <h1 className="text-4xl lg:text-5xl font-semibold text-[var(--eerie-black)] mb-2 tracking-tight leading-tight">
              Terms & Conditions
            </h1>
            <p className="text-[var(--sonic-silver)] text-lg mb-4">
              Last updated: April 2026
            </p>
            <div className="h-0.5 w-full bg-[var(--cultured)] mb-6"></div>
            <p className="text-[var(--sonic-silver)] leading-relaxed text-[18px] max-w-3xl">
              Please read these terms carefully before using our website or placing an order. These terms protect both you and our business.
            </p>
          </div>

          {/* Content Section */}
          <div className="flex flex-col gap-12">
            {sections.map((section) => (
              <section key={section.id} id={`section-${section.id}`} className="scroll-mt-24">
                <h2 className="text-[20px] font-semibold capitalize text-[var(--eerie-black)] mb-2 flex items-center gap-3">
                  {section.title}
                </h2>
                <div className="">
                  <p className="text-(--sonic-silver) whitespace-pre-line text-[18px] leading-relaxed">
                    {section.content}
                  </p>
                </div>
              </section>
            ))}

          </div>

        </div>
      </div>
    </main>
  );
}
