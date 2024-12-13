'use client'

import { useState } from 'react'
import { SiteHeader } from "@/components/site-header"
import { VenueCard } from "@/components/venue-card"
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'

const restaurants = [
  {
    image: "/placeholder.svg?height=400&width=600",
    title: "Le Bernardin",
    location: "Midtown Manhattan",
    priceLevel: "$$$$",
    rating: 9.6,
    category: "French",
    type: "restaurant" as const,
    lat: 40.7614,
    lng: -73.9814,
  },
  {
    image: "/placeholder.svg?height=400&width=600",
    title: "Eleven Madison Park",
    location: "Flatiron District",
    priceLevel: "$$$$",
    rating: 9.4,
    category: "Contemporary American",
    type: "restaurant" as const,
    lat: 40.7416,
    lng: -73.9870,
  },
  {
    image: "/placeholder.svg?height=400&width=600",
    title: "Per Se",
    location: "Columbus Circle",
    priceLevel: "$$$$",
    rating: 9.3,
    category: "French American",
    type: "restaurant" as const,
    lat: 40.7682,
    lng: -73.9829,
  },
]

const mapContainerStyle = {
  width: '100%',
  height: '400px'
}

const center = {
  lat: 40.7549,
  lng: -73.9840
}

export default function RestaurantsPage() {
  const [selectedRestaurant, setSelectedRestaurant] = useState(null)

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="container py-12">
        <h1 className="text-3xl font-bold mb-6">New York City Restaurants</h1>
        <div className="mb-8">
          <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={center}
              zoom={13}
            >
              {restaurants.map((restaurant) => (
                <Marker
                  key={restaurant.title}
                  position={{ lat: restaurant.lat, lng: restaurant.lng }}
                  onClick={() => setSelectedRestaurant(restaurant)}
                />
              ))}
            </GoogleMap>
          </LoadScript>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {restaurants.map((restaurant) => (
            <VenueCard key={restaurant.title} {...restaurant} />
          ))}
        </div>
      </main>
    </div>
  )
}

