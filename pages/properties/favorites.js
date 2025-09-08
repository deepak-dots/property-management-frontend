import { useFavorites } from '../../context/FavoritesContext';
import { useEffect, useState } from 'react';
import axios from '../../utils/axiosInstance';
import PropertyCard from '../../components/PropertyCard';
import { useRouter } from 'next/router';

export default function FavoritesPage() {
  const { favorites } = useFavorites();
  const [properties, setProperties] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (favorites.length === 0) return setProperties([]);
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `/properties/compare?ids=${favorites.join(',')}`
        );
        setProperties(res.data || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [favorites]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50">
      <h1 className="text-2xl font-semibold mb-4">Your Favorites</h1>

      {properties.length === 0 ? (
        <div className="text-center">
          <p className="mb-4">No favorites yet.</p>
          <button
            onClick={() => router.push('/')} // can be '/' or '/properties'
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            View Properties
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {properties.map((p) => (
            <PropertyCard key={p._id} property={p} />
          ))}
        </div>
      )}
    </div>

  );
}
