import { PlaceDetailHeader } from "@/components/place-detail-header"
import { PlaceGallery } from "@/components/place-gallery"
import { PlaceInfo } from "@/components/place-info"
import { NearbyHotels } from "@/components/nearby-hotels"
import { TransportOptions } from "@/components/transport-options"
import { PlaceGuide } from "@/components/place-guide"
import { CommunityReviews } from "@/components/community-reviews"
import { RelatedPlaces } from "@/components/related-places"

// Mock data - in real app this would come from database
const placeData = {
  id: "1",
  name: "Mysore Palace",
  location: "Mysore, Karnataka",
  category: "Heritage",
  rating: 4.8,
  reviewCount: 2847,
  distance: "2.5 km from city center",
  description:
    "The magnificent Mysore Palace is a historical palace and a royal residence. It is located in Mysore, Karnataka, India. It is one of the most famous tourist attractions in India, after the Taj Mahal, with more than 6 million annual visitors.",
  highlights: [
    "Indo-Saracenic architecture",
    "Royal artifacts collection",
    "Evening illumination",
    "Audio guide available",
  ],
  timings: "10:00 AM - 5:30 PM",
  entryFee: "₹70 for Indians, ₹200 for foreigners",
  bestTimeToVisit: "October to March",
  coordinates: { lat: 12.3052, lng: 76.6551 },
}

export default function PlaceDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-background">
      <PlaceDetailHeader place={placeData} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <PlaceGallery placeId={placeData.id} />
            <PlaceInfo place={placeData} />
            <PlaceGuide place={placeData} />
            <CommunityReviews placeId={placeData.id} />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <NearbyHotels placeId={placeData.id} />
            <TransportOptions place={placeData} />
          </div>
        </div>

        <RelatedPlaces currentPlaceId={placeData.id} />
      </div>
    </div>
  )
}
