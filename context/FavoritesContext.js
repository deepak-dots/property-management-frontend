import React, { createContext, useContext, useState, useEffect } from 'react';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  // Load from localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const saved = localStorage.getItem('favorites');
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  // Persist to localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Add / remove toggle
  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  // Clear all
  const clearFavorites = () => setFavorites([]);

  return (
    <FavoritesContext.Provider
      value={{ favorites, toggleFavorite, clearFavorites }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

// Hook to use favorites
export const useFavorites = () => useContext(FavoritesContext);
