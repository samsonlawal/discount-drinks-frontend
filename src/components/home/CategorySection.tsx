import React from "react";
import Link from "next/link";
import Image from "next/image";
import { categories } from "@/data";

export default function CategorySection() {
  return (
    <section className="section category">
      <div className="container">
        <ul className="category-list">
          <li className="category-item">
            <figure className="category-banner">
              <img
                src="/images/category-1.jpg"
                alt="Gin"
                loading="lazy"
                width="510"
                height="600"
                className="w-100"
              />
            </figure>

            <a href="#" className="btn btn-secondary">
              Gin
            </a>
          </li>

          <li className="category-item">
            <figure className="category-banner">
              <img
                src="/images/category-2.jpg"
                alt="Party Liquour"
                loading="lazy"
                width="510"
                height="600"
                className="w-100"
              />
            </figure>

            <a href="#" className="btn btn-secondary">
              Party Liquour
            </a>
          </li>

          <li className="category-item">
            <figure className="category-banner">
              <img
                src="/images/category-3.jpg"
                alt="Whiskey"
                loading="lazy"
                width="510"
                height="600"
                className="w-100"
              />
            </figure>

            <a href="#" className="btn btn-secondary">
              Whiskey
            </a>
          </li>

          <li className="category-item">
            <figure className="category-banner">
              <img
                src="/images/category-4.jpg"
                alt="Scotch Whiskey"
                loading="lazy"
                width="510"
                height="600"
                className="w-100"
              />
            </figure>

            <a href="#" className="btn btn-secondary">
              Scotch Whiskey
            </a>
          </li>

          <li className="category-item">
            <figure className="category-banner">
              <img
                src="/images/category-5.jpg"
                alt="Vintage Whiskey"
                loading="lazy"
                width="510"
                height="600"
                className="w-100"
              />
            </figure>

            <a href="#" className="btn btn-secondary">
              Vintage Whiskey
            </a>
          </li>

          <li className="category-item">
            <figure className="category-banner">
              <img
                src="/images/category-6.jpg"
                alt="Distilled Whiskey"
                loading="lazy"
                width="510"
                height="600"
                className="w-100"
              />
            </figure>

            <a href="#" className="btn btn-secondary">
              Distilled Whiskey
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
