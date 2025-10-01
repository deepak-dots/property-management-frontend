'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from '../../utils/axiosInstance';
import UserLayout from '../../components/UserLayout';
import { 
  UserIcon, 
  PencilIcon, 
  HeartIcon, 
  ChatBubbleLeftEllipsisIcon 
} from '@heroicons/react/24/outline';

export default function UserDashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user dashboard info
  const fetchDashboard = async () => {
    try {
      const res = await axios.get('/user/dashboard'); // axiosInstance handles token
      setUser(res.data);
    } catch (err) {
      console.error('Error fetching dashboard:', err);
      localStorage.removeItem('userToken');
      router.push('/user/login');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (!token) {
      router.push('/user/login');
    } else {
      fetchDashboard();
    }
  }, []);

  if (loading) return <p className="p-8">Loading dashboard...</p>;

  return (
    <UserLayout userName={user?.name}>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>
      <p className="text-gray-600 mb-6">
        Welcome, <span className="font-medium">{user?.name}</span>
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* My Profile */}
        <div className="bg-white shadow rounded-lg p-6 flex items-center space-x-4">
          <UserIcon className="h-12 w-12 text-green-500" />
          <button onClick={() => router.push('/user/profile')}>
            <h3 className="text-lg font-semibold text-gray-700">My Profile</h3>
          </button>
        </div>

        {/* Edit Profile */}
        <div className="bg-white shadow rounded-lg p-6 flex items-center space-x-4">
          <PencilIcon className="h-12 w-12 text-blue-500" />
          <button onClick={() => router.push('/user/profile/edit')}>
            <h3 className="text-lg font-semibold text-gray-700">Edit Profile</h3>
          </button>
        </div>

        {/* My Favorites */}
        <div className="bg-white shadow rounded-lg p-6 flex items-center space-x-4">
          <HeartIcon className="h-12 w-12 text-yellow-500" />
          <button onClick={() => router.push('/user/favorites')}>
            <h3 className="text-lg font-semibold text-gray-700">My Favorites</h3>
          </button>
        </div>

        {/* My Enquiries */}
        <div className="bg-white shadow rounded-lg p-6 flex items-center space-x-4">
          <ChatBubbleLeftEllipsisIcon className="h-12 w-12 text-purple-500" />
          <button onClick={() => router.push('/user/enquiries')}>
            <h3 className="text-lg font-semibold text-gray-700">My Enquiries</h3>
          </button>
        </div>
      </div>
    </UserLayout>
  );
}
