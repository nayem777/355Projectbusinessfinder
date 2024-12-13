'use client'

import { useState, useEffect } from 'react'
import { SiteHeader } from "@/components/site-header"
import { VenueCard } from "@/components/venue-card"

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites')
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites))
    }
  }, [])

  const handleFavoriteToggle = (id: string) => {
    const updatedFavorites = favorites.filter(fav => fav.id !== id)
    setFavorites(updatedFavorites)
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites))
  }

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="container py-12">
        <h1 className="text-3xl font-bold mb-6">Your Favorites</h1>
        {favorites.length === 0 ? (
          <p className="text-center text-muted-foreground">You haven't added any favorites yet.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {favorites.map((venue) => (
              <VenueCard 
                key={venue.id} 
                {...venue} 
                onFavoriteToggle={handleFavoriteToggle}
                isFavorite={true}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

