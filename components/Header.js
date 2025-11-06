'use client';

import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from '../utils/axiosInstance';
import SearchBar from './SearchBar';
import FilterBar from './FilterBar';

export default function Header() {
  const router = useRouter();

  // Fallback coordinates
  const fallbackLat = 26.8594;
  const fallbackLng = 75.8328;

  const [coordsAllowed, setCoordsAllowed] = useState(true);

  // Selected filters
  const [propertyType, setPropertyType] = useState('');
  const [search, setSearch] = useState('');
  const [city, setCity] = useState('');
  const [bhkType, setBhkType] = useState('');
  const [furnishing, setFurnishing] = useState('');
  const [transactionType, setTransactionType] = useState('');
  const [status, setStatus] = useState('');

  // Options
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [cities, setCities] = useState([]);
  const [bhkTypes, setBhkTypes] = useState([]);
  const [furnishings, setFurnishings] = useState([]);
  const [transactionTypes, setTransactionTypes] = useState([]);
  const [statuses, setStatuses] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  // Sync filters from query
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

  // Login status (Admin + User)
  useEffect(() => {
    const updateAdminLogin = () => setIsLoggedIn(!!localStorage.getItem('adminToken'));
    const updateUserLogin = () => setIsUserLoggedIn(!!localStorage.getItem('userToken'));

    updateAdminLogin();
    updateUserLogin();
    window.addEventListener('login', updateUserLogin);
    window.addEventListener('logout', updateUserLogin);
    return () => {
      window.removeEventListener('login', updateUserLogin);
      window.removeEventListener('logout', updateUserLogin);
    };
  }, []);

  // Fetch filters
  useEffect(() => {
    setLoading(true);
    axios
      .get('/properties')
      .then((res) => {
        const properties = Array.isArray(res.data)
          ? res.data
          : Array.isArray(res.data.properties)
          ? res.data.properties
          : [];
        if (!properties.length) {
          setError('No properties found.');
          return;
        }

        const unique = (key) => [...new Set(properties.map((p) => p[key]).filter(Boolean))].sort();

        setPropertyTypes(unique('propertyType'));
        setCities(unique('city'));
        setBhkTypes(unique('bhkType'));
        setFurnishings(unique('furnishing'));
        setTransactionTypes(unique('transactionType'));
        setStatuses(unique('status'));
      })
      .catch(() => setError('Failed to load filters'))
      .finally(() => setLoading(false));
  }, []);

  const handleSearch = (searchValue) => {
    setSearch(searchValue);
    router.push({
      pathname: '/properties',
      query: { ...router.query, search: searchValue || undefined, page: undefined },
    });
  };

  const handleFilter = (filters) => {
    router.push({
      pathname: '/properties',
      query: { ...router.query, ...filters, page: undefined },
    });
  };

  useEffect(() => {
    if (!navigator.geolocation) return setCoordsAllowed(false);
    navigator.geolocation.getCurrentPosition(
      () => setCoordsAllowed(true),
      () => setCoordsAllowed(false)
    );
  }, []);

  const handleShowNearest = () => {
    router.push(`/properties/nearby?lat=${fallbackLat}&lng=${fallbackLng}`);
  };

  return (
    <header className="w-full bg-black shadow sticky top-0 z-50">
      {/* Row 1: Logo | Search | Menu */}
      <div className="border-b border-gray-200">
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 px-4 py-3">
          {/* Logo */}
          <Link href="/">
            <img
              src="https://www.dotsquares.com/assets/dots-logo.svg"
              alt="Logo"
              className="h-10 w-auto"
            />
          </Link>

          {/* Search */}
          <div className="flex-1 w-full md:max-w-xl">
            <SearchBar initialSearch={search} onSearch={handleSearch} />
          </div>

          {/* Menu */}
          <nav className="flex flex-wrap justify-center md:justify-end gap-4 text-white font-medium">
            <Link href="/properties" className="hover:text-blue-600">
              Properties
            </Link>
            <Link href="/properties/compare" className="hover:text-white-600">
              Compare
            </Link>
            <Link href="/properties/favorites" className="hover:text-white-600">
              Favorites
            </Link>

            {!isUserLoggedIn ? (
              <Link href="/user/login" className="hover:text-white-600">
                Login
              </Link>
            ) : (
              <>
                <Link href="/user/dashboard" className="hover:text-white-600">
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    localStorage.removeItem('userToken');
                    setIsUserLoggedIn(false);
                    router.push('/');
                  }}
                  className="hover:text-white-600"
                >
                  Logout
                </button>
              </>
            )}
          </nav>
        </div>
      </div>

      {/* Row 2: Filter Bar */}
      <div className="bg-gray-50 border-t border-gray-200 py-3 px-4">
        <div className="max-w-screen-xl mx-auto">
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
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
      </div>
    </header>
  );
}
