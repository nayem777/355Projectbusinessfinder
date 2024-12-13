import { SiteHeader } from "@/components/site-header"
import { HeroSection } from "@/components/hero-section"
import { VenueCard } from "@/components/venue-card"
import Link from "next/link"

export default function Home() {
  const malls = [
    {
      image: "/placeholder.svg?height=400&width=600",
      title: "Hudson Yards",
      location: "Midtown Manhattan",
      priceLevel: "$$$$",
      rating: 9.2,
      category: "Luxury Mall",
      type: "mall" as const,
    },
    {
      image: "/placeholder.svg?height=400&width=600",
      title: "The Shops at Columbus Circle",
      location: "Columbus Circle",
      priceLevel: "$$$",
      rating: 8.9,
      category: "Shopping Center",
      type: "mall" as const,
    },
    {
      image: "/placeholder.svg?height=400&width=600",
      title: "Brookfield Place",
      location: "Financial District",
      priceLevel: "$$$$",
      rating: 8.8,
      category: "Luxury Mall",
      type: "mall" as const,
    },
  ]

  const restaurants = [
    {
      image: "/placeholder.svg?height=400&width=600",
      title: "Le Bernardin",
      location: "Midtown Manhattan",
      priceLevel: "$$$$",
      rating: 9.6,
      category: "French",
      type: "restaurant" as const,
    },
    {
      image: "/placeholder.svg?height=400&width=600",
      title: "Eleven Madison Park",
      location: "Flatiron District",
      priceLevel: "$$$$",
      rating: 9.4,
      category: "Contemporary American",
      type: "restaurant" as const,
    },
    {
      image: "/placeholder.svg?height=400&width=600",
      title: "Per Se",
      location: "Columbus Circle",
      priceLevel: "$$$$",
      rating: 9.3,
      category: "French American",
      type: "restaurant" as const,
    },
  ]

  const hotels = [
    {
      image: "/placeholder.svg?height=400&width=600",
      title: "The Ritz-Carlton New York, Central Park",
      location: "Midtown Manhattan",
      priceLevel: "$$$$",
      rating: 9.5,
      category: "Luxury Hotel",
      type: "hotel" as const,
    },
    {
      image: "/placeholder.svg?height=400&width=600",
      title: "The Plaza",
      location: "Central Park South",
      priceLevel: "$$$$",
      rating: 9.3,
      category: "Historic Luxury Hotel",
      type: "hotel" as const,
    },
    {
      image: "/placeholder.svg?height=400&width=600",
      title: "1 Hotel Central Park",
      location: "Midtown Manhattan",
      priceLevel: "$$$",
      rating: 9.1,
      category: "Eco-Luxury Hotel",
      type: "hotel" as const,
    },
  ]

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <HeroSection />
      <main className="container py-12">
        <section className="mb-12">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Shop at the Best Malls</h2>
            <Link href="/malls" className="text-sm text-muted-foreground hover:underline">
              See All →
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {malls.map((mall) => (
              <VenueCard key={mall.title} {...mall} />
            ))}
          </div>
        </section>
        <section className="mb-12">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Award Winning Restaurants</h2>
            <Link href="/restaurants" className="text-sm text-muted-foreground hover:underline">
              See All →
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {restaurants.map((restaurant) => (
              <VenueCard key={restaurant.title} {...restaurant} />
            ))}
          </div>
        </section>
        <section>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Top-Rated Hotels</h2>
            <Link href="/hotels" className="text-sm text-muted-foreground hover:underline">
              See All →
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {hotels.map((hotel) => (
              <VenueCard key={hotel.title} {...hotel} />
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

