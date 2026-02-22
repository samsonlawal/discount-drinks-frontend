"use client";

import React from "react";
import { X } from "lucide-react";

interface FilterSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  // Dynamic lists from backend
  categories: any[];
  badges: any[];
  brands: any[];
  
  // Selected states
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  selectedBadge: string;
  onBadgeChange: (badge: string) => void;
  selectedBrand: string;
  onBrandChange: (brand: string) => void;
  priceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
  filteredCount: number;
  totalCount: number;
}

const priceRanges: { label: string; min: number; max: number }[] = [
  { label: "Under £25", min: 0, max: 25 },
  { label: "£25 – £50", min: 25, max: 50 },
  { label: "£50 – £100", min: 50, max: 100 },
  { label: "£100 – £200", min: 100, max: 200 },
  { label: "Over £200", min: 200, max: 9999 },
];

export default function FilterSidebar({
  isOpen,
  onToggle,
  categories,
  badges,
  brands,
  selectedCategory,
  onCategoryChange,
  selectedBadge,
  onBadgeChange,
  selectedBrand,
  onBrandChange,
  priceRange,
  onPriceRangeChange,
  filteredCount,
  totalCount,
}: FilterSidebarProps) {
  const activePriceKey = `${priceRange[0]}-${priceRange[1]}`;

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="filter-backdrop"
          onClick={onToggle}
          aria-hidden="true"
        />
      )}

      <aside
        className={`filter-panel${isOpen ? " filter-panel--open" : ""}`}
        aria-hidden={!isOpen}
      >
        <div className="filter-panel__inner">
          {/* Header with close button */}
          <div className="filter-panel__header">
            <div className="filter-panel__header-left">
              <span className="filter-panel__heading">Filters</span>
              <span className="filter-panel__count">
                {filteredCount} of {totalCount}
              </span>
            </div>
            <button
              onClick={onToggle}
              className="filter-panel__close"
              aria-label="Close filters"
            >
              <X size={20} />
            </button>
          </div>

          {/* Categories */}
          <div className="filter-group">
            <h4 className="filter-group__title">Category</h4>
            <ul className="filter-chip-list">
              <li>
                <button
                  onClick={() => onCategoryChange("All")}
                  className={`filter-chip${selectedCategory === "All" ? " filter-chip--active" : ""}`}
                >
                  All
                </button>
              </li>
              {categories.map((category) => (
                <li key={category._id || category.id || category.name}>
                  <button
                    onClick={() => onCategoryChange(category.name)}
                    className={`filter-chip${selectedCategory === category.name ? " filter-chip--active" : ""}`}
                  >
                    {category.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Type / Badges */}
          <div className="filter-group">
            <h4 className="filter-group__title">Type</h4>
            <ul className="filter-chip-list">
              <li>
                <button
                  onClick={() => onBadgeChange("All")}
                  className={`filter-chip${selectedBadge === "All" ? " filter-chip--active" : ""}`}
                >
                  All
                </button>
              </li>
              {badges.map((badge) => (
                <li key={badge._id || badge.id || badge.name}>
                  <button
                    onClick={() => onBadgeChange(badge.name)}
                    className={`filter-chip${selectedBadge === badge.name ? " filter-chip--active" : ""}`}
                  >
                    {badge.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Brands */}
          <div className="filter-group">
            <h4 className="filter-group__title">Brands</h4>
            <ul className="filter-chip-list">
              <li>
                <button
                  onClick={() => onBrandChange("All")}
                  className={`filter-chip${selectedBrand === "All" ? " filter-chip--active" : ""}`}
                >
                  All
                </button>
              </li>
              {brands.map((brand) => (
                <li key={brand._id || brand.id || brand.name}>
                  <button
                    onClick={() => onBrandChange(brand.name)}
                    className={`filter-chip${selectedBrand === brand.name ? " filter-chip--active" : ""}`}
                  >
                    {brand.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Price Range */}
          <div className="filter-group">
            <h4 className="filter-group__title">Price</h4>
            <ul className="filter-checklist">
              <li className="filter-checklist__item">
                <label className="filter-checklist__label">
                  <input
                    type="radio"
                    name="price"
                    className="filter-checklist__input"
                    checked={priceRange[0] === 0 && priceRange[1] === 9999}
                    onChange={() => onPriceRangeChange([0, 9999])}
                  />
                  <span className="filter-checklist__box" />
                  Any price
                </label>
              </li>
              {priceRanges.map((range) => {
                const key = `${range.min}-${range.max}`;
                return (
                  <li key={key} className="filter-checklist__item">
                    <label className="filter-checklist__label">
                      <input
                        type="radio"
                        name="price"
                        className="filter-checklist__input"
                        checked={activePriceKey === key}
                        onChange={() =>
                          onPriceRangeChange([range.min, range.max])
                        }
                      />
                      <span className="filter-checklist__box" />
                      {range.label}
                    </label>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </aside>
    </>
  );
}
