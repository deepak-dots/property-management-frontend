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
    axios.get('/properties?limit=3')
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
      <div className="max-w-7xl mx-auto p-6 mt-12">
        <h2 className="text-2xl font-bold mb-6">Featured Properties</h2>

        <Swiper
          modules={[Navigation, Autoplay]}
          navigation={false}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 1 },
            990: { slidesPerView: 3 },
            1200: { slidesPerView: 3 },
            1600: { slidesPerView: 3 },
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
        >
          {loadingFeatured
            ? Array.from({ length: 8 }).map((_, idx) => (
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


      {/* ✅ Testimonials Section */}
      <section className="bg-black relative overflow-hidden py-10" id="testimonial">
        <div className="absolute right-0">
          <img
            alt="vector"
            loading="lazy"
            width="700"
            height="1039"
            decoding="async"
            className="text-transparent"
            src="/images/Vector.png"
          />
        </div>

        <div className="container max-w-8xl mx-auto px-5 2xl:px-0">
          <div>
            <p className="text-white text-base font-semibold flex gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                role="img"
                className="text-2xl text-primary"
                width="1em"
                height="1em"
                viewBox="0 0 256 256"
              >
                <path
                  fill="currentColor"
                  d="M224 120v96a8 8 0 0 1-8 8H40a8 8 0 0 1-8-8v-96a15.87 15.87 0 0 1 4.69-11.32l80-80a16 16 0 0 1 22.62 0l80 80A15.87 15.87 0 0 1 224 120"
                ></path>
              </svg>
              Testimonials
            </p>
            <h2 className="lg:text-[52px] text-[40px] font-medium text-white">
              What our clients say
            </h2>
          </div>

          {/* Testimonials Wrapper */}
          <div className="relative mt-9">
            <div className="lg:flex items-center gap-11">
              <div className="flex items-start gap-11 lg:pr-20">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    role="img"
                    className="text-primary text-white"
                    width="32"
                    height="32"
                    viewBox="0 0 256 256"
                  >
                    <path
                      fill="currentColor"
                      d="m219.31 108.68l-80-80a16 16 0 0 0-22.62 0l-80 80A15.87 15.87 0 0 0 32 120v96a8 8 0 0 0 8 8h176a8 8 0 0 0 8-8v-96a15.87 15.87 0 0 0-4.69-11.32M208 208H48v-88l80-80l80 80Z"
                    ></path>
                  </svg>
                </div>

                <div>
                  <h4 className="text-white lg:text-3xl text-2xl">
                    I found my ideal home in no time! The listings were detailed,
                    the photos were accurate, and the whole process felt seamless.
                    Customer service was top-notch, answering all my questions. I
                    will definitely use this platform again!
                  </h4>
                  <div className="flex items-center mt-8 gap-6">
                    <img
                      alt="Emily & John Smith"
                      loading="lazy"
                      width="80"
                      height="80"
                      decoding="async"
                      className="rounded-full lg:hidden block"
                      src="/images/smiths.jpg"
                    />
                    <div>
                      <h6 className="text-white text-xm font-medium">
                        Emily & John Smith
                      </h6>
                      <p className="text-white/40">Buyer</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full h-full rounded-2xl overflow-hidden">
                <img
                  alt="Emily & John Smith"
                  loading="lazy"
                  width="440"
                  height="440"
                  decoding="async"
                  className="lg:block hidden"
                  src="/images/smiths.jpg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>


    <div className="container max-w-8xl mx-auto px-5 py-10 2xl:px-0">
      {/* 🎥 Video Background */}
      <div className="relative overflow-hidden">
        <video
          className="w-full absolute top-0 left-0 object-cover -z-10"
          autoPlay
          loop
          muted
          aria-label="Video background showing luxurious real estate"
        >
          <source
            src="https://videos.pexels.com/video-files/7233782/7233782-hd_1920_1080_25fps.mp4"
            type="video/mp4"
          />
        </video>

        <div className="bg-black/30 lg:py-64 md:py-28 py-10">
          <div className="flex flex-col items-center gap-8">
            <h2 className="text-white text-3xl max-w-3/4 text-center font-medium">
              Enter a realm where exquisite design and timeless luxury come together.
            </h2>
            <a
              href="#"
              className="bg-white py-4 px-8 rounded-full text-dark hover:bg-dark hover:text-white duration-300"
            >
              Get In Touch
            </a>
          </div>
        </div>
      </div>
    </div>




      {/* Recently Added Properties - Grid */}
      <div className="max-w-7xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6">Recently Added Properties</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {loadingRecent
            ? Array.from({ length: 4 }).map((_, idx) => (
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
