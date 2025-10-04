// pages/index.jsx
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from '../utils/axiosInstance';
import PropertyCard from '../components/PropertyCard';
import CompareModal from '../components/CompareModal';
import PropertyCardSkeleton from '../skeleton/PropertyCardSkeleton';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';

export default function Home() {
  const [recentProperties, setRecentProperties] = useState([]);
  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [loadingRecent, setLoadingRecent] = useState(true);
  const [loadingFeatured, setLoadingFeatured] = useState(true);
  const [showCompareModal, setShowCompareModal] = useState(false);
  const router = useRouter();

  // Fetch recent and featured properties
  useEffect(() => {
    setLoadingRecent(true);
    setLoadingFeatured(true);

    // Recent properties
    axios.get('/properties?limit=6')
      .then(res => {
        if (Array.isArray(res.data)) setRecentProperties(res.data);
        else if (Array.isArray(res.data.properties)) setRecentProperties(res.data.properties);
        else setRecentProperties([]);
      })
      .catch(err => {
        console.error(err);
        setRecentProperties([]);
      })
      .finally(() => setLoadingRecent(false));

    // Featured properties
    axios.get('/properties?limit=7&featured=true')
      .then(res => {
        if (Array.isArray(res.data)) setFeaturedProperties(res.data);
        else if (Array.isArray(res.data.properties)) setFeaturedProperties(res.data.properties);
        else setFeaturedProperties([]);
      })
      .catch(err => {
        console.error(err);
        setFeaturedProperties([]);
      })
      .finally(() => setLoadingFeatured(false));
  }, []);

  return (
    <div>
      {/* Banner */}
      <div className="hero-banner bg-cover bg-center h-[300px] flex items-center justify-center text-white">
        <h1 className="text-4xl font-bold bg-black bg-opacity-50 p-4 rounded">
          Welcome to Dotsquares eProperty
        </h1>
      </div>

      {/* Featured Properties - Slider */}
      <div className="max-w-6xl mx-auto p-6 mt-12">
        <h2 className="text-2xl font-bold mb-6">Featured Properties</h2>

        <Swiper
          modules={[Navigation, Autoplay]}
          navigation={true}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
        >
          {loadingFeatured
            ? Array.from({ length: 6 }).map((_, idx) => (
                <SwiperSlide key={idx}>
                  <PropertyCardSkeleton />
                </SwiperSlide>
              ))
            : featuredProperties.map(property => (
                <SwiperSlide key={property._id}>
                  <PropertyCard
                    property={property}
                    onOpenCompare={() => setShowCompareModal(true)}
                    isInSlider={true}
                  />
                </SwiperSlide>
              ))}
        </Swiper>
      </div>

      {/* Recently Added Properties - Grid */}
      <div className="max-w-6xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6">Recently Added Properties</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {loadingRecent
            ? Array.from({ length: 6 }).map((_, idx) => (
                <PropertyCardSkeleton key={idx} />
              ))
            : recentProperties.length === 0
            ? <p className="col-span-full text-center text-gray-500">No properties found.</p>
            : recentProperties.map(property => (
                <PropertyCard
                  key={property._id}
                  property={property}
                  onOpenCompare={() => setShowCompareModal(true)}
                  isInSlider={false}
                />
              ))}
        </div>
      </div>

      {/* Global Compare Modal */}
      <CompareModal
        isOpen={showCompareModal}
        onClose={() => setShowCompareModal(false)}
      />
    </div>
  );
}
