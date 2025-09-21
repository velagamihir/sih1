"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Heart, Share2, MapPin, Star, Clock, IndianRupee, Calendar } from "lucide-react"
import { useRouter } from "next/navigation"

interface PlaceDetailHeaderProps {
  place: {
    name: string
    location: string
    category: string
    rating: number
    reviewCount: number
    distance: string
    timings: string
    entryFee: string
    bestTimeToVisit: string
  }
}

export function PlaceDetailHeader({ place }: PlaceDetailHeaderProps) {
  const [isSaved, setIsSaved] = useState(false)
  const router = useRouter()

  return (
    <div className="relative bg-gradient-to-r from-primary/10 to-accent/10 border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button variant="ghost" className="mb-6 -ml-2" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Explore
        </Button>

        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          {/* Place Info */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <Badge className="bg-primary/20 text-primary border-primary/30">{place.category}</Badge>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{place.rating}</span>
                <span className="text-muted-foreground">({place.reviewCount} reviews)</span>
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3 text-balance">{place.name}</h1>

            <div className="flex items-center gap-2 text-muted-foreground mb-6">
              <MapPin className="h-4 w-4" />
              <span>{place.location}</span>
              <span>•</span>
              <span>{place.distance}</span>
            </div>

            {/* Quick Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <div>
                  <div className="text-sm font-medium">Timings</div>
                  <div className="text-sm text-muted-foreground">{place.timings}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <IndianRupee className="h-4 w-4 text-muted-foreground" />
                <div>
                  <div className="text-sm font-medium">Entry Fee</div>
                  <div className="text-sm text-muted-foreground">{place.entryFee}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <div className="text-sm font-medium">Best Time</div>
                  <div className="text-sm text-muted-foreground">{place.bestTimeToVisit}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsSaved(!isSaved)}
              className={isSaved ? "bg-red-50 border-red-200 text-red-600" : ""}
            >
              <Heart className={`h-4 w-4 ${isSaved ? "fill-current" : ""}`} />
            </Button>
            <Button variant="outline" size="icon">
              <Share2 className="h-4 w-4" />
            </Button>
            <Button size="lg" className="px-8">
              Plan Visit
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
