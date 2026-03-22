// src/context/FavoritesContext.jsx
import { createContext, useContext, useState } from 'react'

const FavoritesContext = createContext(null)

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(function() {
    const saved = localStorage.getItem('smartstay-favorites')
    return saved ? JSON.parse(saved) : []
  })

  function toggleFavorite(listing) {
    setFavorites(function(prev) {
      const exists = prev.find(function(f) { return f.id === listing.id })
      const updated = exists
        ? prev.filter(function(f) { return f.id !== listing.id })
        : [...prev, listing]
      localStorage.setItem('smartstay-favorites', JSON.stringify(updated))
      return updated
    })
  }

  function isFavorited(id) {
    return favorites.some(function(f) { return f.id === id })
  }

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorited }}>
      {children}
    </FavoritesContext.Provider>
  )
}

// ← This is what was missing — the named export
export function useFavorites() {
  return useContext(FavoritesContext)
}