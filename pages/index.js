// pages/index.jsx
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from '../utils/axiosInstance';
import PropertyCard from '../components/PropertyCard';
import BlogCard from '../components/BlogCard';
import CompareModal from '../components/CompareModal';
import PropertyCardSkeleton from '../skeleton/PropertyCardSkeleton';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import CardGrid from "../components/CardGrid";


import 'swiper/css';
import 'swiper/css/navigation';

export default function Home() {
  const [recentProperties, setRecentProperties] = useState([]);
  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [recentBlogs, setRecentBlogs] = useState([]);
  const [loadingRecent, setLoadingRecent] = useState(true);
  const [loadingFeatured, setLoadingFeatured] = useState(true);
  const [loadingBlogs, setLoadingBlogs] = useState(true);
  const [showCompareModal, setShowCompareModal] = useState(false);

  const [developers, setDevelopers] = useState([]);
  const [projects, setProjects] = useState([]);

  

  const router = useRouter();

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

  useEffect(() => {
    axios.get('/properties/developers').then(res => setDevelopers(res.data));
    axios.get('/properties/projects').then(res => setProjects(res.data));
  }, []);

  useEffect(() => {
    setLoadingRecent(true);
    setLoadingFeatured(true);
    setLoadingBlogs(true);

    // Recent properties
    axios.get('/properties?limit=4')
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

    // Recent blogs
    axios.get('/blogs?limit=4') // Adjust limit as needed
      .then(res => {
        if (Array.isArray(res.data.data)) setRecentBlogs(res.data.data);
        else setRecentBlogs([]);
      })
      .catch(err => {
        console.error(err);
        setRecentBlogs([]);
      })
      .finally(() => setLoadingBlogs(false));
  }, []);

  return (
    <div>
      {/* Banner */}
      
      <div className="hero-banner bg-[url('/banner-image.png')] bg-cover bg-center h-[300px] flex items-center justify-center text-white overflow-hidden">
        <h1 className="text-4xl font-bold bg-black bg-opacity-50 p-4 rounded animate-slideFade">
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
            990: { slidesPerView: 4 },
            1200: { slidesPerView: 4 },
            1600: { slidesPerView: 4 },
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


      {/* Testimonials Section */}
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
            <h2 className="lg:text-[40px] text-[32px] font-medium text-white">
              What our clients say
            </h2>
          </div>

          {/* Testimonials Wrapper */}
          <div className="relative">
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
                  <p className="text-white ">
                    I found my ideal home in no time! The listings were detailed,
                    the photos were accurate, and the whole process felt seamless.
                    Customer service was top-notch, answering all my questions. I
                    will definitely use this platform again!
                  </p>
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

      


    <div className="container max-w-7xl mx-auto px-5 py-10 2xl:px-0">
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
              href="/page/contact-us"
              className="bg-white py-4 px-8 rounded-full text-dark duration-300"
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
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

     {/* Developer Section */}
     <div className="max-w-7xl mx-auto p-6">
      <section className="mb-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Top Developers</h2>
          <Link
            href="/properties/developers"
            className="text-sm font-medium text-blue-600 hover:text-blue-800 transition"
          >
            View All →
          </Link>
        </div>

        {/* Developer Card Grid */}
        <CardGrid
          data={developers}
          linkKey="developer"
          gradientClass="flex items-center justify-center h-40 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 text-white text-center rounded-2xl group-hover:scale-[1.03] transition-transform duration-300"
          limit={10}
        />
       
      </section>
    </div>

    {/* Project Section */}
    <div className="max-w-7xl mx-auto p-6">
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Popular Projects</h2>
          <Link
            href="/properties/projects"
            className="text-sm font-medium text-green-600 hover:text-green-800 transition"
          >
            View All →
          </Link>
        </div>

        {/* Project Card Grid */}
        <CardGrid
          data={projects}
          linkKey="project"
          gradientClass="flex items-center justify-center h-40 bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600 text-white text-center rounded-2xl group-hover:scale-[1.03] transition-transform duration-300"
          limit={10}
          />       
      </section>
    </div>

    {/* Recent Blogs Section */}
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Latest Blogs</h2>
          <Link
            href="/blogs"
            className="text-sm font-medium text-blue-600 hover:text-blue-800 transition"
          >
            View All →
          </Link>
        </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {loadingBlogs
          ? Array.from({ length: 4 }).map((_, idx) => (
              <div key={idx} className="h-72 bg-gray-100 animate-pulse rounded-lg" />
            ))
          : recentBlogs.length === 0
          ? <p className="col-span-full text-center text-gray-500">No blogs found.</p>
          : recentBlogs.map(blog => (
              <BlogCard key={blog._id} post={blog} />
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
