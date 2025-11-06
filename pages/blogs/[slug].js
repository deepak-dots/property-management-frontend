// pages/blogs/[slug].js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from '../../utils/axiosInstance';
import Link from 'next/link';

export default function BlogDetail() {
  const router = useRouter();
  const { slug } = router.query;

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!slug) return;

    const fetchPost = async () => {
      try {
        const res = await axios.get(`/blogs/${slug}`);
        setPost(res.data.data || res.data);
      } catch (err) {
        console.error('Error fetching blog post:', err);
        setError(err.response?.data?.error || 'Failed to load blog post');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading)
    return (
      <p className="text-center mt-16 text-gray-500 text-lg animate-pulse">
        Loading blog post...
      </p>
    );

  if (error)
    return (
      <p className="text-center text-red-500 mt-16 text-lg">{error}</p>
    );

  if (!post)
    return (
      <p className="text-center mt-16 text-gray-500 text-lg">
        Blog post not found.
      </p>
    );

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4 sm:px-6 lg:px-8 mb-20">
      {/* Back Link */}
      <Link
        href="/blogs"
        className="text-blue-600 hover:text-blue-800 underline mb-6 inline-block"
      >
        ← Back to Blogs
      </Link>

      <article className="prose prose-lg sm:prose-xl lg:prose-2xl mx-auto">
        <h2 className="font-bold">{post.title}</h2>
        <p className="text-gray-500 text-sm sm:text-base mb-4">
          By {post.author || 'Unknown'} |{' '}
          {new Date(post.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>

        {/*  Blog Feature Image */}
        <div className="my-6">
          <img
            src={
              post.featureImage
                ? post.featureImage
                : '/images/pexels-expect-best-79873-323775.jpg'
            }
            alt={post.title}
            className="w-full rounded-lg object-cover max-h-96 mx-auto"
            onError={(e) =>
              (e.target.src = '/images/pexels-expect-best-79873-323775.jpg')
            }
          />
        </div>

        {/*  Blog Content */}
        <div
            className="mt-6 text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post.content }}
        />


        {/*  Tags Section */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-8">
            <h3 className="font-semibold mb-2">Tags:</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
}
