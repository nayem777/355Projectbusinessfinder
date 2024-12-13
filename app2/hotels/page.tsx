'use client'

import { useState } from 'react'
import { SiteHeader } from "@/components/site-header"
import { VenueCard } from "@/components/venue-card"
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'

const hotels = [
  {
    image: "/placeholder.svg?height=400&width=600",
    title: "The Ritz-Carlton New York, Central Park",
    location: "Midtown Manhattan",
    priceLevel: "$$$$",
    rating: 9.5,
    category: "Luxury Hotel",
    type: "hotel" as const,
    lat: 40.7649,
    lng: -73.9742,
  },
  {
    image: "/placeholder.svg?height=400&width=600",
    title: "The Plaza",
    location: "Central Park South",
    priceLevel: "$$$$",
    rating: 9.3,
    category: "Historic Luxury Hotel",
    type: "hotel" as const,
    lat: 40.7645,
    lng: -73.9741,
  },
  {
    image: "/placeholder.svg?height=400&width=600",
    title: "1 Hotel Central Park",
    location: "Midtown Manhattan",
    priceLevel: "$$$",
    rating: 9.1,
    category: "Eco-Luxury Hotel",
    type: "hotel" as const,
    lat: 40.7655,
    lng: -73.9770,
  },
]

const mapContainerStyle = {
  width: '100%',
  height: '400px'
}

const center = {
  lat: 40.7650,
  lng: -73.9750
}

export default function HotelsPage() {
  const [selectedHotel, setSelectedHotel] = useState(null)

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="container py-12">
        <h1 className="text-3xl font-bold mb-6">New York City Hotels</h1>
        <div className="mb-8">
          <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={center}
              zoom={14}
            >
              {hotels.map((hotel) => (
                <Marker
                  key={hotel.title}
                  position={{ lat: hotel.lat, lng: hotel.lng }}
                  onClick={() => setSelectedHotel(hotel)}
                />
              ))}
            </GoogleMap>
          </LoadScript>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {hotels.map((hotel) => (
            <VenueCard key={hotel.title} {...hotel} />
          ))}
        </div>
      </main>
    </div>
  )
}

