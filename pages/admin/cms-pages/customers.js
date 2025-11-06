import { useEffect, useState } from "react";
import axios from "../../../utils/axiosInstance";
import { useRouter } from "next/router";
import AdminSidebar from "../../../components/AdminSidebar";

export default function NewsletterSubscriptionPage() {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    window.dispatchEvent(new Event("logout"));
    router.push("/admin/login");
  };

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        router.push("/admin/login");
        return;
      }

      const res = await axios.get("/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data.users || []);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <AdminSidebar onLogout={handleLogout} />

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto bg-white shadow-md rounded-lg p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-800">
              All Users & Newsletter Subscribers
            </h1>
            <button
              onClick={() => router.push("/admin/dashboard")}
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
            >
              Back to Dashboard
            </button>
          </div>

          {/* Table / Loading / Empty */}
          {loading ? (
            <p className="text-gray-500">Loading users...</p>
          ) : users.length === 0 ? (
            <p className="text-gray-500">No users found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200 text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-2 border text-left">Name</th>
                    <th className="p-2 border text-left">Email</th>
                    <th className="p-2 border text-left">Phone</th>
                    <th className="p-2 border text-left">Newsletter</th>
                    <th className="p-2 border text-left">Signup Type</th>
                    <th className="p-2 border text-left">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id} className="hover:bg-gray-50">
                      <td className="p-2 border">{user.name || "—"}</td>
                      <td className="p-2 border">{user.email}</td>
                      <td className="p-2 border">{user.phone || "—"}</td>
                      <td className="p-2 border">
                        {user.newsletter ? (
                          <span className="text-green-600 font-semibold">Yes</span>
                        ) : (
                          <span className="text-gray-500">No</span>
                        )}
                      </td>
                      <td className="p-2 border">
                        {user.isNewsletterOnly ? "Newsletter Only" : "Full Signup"}
                      </td>
                      <td className="p-2 border">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
