import React, { createContext, useContext, useState, useEffect } from 'react';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  // Load from localStorage on first mount
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const saved = localStorage.getItem('favorites');
    if (saved) {
      setFavorites(JSON.parse(saved)); // load full objects
    }
  }, []);

  // Save whenever favorites change
  useEffect(() => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Toggle favorite by full property object
  const toggleFavorite = (property) => {
    setFavorites((prev) => {
      const exists = prev.find((p) => p._id === property._id);
      if (exists) return prev.filter((p) => p._id !== property._id);
      return [...prev, property];
    });
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
