"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Camera, Video, ChevronLeft, ChevronRight } from "lucide-react"

const galleryItems = [
  {
    id: 1,
    type: "image",
    url: "/mysore-palace-main-facade-golden-hour.jpg",
    title: "Main Palace Facade",
    category: "Architecture",
  },
  {
    id: 2,
    type: "image",
    url: "/mysore-palace-interior-throne-room.jpg",
    title: "Royal Throne Room",
    category: "Interior",
  },
  {
    id: 3,
    type: "video",
    url: "/mysore-palace-evening-illumination.jpg",
    title: "Evening Illumination",
    category: "Experience",
    duration: "2:15",
  },
  {
    id: 4,
    type: "image",
    url: "/mysore-palace-durbar-hall.jpg",
    title: "Durbar Hall",
    category: "Interior",
  },
  {
    id: 5,
    type: "image",
    url: "/mysore-palace-gardens-aerial-view.jpg",
    title: "Palace Gardens",
    category: "Gardens",
  },
  {
    id: 6,
    type: "video",
    url: "/mysore-palace-cultural-performance.jpg",
    title: "Cultural Performance",
    category: "Culture",
    duration: "1:45",
  },
]

interface PlaceGalleryProps {
  placeId: string
}

export function PlaceGallery({ placeId }: PlaceGalleryProps) {
  const [selectedItem, setSelectedItem] = useState(0)

  const nextItem = () => {
    setSelectedItem((prev) => (prev + 1) % galleryItems.length)
  }

  const prevItem = () => {
    setSelectedItem((prev) => (prev - 1 + galleryItems.length) % galleryItems.length)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Gallery</h2>
        <div className="flex items-center gap-2">
          <Badge variant="secondary">
            <Camera className="h-3 w-3 mr-1" />
            {galleryItems.filter((item) => item.type === "image").length} Photos
          </Badge>
          <Badge variant="secondary">
            <Video className="h-3 w-3 mr-1" />
            {galleryItems.filter((item) => item.type === "video").length} Videos
          </Badge>
        </div>
      </div>

      {/* Main Image/Video */}
      <Card className="relative overflow-hidden">
        <div className="relative aspect-[16/9]">
          <img
            src={galleryItems[selectedItem].url || "/placeholder.svg"}
            alt={galleryItems[selectedItem].title}
            className="w-full h-full object-cover"
          />

          {/* Video Overlay */}
          {galleryItems[selectedItem].type === "video" && (
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
              <div className="w-20 h-20 bg-white/20 backdrop-blur rounded-full flex items-center justify-center">
                <Play className="h-10 w-10 text-white ml-1" />
              </div>
              {galleryItems[selectedItem].duration && (
                <Badge className="absolute bottom-4 right-4 bg-black/50 text-white border-0">
                  {galleryItems[selectedItem].duration}
                </Badge>
              )}
            </div>
          )}

          {/* Navigation Arrows */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white"
            onClick={prevItem}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white"
            onClick={nextItem}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>

          {/* Item Info */}
          <div className="absolute bottom-4 left-4">
            <Badge className="mb-2 bg-primary/90 text-primary-foreground">{galleryItems[selectedItem].category}</Badge>
            <h3 className="text-white font-semibold text-lg">{galleryItems[selectedItem].title}</h3>
          </div>
        </div>
      </Card>

      {/* Thumbnail Grid */}
      <div className="grid grid-cols-6 gap-2">
        {galleryItems.map((item, index) => (
          <button
            key={item.id}
            className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
              selectedItem === index ? "border-primary" : "border-transparent"
            }`}
            onClick={() => setSelectedItem(index)}
          >
            <img src={item.url || "/placeholder.svg"} alt={item.title} className="w-full h-full object-cover" />
            {item.type === "video" && (
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <Play className="h-4 w-4 text-white" />
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
