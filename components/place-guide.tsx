import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BookOpen, Download, Users } from "lucide-react"

const guideContent = {
  culturalInfo: {
    title: "Cultural Significance",
    content:
      "The Mysore Palace is the official residence of the Wadiyar dynasty and the seat of the Kingdom of Mysore. The palace is famous for its Indo-Saracenic architecture and is one of the most visited monuments in India.",
  },
  tips: [
    "Visit during evening hours (7-8 PM) to see the palace illuminated with thousands of lights",
    "Audio guides are available in multiple languages including English, Hindi, and Kannada",
    "Photography inside the palace requires an additional fee of ₹50",
    "Wear comfortable shoes as there's considerable walking involved",
  ],
  history:
    "Built in the 14th century, the current structure was constructed between 1912-1940 after the old palace was destroyed by fire. The palace showcases a blend of Hindu, Muslim, Rajput, and Gothic styles of architecture.",
  localGuides: [
    {
      id: 1,
      name: "Rajesh Kumar",
      rating: 4.9,
      experience: "8 years",
      languages: ["English", "Hindi", "Kannada"],
      price: 800,
      speciality: "Heritage & Architecture",
    },
    {
      id: 2,
      name: "Priya Devi",
      rating: 4.8,
      experience: "5 years",
      languages: ["English", "Tamil", "Kannada"],
      price: 600,
      speciality: "Cultural Stories",
    },
  ],
}

interface PlaceGuideProps {
  place: {
    name: string
  }
}

export function PlaceGuide({ place }: PlaceGuideProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            Cultural Guide
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-semibold text-foreground mb-3">{guideContent.culturalInfo.title}</h4>
            <p className="text-muted-foreground leading-relaxed text-pretty">{guideContent.culturalInfo.content}</p>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-3">Historical Background</h4>
            <p className="text-muted-foreground leading-relaxed text-pretty">{guideContent.history}</p>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-3">Visitor Tips</h4>
            <ul className="space-y-2">
              {guideContent.tips.map((tip, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <span className="text-pretty">{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" className="flex-1 bg-transparent">
              <Download className="h-4 w-4 mr-2" />
              Download Guide
            </Button>
            <Button variant="outline" className="flex-1 bg-transparent">
              <BookOpen className="h-4 w-4 mr-2" />
              Audio Guide
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Local Guides */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Local Guides
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {guideContent.localGuides.map((guide) => (
            <div key={guide.id} className="border border-border rounded-lg p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-medium text-card-foreground">{guide.name}</h4>
                  <p className="text-sm text-muted-foreground">{guide.speciality}</p>
                </div>
                <Badge variant="secondary">⭐ {guide.rating}</Badge>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Experience:</span>
                  <span className="ml-2 font-medium">{guide.experience}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Rate:</span>
                  <span className="ml-2 font-medium">₹{guide.price}/tour</span>
                </div>
              </div>

              <div>
                <span className="text-sm text-muted-foreground">Languages: </span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {guide.languages.map((lang, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {lang}
                    </Badge>
                  ))}
                </div>
              </div>

              <Button size="sm" className="w-full">
                Book Guide
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
