import { useFavorites } from '../../context/FavoritesContext';
import PropertyCard from '../../components/PropertyCard';
import CompareModal from '../../components/CompareModal';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

export default function FavoritesPage() {
  const { user } = useAuth();
  const { favorites } = useFavorites(); // full property objects
  const router = useRouter();

  // State to control Compare Modal
  const [showCompareModal, setShowCompareModal] = useState(false);

  const openCompareModal = () => setShowCompareModal(true);
  const closeCompareModal = () => setShowCompareModal(false);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Your Favorites</h2>

      {favorites.length === 0 ? (
        <div className="text-center mt-10">
          <p className="mb-4">No favorites yet.</p>
          <button
            onClick={() => router.push('/properties')}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            View Properties
          </button>
        </div>
      ) : (
        <>
          {/* Show login notice for guests */}
          {!user && favorites.length > 0 && (
            <p className="mb-8 text-gray-600">
              Login to save properties to your wishlist.{' '}
              <button
                onClick={() => router.push('/user/login')}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition ml-2"
              >
                Login
              </button>
            </p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {favorites.map((property) => (
              <PropertyCard
                key={property._id}
                property={property}
                onOpenCompare={openCompareModal} // Pass function to open modal
              />
            ))}
          </div>

          {/* Compare Modal */}
          <CompareModal
            isOpen={showCompareModal}
            onClose={closeCompareModal}
          />
        </>
      )}
    </div>
  );
}
