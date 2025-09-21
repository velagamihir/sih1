"use client"

import { useState, useRef } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Play,
  Pause,
  Heart,
  Share2,
  MessageCircle,
  Bookmark,
  Volume2,
  VolumeX,
  Plus,
  TrendingUp,
  Clock,
  MapPin,
} from "lucide-react"
import { useAuth } from "@/lib/auth-context"

const travelReels = [
  {
    id: 1,
    title: "Sunrise at Tiger's Nest Monastery",
    creator: "Wanderlust_Priya",
    avatar: "/creator-priya.jpg",
    location: "Bhutan",
    duration: "0:45",
    views: "12.5K",
    likes: 1250,
    comments: 89,
    shares: 45,
    thumbnail: "/tigers-nest-sunrise.jpg",
    videoUrl: "/videos/tigers-nest-sunrise.mp4",
    description: "The most magical sunrise I've ever witnessed! 🌅 The trek was challenging but so worth it.",
    tags: ["Bhutan", "Monastery", "Sunrise", "Trekking"],
    verified: true,
    trending: true,
  },
  {
    id: 2,
    title: "Street Food Paradise in Old Delhi",
    creator: "FoodieExplorer",
    avatar: "/creator-foodie.jpg",
    location: "Delhi, India",
    duration: "1:20",
    views: "25.8K",
    likes: 2580,
    comments: 156,
    shares: 78,
    thumbnail: "/delhi-street-food.jpg",
    videoUrl: "/videos/delhi-street-food.mp4",
    description: "From paranthas to jalebis - a complete street food tour of Chandni Chowk! 🍛",
    tags: ["Delhi", "Street Food", "Culture", "Local"],
    verified: true,
    trending: false,
  },
  {
    id: 3,
    title: "Backwaters Serenity in Kerala",
    creator: "NatureLover_Raj",
    avatar: "/creator-raj.jpg",
    location: "Alleppey, Kerala",
    duration: "2:15",
    views: "18.3K",
    likes: 1830,
    comments: 124,
    shares: 67,
    thumbnail: "/kerala-backwaters.jpg",
    videoUrl: "/videos/kerala-backwaters.mp4",
    description: "Floating through paradise on a traditional houseboat. Pure tranquility! 🛶",
    tags: ["Kerala", "Backwaters", "Houseboat", "Nature"],
    verified: false,
    trending: true,
  },
  {
    id: 4,
    title: "Desert Safari Adventure",
    creator: "AdventureSeeker",
    avatar: "/creator-adventure.jpg",
    location: "Jaisalmer, Rajasthan",
    duration: "1:35",
    views: "31.2K",
    likes: 3120,
    comments: 203,
    shares: 156,
    thumbnail: "/desert-safari.jpg",
    videoUrl: "/videos/desert-safari.mp4",
    description: "Camel safari through the golden dunes of Thar Desert! 🐪✨",
    tags: ["Rajasthan", "Desert", "Camel Safari", "Adventure"],
    verified: true,
    trending: true,
  },
  {
    id: 5,
    title: "Tea Garden Walks in Darjeeling",
    creator: "MountainWanderer",
    avatar: "/creator-mountain.jpg",
    location: "Darjeeling, West Bengal",
    duration: "1:50",
    views: "14.7K",
    likes: 1470,
    comments: 98,
    shares: 34,
    thumbnail: "/darjeeling-tea-gardens.jpg",
    videoUrl: "/videos/darjeeling-tea.mp4",
    description: "Walking through emerald tea gardens with the Himalayas in the background 🍃",
    tags: ["Darjeeling", "Tea Gardens", "Mountains", "Peaceful"],
    verified: false,
    trending: false,
  },
  {
    id: 6,
    title: "Temple Architecture Marvel",
    creator: "HeritageHunter",
    avatar: "/creator-heritage.jpg",
    location: "Khajuraho, Madhya Pradesh",
    duration: "2:30",
    views: "9.8K",
    likes: 980,
    comments: 67,
    shares: 23,
    thumbnail: "/khajuraho-temples.jpg",
    videoUrl: "/videos/khajuraho-temples.mp4",
    description: "Intricate stone carvings that tell stories of a thousand years ago 🏛️",
    tags: ["Heritage", "Architecture", "History", "UNESCO"],
    verified: true,
    trending: false,
  },
]

export default function ReelsPage() {
  const [activeTab, setActiveTab] = useState("trending")
  const [playingReel, setPlayingReel] = useState<number | null>(null)
  const [mutedReels, setMutedReels] = useState<Set<number>>(new Set())
  const videoRefs = useRef<{ [key: number]: HTMLVideoElement | null }>({})
  const { user } = useAuth()

  const handlePlayPause = (reelId: number) => {
    const video = videoRefs.current[reelId]
    if (!video) return

    if (playingReel === reelId) {
      video.pause()
      setPlayingReel(null)
    } else {
      // Pause all other videos
      Object.values(videoRefs.current).forEach((v) => v?.pause())
      video.play()
      setPlayingReel(reelId)
    }
  }

  const handleMuteToggle = (reelId: number) => {
    const video = videoRefs.current[reelId]
    if (!video) return

    const newMutedReels = new Set(mutedReels)
    if (mutedReels.has(reelId)) {
      newMutedReels.delete(reelId)
      video.muted = false
    } else {
      newMutedReels.add(reelId)
      video.muted = true
    }
    setMutedReels(newMutedReels)
  }

  const filteredReels = travelReels.filter((reel) => {
    switch (activeTab) {
      case "trending":
        return reel.trending
      case "recent":
        return true // In a real app, this would filter by date
      case "popular":
        return reel.views.includes("K") && Number.parseInt(reel.views) > 20
      default:
        return true
    }
  })

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Travel <span className="text-primary">Reels</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 text-pretty max-w-3xl mx-auto">
            Short, inspiring travel videos from fellow explorers. Get instant wanderlust and discover your next
            adventure.
          </p>

          {user && (
            <Button size="lg" className="mb-8">
              <Plus className="mr-2 h-5 w-5" />
              Create Your Reel
            </Button>
          )}
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto">
            <TabsTrigger value="trending" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Trending
            </TabsTrigger>
            <TabsTrigger value="recent" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Recent
            </TabsTrigger>
            <TabsTrigger value="popular" className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              Popular
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredReels.map((reel) => (
                <Card key={reel.id} className="group overflow-hidden hover:shadow-lg transition-all duration-300">
                  <div className="relative">
                    {/* Video/Thumbnail */}
                    <div className="relative aspect-[9/16] bg-black rounded-t-lg overflow-hidden">
                      <video
                        ref={(el) => (videoRefs.current[reel.id] = el)}
                        className="w-full h-full object-cover"
                        poster={reel.thumbnail || "/placeholder.svg"}
                        loop
                        muted={mutedReels.has(reel.id)}
                        playsInline
                      >
                        <source src={reel.videoUrl || "/placeholder-video.mp4"} type="video/mp4" />
                      </video>

                      {/* Play/Pause Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          size="lg"
                          variant="secondary"
                          className="rounded-full h-16 w-16 p-0"
                          onClick={() => handlePlayPause(reel.id)}
                        >
                          {playingReel === reel.id ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8 ml-1" />}
                        </Button>
                      </div>

                      {/* Top Badges */}
                      <div className="absolute top-4 left-4 flex gap-2">
                        {reel.trending && (
                          <Badge className="bg-red-500 text-white">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            Trending
                          </Badge>
                        )}
                        {reel.verified && (
                          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                            Verified
                          </Badge>
                        )}
                      </div>

                      {/* Duration */}
                      <div className="absolute top-4 right-4">
                        <Badge variant="secondary" className="bg-black/70 text-white">
                          {reel.duration}
                        </Badge>
                      </div>

                      {/* Volume Control */}
                      <div className="absolute bottom-4 right-4">
                        <Button
                          size="sm"
                          variant="secondary"
                          className="h-8 w-8 p-0 bg-black/70 hover:bg-black/80"
                          onClick={() => handleMuteToggle(reel.id)}
                        >
                          {mutedReels.has(reel.id) ? (
                            <VolumeX className="h-4 w-4 text-white" />
                          ) : (
                            <Volume2 className="h-4 w-4 text-white" />
                          )}
                        </Button>
                      </div>

                      {/* Location */}
                      <div className="absolute bottom-4 left-4">
                        <Badge variant="secondary" className="bg-black/70 text-white">
                          <MapPin className="h-3 w-3 mr-1" />
                          {reel.location}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-4 space-y-4">
                    {/* Creator Info */}
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={reel.avatar || "/placeholder.svg"} alt={reel.creator} />
                        <AvatarFallback>{reel.creator.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{reel.creator}</p>
                        <p className="text-xs text-muted-foreground">{reel.views} views</p>
                      </div>
                    </div>

                    {/* Title and Description */}
                    <div>
                      <h3 className="font-semibold text-card-foreground mb-2 text-balance">{reel.title}</h3>
                      <p className="text-sm text-muted-foreground text-pretty line-clamp-2">{reel.description}</p>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1">
                      {reel.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-2 border-t border-border">
                      <div className="flex items-center gap-4">
                        <Button variant="ghost" size="sm" className="h-8 px-2">
                          <Heart className="h-4 w-4 mr-1" />
                          {reel.likes}
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 px-2">
                          <MessageCircle className="h-4 w-4 mr-1" />
                          {reel.comments}
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 px-2">
                          <Share2 className="h-4 w-4 mr-1" />
                          {reel.shares}
                        </Button>
                      </div>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Bookmark className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {filteredReels.length === 0 && (
          <div className="text-center py-12">
            <div className="text-muted-foreground mb-4">
              <Play className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg">No reels found in this category</p>
              <p className="text-sm">Check back later for new content</p>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
