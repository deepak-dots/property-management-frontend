import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from '../../utils/axiosInstance';
import PropertyCard from '../../components/PropertyCard';
import PropertyFilters from '../../components/PropertyFilter';
import CompareModal from '../../components/CompareModal';

export default function Properties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    priceMin: null,
    priceMax: null,
    city: '',
    bhkType: '',
    propertyType: '',
    furnishing: '',
    transactionType: '',
    status: '',
  });

  const [filterOptions, setFilterOptions] = useState({
    cities: [],
    propertyTypes: [],
    bhkTypes: [],
    furnishings: [],
    transactionTypes: [],
    statuses: [],
    priceMin: 0,
    priceMax: 1000000,
  });

  const [showCompareModal, setShowCompareModal] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 9;

  const router = useRouter();

  // Fetch filtered properties with pagination
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const params = { ...router.query, page: currentPage, limit: itemsPerPage };

        const res = await axios.get('/properties', { params });
        const propertyList = Array.isArray(res.data)
          ? res.data
          : Array.isArray(res.data.properties)
          ? res.data.properties
          : [];

        setProperties(propertyList);

        if (res.data.totalPages) {
          setTotalPages(res.data.totalPages);
        } else if (res.data.totalCount) {
          setTotalPages(Math.ceil(res.data.totalCount / itemsPerPage));
        } else {
          setTotalPages(1);
        }

        const query = router.query;
        setFilters({
          search: query.search || '',
          city: query.city || '',
          bhkType: query.bhkType || '',
          propertyType: query.propertyType || '',
          furnishing: query.furnishing || '',
          transactionType: query.transactionType || '',
          status: query.status || '',
          priceMin: query.priceMin ? Number(query.priceMin) : null,
          priceMax: query.priceMax ? Number(query.priceMax) : null,
        });
      } catch (error) {
        console.error(error);
        setProperties([]);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [router.query, currentPage]);

  // Fetch ALL properties once to generate filter options
  useEffect(() => {
    const fetchAllProperties = async () => {
      try {
        const res = await axios.get('/properties');
        const allProperties = Array.isArray(res.data)
          ? res.data
          : Array.isArray(res.data.properties)
          ? res.data.properties
          : [];

        const prices = allProperties.map((p) => p.price).filter(Boolean);
        const minPrice = prices.length ? Math.min(...prices) : 0;
        const maxPrice = prices.length ? Math.max(...prices) : 1000000;

        setFilterOptions({
          cities: [...new Set(allProperties.map((p) => p.city).filter(Boolean))].sort(),
          propertyTypes: [...new Set(allProperties.map((p) => p.propertyType).filter(Boolean))].sort(),
          bhkTypes: [...new Set(allProperties.map((p) => p.bhkType).filter(Boolean))].sort(),
          furnishings: [...new Set(allProperties.map((p) => p.furnishing).filter(Boolean))].sort(),
          transactionTypes: [...new Set(allProperties.map((p) => p.transactionType).filter(Boolean))].sort(),
          statuses: [...new Set(allProperties.map((p) => p.status).filter(Boolean))].sort(),
          priceMin: minPrice,
          priceMax: maxPrice,
        });

        // initialize filters with min/max on first load
        setFilters((prev) => ({
          ...prev,
          priceMin: prev.priceMin ?? minPrice,
          priceMax: prev.priceMax ?? maxPrice,
        }));
      } catch (error) {
        console.error('Failed to fetch all properties for filter options', error);
      }
    };

    fetchAllProperties();
  }, []);

  const handleFilterChange = (eOrObj) => {
    let newFilters = { ...filters };
  
    if (eOrObj.target) {
      const { name, value } = eOrObj.target;
      newFilters[name] = value;
    } else {
      newFilters = { ...newFilters, ...eOrObj };
    }
  
    // remove empty values
    Object.keys(newFilters).forEach((key) => {
      if (newFilters[key] === '' || newFilters[key] === null) delete newFilters[key];
    });
  
    // convert price to numbers
    if (newFilters.priceMin != null) newFilters.priceMin = Number(newFilters.priceMin);
    if (newFilters.priceMax != null) newFilters.priceMax = Number(newFilters.priceMax);
  
    setFilters(newFilters);
    setCurrentPage(1);
  
    // update URL
    const params = new URLSearchParams(newFilters).toString();
    router.push(`/properties?${params}`, undefined, { shallow: true });
  };
  
  

  const clearFilters = () => {
    setFilters({
      search: '',
      priceMin: filterOptions.priceMin,
      priceMax: filterOptions.priceMax,
      city: '',
      bhkType: '',
      furnishing: '',
      transactionType: '',
      status: '',
    });
    setCurrentPage(1);
    router.push('/properties');
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">Properties</h1>
        <div className="flex flex-col md:flex-row gap-6">
          <PropertyFilters
            filters={filters}
            filterOptions={filterOptions}
            onFilterChange={handleFilterChange}
            onClearFilters={clearFilters}
          />

          <div className="md:w-3/4 w-full h-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              <p className="text-center col-span-full text-gray-500">Loading...</p>
            ) : properties.length === 0 ? (
              <p className="text-center col-span-full text-gray-500">No properties found.</p>
            ) : (
              properties.map((property) => (
                <PropertyCard key={property._id} 
                  property={property}   
                  onOpenCompare={() => setShowCompareModal(true)} 
                />
              ))
            )}
          </div>
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center mt-6 space-x-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded border disabled:opacity-50"
            >
              Previous
            </button>

            <span className="px-4 py-2">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded border disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>

       {/* Global Compare Modal */}
        <CompareModal
          isOpen={showCompareModal}
          onClose={() => setShowCompareModal(false)}
        />

    </div>
  );
}
