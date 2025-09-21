import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin } from "lucide-react"

const relatedPlaces = [
  {
    id: 2,
    name: "Chamundi Hills",
    location: "Mysore, Karnataka",
    category: "Temple",
    rating: 4.6,
    distance: "5.2 km",
    image: "/chamundi-hills-temple-view.jpg",
    description: "Sacred hill with ancient temple offering panoramic city views",
  },
  {
    id: 3,
    name: "Brindavan Gardens",
    location: "Mysore, Karnataka",
    category: "Gardens",
    rating: 4.4,
    distance: "8.1 km",
    image: "/brindavan-gardens-musical-fountain.jpg",
    description: "Beautiful terraced gardens with musical fountain show",
  },
  {
    id: 4,
    name: "St. Philomena's Cathedral",
    location: "Mysore, Karnataka",
    category: "Heritage",
    rating: 4.5,
    distance: "2.8 km",
    image: "/st-philomena-cathedral-gothic.jpg",
    description: "Neo-Gothic cathedral with stunning stained glass windows",
  },
  {
    id: 5,
    name: "Mysore Zoo",
    location: "Mysore, Karnataka",
    category: "Wildlife",
    rating: 4.3,
    distance: "1.5 km",
    image: "/mysore-zoo-wildlife.jpg",
    description: "One of India's oldest and most well-maintained zoos",
  },
]

interface RelatedPlacesProps {
  currentPlaceId: string
}

export function RelatedPlaces({ currentPlaceId }: RelatedPlacesProps) {
  return (
    <div className="mt-16 space-y-6">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 text-balance">
          Explore <span className="text-primary">Nearby Places</span>
        </h2>
        <p className="text-lg text-muted-foreground text-pretty">
          Discover more attractions and hidden gems in the area
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedPlaces.map((place) => (
          <Card key={place.id} className="group cursor-pointer hover:shadow-lg transition-all duration-300">
            <div className="relative overflow-hidden rounded-t-lg">
              <img
                src={place.image || "/placeholder.svg"}
                alt={place.name}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-4 left-4">
                <Badge className="bg-primary/90 text-primary-foreground">{place.category}</Badge>
              </div>
            </div>
            <CardContent className="p-4 space-y-3">
              <div>
                <h3 className="font-semibold text-card-foreground mb-1 text-balance">{place.name}</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  {place.distance} away
                </div>
              </div>

              <p className="text-sm text-muted-foreground text-pretty">{place.description}</p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{place.rating}</span>
                </div>
                <span className="text-sm text-primary font-medium">Explore →</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
