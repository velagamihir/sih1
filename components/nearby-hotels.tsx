import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Wifi, Car, Coffee } from "lucide-react"

const nearbyHotels = [
  {
    id: 1,
    name: "Royal Orchid Metropole",
    rating: 4.5,
    price: 4500,
    distance: "0.8 km",
    image: "/luxury-hotel-exterior-mysore.jpg",
    amenities: ["Wifi", "Parking", "Restaurant"],
    category: "Luxury",
  },
  {
    id: 2,
    name: "Hotel Dasaprakash",
    rating: 4.2,
    price: 2800,
    distance: "1.2 km",
    image: "/mid-range-hotel-mysore.jpg",
    amenities: ["Wifi", "Restaurant"],
    category: "Mid-range",
  },
  {
    id: 3,
    name: "Zostel Mysore",
    rating: 4.0,
    price: 800,
    distance: "2.1 km",
    image: "/budget-hostel-mysore.jpg",
    amenities: ["Wifi", "Common Area"],
    category: "Budget",
  },
]

interface NearbyHotelsProps {
  placeId: string
}

export function NearbyHotels({ placeId }: NearbyHotelsProps) {
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

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Nearby Hotels</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {nearbyHotels.map((hotel) => (
          <div key={hotel.id} className="border border-border rounded-lg p-4 space-y-3">
            <div className="flex gap-3">
              <img
                src={hotel.image || "/placeholder.svg"}
                alt={hotel.name}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-medium text-sm text-card-foreground truncate">{hotel.name}</h4>
                  <Badge variant="outline" className="text-xs">
                    {hotel.category}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs font-medium">{hotel.rating}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    {hotel.distance}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {hotel.amenities.map((amenity, index) => (
                <div key={index} className="flex items-center gap-1 text-xs text-muted-foreground">
                  {getAmenityIcon(amenity)}
                  <span>{amenity}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="text-lg font-bold text-foreground">₹{hotel.price}</span>
                <span className="text-xs text-muted-foreground">/night</span>
              </div>
              <Button size="sm" className="text-xs px-3">
                Book Now
              </Button>
            </div>
          </div>
        ))}

        <Button variant="outline" className="w-full bg-transparent">
          View All Hotels
        </Button>
      </CardContent>
    </Card>
  )
}
