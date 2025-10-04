// components/UserDashboardSkeleton.jsx
export default function UserDashboardSkeleton() {
    return (
      <div className="space-y-6">
        <div className="h-8 w-1/3 bg-gray-300 rounded animate-pulse"></div>
        <div className="h-6 w-1/2 bg-gray-300 rounded animate-pulse"></div>
  
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
          {Array.from({ length: 4 }).map((_, idx) => (
            <div key={idx} className="bg-white shadow rounded-lg p-6 flex items-center space-x-4 animate-pulse">
              <div className="h-12 w-12 bg-gray-300 rounded-full"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 w-3/4 bg-gray-300 rounded"></div>
                <div className="h-3 w-1/2 bg-gray-300 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  