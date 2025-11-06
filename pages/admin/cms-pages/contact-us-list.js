import { useEffect, useState } from "react";
import axios from "../../../utils/axiosInstance";
import { useRouter } from "next/router";
import AdminSidebar from "../../../components/AdminSidebar";

export default function AdminContactUsPage() {
  const router = useRouter();
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    window.dispatchEvent(new Event("logout"));
    router.push("/admin/login");
  };

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        router.push("/admin/login");
        return;
      }

      const res = await axios.get("/contact-us", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setContacts(res.data.contacts || []);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
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
              Contact Form Submissions
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
            <p className="text-gray-500">Loading contact submissions...</p>
          ) : contacts.length === 0 ? (
            <p className="text-gray-500">No contact submissions found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200 text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-2 border text-left">Name</th>
                    <th className="p-2 border text-left">Email</th>
                    <th className="p-2 border text-left">Phone</th>
                    <th className="p-2 border text-left">Budget</th>
                    <th className="p-2 border text-left">Message</th>
                    <th className="p-2 border text-left">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.map((contact) => (
                    <tr key={contact._id} className="hover:bg-gray-50">
                      <td className="p-2 border">{contact.name}</td>
                      <td className="p-2 border">{contact.email}</td>
                      <td className="p-2 border">{contact.phone}</td>
                      <td className="p-2 border">{contact.budget || "—"}</td>
                      <td className="p-2 border">{contact.message || "—"}</td>
                      <td className="p-2 border">
                        {new Date(contact.createdAt).toLocaleString()}
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
