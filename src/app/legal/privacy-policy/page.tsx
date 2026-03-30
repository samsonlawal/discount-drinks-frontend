"use client";

import React from "react";
import { Mail, ShieldCheck } from "lucide-react";

const sections = [
  {
    id: 1,
    title: "Who We Are",
    content: "This website is operated by DiscountDrinksandmore Ltd (“we”, “us”, “our”). We are the data controller responsible for your personal data.\nIf you have any questions regarding this policy, please contact:\n- Email: support@discountdrinksandmoreltd.co.uk\n- Registered Address: Dudley, UK",
  },
  {
    id: 2,
    title: "Scope of this Policy",
    content: "This Privacy Policy explains how we collect, use, disclose, and protect personal data when you:\n- Visit our website\n- Create an account\n- Place an order\n- Interact with our services\nThis policy is compliant with the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018.",
  },
  {
    id: 3,
    title: "Data We Collect",
    content: (
      <div className="flex flex-col">
        We may collect and process the following categories of personal data:
<ol className="py-4 flex flex-col gap-2">
          <li><span className="text-[var(--eerie-black)] font-medium shrink-0">1.</span> <span className="text-[var(--eerie-black)] font-medium">Identity Data:</span> Name, title, date of birth (for legal age verification)</li>
        <li><span className="text-[var(--eerie-black)] font-medium"><span className="shrink-0">2.</span> Contact Data:</span> Billing address, delivery address, email address, telephone number</li>
        <li><span className="text-[var(--eerie-black)] font-medium"><span className="shrink-0">3.</span> Financial Data:</span> Payment card details (processed securely via third-party providers; we do not store full card details)</li>
        <li><span className="text-[var(--eerie-black)] font-medium"><span className="shrink-0">4.</span> Transaction Data:</span> Order details, purchase history, delivery instructions</li>
        <li><span className="text-[var(--eerie-black)] font-medium"><span className="shrink-0">5.</span> Technical Data:</span> IP address, browser type, device identifiers, operating system, cookies</li>
        <li><span className="text-[var(--eerie-black)] font-medium"><span className="shrink-0">6.</span> Verification Data:</span> Information required to verify your age for the purchase of age-restricted products</li>
</ol>
      </div>
    ),
  },
  {
    id: 4,
    title: "How We Use Your Data",
    content: "We process your personal data only where we have a lawful basis to do so:\n- Contractual necessity – to process and deliver your orders\n- Legal obligation – including compliance with alcohol licensing laws\n- Legitimate interests – fraud prevention, service improvement\n- Consent – marketing communications (where applicable)",
  },
  {
    id: 5,
    title: "Age Restricted Products",
    content: "We sell alcohol and other age-restricted products. By using this website, you confirm that you are legally permitted to purchase such products.\n- We may implement age verification measures at checkout and/or delivery. Under UK law, alcohol must not be sold to individuals under 18.\n- We reserve the right to:\n- Request proof of age\n- Refuse or cancel orders where age cannot be verified",
  },
  {
    id: 6,
    title: "Disclosure of Your Data",
    content: "We may share your personal data with:\n- Payment service providers\n- Delivery and logistics partners\n- IT service providers and hosting platforms\n- Regulatory authorities where required\n\nAll third parties are required to respect the security of your personal data and to process it lawfully. All third parties are required to respect the security of your personal data and to process it in accordance with applicable data protection laws. We take reasonable steps to ensure that such third parties implement appropriate technical and organisational measures to safeguard your information. Where third parties act as independent data controllers, they are responsible for their own processing activities and the handling of your personal data in accordance with their respective privacy policies. While we seek to work only with reputable service providers, we do not control and are not responsible for the ongoing data processing practices of such third parties where they act in their own capacity.",
  },
  {
    id: 7,
    title: "International Transfers",
    content: "Where personal data is transferred outside the United Kingdom, we ensure appropriate safeguards are in place, including:\n- Adequacy regulations\n- Standard contractual clauses",
  },
  {
    id: 8,
    title: "Data Retention",
    content: "We retain personal data only for as long as necessary to:\n- Fulfil contractual obligations\n- Comply with legal requirements\n- Resolve disputes",
  },
  {
    id: 9,
    title: "Your Rights",
    content: "You have the right to:\n- Access your personal data\n- Request correction of inaccurate data\n- Request erasure of your data",
  },
  {
    id: 10,
    title: "Cookies",
    content: (
      <>
        We use cookies and similar technologies to:
        <br/>- Ensure website functionality
        <br />- Analyze usage
        <br />- Improve user experience
        <br />You can manage cookie preferences via your browser settings.
      </>
    ),
  },
  {
    id: 11,
    title: "Data Security",
    content: "We implement appropriate technical and organisational measures to safeguard your personal data.",
  },
  {
    id: 12,
    title: "Changes to this Policy",
    content: "We may update this Privacy Policy at any time. Any changes will be posted on this page with an updated revision date.",
  }
];

export default function PrivacyPage() {
  return (
    <main className="py-[40px] px-4 min-h-screen bg-[var(--white)]">
      <div className="container mx-auto max-w-6xl py-12 md:py-12">
        
        <div className="max-w-4xl mx-auto flex flex-col gap-16">
          
          {/* Header Section */}
          <div className="w-full">
            <h1 className="text-4xl lg:text-5xl font-semibold text-[var(--eerie-black)] mb-2 tracking-tight leading-tight">
              Privacy Policy
            </h1>
            <p className="text-[var(--sonic-silver)] text-lg mb-4">
              Last updated: April 2026
            </p>
            <div className="h-0.5 w-full bg-[var(--cultured)] mb-6"></div>
            <p className="text-[var(--sonic-silver)] leading-relaxed text-[18px] max-w-3xl">
              At DiscountDrinks, we are committed to protecting your personal data and your privacy. This policy outlines how we handle your information.
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
                  <div className="text-(--sonic-silver) whitespace-pre-line text-[18px] leading-relaxed">
                    {section.content}
                  </div>
                </div>
              </section>
            ))}

            {/* Support CTA Wrapper */}
            {/* <div 
              className="mt-12 px-8 py-12 rounded-2xl border border-gray-100 bg-[var(--cultured)] relative overflow-hidden"
            >
              <div className="relative z-10 flex flex-col gap-6">
                <div>
                  <h3 className="text-3xl font-semibold text-[var(--eerie-black)] mb-2">Ready to shop responsibly?</h3>
                  <p className="text-[var(--sonic-silver)] max-w-md text-[18px]">By continuing to browse our collection, you acknowledge and agree to the terms outlined above.</p>
                </div>
                
                <div className="flex flex-wrap gap-4">
                  <a 
                    href="/legal/terms-and-conditions" 
                    className="flex items-center gap-2 text-sm font-semibold text-[var(--eerie-black)] hover:underline px-4"
                  >
                    <ShieldCheck size={16} />
                    View Terms & Conditions
                  </a>
                </div>
              </div>
            </div> */}

          </div>
        </div>
      </div>
    </main>
  );
}
