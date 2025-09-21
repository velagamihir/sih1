"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Slider } from "@/components/ui/slider"
import { Search, MapPin, Star, Wifi, Car, Coffee, CalendarIcon, Filter, Heart } from "lucide-react"
import { format } from "date-fns"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

const hotels = [
  {
    id: 1,
    name: "Royal Orchid Metropole",
    location: "Mysore, Karnataka",
    rating: 4.5,
    reviews: 1247,
    price: 4500,
    originalPrice: 5200,
    image: "/hotel-royal-orchid.jpg",
    amenities: ["Wifi", "Parking", "Restaurant", "Pool", "Spa"],
    category: "Luxury",
    distance: "0.8 km from Mysore Palace",
    availability: "3 rooms left",
    featured: true,
  },
  {
    id: 2,
    name: "Hotel Sandesh The Prince",
    location: "Mysore, Karnataka",
    rating: 4.2,
    reviews: 892,
    price: 2800,
    originalPrice: 3200,
    image: "/hotel-sandesh-the-prince.jpg",
    amenities: ["Wifi", "Restaurant", "Parking", "AC"],
    category: "Mid-range",
    distance: "1.2 km from Mysore Palace",
    availability: "5 rooms left",
    featured: false,
  },
  {
    id: 3,
    name: "Ginger Mysore",
    location: "Mysore, Karnataka",
    rating: 4.0,
    reviews: 634,
    price: 1800,
    originalPrice: 2100,
    image: "/hotel-ginger-mysore.jpg",
    amenities: ["Wifi", "Restaurant", "Gym"],
    category: "Budget",
    distance: "2.1 km from Mysore Palace",
    availability: "8 rooms left",
    featured: false,
  },
  {
    id: 4,
    name: "The Windflower Resort & Spa",
    location: "Mysore, Karnataka",
    rating: 4.7,
    reviews: 567,
    price: 6200,
    originalPrice: 7000,
    image: "/windflower-resort-spa.jpg",
    amenities: ["Wifi", "Parking", "Restaurant", "Pool", "Spa", "Garden"],
    category: "Luxury",
    distance: "5.2 km from Mysore Palace",
    availability: "2 rooms left",
    featured: true,
  },
  {
    id: 5,
    name: "Hotel Mayura Hoysala",
    location: "Mysore, Karnataka",
    rating: 3.8,
    reviews: 423,
    price: 1200,
    originalPrice: 1500,
    image: "/hotel-mayura-hoysala.jpg",
    amenities: ["Wifi", "Restaurant", "Parking"],
    category: "Budget",
    distance: "1.8 km from Mysore Palace",
    availability: "12 rooms left",
    featured: false,
  },
  {
    id: 6,
    name: "Fortune JP Palace",
    location: "Mysore, Karnataka",
    rating: 4.3,
    reviews: 789,
    price: 3500,
    originalPrice: 4000,
    image: "/fortune-jp-palace.jpg",
    amenities: ["Wifi", "Parking", "Restaurant", "Pool", "Gym"],
    category: "Mid-range",
    distance: "3.1 km from Mysore Palace",
    availability: "6 rooms left",
    featured: false,
  },
]

export default function HotelsPage() {
  const [searchLocation, setSearchLocation] = useState("Mysore, Karnataka")
  const [checkIn, setCheckIn] = useState<Date>()
  const [checkOut, setCheckOut] = useState<Date>()
  const [guests, setGuests] = useState("2")
  const [rooms, setRooms] = useState("1")
  const [priceRange, setPriceRange] = useState([1000, 8000])
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("recommended")
  const [showFilters, setShowFilters] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const [searchResults, setSearchResults] = useState(hotels)
  const [savedHotels, setSavedHotels] = useState<number[]>([])
  const { toast } = useToast()

  const handleSearch = async () => {
    if (!checkIn || !checkOut) {
      toast({
        title: "Missing dates",
        description: "Please select check-in and check-out dates",
        variant: "destructive",
      })
      return
    }

    setIsSearching(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const filtered = hotels.filter((hotel) => hotel.location.toLowerCase().includes(searchLocation.toLowerCase()))

    setSearchResults(filtered)
    setIsSearching(false)

    toast({
      title: "Search completed",
      description: `Found ${filtered.length} hotels for your dates`,
    })
  }

  const handleSaveHotel = (hotelId: number) => {
    setSavedHotels((prev) => {
      const isAlreadySaved = prev.includes(hotelId)
      const newSaved = isAlreadySaved ? prev.filter((id) => id !== hotelId) : [...prev, hotelId]

      toast({
        title: isAlreadySaved ? "Hotel removed" : "Hotel saved",
        description: isAlreadySaved ? "Hotel removed from your saved list" : "Hotel added to your saved list",
      })

      return newSaved
    })
  }

  const categories = ["all", "Luxury", "Mid-range", "Budget"]
  const sortOptions = [
    { value: "recommended", label: "Recommended" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "rating", label: "Highest Rated" },
    { value: "distance", label: "Distance" },
  ]

  const getAmenityIcon = (amenity: string) => {
    switch (amenity) {
      case "Wifi":
        return <Wifi className="h-3 w-3" />
      case "Parking":
        return <Car className="h-3 w-3" />
      case "Restaurant":
        return <Coffee className="h-3 w-3" />
      default:
        return null
    }
  }

  const filteredHotels = searchResults.filter((hotel) => {
    const matchesCategory = selectedCategory === "all" || hotel.category === selectedCategory
    const matchesPrice = hotel.price >= priceRange[0] && hotel.price <= priceRange[1]
    return matchesCategory && matchesPrice
  })

  const sortedHotels = [...filteredHotels].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "rating":
        return b.rating - a.rating
      case "distance":
        return Number.parseFloat(a.distance) - Number.parseFloat(b.distance)
      default:
        return b.featured ? 1 : -1
    }
  })

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Section */}
        <div className="bg-card border border-border rounded-lg p-6 mb-8">
          <div className="grid md:grid-cols-5 gap-4">
            <div className="space-y-2">
              <Label>Location</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Where are you going?"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Check-in</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {checkIn ? format(checkIn, "MMM dd") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={checkIn} onSelect={setCheckIn} initialFocus />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label>Check-out</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {checkOut ? format(checkOut, "MMM dd") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={checkOut} onSelect={setCheckOut} initialFocus />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label>Guests & Rooms</Label>
              <div className="flex gap-2">
                <Select value={guests} onValueChange={setGuests}>
                  <SelectTrigger className="flex-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num} Guest{num > 1 ? "s" : ""}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={rooms} onValueChange={setRooms}>
                  <SelectTrigger className="flex-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num} Room{num > 1 ? "s" : ""}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-end">
              <Button className="w-full" onClick={handleSearch} disabled={isSearching}>
                <Search className="mr-2 h-4 w-4" />
                {isSearching ? "Searching..." : "Search Hotels"}
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-80">
            <div className="lg:hidden mb-4">
              <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="w-full">
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>
            </div>

            <div className={`space-y-6 ${showFilters ? "block" : "hidden lg:block"}`}>
              <Card>
                <CardContent className="p-4 space-y-4">
                  <h3 className="font-semibold">Price Range</h3>
                  <div className="space-y-3">
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={10000}
                      min={500}
                      step={100}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>₹{priceRange[0]}</span>
                      <span>₹{priceRange[1]}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 space-y-4">
                  <h3 className="font-semibold">Hotel Category</h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <Button
                        key={category}
                        variant={selectedCategory === category ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedCategory(category)}
                        className="w-full justify-start"
                      >
                        {category === "all" ? "All Categories" : category}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Results */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-foreground">Hotels in {searchLocation}</h2>
                <p className="text-muted-foreground">{sortedHotels.length} properties found</p>
              </div>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {isSearching ? (
              <div className="space-y-6">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-80 h-64 bg-muted animate-pulse" />
                        <div className="flex-1 p-6 space-y-4">
                          <div className="h-6 bg-muted animate-pulse rounded" />
                          <div className="h-4 bg-muted animate-pulse rounded w-3/4" />
                          <div className="h-4 bg-muted animate-pulse rounded w-1/2" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {sortedHotels.map((hotel) => (
                  <Card key={hotel.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <CardContent className="p-0">
                      <div className="flex flex-col md:flex-row">
                        <div className="relative md:w-80">
                          <img
                            src={hotel.image || "/placeholder.svg"}
                            alt={hotel.name}
                            className="w-full h-64 md:h-full object-cover"
                          />
                          {hotel.featured && (
                            <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">Featured</Badge>
                          )}
                          <Button
                            variant="outline"
                            size="sm"
                            className="absolute top-4 right-4 bg-white/90 hover:bg-white"
                            onClick={() => handleSaveHotel(hotel.id)}
                          >
                            <Heart
                              className={`h-4 w-4 ${
                                savedHotels.includes(hotel.id) ? "fill-red-500 text-red-500" : "text-muted-foreground"
                              }`}
                            />
                          </Button>
                        </div>

                        <div className="flex-1 p-6">
                          <div className="flex flex-col h-full">
                            <div className="flex-1">
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <h3 className="text-xl font-semibold text-card-foreground mb-1">{hotel.name}</h3>
                                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                                    <MapPin className="h-4 w-4" />
                                    {hotel.distance}
                                  </div>
                                </div>
                                <Badge variant="outline">{hotel.category}</Badge>
                              </div>

                              <div className="flex items-center gap-2 mb-3">
                                <div className="flex items-center gap-1">
                                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                  <span className="font-medium">{hotel.rating}</span>
                                </div>
                                <span className="text-sm text-muted-foreground">({hotel.reviews} reviews)</span>
                              </div>

                              <div className="flex flex-wrap gap-2 mb-4">
                                {hotel.amenities.slice(0, 4).map((amenity, index) => (
                                  <div key={index} className="flex items-center gap-1 text-xs text-muted-foreground">
                                    {getAmenityIcon(amenity)}
                                    <span>{amenity}</span>
                                  </div>
                                ))}
                                {hotel.amenities.length > 4 && (
                                  <span className="text-xs text-muted-foreground">
                                    +{hotel.amenities.length - 4} more
                                  </span>
                                )}
                              </div>

                              <div className="text-sm text-orange-600 font-medium mb-4">{hotel.availability}</div>
                            </div>

                            <div className="flex items-end justify-between">
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="text-2xl font-bold text-foreground">₹{hotel.price}</span>
                                  <span className="text-sm text-muted-foreground line-through">
                                    ₹{hotel.originalPrice}
                                  </span>
                                </div>
                                <div className="text-sm text-muted-foreground">per night</div>
                              </div>

                              <div className="flex gap-2">
                                <Button variant="outline" size="sm" asChild>
                                  <Link href={`/hotels/${hotel.id}`}>View Details</Link>
                                </Button>
                                <Button size="sm" asChild>
                                  <Link href={`/hotels/${hotel.id}/book`}>Book Now</Link>
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
