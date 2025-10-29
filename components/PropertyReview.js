import { useState } from "react";
import axios from "../utils/axiosInstance";
import Rating from "react-rating";
import { StarIcon } from "@heroicons/react/24/solid";
import { toast } from "react-toastify";

const ReviewForm = ({ propertyId, onSuccess }) => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !rating) {
      toast.error("Please provide your name and rating");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(`/properties/${propertyId}/reviews`, { name, message, rating });
      toast.success("Review submitted!");
      setName(""); setMessage(""); setRating(0);
      onSuccess && onSuccess(res.data); // Update parent if needed
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit review");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full border p-2 rounded"
        required
      />

      <textarea
        placeholder="Your Review"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full border p-2 rounded"
      />

      <div className="flex items-center gap-2">
        <span>Rating:</span>
        <Rating
          initialRating={rating}
          emptySymbol={<StarIcon className="w-6 h-6 text-gray-300" />}
          fullSymbol={<StarIcon className="w-6 h-6 text-yellow-400" />}
          onChange={(value) => setRating(value)}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {loading ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );
};

export default ReviewForm;
