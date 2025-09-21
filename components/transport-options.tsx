import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Train, Bus, Car, Clock, IndianRupee } from "lucide-react"

const transportOptions = [
  {
    id: 1,
    type: "train",
    name: "Shatabdi Express",
    from: "Bangalore",
    duration: "2h 30m",
    price: 485,
    frequency: "Daily",
    icon: Train,
  },
  {
    id: 2,
    type: "bus",
    name: "KSRTC Volvo",
    from: "Bangalore",
    duration: "3h 15m",
    price: 320,
    frequency: "Every 30 mins",
    icon: Bus,
  },
  {
    id: 3,
    type: "cab",
    name: "Private Taxi",
    from: "Bangalore",
    duration: "3h 00m",
    price: 2500,
    frequency: "On demand",
    icon: Car,
  },
]

interface TransportOptionsProps {
  place: {
    name: string
    coordinates: { lat: number; lng: number }
  }
}

export function TransportOptions({ place }: TransportOptionsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">How to Reach</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {transportOptions.map((option) => {
          const Icon = option.icon
          return (
            <div key={option.id} className="border border-border rounded-lg p-4 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-sm text-card-foreground">{option.name}</h4>
                  <p className="text-xs text-muted-foreground">From {option.from}</p>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {option.type}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3 text-muted-foreground" />
                  <span className="text-muted-foreground">Duration:</span>
                  <span className="font-medium">{option.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <IndianRupee className="h-3 w-3 text-muted-foreground" />
                  <span className="text-muted-foreground">From:</span>
                  <span className="font-medium">₹{option.price}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{option.frequency}</span>
                <Button size="sm" variant="outline" className="text-xs px-3 bg-transparent">
                  Book {option.type}
                </Button>
              </div>
            </div>
          )
        })}

        <Button variant="outline" className="w-full bg-transparent">
          Plan Multi-Modal Journey
        </Button>
      </CardContent>
    </Card>
  )
}
