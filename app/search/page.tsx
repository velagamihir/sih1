"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, MapPin, Star } from "lucide-react"
import Link from "next/link"

const searchResults = [
  {
    id: 1,
    title: "Mysore Palace",
    type: "Heritage Site",
    location: "Mysore, Karnataka",
    rating: 4.6,
    image: "/mysore-palace-illuminated.jpg",
    description: "Magnificent royal palace with Indo-Saracenic architecture",
    category: "Heritage",
  },
  {
    id: 2,
    title: "Coorg Coffee Plantations",
    type: "Nature Experience",
    location: "Coorg, Karnataka",
    rating: 4.8,
    image: "/coorg-coffee-plantations.jpg",
    description: "Scenic coffee estates in the Western Ghats",
    category: "Nature",
  },
  {
    id: 3,
    title: "Hampi Ruins",
    type: "UNESCO World Heritage",
    location: "Hampi, Karnataka",
    rating: 4.9,
    image: "/hampi-ruins.jpg",
    description: "Ancient Vijayanagara Empire ruins and temples",
    category: "Heritage",
  },
]

function SearchContent() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const [searchQuery, setSearchQuery] = useState(query)
  const [isSearching, setIsSearching] = useState(false)
  const [results, setResults] = useState(searchResults)

  useEffect(() => {
    if (query) {
      performSearch(query)
    }
  }, [query])

  const performSearch = async (searchTerm: string) => {
    setIsSearching(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const filtered = searchResults.filter(
      (result) =>
        result.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        result.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        result.description.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    setResults(filtered)
    setIsSearching(false)
  }

  const handleSearch = () => {
    if (searchQuery.trim()) {
      performSearch(searchQuery)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">Search Results {query && `for "${query}"`}</h1>

          <div className="flex gap-4 max-w-2xl">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search destinations, experiences..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              />
            </div>
            <Button onClick={handleSearch} disabled={isSearching}>
              {isSearching ? "Searching..." : "Search"}
            </Button>
          </div>
        </div>

        {isSearching ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden">
                <div className="h-48 bg-muted animate-pulse" />
                <CardContent className="p-6 space-y-3">
                  <div className="h-6 bg-muted animate-pulse rounded" />
                  <div className="h-4 bg-muted animate-pulse rounded w-3/4" />
                  <div className="h-4 bg-muted animate-pulse rounded w-1/2" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <>
            <div className="mb-6">
              <p className="text-muted-foreground">
                Found {results.length} result{results.length !== 1 ? "s" : ""}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((result) => (
                <Card key={result.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <Link href={`/place/${result.id}`}>
                    <div className="relative">
                      <img
                        src={result.image || "/placeholder.svg"}
                        alt={result.title}
                        className="w-full h-48 object-cover"
                      />
                      <Badge className="absolute top-4 left-4 bg-primary/90">{result.category}</Badge>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold text-card-foreground mb-2">{result.title}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                        <MapPin className="h-4 w-4" />
                        {result.location}
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">{result.description}</p>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{result.rating}</span>
                      </div>
                    </CardContent>
                  </Link>
                </Card>
              ))}
            </div>

            {results.length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium text-foreground mb-2">No results found</h3>
                <p className="text-muted-foreground">
                  Try searching with different keywords or explore our featured destinations
                </p>
              </div>
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchContent />
    </Suspense>
  )
}
