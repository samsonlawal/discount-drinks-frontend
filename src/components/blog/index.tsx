import React from "react";
import { blogPosts } from "@/data";
import BlogCard from "./BlogCard";
import { FolderOpen, Clock } from "lucide-react";

export default function BlogSection() {
  return (
    <section className="section blog" id="blog">
      <div className="container">
        <h2 className="h2 section-title">Latest Blog Posts</h2>

        <ul className="blog-list">
          <li>
            <div className="blog-card">
              <figure className="card-banner">
                <a href="#">
                  <img
                    src="/images/blog-1.jpg"
                    alt="How to Choose the Perfect Wine for Every Occasion"
                    loading="lazy"
                    width="1020"
                    height="700"
                    className="w-100"
                  />
                </a>
              </figure>

              <div className="card-content">
                <ul className="card-meta-list">
                  <li className="card-meta-item">
                    <FolderOpen size={18} strokeWidth={1.7} />

                    <a href="#" className="card-meta-link">
                      Vodka
                    </a>
                  </li>

                  <li className="card-meta-item">
                    <Clock size={18} strokeWidth={1.7} />

                    <a href="#" className="card-meta-link">
                      <time>31 Dec 2025</time>
                    </a>
                  </li>
                </ul>

                <h3 className="h3 card-title">
                  <a href="#">
                    How to Choose the Perfect Wine for Every Occasion
                  </a>
                </h3>
              </div>
            </div>
          </li>

          <li>
            <div className="blog-card">
              <figure className="card-banner">
                <a href="#">
                  <img
                    src="/images/blog-2.jpg"
                    alt="What Goes Best With Wines and Spirits"
                    loading="lazy"
                    width="1020"
                    height="700"
                    className="w-100"
                  />
                </a>
              </figure>

              <div className="card-content">
                <ul className="card-meta-list">
                  <li className="card-meta-item">
                    <FolderOpen size={18} strokeWidth={1.7} />

                    <a href="#" className="card-meta-link">
                      Rum
                    </a>
                  </li>

                  <li className="card-meta-item">
                    <Clock size={18} strokeWidth={1.7} />

                    <a href="#" className="card-meta-link">
                      <time>31 Dec 2025</time>
                    </a>
                  </li>
                </ul>

                <h3 className="h3 card-title">
                  <a href="#">What Goes Best With Wines and Spirits</a>
                </h3>
              </div>
            </div>
          </li>

          <li>
            <div className="blog-card">
              <figure className="card-banner">
                <a href="#">
                  <img
                    src="/images/blog-3.jpg"
                    alt="How We Source Quality Wines and Drinks Worldwide"
                    loading="lazy"
                    width="1020"
                    height="700"
                    className="w-100"
                  />
                </a>
              </figure>

              <div className="card-content">
                <ul className="card-meta-list">
                  <li className="card-meta-item">
                    <FolderOpen size={18} strokeWidth={1.7} />

                    <a href="#" className="card-meta-link">
                      Whiskey
                    </a>
                  </li>

                  <li className="card-meta-item">
                    <Clock size={18} strokeWidth={1.7} />

                    <a href="#" className="card-meta-link">
                      <time>31 Dec 2025</time>
                    </a>
                  </li>
                </ul>

                <h3 className="h3 card-title">
                  <a href="#">
                    How We Source Quality Wines and Drinks Worldwide
                  </a>
                </h3>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}
