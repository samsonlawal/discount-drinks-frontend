import React from "react";
import { Award, Truck, ShieldCheck, Heart } from "lucide-react";

const commitments = [
  {
    icon: ShieldCheck,
    title: "Quality Assurance",
    description:
      "We work with trusted suppliers and brands to ensure authenticity and excellence.",
  },
  {
    icon: Truck,
    title: "Convenience",
    description:
      "A seamless online shopping experience with reliable delivery right to your door.",
  },
  {
    icon: Award,
    title: "Variety",
    description:
      "A diverse catalog that caters to all tastes, alcoholic and non-alcoholic alike.",
  },
  {
    icon: Heart,
    title: "Customer Satisfaction",
    description:
      "Your experience matters to us, and we're dedicated to making every interaction smooth and enjoyable.",
  },
];

export default function AboutPage() {
  return (
    <main className="pt-[80px] pb-24 px-4 min-h-screen bg-[var(--white)]">
      <div className="container mx-auto max-w-6xl">
        {/* Two-column intro — mirrors FAQ / Contact layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* Left Column — sticky heading */}
          <div className="md:col-span-5 md:sticky md:top-20">
            <h1 className="text-4xl lg:text-5xl font-bold text-[var(--eerie-black)] tracking-tight leading-tight">
              About Us
            </h1>
            <p className="text-[var(--sonic-silver)] text-[16px] mb-8 leading-relaxed">
              Welcome to your one-stop destination for everything refreshingly
              exceptional.
            </p>


          </div>

          {/* Right Column — story content */}
          <div className="md:col-span-7 space-y-6 text-[var(--sonic-silver)] leading-relaxed">
            <p>
              At our core, we are more than just an e-commerce store — we are a
              curated experience built around taste, quality, and convenience.
              Whether you're celebrating life's big moments, unwinding after a
              long day, or simply stocking up your home, we bring the world of
              drink and wines right to your doorstep.
            </p>

            <p>
              We specialise in the bulk supply of drinks, offering products in
              multiple units, packs, and full cartons to give you the best value
              for your money.
            </p>

            <p>
              Our collection features a carefully selected range of drinks,
              including premium wines, fine spirits, refreshing alcoholic
              beverages, and a wide variety of non-alcoholic options. From
              timeless classics to modern favourites, every product we offer is
              chosen with one goal in mind — to deliver quality you can trust
              and flavours you'll love.
            </p>

            <p>
              We understand that every customer is unique. That's why we strive
              to provide options that suit every lifestyle, preference, and
              occasion. Whether you're a connoisseur seeking something refined
              or simply looking for a casual drink to enjoy, we've got you
              covered.
            </p>

                        <p>
              What set us apart is our commitment to:
            </p>

                        {/* Commitment cards */}
            <div className="space-y-4">
              {commitments.map(({ icon: Icon, title, description }) => (
                <div
                  key={title}
                  className="flex items-start gap-4 p-4 rounded-xl border border-[var(--cultured)] bg-[var(--white)]"
                >
                  <div className="shrink-0 w-9 h-9 rounded-lg bg-[var(--ocean-green)] flex items-center justify-center">
                    <Icon className="w-5 h-5 text-[var(--white)]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--eerie-black)] mb-0.5">
                      {title}
                    </h3>
                    <p className="text-sm text-[var(--sonic-silver)] leading-relaxed">
                      {description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <p>
              We believe great drinks bring people together. They create
              moments, spark conversations, and elevate everyday experiences.
              That's why we're passionate about making those moments more
              accessible, one order at a time.
            </p>

            <p className="font-medium text-[var(--ocean-green)]">
              Thank you for choosing us — where every sip tells a story.
            </p>
          </div>
        </div>

        {/* "Have more questions?" banner — same as FAQ */}
        <div
          className="my-20 px-10 py-14 md:py-16 rounded-xl border border-gray-100 bg-[var(--cultured)] bg-cover bg-center bg-no-repeat relative overflow-hidden"
          style={{ backgroundImage: "url('/images/newsletter-bg.png')" }}
        >
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-center md:items-center gap-6 text-center md:text-left">
            <div className="flex flex-col items-center md:items-start">
              <h3 className="text-xl md:text-3xl font-semibold text-[var(--eerie-black)] mb-2">
                Have more questions?
              </h3>
              <p className="text-[var(--sonic-silver)] max-w-md">
                Our support team is here to help you with any inquiries.
              </p>
            </div>

            <a href="/contact" className="btn btn-primary w-max shrink-0">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
