'use client'

import { useState, useEffect } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, Heart } from 'lucide-react'

interface VenueCardProps {
  image: string
  title: string
  location: string
  priceLevel: string
  rating: number
  category: string
  type: "mall" | "restaurant" | "hotel"
}

export function VenueCard({
  image,
  title,
  location,
  priceLevel,
  rating,
  category,
  type,
}: VenueCardProps) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null // or a loading placeholder
  }

  return (
    <Card className="overflow-hidden">
      <div className="relative h-48">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
        />
        <div className="absolute top-2 left-2 flex space-x-2">
          <Badge variant="secondary">Best 100</Badge>
          <Badge variant="secondary">NYC Gem</Badge>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 bg-white/50 hover:bg-white/75"
          onClick={() => setIsFavorite(!isFavorite)}
        >
          <Heart className={`h-4 w-4 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-500'}`} />
          <span className="sr-only">Favorite</span>
        </Button>
      </div>
      <CardContent className="p-4">
        <h3 className="text-lg font-bold">{title}</h3>
        <div className="mt-1 text-sm text-muted-foreground">{location}</div>
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-sm">{priceLevel}</span>
            <span>•</span>
            <span className="text-sm">{category}</span>
          </div>
          <div className="flex items-center">
            <Star className="mr-1 h-4 w-4 fill-current" />
            <span className="text-sm font-medium">{rating.toFixed(1)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

