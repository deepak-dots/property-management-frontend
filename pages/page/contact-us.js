import { useState } from "react";
import axios from "../../utils/axiosInstance";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    budget: "",
    message: "",
  });

  const [status, setStatus] = useState("");
  const [showSuccess, setShowSuccess] = useState(false); //  for popup

  // handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    //setStatus("Submitting...");

    try {
      const res = await axios.post("/contact-us", formData);

      if (res.status >= 200 && res.status < 300) {
        //setStatus("Message sent successfully!");
        setShowSuccess(true); //  show success popup
        setFormData({
          name: "",
          email: "",
          phone: "",
          budget: "",
          message: "",
        });

        // auto close popup after 3 seconds
       // setTimeout(() => setShowSuccess(false), 3000);
      } else {
        setStatus("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);

      const backendMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Server error. Try again later.";

      setStatus(backendMessage);
    }
  };

  return (
    <div className="relative isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
      {/*  Success Popup */}
      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-[90%] max-w-md text-center">
            <h3 className="text-xl font-semibold text-green-600">
             Message Sent!
            </h3>
            <p className="mt-2 text-gray-600">
              Thank you for reaching out. Our team will contact you soon.
            </p>
            <button
              onClick={() => setShowSuccess(false)}
              className="mt-4 inline-block bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-500"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Form Section */}
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
          Contact Us
        </h2>
        <p className="mt-2 text-lg text-gray-600">
          We’ll get back to you as soon as possible.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mx-auto mt-16 max-w-xl sm:mt-20"
      >
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          {/* Name */}
          <div className="sm:col-span-2">
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-gray-900"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your full name"
              required
              className="mt-2 w-full rounded-md border border-gray-300 px-3.5 py-2 text-gray-900 placeholder:text-gray-400 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
            />
          </div>

          {/* Email */}
          <div className="sm:col-span-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-900"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
              className="mt-2 w-full rounded-md border border-gray-300 px-3.5 py-2 text-gray-900 placeholder:text-gray-400 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
            />
          </div>

          {/* Phone */}
          <div className="sm:col-span-2">
            <label
              htmlFor="phone"
              className="block text-sm font-semibold text-gray-900"
            >
              Phone Number
            </label>
            <input
              id="phone"
              name="phone"
              type="text"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+91 9876543210"
              required
              className="mt-2 w-full rounded-md border border-gray-300 px-3.5 py-2 text-gray-900 placeholder:text-gray-400 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
            />
          </div>

          {/* Budget */}
          <div className="sm:col-span-2">
            <label
              htmlFor="budget"
              className="block text-sm font-semibold text-gray-900"
            >
              Budget
            </label>
            <input
              id="budget"
              name="budget"
              type="text"
              value={formData.budget}
              onChange={handleChange}
              placeholder="Enter your budget range"
              className="mt-2 w-full rounded-md border border-gray-300 px-3.5 py-2 text-gray-900 placeholder:text-gray-400 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
            />
          </div>

          {/* Message */}
          <div className="sm:col-span-2">
            <label
              htmlFor="message"
              className="block text-sm font-semibold text-gray-900"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us more about your requirements..."
              className="mt-2 w-full rounded-md border border-gray-300 px-3.5 py-2 text-gray-900 placeholder:text-gray-400 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
            ></textarea>
          </div>
        </div>

        <div className="mt-10">
          <button
            type="submit"
            className="w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600"
          >
            Submit
          </button>

          {status && (
            <p className="mt-4 text-center text-sm text-gray-600">{status}</p>
          )}
        </div>
      </form>
    </div>
  );
}
