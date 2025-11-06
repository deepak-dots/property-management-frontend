import { useEffect, useState } from 'react';
import axios from '../../../utils/axiosInstance';
import Link from 'next/link';
import AdminSidebar from '../../../components/AdminSidebar';
import { useRouter } from 'next/router';

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState({ show: false, action: null, blog: null });
  const router = useRouter();

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const res = await axios.get('/blogs');
        console.log('✅ Blog API response:', res.data);
        setBlogs(res.data.data || []);
      } catch (err) {
        console.error('Error fetching blogs:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchBlogs();
  }, []);

  const handleConfirm = async () => {
    if (!modal.blog) return;
    try {
      if (modal.action === 'delete') {
        await axios.delete(`/blogs/${modal.blog._id}`);
        setBlogs((prev) => prev.filter((b) => b._id !== modal.blog._id));
      } else if (modal.action === 'duplicate') {
        const res = await axios.post(`/blogs/duplicate/${modal.blog._id}`);
        setBlogs((prev) => [...prev, res.data.data]);
      }
      setModal({ show: false, action: null, blog: null });
    } catch (err) {
      console.error('Action failed:', err);
      alert('Action failed');
      setModal({ show: false, action: null, blog: null });
    }
  };

  if (loading) return <p className="p-6">Loading blogs...</p>;

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />

      <main className="flex-1 bg-gray-100 p-6">
        <h1 className="text-2xl font-bold mb-4">Blogs</h1>

        <Link href="/admin/blogs/new-post">
          <button className="bg-blue-600 text-white px-4 py-2 rounded mb-4">
            Add New Blog
          </button>
        </Link>

        <table className="min-w-full border border-gray-300 bg-white shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-100 text-sm">
              <th className="border px-4 py-2 text-center">Title</th>
              <th className="border px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  No blogs found.
                </td>
              </tr>
            ) : (
              blogs.map((blog) => (
                <tr key={blog._id} className="hover:bg-gray-50 transition">
                  {/* <td className="px-2 py-1 border text-center">
                    {blog?.featureImage ? (
                      <img
                        src={
                          // Handle Cloudinary URLs, local uploads, or nested featureImage.path
                          typeof blog.featureImage === "string"
                            ? blog.featureImage.startsWith("http")
                              ? blog.featureImage
                              : `${API_URL.replace(/\/$/, "")}/${blog.featureImage.replace(/^\/+/, "")}`
                            : blog.featureImage.path && blog.featureImage.path.startsWith("http")
                            ? blog.featureImage.path
                            : `${API_URL.replace(/\/$/, "")}/${blog.featureImage.path?.replace(/^\/+/, "")}`
                        }
                        alt={blog.title}
                        className="h-12 w-16 object-cover rounded mx-auto"
                        onError={(e) => (e.target.src = "/no-image.png")}
                      />
                    ) : (
                      <span className="text-gray-400 text-sm">No Image</span>
                    )}
                  </td> */}

                  <td className="border px-4 py-2 text-center">{blog.title}</td>

                  <td className="border px-4 py-2 text-center space-x-2">
                    <Link href={`/admin/blogs/${blog._id}`}>
                      <button className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600">
                        Edit
                      </button>
                    </Link>

                    <button
                      onClick={() => router.push(`/blogs/${blog.slug}`)}
                      className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                    >
                      View
                    </button>

                    <button
                      onClick={() => setModal({ show: true, action: 'duplicate', blog })}
                      className="bg-indigo-500 text-white px-2 py-1 rounded hover:bg-indigo-600"
                    >
                      Duplicate
                    </button>

                    <button
                      onClick={() => setModal({ show: true, action: 'delete', blog })}
                      className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Confirmation Modal */}
        {modal.show && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded p-6 w-96 shadow-lg">
              <h2 className="text-xl font-bold mb-4">
                {modal.action === 'delete' ? 'Delete Blog' : 'Duplicate Blog'}
              </h2>
              <p className="mb-6">
                Are you sure you want to {modal.action} "<b>{modal.blog.title}</b>"?
              </p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setModal({ show: false, action: null, blog: null })}
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirm}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
