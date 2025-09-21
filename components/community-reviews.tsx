"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, ThumbsUp, MessageCircle, Filter } from "lucide-react"

const reviews = [
  {
    id: 1,
    user: {
      name: "Arjun Mehta",
      avatar: "/user-avatar-1.jpg",
      location: "Mumbai",
      reviewCount: 23,
    },
    rating: 5,
    date: "2 days ago",
    title: "Absolutely magnificent!",
    content:
      "The evening illumination is breathtaking. The architecture is stunning and the audio guide provides excellent historical context. Must visit during Dussehra for the special celebrations.",
    helpful: 12,
    images: ["/review-image-1.jpg", "/review-image-2.jpg"],
    verified: true,
  },
  {
    id: 2,
    user: {
      name: "Sarah Johnson",
      avatar: "/user-avatar-2.jpg",
      location: "London, UK",
      reviewCount: 8,
    },
    rating: 4,
    date: "1 week ago",
    title: "Beautiful palace with rich history",
    content:
      "The palace is well-maintained and the guided tour was informative. The only downside was the crowd during peak hours. I'd recommend visiting early morning or late afternoon.",
    helpful: 8,
    images: [],
    verified: true,
  },
  {
    id: 3,
    user: {
      name: "Kavya Reddy",
      avatar: "/user-avatar-3.jpg",
      location: "Bangalore",
      reviewCount: 15,
    },
    rating: 5,
    date: "2 weeks ago",
    title: "A glimpse into royal heritage",
    content:
      "The intricate carvings and royal artifacts are mesmerizing. The Durbar Hall is particularly impressive. Great place to learn about Karnataka's royal history.",
    helpful: 15,
    images: ["/review-image-3.jpg"],
    verified: false,
  },
]

interface CommunityReviewsProps {
  placeId: string
}

export function CommunityReviews({ placeId }: CommunityReviewsProps) {
  const [selectedFilter, setSelectedFilter] = useState("all")

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`h-4 w-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
    ))
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-primary" />
              Community Reviews
            </CardTitle>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Review Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 bg-muted/30 rounded-lg">
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground">4.8</div>
              <div className="flex items-center justify-center gap-1 mt-1">{renderStars(5)}</div>
              <div className="text-sm text-muted-foreground mt-1">2,847 reviews</div>
            </div>
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((stars) => (
                <div key={stars} className="flex items-center gap-2">
                  <span className="text-sm w-3">{stars}</span>
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <div className="flex-1 bg-muted rounded-full h-2">
                    <div
                      className="bg-yellow-400 h-2 rounded-full"
                      style={{
                        width: `${stars === 5 ? 70 : stars === 4 ? 20 : stars === 3 ? 7 : stars === 2 ? 2 : 1}%`,
                      }}
                    />
                  </div>
                  <span className="text-sm text-muted-foreground w-8">
                    {stars === 5 ? "70%" : stars === 4 ? "20%" : stars === 3 ? "7%" : stars === 2 ? "2%" : "1%"}
                  </span>
                </div>
              ))}
            </div>
            <div className="text-center">
              <Button className="w-full">Write Review</Button>
            </div>
          </div>

          {/* Individual Reviews */}
          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="border-b border-border pb-6 last:border-b-0">
                <div className="flex items-start gap-4">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={review.user.avatar || "/placeholder.svg"} alt={review.user.name} />
                    <AvatarFallback>
                      {review.user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium text-card-foreground">{review.user.name}</h4>
                          {review.verified && (
                            <Badge variant="secondary" className="text-xs">
                              Verified
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{review.user.location}</span>
                          <span>•</span>
                          <span>{review.user.reviewCount} reviews</span>
                        </div>
                      </div>
                      <span className="text-sm text-muted-foreground">{review.date}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">{renderStars(review.rating)}</div>
                      <h5 className="font-medium text-card-foreground">{review.title}</h5>
                    </div>

                    <p className="text-muted-foreground leading-relaxed text-pretty">{review.content}</p>

                    {review.images.length > 0 && (
                      <div className="flex gap-2">
                        {review.images.map((image, index) => (
                          <img
                            key={index}
                            src={image || "/placeholder.svg"}
                            alt={`Review image ${index + 1}`}
                            className="w-20 h-20 rounded-lg object-cover cursor-pointer"
                          />
                        ))}
                      </div>
                    )}

                    <div className="flex items-center gap-4">
                      <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
                        <ThumbsUp className="h-4 w-4" />
                        Helpful ({review.helpful})
                      </button>
                      <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                        Reply
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Button variant="outline" className="w-full bg-transparent">
            Load More Reviews
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
