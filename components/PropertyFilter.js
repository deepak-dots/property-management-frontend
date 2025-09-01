import React, { useState, useEffect } from "react";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";

export default function PropertyFilters({
  filters,
  filterOptions,
  onFilterChange,
  onClearFilters,
}) {
  const minPrice = filterOptions.priceMin || 0;
  const maxPrice = filterOptions.priceMax || 1000000;

  // local state for slider
  const [sliderValues, setSliderValues] = useState([
    filters.priceMin ?? minPrice,
    filters.priceMax ?? maxPrice,
  ]);

  // ✅ only reset when clearFilters updates parent filters
  useEffect(() => {
    if (
      filters.priceMin === null ||
      filters.priceMax === null ||
      (filters.priceMin === minPrice && filters.priceMax === maxPrice)
    ) {
      setSliderValues([minPrice, maxPrice]);
    }
  }, [filters.priceMin, filters.priceMax, minPrice, maxPrice]);

  const handleSliderChange = (values) => {
    setSliderValues(values);
    onFilterChange({ target: { name: "priceMin", value: values[0] } });
    onFilterChange({ target: { name: "priceMax", value: values[1] } });
  };

  const handleClear = () => {
    setSliderValues([minPrice, maxPrice]); // ✅ reset local slider state
    onClearFilters();
  };

  return (
    <div className="md:w-1/4 w-full bg-white shadow p-4 rounded h-fit space-y-6">
      <h3 className="text-lg font-semibold mb-4">Filters</h3>

      {/* Search Input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onFilterChange({ target: { name: "search", value: filters.search } });
        }}
        className="flex items-center w-full mb-4 h-10"
      >
        <input
          type="text"
          name="search"
          value={filters.search}
          onChange={onFilterChange}
          placeholder="Search properties..."
          className="w-20 flex-grow border border-gray-300 rounded-l px-3 py-1 h-full focus:outline-none"
        />
      </form>

      {/* Price Range Slider */}
      <div>
        <label className="block mb-2 font-medium">Price Range</label>
        <div className="mb-2 flex justify-between text-sm">
          <span>₹{sliderValues[0]}</span>
          <span>₹{sliderValues[1]}</span>
        </div>
        <RangeSlider
          min={minPrice}
          max={maxPrice}
          step={1000}
          value={sliderValues}
          onInput={handleSliderChange}
        />
      </div>

      {/* Other filters */}
      {[
        { label: "Property Type", name: "propertyType", options: filterOptions.propertyTypes },
        { label: "City", name: "city", options: filterOptions.cities },
        { label: "BHK Type", name: "bhkType", options: filterOptions.bhkTypes },
        { label: "Furnishing", name: "furnishing", options: filterOptions.furnishings },
        { label: "Transaction Type", name: "transactionType", options: filterOptions.transactionTypes },
        { label: "Status", name: "status", options: filterOptions.statuses },
        
      ].map(({ label, name, options }) => (
        <div key={name}>
          <label className="block mb-1 font-medium">{label}</label>
          <select
            name={name}
            value={filters[name] || ""}
            onChange={onFilterChange}
            className="w-full border border-gray-300 rounded px-2 py-1"
          >
            <option value="">All</option>
            {options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      ))}

      <button
        onClick={handleClear}
        className="mt-4 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
      >
        Clear Filters
      </button>
    </div>
  );
}
