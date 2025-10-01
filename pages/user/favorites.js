'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from '../../utils/axiosInstance';
import UserLayout from '../../components/UserLayout';
import PropertyCard from '../../components/PropertyCard';

export default function MyFavorites() {
  const router = useRouter();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch favorites from backend
  const fetchFavorites = async () => {
    try {
      const res = await axios.get('/user/favorites'); // axiosInstance handles token
      setFavorites(res.data || []);
    } catch (err) {
      console.error('Error fetching favorites:', err);
      localStorage.removeItem('userToken');
      router.push('/user/login');
    } finally {
      setLoading(false);
    }
  };

  // Check authentication & fetch favorites
  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (!token) {
      router.push('/user/login');
    } else {
      fetchFavorites();
    }
  }, []);

  if (loading) return <p className="p-8">Loading favorites...</p>;

  return (
    <UserLayout>
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6">My Favorites</h1>

        {favorites.length === 0 ? (
          <p>You have no favorite properties yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((property) => (
              <PropertyCard
                key={property._id}
                property={property}
                onOpenCompare={() => {}}
              />
            ))}
          </div>
        )}
      </div>
    </UserLayout>
  );
}
