/**
 * Utility to extract the most relevant error message from a backend response.
 * Handles single message strings, error strings, and validation error arrays.
 */
export const getErrorMessage = (error: any, fallback: string = "An error occurred"): string => {
  if (!error) return fallback;

  const data = error?.response?.data;

  // 1. Handle "errors" array (Common in validation errors)
  if (data?.errors && Array.isArray(data.errors) && data.errors.length > 0) {
    // If the first item is a string, return it
    if (typeof data.errors[0] === "string") return data.errors[0];
    
    // If the first item is an object (e.g., from Joi/Express-validator), try to get its message
    if (typeof data.errors[0] === "object" && data.errors[0]?.message) return data.errors[0].message;
  }

  // 2. Handle "error" string
  if (typeof data?.error === "string" && data.error) return data.error;

  // 3. Handle "message" string
  if (typeof data?.message === "string" && data.message) return data.message;
  
  // 4. Handle cases where data itself might be the message string
  if (typeof data === "string" && data) return data;

  // 5. Fallback to standard error message or provided fallback
  return error?.message || fallback;
};
