// components/PropertyCardSkeleton.jsx
export default function PropertyCardSkeleton() {
    return (
      <div className="border rounded-lg p-4 animate-pulse">
        {/* Image Placeholder */}
        <div className="h-56 w-full bg-gray-300 mb-4"></div>
        
        {/* Title Placeholder */}
        <div className="h-6 bg-gray-300 mb-2 w-3/4"></div>
        
        {/* BHK / Type Placeholder */}
        <div className="h-4 bg-gray-300 mb-2 w-1/2"></div>
        
        {/* Price Placeholder */}
        <div className="h-4 bg-gray-300 mb-4 w-1/3"></div>
        
        {/* Buttons Placeholder */}
        <div className="flex gap-2">
          <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
          <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
          <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
        </div>
      </div>
    );
  }
  