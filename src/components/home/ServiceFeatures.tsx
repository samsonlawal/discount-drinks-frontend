import React from "react";
import Image from "next/image";
import { serviceFeatures } from "@/data";

export default function ServiceFeatures() {
  return (
    <section className="service">
      <div className="container">
        <ul className="service-list">
          <li className="service-item">
            <div className="service-item-icon">
              <img src="/images/service-icon-1.svg" alt="Service icon" />
            </div>

            <div className="service-content">
              <p className="service-item-title">Free Shipping</p>

              <p className="service-item-text">On All Order Over $599</p>
            </div>
          </li>

          <li className="service-item">
            <div className="service-item-icon">
              <img src="/images/service-icon-2.svg" alt="Service icon" />
            </div>

            <div className="service-content">
              <p className="service-item-title">Easy Returns</p>

              <p className="service-item-text">30 Day Returns Policy</p>
            </div>
          </li>

          <li className="service-item">
            <div className="service-item-icon">
              <img src="/images/service-icon-3.svg" alt="Service icon" />
            </div>

            <div className="service-content">
              <p className="service-item-title">Secure Payment</p>

              <p className="service-item-text">100% Secure Gaurantee</p>
            </div>
          </li>

          <li className="service-item">
            <div className="service-item-icon">
              <img src="/images/service-icon-4.svg" alt="Service icon" />
            </div>

            <div className="service-content">
              <p className="service-item-title">Special Support</p>

              <p className="service-item-text">24/7 Dedicated Support</p>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}
