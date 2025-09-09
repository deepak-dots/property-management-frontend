import { useRouter } from 'next/router';
import { useCompare } from '../context/CompareContext';
import { useFavorites } from '../context/FavoritesContext';
import { toast } from 'react-toastify';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function PropertyCard({ property, onOpenCompare }) {
  const router = useRouter();
  const { compareList, toggleCompare } = useCompare();
  const { favorites, toggleFavorite } = useFavorites();

  const getImageUrl = (img) =>
    img?.startsWith('http') ? img : `${API_URL}/uploads/${img}`;

  // Handle favorite with toast
  const handleFavoriteClick = (e) => {
    e.stopPropagation();

    const alreadyFavorited = favorites.some((p) => p._id === property._id);
    toggleFavorite(property); // Pass full object to context

    if (alreadyFavorited) {
      toast.info(`${property.title} removed from favorites`);
    } else {
      toast.success(`${property.title} added to favorites`);
    }
  };

  const handleCompareClick = (e) => {
    e.stopPropagation();
    toggleCompare(property._id);

    if (onOpenCompare) {
      onOpenCompare();
    }
  };

  return (
    <div className="h-full-properties-card border rounded-lg overflow-hidden shadow-md group cursor-pointer hover:shadow-lg transition-shadow duration-300">
      {/* Image Section */}
      <div
        className="relative"
        onClick={() => router.push(`/properties/${property._id}`)}
      >
        {property.images && property.images.length > 0 ? (
          <img
            src={getImageUrl(property.images[0])}
            alt={property.title}
            className="h-56 w-full object-cover"
          />
        ) : (
          <div className="h-56 w-full bg-gray-200 flex items-center justify-center text-gray-500">
            No Image
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex justify-center items-center">
          <button
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/properties/${property._id}`);
            }}
            className="bg-white text-black font-medium py-2 px-4 rounded hover:bg-gray-200"
          >
            View Details
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4">
        <h3 className="text-lg font-semibold">{property.title}</h3>

        {property.bhkType && (
          <p className="text-sm text-gray-600 mb-1">
            <strong>
              {property.bhkType !== 'N/A'
                ? property.bhkType
                : property.propertyType}
            </strong>
          </p>
        )}

        {property.price && (
          <p className="text-green-600 font-bold">
            ₹ {Number(property.price).toLocaleString()}
          </p>
        )}

        {(property.city || property.address) && (
          <p className="text-sm text-gray-600">
            {[property.address, property.city].filter(Boolean).join(', ')}
          </p>
        )}

        <div className="flex gap-3 mt-8 justify-center">
          {/* Compare Button */}
          <button
            onClick={handleCompareClick}
            className={`mt-3 px-3 py-1 rounded text-sm font-medium transition ${
              compareList.includes(property._id)
                ? 'bg-red-500 text-white hover:bg-red-600'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            {compareList.includes(property._id)
              ? 'Remove from Compare'
              : 'Add to Compare'}
          </button>

          {/* Favorite Button */}
          <button
            onClick={handleFavoriteClick} // ✅ Fixed here
            className={`mt-2 px-3 py-1 rounded text-sm font-medium transition ${
              favorites.some((p) => p._id === property._id)
                ? 'bg-yellow-500 text-white hover:bg-yellow-600'
                : 'bg-gray-300 text-gray-800 hover:bg-gray-400'
            }`}
          >
            {favorites.some((p) => p._id === property._id)
              ? '★ Favorited'
              : '☆ Add to Favorites'}
          </button>
        </div>
      </div>
    </div>
  );
}
