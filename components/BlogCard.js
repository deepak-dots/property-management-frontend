// components/BlogCard.jsx
import { useRouter } from 'next/router';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function BlogCard({ post }) {
  const router = useRouter();

  const getImageUrl = (img) =>
    img?.startsWith('http') ? img : `${API_URL}/uploads/${img}`;

  return (
    <div
      className="flex flex-col border rounded-lg overflow-hidden shadow-md cursor-pointer hover:shadow-lg transition-shadow duration-300"
      onClick={() => router.push(`/blogs/${post.slug}`)}
    >
      {/* Image */}
      <div className="relative h-56 w-full">
      <img
        src={post.featureImage ? post.featureImage : "/images/pexels-expect-best-79873-323775.jpg"}
        alt={post.title}
        className="h-full w-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex items-center gap-2 text-xs mb-2">
          <time className="text-gray-500">
            {new Date(post.createdAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </time>
          {post.category && (
            <span className="rounded-full bg-gray-50 px-3 py-1 font-medium text-gray-600 hover:bg-gray-100">
              {post.category}
            </span>
          )}
        </div>

        <h3 className="text-lg font-semibold text-gray-900 hover:text-gray-600">
          {post.title}
        </h3>
        <p className="mt-2 text-sm text-gray-600 line-clamp-3">
          {(post.excerpt || post.content || '').slice(0, 150)}...
        </p>

        {/* Author info */}
        <div className="mt-auto flex items-center gap-3 pt-4 border-t border-gray-100">
          <img
            src={post.featureImage ? post.featureImage : "/images/pexels-expect-best-79873-323775.jpg"}
            alt={post.author}
            className="h-10 w-10 rounded-full object-cover"
          />
          <div className="text-sm">
            <p className="font-semibold text-gray-900">{post.author || 'Anonymous'}</p>
            <p className="text-gray-600">{post.designation || 'Author'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
