"use client";

import React from "react";
import Image from "next/image";
import { CartItem as CartItemType } from "@/types";
import { Minus, Plus, Trash2 } from "lucide-react";

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
}

export default function CartItem({
  item,
  onUpdateQuantity,
  onRemove,
}: CartItemProps) {
  const handleDecrease = () => {
    if (item.quantity > 1) {
      onUpdateQuantity(item.id, item.quantity - 1);
    }
  };

  const handleIncrease = () => {
    if (item.quantity < 99) {
      onUpdateQuantity(item.id, item.quantity + 1);
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 1 && value <= 99) {
      onUpdateQuantity(item.id, value);
    }
  };

  const handleRemove = () => {
    if (confirm(`Remove ${item.name} from cart?`)) {
      onRemove(item.id);
    }
  };

  const itemTotal = (item.costPrice ?? item.price) * item.quantity;

  return (
    <li className="cart-item" data-product-id={item.id}>
      <article className="cart-item-card">
        <figure className="cart-item-image">
          <Image
            src={item.image}
            alt={item.name}
            width={120}
            height={155}
            className="object-cover"
          />
        </figure>

        <div className="cart-item-content">
          <h3 className="cart-item-title">{item.name}</h3>
          <p className="cart-item-price">£{(item.costPrice ?? item.price).toFixed(2)}</p>

          <div className="quantity-controls">
            <button
              className="quantity-btn quantity-btn--decrease"
              onClick={handleDecrease}
              aria-label={`Decrease quantity of ${item.name}`}
              disabled={item.quantity <= 1}
            >
              <Minus size={16} />
            </button>

            <input
              type="number"
              className="quantity-input"
              value={item.quantity}
              onChange={handleQuantityChange}
              min="1"
              max="99"
              aria-label={`Quantity of ${item.name}`}
            />

            <button
              className="quantity-btn quantity-btn--increase"
              onClick={handleIncrease}
              aria-label={`Increase quantity of ${item.name}`}
              disabled={item.quantity >= 99}
            >
              <Plus size={16} />
            </button>
          </div>
        </div>

        <div className="cart-item-actions">
          <p className="cart-item-total">£{itemTotal.toFixed(2)}</p>

          <button
            className="btn-remove"
            onClick={handleRemove}
            aria-label={`Remove ${item.name} from cart`}
          >
            <Trash2 size={18} />
            <span>Remove</span>
          </button>
        </div>
      </article>
    </li>
  );
}
