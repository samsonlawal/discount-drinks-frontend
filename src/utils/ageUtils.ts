/**
 * Calculates age from a DOB string (YYYY-MM-DD)
 */
export const calculateAge = (dob: string): number => {
  const birthDate = new Date(dob);
  const today = new Date();
  
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
};

/**
 * Checks if a user is at least 18 years old
 */
export const isAtLeast18 = (dob: string | undefined): boolean => {
  if (!dob) return false;
  return calculateAge(dob) >= 18;
};
