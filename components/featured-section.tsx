"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Play, Heart, Share2, MapPin, Star, Clock } from "lucide-react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

const featuredGems = [
  {
    id: 1,
    title: "Secret Waterfall in Meghalaya",
    location: "Cherrapunji, Meghalaya",
    rating: 4.9,
    distance: "2.5 km trek",
    image: "/hidden-waterfall-in-lush-green-forest.jpg",
    category: "Hidden Gem",
    likes: 234,
    slug: "secret-waterfall-meghalaya",
  },
  {
    id: 2,
    title: "Ancient Temple Complex",
    location: "Hampi, Karnataka",
    rating: 4.8,
    distance: "500m walk",
    image: "/ancient-indian-temple-ruins-golden-hour.jpg",
    category: "Heritage",
    likes: 189,
    slug: "ancient-temple-hampi",
  },
  {
    id: 3,
    title: "Floating Market Experience",
    location: "Dal Lake, Kashmir",
    rating: 4.7,
    distance: "1 hour boat ride",
    image: "/kashmir-dal-lake-floating-market-boats.jpg",
    category: "Experience",
    likes: 156,
    slug: "floating-market-kashmir",
  },
]

const travelReels = [
  {
    id: 1,
    title: "Morning Chai in Darjeeling",
    creator: "Priya Sharma",
    views: "12.5K",
    duration: "0:45",
    thumbnail: "/darjeeling-tea-garden-morning-mist.jpg",
    slug: "morning-chai-darjeeling",
  },
  {
    id: 2,
    title: "Street Food Tour Mumbai",
    creator: "Rahul Gupta",
    views: "8.2K",
    duration: "1:20",
    thumbnail: "/mumbai-street-food-vendor-colorful.jpg",
    slug: "street-food-mumbai",
  },
  {
    id: 3,
    title: "Sunrise at Taj Mahal",
    creator: "Anjali Patel",
    views: "15.7K",
    duration: "0:30",
    thumbnail: "/taj-mahal-sunrise-golden-light.jpg",
    slug: "sunrise-taj-mahal",
  },
]

export function FeaturedSection() {
  const [likedGems, setLikedGems] = useState<number[]>([])
  const router = useRouter()
  const { toast } = useToast()

  const handleLikeGem = (gemId: number, e: React.MouseEvent) => {
    e.stopPropagation()
    setLikedGems((prev) => {
      const isLiked = prev.includes(gemId)
      const newLiked = isLiked ? prev.filter((id) => id !== gemId) : [...prev, gemId]

      toast({
        title: isLiked ? "Removed from favorites" : "Added to favorites",
        description: isLiked ? "Gem removed from your favorites" : "Gem added to your favorites",
      })

      return newLiked
    })
  }

  const handleShare = async (gem: (typeof featuredGems)[0], e: React.MouseEvent) => {
    e.stopPropagation()
    try {
      await navigator.share({
        title: gem.title,
        text: `Check out this hidden gem: ${gem.title} in ${gem.location}`,
        url: `${window.location.origin}/place/${gem.slug}`,
      })
    } catch (error) {
      // Fallback to clipboard
      navigator.clipboard.writeText(`${window.location.origin}/place/${gem.slug}`)
      toast({
        title: "Link copied",
        description: "Share link copied to clipboard",
      })
    }
  }

  const handleGemClick = (slug: string) => {
    router.push(`/place/${slug}`)
  }

  const handleReelClick = (slug: string) => {
    router.push(`/reels/${slug}`)
  }

  const handleViewAllGems = () => {
    router.push("/hidden-gems")
  }

  const handleViewAllReels = () => {
    router.push("/reels")
  }

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hidden Gems Section */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
                Featured <span className="text-primary">Hidden Gems</span>
              </h2>
              <p className="text-lg text-muted-foreground text-pretty">
                Discover secret places shared by our community of travelers
              </p>
            </div>
            <Button variant="outline" onClick={handleViewAllGems}>
              View All Gems
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredGems.map((gem) => (
              <Card
                key={gem.id}
                className="group cursor-pointer hover:shadow-lg transition-all duration-300"
                onClick={() => handleGemClick(gem.slug)}
              >
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={gem.image || "/placeholder.svg"}
                    alt={gem.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-primary/90 text-primary-foreground">{gem.category}</Badge>
                  </div>
                  <div className="absolute top-4 right-4 flex gap-2">
                    <button
                      className={`w-8 h-8 backdrop-blur rounded-full flex items-center justify-center transition-colors ${
                        likedGems.includes(gem.id) ? "bg-red-500/90 text-white" : "bg-background/80 hover:bg-background"
                      }`}
                      onClick={(e) => handleLikeGem(gem.id, e)}
                    >
                      <Heart className={`h-4 w-4 ${likedGems.includes(gem.id) ? "fill-current" : ""}`} />
                    </button>
                    <button
                      className="w-8 h-8 bg-background/80 backdrop-blur rounded-full flex items-center justify-center hover:bg-background transition-colors"
                      onClick={(e) => handleShare(gem, e)}
                    >
                      <Share2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-card-foreground mb-2 text-balance">{gem.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <MapPin className="h-4 w-4" />
                    {gem.location}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{gem.rating}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{gem.distance}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Heart className="h-4 w-4" />
                      {gem.likes + (likedGems.includes(gem.id) ? 1 : 0)}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Travel Reels Section */}
        <div>
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
                Travel <span className="text-primary">Reels</span>
              </h2>
              <p className="text-lg text-muted-foreground text-pretty">
                Short stories from incredible journeys across India
              </p>
            </div>
            <Button variant="outline" onClick={handleViewAllReels}>
              Watch All Reels
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {travelReels.map((reel) => (
              <Card
                key={reel.id}
                className="group cursor-pointer hover:shadow-lg transition-all duration-300"
                onClick={() => handleReelClick(reel.slug)}
              >
                <div className="relative overflow-hidden rounded-t-lg aspect-[3/4]">
                  <img
                    src={reel.thumbnail || "/placeholder.svg"}
                    alt={reel.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play className="h-8 w-8 text-white ml-1" />
                    </div>
                  </div>

                  {/* Duration */}
                  <div className="absolute top-4 right-4">
                    <Badge variant="secondary" className="bg-black/50 text-white border-0">
                      <Clock className="h-3 w-3 mr-1" />
                      {reel.duration}
                    </Badge>
                  </div>

                  {/* Bottom Info */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-semibold mb-1 text-balance">{reel.title}</h3>
                    <div className="flex items-center justify-between text-white/80 text-sm">
                      <span>by {reel.creator}</span>
                      <span>{reel.views} views</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
