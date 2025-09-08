'use client';

import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from '../utils/axiosInstance';

import SearchBar from './SearchBar';
import FilterBar from './FilterBar';

export default function Header() {
  const router = useRouter();

  
  // Fallback coordinates for nearest properties
  const fallbackLat = 26.8594;
  const fallbackLng = 75.8328;

  const [coordsAllowed, setCoordsAllowed] = useState(true);

  // Selected filter states
  const [propertyType, setPropertyType] = useState('');
  const [search, setSearch] = useState('');
  const [city, setCity] = useState('');
  const [bhkType, setBhkType] = useState('');
  const [furnishing, setFurnishing] = useState('');
  const [transactionType, setTransactionType] = useState('');
  const [status, setStatus] = useState('');

  // Filter option lists
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [cities, setCities] = useState([]);
  const [bhkTypes, setBhkTypes] = useState([]);
  const [furnishings, setFurnishings] = useState([]);
  const [transactionTypes, setTransactionTypes] = useState([]);
  const [statuses, setStatuses] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Sync filters from query params
  useEffect(() => {
    if (!router.isReady) return;

    setSearch(router.query.search || '');
    setPropertyType(router.query.propertyType || '');
    setCity(router.query.city || '');
    setBhkType(router.query.bhkType || '');
    setFurnishing(router.query.furnishing || '');
    setTransactionType(router.query.transactionType || '');
    setStatus(router.query.status || '');
  }, [router.isReady, router.query]);

  // Check login status
  useEffect(() => {
    const updateLoginStatus = () => {
      const token = localStorage.getItem('adminToken');
      setIsLoggedIn(!!token);
    };
    updateLoginStatus();
    window.addEventListener('login', updateLoginStatus);
    window.addEventListener('logout', updateLoginStatus);
    return () => {
      window.removeEventListener('login', updateLoginStatus);
      window.removeEventListener('logout', updateLoginStatus);
    };
  }, []);

  // Fetch filter options from properties
  useEffect(() => {
    setLoading(true);
    setError(null);

    axios
      .get('/properties')
      .then((res) => {
        const properties = Array.isArray(res.data)
          ? res.data
          : Array.isArray(res.data.properties)
          ? res.data.properties
          : [];

        if (!properties.length) {
          setError('No properties found to build filters.');
          setPropertyTypes([]);
          setCities([]);
          setBhkTypes([]);
          setFurnishings([]);
          setTransactionTypes([]);
          setStatuses([]);
          return;
        }

        const propertyTypeSet = new Set();
        const citySet = new Set();
        const bhkSet = new Set();
        const furnishingSet = new Set();
        const transactionTypeSet = new Set();
        const statusSet = new Set();

        properties.forEach((p) => {
          if (p.propertyType) propertyTypeSet.add(p.propertyType);
          if (p.city) citySet.add(p.city);
          if (p.bhkType) bhkSet.add(p.bhkType);
          if (p.furnishing) furnishingSet.add(p.furnishing);
          if (p.transactionType) transactionTypeSet.add(p.transactionType);
          if (p.status) statusSet.add(p.status);
        });

        setPropertyTypes([...propertyTypeSet].sort());
        setCities([...citySet].sort());
        setBhkTypes([...bhkSet].sort());
        setFurnishings([...furnishingSet].sort());
        setTransactionTypes([...transactionTypeSet].sort());
        setStatuses([...statusSet].sort());
      })
      .catch(() => {
        setError('Failed to load filter options.');
      })
      .finally(() => setLoading(false));
  }, []);

  // Update search in URL
  const handleSearch = (searchValue) => {
    setSearch(searchValue);
    router.push({
      pathname: '/properties',
      query: { ...router.query, search: searchValue || undefined, page: undefined },
    });
  };

  // Update filters in URL
  const handleFilter = ({
    propertyType: newPropertyType = '',
    city: newCity = '',
    bhkType: newBhkType = '',
    furnishing: newFurnishing = '',
    transactionType: newTransactionType = '',
    status: newStatus = '',
  }) => {
    setPropertyType(newPropertyType);
    setCity(newCity);
    setBhkType(newBhkType);
    setFurnishing(newFurnishing);
    setTransactionType(newTransactionType);
    setStatus(newStatus);

    router.push({
      pathname: '/properties',
      query: {
        ...router.query,
        propertyType: newPropertyType || undefined,
        city: newCity || undefined,
        bhkType: newBhkType || undefined,
        furnishing: newFurnishing || undefined,
        transactionType: newTransactionType || undefined,
        status: newStatus || undefined,
        page: undefined,
      },
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsLoggedIn(false);
    router.push('/');
  };

   // Detect if geolocation is allowed
   useEffect(() => {
    if (!navigator.geolocation) {
      setCoordsAllowed(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      () => setCoordsAllowed(true),
      () => setCoordsAllowed(false)
    );
  }, []);

  const handleShowNearest = () => {
    router.push(`/properties/nearby?lat=${fallbackLat}&lng=${fallbackLng}`);
  };


  return (
    <header className="w-full">
      {/* Top Bar */}
      <div className="bg-black text-white py-3 px-4 sm:px-8 shadow-md">
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <img
              src="https://www.dotsquares.com/assets/dots-logo.svg"
              alt="Logo"
              className="h-10 w-auto"
            />
          </Link>
    
          {/* Navigation */}
          <nav className="flex flex-wrap justify-center md:justify-end gap-4 mt-2 md:mt-0">
          
            {coordsAllowed ? (
              <button
                onClick={handleShowNearest}
                className="hover:text-yellow-300 font-medium"
              >
                Nearby
              </button>
            ) : (
              <Link
                href={`/properties/nearby?lat=${fallbackLat}&lng=${fallbackLng}`}
                className="hover:text-yellow-300 font-medium"
              >
                Nearby
              </Link>
            )}
            <Link href="/properties" className="hover:text-yellow-300 font-medium">
              Properties
            </Link>
            <Link href="/properties/compare" className="hover:text-yellow-300 font-medium">
              Compare
            </Link>
            <Link href="/properties/favorites" className="hover:text-yellow-300 font-medium">
            Favorites
            </Link>
            {isLoggedIn ? (
              <Link href="/admin/dashboard" className="hover:text-yellow-300 font-medium">
                Dashboard
              </Link>
            ) : (
              <Link href="/admin/login" className="hover:text-yellow-300 font-medium">
                Admin Login
              </Link>
            )}
            
          </nav>
        </div>
      </div>
    
      {/* Search Bar */}
      <div className="bg-white py-4 px-4 sm:px-8 border-b shadow-sm">
        <div className="max-w-screen-xl mx-auto">
          <SearchBar initialSearch={search} onSearch={handleSearch} />
        </div>
      </div>
    
      {/* Filter Bar */}
      <div className="bg-black py-3 px-4 sm:px-8 border-b">
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center gap-4">
          <FilterBar
            initialPropertyType={propertyType}
            initialCity={city}
            initialBhkType={bhkType}
            initialFurnishing={furnishing}
            initialTransactionType={transactionType}
            initialStatus={status}
            propertyTypes={propertyTypes}
            cities={cities}
            bhkTypes={bhkTypes}
            furnishings={furnishings}
            transactionTypes={transactionTypes}
            statuses={statuses}
            onFilter={handleFilter}
            loading={loading}
            coordsAllowed={coordsAllowed}   
            handleShowNearest={handleShowNearest}
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
      </div>
    </header>
  
  );
}
