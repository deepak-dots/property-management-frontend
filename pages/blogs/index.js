// pages/blogs/index.js
import { useEffect, useState } from 'react';
import axios from '../../utils/axiosInstance';
import BlogCard from '../../components/BlogCard';

export default function BlogsPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('/blogs')
      .then((res) => {
        setPosts(res.data.data || []); // make sure it's an array
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-white py-10 sm:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl mb-10">
          Blog
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <p className="text-center text-gray-500 col-span-full">Loading...</p>
          ) : posts.length === 0 ? (
            <p className="text-center text-gray-500 col-span-full">No posts found.</p>
          ) : (
            posts.map((post) => <BlogCard key={post._id} post={post} />)
          )}
        </div>
      </div>
    </div>
  );
}
