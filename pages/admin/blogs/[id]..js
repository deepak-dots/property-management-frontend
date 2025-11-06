import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "../../../utils/axiosInstance";
import AdminSidebar from "../../../components/AdminSidebar";
import dynamic from "next/dynamic";

// Dynamic import for ReactQuill
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

// ✅ BlogForm Component
function BlogForm({ initialData, onSubmit, loading }) {
  const [form, setForm] = useState({
    title: "",
    content: "",
    excerpt: "",
    author: "",
    tags: "",
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title || "",
        content: initialData.content || "",
        excerpt: initialData.excerpt || "",
        author: initialData.author || "",
        tags: initialData.tags?.join(", ") || "",
      });
      if (initialData.featureImage) setPreview(initialData.featureImage);
    }
  }, [initialData]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", form.title);
    data.append("content", form.content);
    data.append("excerpt", form.excerpt);
    data.append("author", form.author);
    data.append("tags", form.tags);
    if (image) data.append("featureImage", image);

    onSubmit(data);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded p-6 w-full max-w-2xl"
      encType="multipart/form-data"
    >
      {/* Title */}
      <div className="mb-4">
        <label className="block text-gray-700 mb-1">Title</label>
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
        <label className="block text-gray-700 mb-1">Author</label>
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
        <label className="block text-gray-700 mb-1">Excerpt</label>
        <textarea
          name="excerpt"
          value={form.excerpt}
          onChange={handleChange}
          className="w-full border p-2 rounded h-20"
        />
      </div>

      {/* Content */}
      <div className="mb-4">
        <label className="block text-gray-700 mb-1">Content</label>
        <ReactQuill
          theme="snow"
          value={form.content}
          onChange={(content) => setForm({ ...form, content })}
        />
      </div>

      {/* Tags */}
      <div className="mb-6">
        <label className="block text-gray-700 mb-1">Tags (comma separated)</label>
        <input
          type="text"
          name="tags"
          value={form.tags}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div>

      {/* ✅ Image Upload */}
      <div className="mb-6">
        <label className="block text-gray-700 mb-1">Feature Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full border p-2 rounded"
        />
        {preview && (
          <div className="mt-3">
            <img
              src={preview || initialData.featureImage}
              alt="Preview"
              className="w-48 h-32 object-cover rounded border"
            />
          </div>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700"
      >
        {loading ? "Saving..." : "Update Blog"}
      </button>
    </form>
  );
}

export default function EditBlog() {
  const router = useRouter();
  const { id } = router.query;

  const [blogData, setBlogData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [confirmModal, setConfirmModal] = useState(false);
  const [pendingData, setPendingData] = useState(null);

  useEffect(() => {
    if (!id) return;
    async function fetchBlog() {
      try {
        const res = await axios.get(`/blogs/id/${id}`);
        setBlogData(res.data.data);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.error || "Failed to fetch blog");
      } finally {
        setLoading(false);
      }
    }
    fetchBlog();
  }, [id]);

  const handleSubmit = (formData) => {
    setPendingData(formData);
    setConfirmModal(true);
  };

  const handleConfirmSave = async () => {
    if (!pendingData) return;
    setSaving(true);
    setError("");
    try {
      await axios.put(`/blogs/${id}`, pendingData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      router.push("/admin/blogs");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "Update failed");
    } finally {
      setSaving(false);
      setConfirmModal(false);
      setPendingData(null);
    }
  };

  if (loading) return <p className="p-6">Loading blog...</p>;

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">Edit Blog</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <BlogForm initialData={blogData} onSubmit={handleSubmit} loading={saving} />
      </main>

      {/* Confirmation Modal */}
      {confirmModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded p-6 w-96">
            <h2 className="text-xl font-bold mb-4">Confirm Save</h2>
            <p className="mb-6">
              Are you sure you want to save changes to "{blogData.title}"?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setConfirmModal(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmSave}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
