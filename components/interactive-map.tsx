"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Star, Camera, Mountain, Waves, Building2 } from "lucide-react"
import { useRouter } from "next/navigation"

const destinations = [
  {
    id: 1,
    name: "Rajasthan",
    type: "Desert & Palaces",
    rating: 4.8,
    gems: 45,
    position: { top: "35%", left: "25%" },
    icon: Building2,
    color: "bg-orange-500",
    slug: "rajasthan",
  },
  {
    id: 2,
    name: "Kerala",
    type: "Backwaters",
    rating: 4.9,
    gems: 32,
    position: { top: "70%", left: "20%" },
    icon: Waves,
    color: "bg-green-500",
    slug: "kerala",
  },
  {
    id: 3,
    name: "Himachal Pradesh",
    type: "Mountains",
    rating: 4.7,
    gems: 28,
    position: { top: "20%", left: "35%" },
    icon: Mountain,
    color: "bg-blue-500",
    slug: "himachal-pradesh",
  },
  {
    id: 4,
    name: "Goa",
    type: "Beaches",
    rating: 4.6,
    gems: 18,
    position: { top: "60%", left: "15%" },
    icon: Waves,
    color: "bg-cyan-500",
    slug: "goa",
  },
  {
    id: 5,
    name: "Tamil Nadu",
    type: "Temples",
    rating: 4.8,
    gems: 38,
    position: { top: "75%", left: "35%" },
    icon: Building2,
    color: "bg-purple-500",
    slug: "tamil-nadu",
  },
]

export function InteractiveMap() {
  const [selectedDestination, setSelectedDestination] = useState<number | null>(null)
  const [hoveredDestination, setHoveredDestination] = useState<number | null>(null)
  const router = useRouter()

  const handleExploreDestination = (slug: string) => {
    router.push(`/place/${slug}`)
  }

  const handleViewHiddenGems = (destinationName: string) => {
    router.push(`/hidden-gems?location=${encodeURIComponent(destinationName)}`)
  }

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 text-balance">
            Explore India's <span className="text-primary">Interactive Map</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Click on any destination to discover hidden gems, local experiences, and authentic stories
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Map */}
          <div className="lg:col-span-2">
            <Card className="p-8">
              <div className="relative aspect-[4/3] bg-gradient-to-br from-green-50 to-blue-50 rounded-lg overflow-hidden">
                {/* India Map Outline */}
                <div className="absolute inset-0 opacity-20">
                  <img
                    src="/india-map-outline-silhouette.jpg"
                    alt="India map outline"
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Destination Pins */}
                {destinations.map((destination) => {
                  const Icon = destination.icon
                  const isHovered = hoveredDestination === destination.id
                  const isSelected = selectedDestination === destination.id

                  return (
                    <button
                      key={destination.id}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
                      style={destination.position}
                      onMouseEnter={() => setHoveredDestination(destination.id)}
                      onMouseLeave={() => setHoveredDestination(null)}
                      onClick={() => setSelectedDestination(destination.id)}
                    >
                      {/* Pin */}
                      <div
                        className={`
                        relative w-12 h-12 rounded-full ${destination.color} 
                        flex items-center justify-center text-white shadow-lg
                        transition-all duration-300 hover:scale-110
                        ${isSelected ? "scale-125 ring-4 ring-primary/30" : ""}
                      `}
                      >
                        <Icon className="h-6 w-6" />

                        {/* Pulse Animation */}
                        <div
                          className={`
                          absolute inset-0 rounded-full ${destination.color} 
                          animate-ping opacity-30
                          ${isHovered || isSelected ? "block" : "hidden"}
                        `}
                        />
                      </div>

                      {/* Tooltip */}
                      {isHovered && (
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-card border border-border rounded-lg shadow-lg whitespace-nowrap">
                          <div className="text-sm font-medium text-card-foreground">{destination.name}</div>
                          <div className="text-xs text-muted-foreground">{destination.gems} hidden gems</div>
                        </div>
                      )}
                    </button>
                  )
                })}
              </div>
            </Card>
          </div>

          {/* Destination Details */}
          <div className="space-y-6">
            {selectedDestination ? (
              (() => {
                const destination = destinations.find((d) => d.id === selectedDestination)!
                return (
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div
                          className={`w-12 h-12 rounded-full ${destination.color} flex items-center justify-center text-white`}
                        >
                          <destination.icon className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-card-foreground">{destination.name}</h3>
                          <p className="text-muted-foreground">{destination.type}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 mb-4">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{destination.rating}</span>
                        </div>
                        <Badge variant="secondary">
                          <Camera className="h-3 w-3 mr-1" />
                          {destination.gems} gems
                        </Badge>
                      </div>

                      <p className="text-sm text-muted-foreground mb-6">
                        Discover authentic experiences, local culture, and hidden treasures in {destination.name}.
                      </p>

                      <div className="space-y-3">
                        <Button className="w-full" onClick={() => handleExploreDestination(destination.slug)}>
                          Explore {destination.name}
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full bg-transparent"
                          onClick={() => handleViewHiddenGems(destination.name)}
                        >
                          View Hidden Gems
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })()
            ) : (
              <Card>
                <CardContent className="p-6 text-center">
                  <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-card-foreground mb-2">Select a Destination</h3>
                  <p className="text-sm text-muted-foreground">
                    Click on any pin on the map to explore destinations, hidden gems, and local experiences.
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Quick Stats */}
            <Card>
              <CardContent className="p-6">
                <h4 className="font-medium text-card-foreground mb-4">Platform Stats</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Total Destinations</span>
                    <span className="text-sm font-medium">500+</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Hidden Gems</span>
                    <span className="text-sm font-medium">10,000+</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Travel Reels</span>
                    <span className="text-sm font-medium">25,000+</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Active Travelers</span>
                    <span className="text-sm font-medium">50,000+</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
