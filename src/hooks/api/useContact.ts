import { useState } from "react";
import { ContactRequest } from "@/types/contact";
import contactService from "@/services/contact/contactService";
import { getErrorMessage } from "@/utils/errorUtils";

export const useContact = () => {
  const [formData, setFormData] = useState<ContactRequest>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await contactService.sendContactMessage(formData);
      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err: any) {
      setError(getErrorMessage(err, "Something went wrong. Please try again later."));
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    isSubmitting,
    submitted,
    error,
    handleChange,
    handleSubmit,
  };
};
