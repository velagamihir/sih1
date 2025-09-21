import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock, Accessibility } from "lucide-react"

interface PlaceInfoProps {
  place: {
    name: string
    description: string
    highlights: string[]
    coordinates: { lat: number; lng: number }
  }
}

export function PlaceInfo({ place }: PlaceInfoProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            About {place.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-muted-foreground leading-relaxed text-pretty">{place.description}</p>

          <div>
            <h4 className="font-semibold text-foreground mb-3">Highlights</h4>
            <div className="flex flex-wrap gap-2">
              {place.highlights.map((highlight, index) => (
                <Badge key={index} variant="secondary">
                  {highlight}
                </Badge>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Visitor Information
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Average Visit Duration</span>
                  <span className="font-medium">2-3 hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Crowd Level</span>
                  <span className="font-medium">Moderate</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Photography</span>
                  <span className="font-medium">Allowed (₹50 extra)</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <Accessibility className="h-4 w-4" />
                Accessibility
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Wheelchair Access</span>
                  <span className="font-medium">Partial</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Audio Guide</span>
                  <span className="font-medium">Available</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Parking</span>
                  <span className="font-medium">Available</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
