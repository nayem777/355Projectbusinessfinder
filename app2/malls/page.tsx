'use client'

import { useState } from 'react'
import { SiteHeader } from "@/components/site-header"
import { VenueCard } from "@/components/venue-card"
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'

const malls = [
  {
    image: "/placeholder.svg?height=400&width=600",
    title: "Hudson Yards",
    location: "Midtown Manhattan",
    priceLevel: "$$$$",
    rating: 9.2,
    category: "Luxury Mall",
    type: "mall" as const,
    lat: 40.7539,
    lng: -74.0017,
  },
  {
    image: "/placeholder.svg?height=400&width=600",
    title: "The Shops at Columbus Circle",
    location: "Columbus Circle",
    priceLevel: "$$$",
    rating: 8.9,
    category: "Shopping Center",
    type: "mall" as const,
    lat: 40.7683,
    lng: -73.9829,
  },
  {
    image: "/placeholder.svg?height=400&width=600",
    title: "Brookfield Place",
    location: "Financial District",
    priceLevel: "$$$$",
    rating: 8.8,
    category: "Luxury Mall",
    type: "mall" as const,
    lat: 40.7127,
    lng: -74.0134,
  },
]

const mapContainerStyle = {
  width: '100%',
  height: '400px'
}

const center = {
  lat: 40.7449,
  lng: -73.9960
}

export default function MallsPage() {
  const [selectedMall, setSelectedMall] = useState(null)

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="container py-12">
        <h1 className="text-3xl font-bold mb-6">New York City Malls</h1>
        <div className="mb-8">
          <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={center}
              zoom={12}
            >
              {malls.map((mall) => (
                <Marker
                  key={mall.title}
                  position={{ lat: mall.lat, lng: mall.lng }}
                  onClick={() => setSelectedMall(mall)}
                />
              ))}
            </GoogleMap>
          </LoadScript>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {malls.map((mall) => (
            <VenueCard key={mall.title} {...mall} />
          ))}
        </div>
      </main>
    </div>
  )
}

