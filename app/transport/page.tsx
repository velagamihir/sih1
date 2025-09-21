import { Suspense } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock, Star, Car, Bus, Plane, Train } from "lucide-react"
import Link from "next/link"

const transportOptions = [
  {
    id: 1,
    type: "bus",
    operator: "Karnataka State Road Transport",
    route: "Bangalore → Mysore",
    departure: "06:00 AM",
    arrival: "09:30 AM",
    duration: "3h 30m",
    price: 250,
    rating: 4.2,
    amenities: ["AC", "WiFi", "Charging Port"],
    seatsAvailable: 12,
    image: "/bus-transport.jpg",
  },
  {
    id: 2,
    type: "train",
    operator: "Indian Railways",
    route: "Bangalore → Mysore",
    departure: "07:15 AM",
    arrival: "10:00 AM",
    duration: "2h 45m",
    price: 180,
    rating: 4.0,
    amenities: ["AC", "Pantry Car", "Reserved Seating"],
    seatsAvailable: 24,
    image: "/train-transport.jpg",
  },
  {
    id: 3,
    type: "cab",
    operator: "Swadeshi Cabs",
    route: "Bangalore → Mysore",
    departure: "Flexible",
    arrival: "Flexible",
    duration: "3h 00m",
    price: 2500,
    rating: 4.8,
    amenities: ["AC", "WiFi", "Driver", "Door-to-door"],
    seatsAvailable: 4,
    image: "/cab-transport.jpg",
  },
  {
    id: 4,
    type: "flight",
    operator: "Air India Express",
    route: "Delhi → Bangalore",
    departure: "08:30 AM",
    arrival: "11:15 AM",
    duration: "2h 45m",
    price: 4500,
    rating: 4.3,
    amenities: ["In-flight Meal", "Entertainment", "Baggage"],
    seatsAvailable: 8,
    image: "/flight-transport.jpg",
  },
]

const getTransportIcon = (type: string) => {
  switch (type) {
    case "bus":
      return <Bus className="h-5 w-5" />
    case "train":
      return <Train className="h-5 w-5" />
    case "cab":
      return <Car className="h-5 w-5" />
    case "flight":
      return <Plane className="h-5 w-5" />
    default:
      return <Car className="h-5 w-5" />
  }
}

function TransportSearch() {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Search Transport
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div>
            <label className="text-sm font-medium mb-2 block">From</label>
            <Input placeholder="Departure city" />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">To</label>
            <Input placeholder="Destination city" />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Date</label>
            <Input type="date" />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Transport Type</label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="All types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="bus">Bus</SelectItem>
                <SelectItem value="train">Train</SelectItem>
                <SelectItem value="cab">Cab</SelectItem>
                <SelectItem value="flight">Flight</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-end">
            <Button className="w-full">Search</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function TransportCard({ transport }: { transport: (typeof transportOptions)[0] }) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">{getTransportIcon(transport.type)}</div>
            <div>
              <h3 className="font-semibold text-lg">{transport.operator}</h3>
              <p className="text-muted-foreground text-sm">{transport.route}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary">₹{transport.price}</div>
            <div className="text-sm text-muted-foreground">per person</div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <div className="font-semibold">{transport.departure}</div>
            <div className="text-sm text-muted-foreground">Departure</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground mb-1">
              <Clock className="h-4 w-4" />
              {transport.duration}
            </div>
            <div className="h-px bg-border"></div>
          </div>
          <div className="text-center">
            <div className="font-semibold">{transport.arrival}</div>
            <div className="text-sm text-muted-foreground">Arrival</div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">{transport.rating}</span>
            <span className="text-muted-foreground">•</span>
            <span className="text-sm text-muted-foreground">{transport.seatsAvailable} seats left</span>
          </div>
          <Badge variant="secondary" className="capitalize">
            {transport.type}
          </Badge>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {transport.amenities.map((amenity) => (
            <Badge key={amenity} variant="outline" className="text-xs">
              {amenity}
            </Badge>
          ))}
        </div>

        <div className="flex gap-2">
          <Button variant="outline" className="flex-1 bg-transparent">
            View Details
          </Button>
          <Link href={`/transport/${transport.id}/book`} className="flex-1">
            <Button className="w-full">Book Now</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

export default function TransportPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Transport Booking</h1>
          <p className="text-muted-foreground text-lg">
            Find and book buses, trains, cabs, and flights for your journey
          </p>
        </div>

        <Suspense fallback={<div>Loading search...</div>}>
          <TransportSearch />
        </Suspense>

        <div className="mb-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Available Transport</h2>
            <Select>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="duration">Duration</SelectItem>
                <SelectItem value="rating">Rating</SelectItem>
                <SelectItem value="departure">Departure Time</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid gap-6">
          {transportOptions.map((transport) => (
            <TransportCard key={transport.id} transport={transport} />
          ))}
        </div>
      </div>
    </div>
  )
}
