import React from "react";
import { serviceFeatures } from "@/data";

export default function ServiceFeatures() {
  return (
    <section className="py-[120px] px-4 lg:py-[140px]">
      <div className="container mx-auto px-4 max-w-[1080px]">
        <h2 className="text-[1.75rem] font-semibold pb-[50px] text-center text-[#171717]">
          Why People Choose Us
        </h2>
        <div className="grid grid-cols-2 gap-4 justify-items-center lg:grid-cols-4 lg:gap-4 w-full">
          {serviceFeatures.slice(0, 4).map((feature, index) => (
            <div
              key={index}
              className="flex flex-col justify-start items-center text-center gap-3 p-[20px_10px] lg:p-[30px_20px] bg-[#f5f5f5] rounded-lg w-full"
            >
              <div className="w-[45px] flex items-center justify-center mb-2">
                <img 
                  src={feature.icon} 
                  alt={feature.title} 
                  className="mx-auto h-auto text-(--ocean-green) pb-2" 
                />
              </div>

              <div className="flex flex-col gap-1">
                <p className="text-[#171717] text-[1.125rem] font-semibold leading-tight">
                  {feature.title}
                </p>

                <p className="text-[#707070] text-[0.875rem]">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

