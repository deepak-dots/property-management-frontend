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

  // Login status
  useEffect(() => {
    const updateUserLogin = () => setIsUserLoggedIn(!!localStorage.getItem('userToken'));
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
    <header className="relative isolate overflow-hidden bg-gray-900 text-gray-300 shadow sticky top-0 z-50">
      {/* Background decorative shape */}
      <div aria-hidden="true" className="absolute top-0 left-1/2 -z-10 -translate-x-1/2 blur-3xl xl:-top-6">
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="aspect-[1155/678] w-[72rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
        />
      </div>

      {/* Row 1: Logo | Search | Menu */}
      <div className="border-b border-gray-200 relative z-10">
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
            <Link href="/properties" className="hover:text-white-600">
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
      <div className="bg-gray-50 border-t border-gray-200 relative z-10 py-3 px-4">
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
