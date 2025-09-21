"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, MapPin, Star, Heart, Share2, Plus } from "lucide-react"
import { useAuth } from "@/lib/auth-context"

const hiddenGems = [
  {
    id: 1,
    name: "Secret Waterfall of Agumbe",
    location: "Agumbe, Karnataka",
    category: "Nature",
    rating: 4.8,
    reviews: 127,
    image: "/agumbe-secret-waterfall.jpg",
    description:
      "A pristine waterfall hidden deep in the Western Ghats, accessible only through a 2-hour trek through dense rainforest.",
    difficulty: "Moderate",
    bestTime: "June - September",
    submittedBy: "Priya Sharma",
    verified: true,
    tags: ["Waterfall", "Trekking", "Photography", "Monsoon"],
  },
  {
    id: 2,
    name: "Ancient Cave Temples of Badami",
    location: "Badami, Karnataka",
    category: "Heritage",
    rating: 4.6,
    reviews: 89,
    image: "/badami-cave-temples.jpg",
    description: "4th-century rock-cut cave temples with intricate carvings, offering stunning views of Agastya Lake.",
    difficulty: "Easy",
    bestTime: "October - March",
    submittedBy: "Rajesh Kumar",
    verified: true,
    tags: ["Heritage", "Architecture", "History", "Caves"],
  },
  {
    id: 3,
    name: "Floating Islands of Loktak Lake",
    location: "Manipur",
    category: "Nature",
    rating: 4.9,
    reviews: 156,
    image: "/loktak-floating-islands.jpg",
    description: "Unique floating islands called 'phumdis' on the largest freshwater lake in Northeast India.",
    difficulty: "Easy",
    bestTime: "November - April",
    submittedBy: "Maya Devi",
    verified: true,
    tags: ["Lake", "Unique", "Boating", "Wildlife"],
  },
  {
    id: 4,
    name: "Living Root Bridges of Meghalaya",
    location: "Cherrapunji, Meghalaya",
    category: "Nature",
    rating: 4.7,
    reviews: 203,
    image: "/living-root-bridges.jpg",
    description: "Incredible bridges grown from living tree roots by the Khasi tribe, some over 500 years old.",
    difficulty: "Challenging",
    bestTime: "October - May",
    submittedBy: "David Lyngdoh",
    verified: true,
    tags: ["Bridges", "Trekking", "Culture", "Engineering"],
  },
  {
    id: 5,
    name: "Marble Rocks of Bhedaghat",
    location: "Jabalpur, Madhya Pradesh",
    category: "Nature",
    rating: 4.5,
    reviews: 178,
    image: "/bhedaghat-marble-rocks.jpg",
    description: "Towering marble cliffs along the Narmada River, creating a stunning gorge with crystal-clear waters.",
    difficulty: "Easy",
    bestTime: "October - March",
    submittedBy: "Anita Verma",
    verified: true,
    tags: ["Geology", "Boating", "Photography", "River"],
  },
  {
    id: 6,
    name: "Sand Dunes of Thar Desert",
    location: "Jaisalmer, Rajasthan",
    category: "Desert",
    rating: 4.4,
    reviews: 134,
    image: "/thar-desert-dunes.jpg",
    description: "Remote sand dunes away from tourist crowds, perfect for stargazing and camel safaris.",
    difficulty: "Moderate",
    bestTime: "November - February",
    submittedBy: "Vikram Singh",
    verified: true,
    tags: ["Desert", "Stargazing", "Camel Safari", "Adventure"],
  },
]

export default function HiddenGemsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedDifficulty, setSelectedDifficulty] = useState("all")
  const [sortBy, setSortBy] = useState("rating")
  const { user } = useAuth()

  const categories = ["all", "Nature", "Heritage", "Desert", "Culture", "Adventure"]
  const difficulties = ["all", "Easy", "Moderate", "Challenging"]

  const filteredGems = hiddenGems.filter((gem) => {
    const matchesSearch =
      gem.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      gem.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      gem.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesCategory = selectedCategory === "all" || gem.category === selectedCategory
    const matchesDifficulty = selectedDifficulty === "all" || gem.difficulty === selectedDifficulty

    return matchesSearch && matchesCategory && matchesDifficulty
  })

  const sortedGems = [...filteredGems].sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return b.rating - a.rating
      case "reviews":
        return b.reviews - a.reviews
      case "name":
        return a.name.localeCompare(b.name)
      default:
        return 0
    }
  })

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Hidden <span className="text-primary">Gems</span> of India
          </h1>
          <p className="text-xl text-muted-foreground mb-8 text-pretty max-w-3xl mx-auto">
            Discover secret destinations, untouched by mass tourism. Shared by fellow travelers who've ventured off the
            beaten path.
          </p>

          {user && (
            <Button size="lg" className="mb-8">
              <Plus className="mr-2 h-5 w-5" />
              Share Your Hidden Gem
            </Button>
          )}
        </div>

        {/* Search and Filters */}
        <div className="bg-card border border-border rounded-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search hidden gems, locations, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex flex-wrap gap-3 items-center">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  {difficulties.map((difficulty) => (
                    <SelectItem key={difficulty} value={difficulty}>
                      {difficulty === "all" ? "All Levels" : difficulty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="reviews">Most Reviewed</SelectItem>
                  <SelectItem value="name">Name A-Z</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-muted-foreground">Found {sortedGems.length} hidden gems</p>
        </div>

        {/* Gems Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedGems.map((gem) => (
            <Card
              key={gem.id}
              className="group cursor-pointer hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              <div className="relative">
                <img
                  src={gem.image || "/placeholder.svg"}
                  alt={gem.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <Badge className="bg-primary/90 text-primary-foreground">{gem.category}</Badge>
                  {gem.verified && (
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      Verified
                    </Badge>
                  )}
                </div>
                <div className="absolute top-4 right-4 flex gap-2">
                  <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <CardContent className="p-6 space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-card-foreground mb-2 text-balance">{gem.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <MapPin className="h-4 w-4" />
                    {gem.location}
                  </div>
                </div>

                <p className="text-muted-foreground text-sm text-pretty line-clamp-3">{gem.description}</p>

                <div className="flex flex-wrap gap-1">
                  {gem.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {gem.tags.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{gem.tags.length - 3}
                    </Badge>
                  )}
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{gem.rating}</span>
                      <span className="text-xs text-muted-foreground">({gem.reviews})</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {gem.difficulty}
                    </Badge>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <div className="text-xs text-muted-foreground">Shared by {gem.submittedBy}</div>
                  <div className="text-xs text-muted-foreground">Best: {gem.bestTime}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {sortedGems.length === 0 && (
          <div className="text-center py-12">
            <div className="text-muted-foreground mb-4">
              <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg">No hidden gems found matching your criteria</p>
              <p className="text-sm">Try adjusting your search or filters</p>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
