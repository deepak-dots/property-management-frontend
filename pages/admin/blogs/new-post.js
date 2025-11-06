import { useState } from "react";
import dynamic from "next/dynamic";
import axios from "../../../utils/axiosInstance";
import { useRouter } from "next/router";
import AdminSidebar from "../../../components/AdminSidebar";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function AddBlog() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    content: "",
    excerpt: "",
    author: "",
    tags: "",
  });
  const [featureImage, setFeatureImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });
  const handleContentChange = (content) => setForm({ ...form, content });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFeatureImage(file);
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) =>
        formData.append(key, value)
      );
      if (featureImage) formData.append("featureImage", featureImage);

      await axios.post("/blogs", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      router.push("/admin/blogs");
    } catch (err) {
      console.error("Error adding blog:", err);
      alert("Failed to publish blog");
    }
  };

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 bg-gray-100 p-6">
        <h1 className="text-2xl font-bold mb-4">Add New Blog</h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded p-6 w-full max-w-2xl"
        >
          {/* Title */}
          <div className="mb-4">
            <label className="block mb-1 text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>

          {/* Author */}
          <div className="mb-4">
            <label className="block mb-1 text-gray-700">Author</label>
            <input
              type="text"
              name="author"
              value={form.author}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          {/* Excerpt */}
          <div className="mb-4">
            <label className="block mb-1 text-gray-700">Excerpt</label>
            <textarea
              name="excerpt"
              value={form.excerpt}
              onChange={handleChange}
              className="w-full border p-2 rounded h-20"
            />
          </div>

          {/* Content */}
          <div className="mb-4">
            <label className="block mb-1 text-gray-700">Content</label>
            <ReactQuill
              theme="snow"
              value={form.content}
              onChange={handleContentChange}
            />
          </div>

          {/* Tags */}
          <div className="mb-6">
            <label className="block mb-1 text-gray-700">Tags</label>
            <input
              type="text"
              name="tags"
              value={form.tags}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              placeholder="e.g. real-estate, tips"
            />
          </div>

          {/* Feature Image */}
          <div className="mb-4">
            <label className="block mb-1 text-gray-700">Feature Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full border p-2 rounded"
            />
            {previewUrl && (
              <img
                src={previewUrl}
                alt="Preview"
                className="mt-2 h-32 w-auto rounded"
              />
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700"
          >
            Publish Blog
          </button>
        </form>
      </main>
    </div>
  );
}
