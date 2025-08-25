import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "../utils/axiosInstance";

export default function GetQuoteForm({ propertyId, onClose }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const onSubmit = async (data) => {
    setSuccess(null);
    setError(null);
    try {
      await axios.post("/quotes", { propertyId, ...data });
      setSuccess("Thank you! Your quote request has been received.");
      reset();
      setTimeout(() => onClose(), 5000);
    } catch (err) {
      console.error("Quote submit error:", err);
      const serverMsg =
        err?.response?.data?.error ||
        err?.response?.data?.message ||
        err.message ||
        "Something went wrong. Please try again.";
      setError(serverMsg);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 relative">
 

        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-3xl font-bold text-gray-800 hover:text-gray-600 close-btns"
        >
         <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" width="30px" height="30px">
          <path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z"/>
         </svg>
        </button>

        {!success ? (
          <>
            <h2 className="text-2xl font-bold mb-4 text-center">Get a Quote</h2>

            {error && (
              <p className="text-red-600 mb-2 text-center">{error}</p>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
              <input
                type="text"
                placeholder="Your Name"
                {...register("name", { required: "Name is required" })}
                className={`w-full border px-4 py-2 rounded ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

              <input
                type="email"
                placeholder="Your Email"
                {...register("email", {
                  required: "Email is required",
                  pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" },
                })}
                className={`w-full border px-4 py-2 rounded ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

              <input
                type="tel"
                placeholder="Your Contact Number"
                {...register("contactNumber", {
                  required: "Contact number is required",
                  pattern: { value: /^[0-9+\-()\s]{7,}$/, message: "Invalid contact number" },
                })}
                className={`w-full border px-4 py-2 rounded ${
                  errors.contactNumber ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.contactNumber && (
                <p className="text-red-500 text-sm">{errors.contactNumber.message}</p>
              )}

              <textarea
                placeholder="Your Message"
                rows="4"
                {...register("message", { required: "Message is required" })}
                className={`w-full border px-4 py-2 rounded ${
                  errors.message ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.message && <p className="text-red-500 text-sm">{errors.message.message}</p>}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-10">
            <h2 className="text-2xl font-bold mb-4 text-green-600">{success}</h2>
            <p className="text-gray-700 mb-6">
              Our team will contact you shortly regarding your request.
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
