import Link from "next/link";

export default function CardGrid({
  data = [],
  linkKey,
  gradientClass = "from-gray-800 via-gray-600 to-gray-900",
  limit,
}) {
  const displayedData = limit ? data.slice(0, limit) : data;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {displayedData.map((item, i) => {
        const name = item[linkKey] || item;

        //  Replace spaces with "+"
        const formattedName = name.trim().replace(/\s+/g, "+");

        return (
            <Link
            key={i}
            href={`/properties?${linkKey}=${encodeURIComponent(name.replace(/ /g, '+'))}`}
            className="group rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
          >
          
            <div
              className={`flex items-center justify-center h-40 bg-gradient-to-br ${gradientClass} text-white text-center rounded-2xl group-hover:scale-[1.03] transition-transform duration-300`}
            >
              <h3 className="font-semibold text-lg px-3">{name}</h3>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
