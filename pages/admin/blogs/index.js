import { useEffect, useState } from 'react';
import axios from '../../../utils/axiosInstance';
import Link from 'next/link';
import AdminSidebar from '../../../components/AdminSidebar';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState({ show: false, action: null, blog: null });
  const router = useRouter();

  // ------------------- FETCH BLOGS -------------------
  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        router.push('/admin/login');
        return;
      }

      const res = await axios.get('/blogs', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBlogs(res.data.data || []);
    } catch (err) {
      console.error('Error fetching blogs:', err);
      toast.error('Failed to fetch blogs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // ------------------- HANDLE LOGOUT -------------------
  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    window.dispatchEvent(new Event('logout'));
    router.push('/admin/login');
  };

  // ------------------- HANDLE CONFIRM -------------------
  const handleConfirm = async () => {
    if (!modal.blog) return;
    try {
      const token = localStorage.getItem('adminToken');

      if (modal.action === 'delete') {
        await axios.delete(`/blogs/${modal.blog._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBlogs((prev) => prev.filter((b) => b._id !== modal.blog._id));
        toast.success('Blog deleted successfully');
      } else if (modal.action === 'duplicate') {
        const res = await axios.post(
          `/blogs/duplicate/${modal.blog._id}`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setBlogs((prev) => [...prev, res.data.data]);
        toast.success('Blog duplicated successfully');
      }
    } catch (err) {
      console.error('Action failed:', err);
      toast.error('Action failed');
    } finally {
      setModal({ show: false, action: null, blog: null });
    }
  };

  // ------------------- RENDER -------------------
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <AdminSidebar onLogout={handleLogout} />

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto bg-white shadow-md rounded-lg p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Blogs</h1>
            <Link href="/admin/blogs/new-post">
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Add New Blog
              </button>
            </Link>
          </div>

          {/* Table / Loading / Empty */}
          {loading ? (
            <p className="text-gray-500">Loading blogs...</p>
          ) : blogs.length === 0 ? (
            <p className="text-gray-500">No blogs found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200 text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-2 border text-left">Title</th>
                    <th className="p-2 border text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {blogs.map((blog) => (
                    <tr key={blog._id} className="hover:bg-gray-50">
                      <td className="p-2 border">{blog.title}</td>

                      <td className="p-2 border text-center space-x-2">
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
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Confirmation Modal */}
        {modal.show && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
              <h2 className="text-xl font-bold mb-4">
                {modal.action === 'delete' ? 'Delete Blog' : 'Duplicate Blog'}
              </h2>
              <p className="mb-6">
                Are you sure you want to {modal.action} "<b>{modal.blog.title}</b>"?
              </p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setModal({ show: false, action: null, blog: null })}
                  className="px-4 py-2 border rounded hover:bg-gray-100"
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
