"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Play, Star } from "lucide-react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

export function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      toast({
        title: "Enter a destination",
        description: "Please enter a place you'd like to explore",
        variant: "destructive",
      })
      return
    }

    setIsSearching(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Navigate to search results or specific place
    router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
    setIsSearching(false)
  }

  const handleStartExploring = () => {
    router.push("/hidden-gems")
  }

  const handleWatchStories = () => {
    router.push("/reels")
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/beautiful-indian-landscape-with-mountains-and-temp.jpg"
          alt="Beautiful Indian landscape"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-background/50" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl">
          <div className="mb-8">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-balance">
              Discover the <span className="heritage-text">Real India</span>
            </h1>
            <p className="text-xl md:text-2xl text-foreground/80 mb-8 text-pretty max-w-2xl font-medium">
              Explore hidden gems, authentic experiences, and untold stories across incredible India. Your journey to
              authentic travel starts here.
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-12">
            <div className="flex flex-col sm:flex-row gap-4 max-w-2xl">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Where do you want to explore?"
                  className="pl-12 h-14 text-lg"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={isSearching}
                />
              </div>
              <Button
                size="lg"
                className="h-14 px-8"
                onClick={handleSearch}
                disabled={isSearching || !searchQuery.trim()}
              >
                {isSearching ? "Searching..." : "Explore Now"}
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">500+</div>
              <div className="text-sm text-foreground/70 font-medium">Destinations</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">10K+</div>
              <div className="text-sm text-foreground/70 font-medium">Hidden Gems</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">50K+</div>
              <div className="text-sm text-foreground/70 font-medium">Travelers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">4.9</div>
              <div className="text-sm text-foreground/70 font-medium flex items-center justify-center gap-1">
                <Star className="h-4 w-4 fill-primary text-primary" />
                Rating
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="h-12 px-8" onClick={handleStartExploring}>
              Start Exploring
            </Button>
            <Button variant="outline" size="lg" className="h-12 px-8 bg-transparent" onClick={handleWatchStories}>
              <Play className="h-5 w-5 mr-2" />
              Watch Stories
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
