// lib/stripe.js
import { loadStripe } from "@stripe/stripe-js";

export const stripePromise = loadStripe("pk_test_51TE0mgHYYq9j31iEdZlmVl2ZHvEUaYkPYQtBJ0OBAMgsQDz1tAKOuzuVTePLkg7KMXQdtQOKUsOXvdqsrSK6IcdH00vLne0eWE");