"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useAuth } from "@/lib/auth-context"
import {
  MapPin,
  Heart,
  Calendar,
  Settings,
  Bell,
  TrendingUp,
  Camera,
  Star,
  Award,
  Plane,
  Hotel,
  Bus,
} from "lucide-react"

export default function ProfilePage() {
  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState(user?.name || "")
  const [email, setEmail] = useState(user?.email || "")

  if (!user) {
    return null // This should be handled by middleware
  }

  const handleSave = () => {
    // In a real app, this would update the user profile via API
    setIsEditing(false)
  }

  const travelStats = {
    placesVisited: 12,
    totalBookings: 8,
    savedPlaces: 15,
    reviewsWritten: 6,
    photosUploaded: 24,
    travelBadges: ["Explorer", "Culture Enthusiast", "Hidden Gems Hunter"],
  }

  const recentBookings = [
    {
      id: 1,
      type: "hotel",
      destination: "Mysore Palace",
      bookingType: "Hotel Stay",
      date: "2024-01-15",
      status: "Completed",
      amount: 4500,
      image: "/mysore-palace-main-facade-golden-hour.jpg",
    },
    {
      id: 2,
      type: "transport",
      destination: "Hampi Ruins",
      bookingType: "Bus Ticket",
      date: "2024-02-20",
      status: "Upcoming",
      amount: 850,
      image: "/hampi-ruins.jpg",
    },
    {
      id: 3,
      type: "hotel",
      destination: "Coorg Coffee Estate",
      bookingType: "Resort Booking",
      date: "2024-03-10",
      status: "Confirmed",
      amount: 6200,
      image: "/coorg-coffee-plantations.jpg",
    },
  ]

  const recentActivity = [
    { id: 1, action: "Saved Gokarna Beach to wishlist", time: "2 hours ago", icon: Heart },
    { id: 2, action: "Uploaded 3 photos from Mysore trip", time: "1 day ago", icon: Camera },
    { id: 3, action: "Wrote review for Hotel Royal Orchid", time: "3 days ago", icon: Star },
    { id: 4, action: "Booked transport to Hampi", time: "1 week ago", icon: Bus },
  ]

  const savedPlaces = [
    {
      id: 1,
      name: "Coorg Coffee Plantations",
      location: "Karnataka",
      category: "Nature",
      image: "/coorg-coffee-plantations.jpg",
    },
    {
      id: 2,
      name: "Gokarna Beach",
      location: "Karnataka",
      category: "Beach",
      image: "/gokarna-beach.jpg",
    },
    {
      id: 3,
      name: "Chikmagalur Hills",
      location: "Karnataka",
      category: "Hills",
      image: "/chikmagalur-hills.jpg",
    },
    {
      id: 4,
      name: "Hampi Ruins",
      location: "Karnataka",
      category: "Heritage",
      image: "/hampi-ruins.jpg",
    },
  ]

  const getBookingIcon = (type: string) => {
    switch (type) {
      case "hotel":
        return <Hotel className="h-4 w-4" />
      case "transport":
        return <Bus className="h-4 w-4" />
      case "flight":
        return <Plane className="h-4 w-4" />
      default:
        return <MapPin className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Profile Header */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                  <AvatarFallback className="text-2xl">{user.name.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>

                <div className="flex-1 text-center md:text-left">
                  <h1 className="text-3xl font-bold text-foreground mb-2">{user.name}</h1>
                  <p className="text-muted-foreground mb-4">{user.email}</p>
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    {travelStats.travelBadges.map((badge) => (
                      <Badge key={badge} variant="secondary">
                        <Award className="h-3 w-3 mr-1" />
                        {badge}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button variant="outline" onClick={() => setIsEditing(!isEditing)} className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  {isEditing ? "Cancel" : "Edit Profile"}
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{travelStats.placesVisited}</div>
                  <p className="text-sm text-muted-foreground">Places Visited</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{travelStats.totalBookings}</div>
                  <p className="text-sm text-muted-foreground">Total Bookings</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{travelStats.savedPlaces}</div>
                  <p className="text-sm text-muted-foreground">Saved Places</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{travelStats.reviewsWritten}</div>
                  <p className="text-sm text-muted-foreground">Reviews Written</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Profile Tabs */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="bookings">Bookings</TabsTrigger>
              <TabsTrigger value="saved">Saved Places</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Calendar className="h-5 w-5" />
                        Recent Bookings
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {recentBookings.slice(0, 3).map((booking) => (
                        <div key={booking.id} className="flex items-center gap-3 p-3 border rounded-lg">
                          <div className="p-2 bg-primary/10 rounded-lg">{getBookingIcon(booking.type)}</div>
                          <img
                            src={booking.image || "/placeholder.svg"}
                            alt={booking.destination}
                            className="h-12 w-12 rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium">{booking.destination}</h4>
                            <p className="text-sm text-muted-foreground">
                              {booking.bookingType} • ₹{booking.amount}
                            </p>
                          </div>
                          <Badge variant={booking.status === "Completed" ? "secondary" : "default"}>
                            {booking.status}
                          </Badge>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5" />
                        Travel Progress
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Explorer Level</span>
                          <span>Level 3</span>
                        </div>
                        <Progress value={65} className="h-2" />
                        <p className="text-xs text-muted-foreground mt-1">3 more places to reach Level 4</p>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Karnataka Coverage</span>
                          <span>40%</span>
                        </div>
                        <Progress value={40} className="h-2" />
                        <p className="text-xs text-muted-foreground mt-1">Visited 12 out of 30 districts</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Heart className="h-5 w-5" />
                        Quick Saved
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {savedPlaces.slice(0, 4).map((place) => (
                        <div
                          key={place.id}
                          className="flex items-center gap-3 p-2 hover:bg-muted/50 rounded-lg cursor-pointer"
                        >
                          <img
                            src={place.image || "/placeholder.svg"}
                            alt={place.name}
                            className="h-10 w-10 rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium text-sm">{place.name}</h4>
                            <p className="text-xs text-muted-foreground">{place.category}</p>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {recentActivity.slice(0, 4).map((activity) => (
                        <div key={activity.id} className="flex items-start gap-3">
                          <div className="p-1 bg-primary/10 rounded-full mt-1">
                            <activity.icon className="h-3 w-3" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm">{activity.action}</p>
                            <p className="text-xs text-muted-foreground">{activity.time}</p>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="bookings" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>All Bookings</CardTitle>
                  <CardDescription>View and manage your travel bookings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentBookings.map((booking) => (
                      <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="p-2 bg-primary/10 rounded-lg">{getBookingIcon(booking.type)}</div>
                          <img
                            src={booking.image || "/placeholder.svg"}
                            alt={booking.destination}
                            className="h-16 w-16 rounded-lg object-cover"
                          />
                          <div>
                            <h4 className="font-medium">{booking.destination}</h4>
                            <p className="text-sm text-muted-foreground">
                              {booking.bookingType} • Booked for {booking.date}
                            </p>
                            <p className="text-sm font-medium">₹{booking.amount}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge variant={booking.status === "Completed" ? "secondary" : "default"}>
                            {booking.status}
                          </Badge>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="saved" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Saved Places</CardTitle>
                  <CardDescription>Places you want to visit</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {savedPlaces.map((place) => (
                      <div
                        key={place.id}
                        className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                      >
                        <img
                          src={place.image || "/placeholder.svg"}
                          alt={place.name}
                          className="h-32 w-full object-cover"
                        />
                        <div className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <Badge variant="outline" className="text-xs">
                              {place.category}
                            </Badge>
                            <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                          </div>
                          <h4 className="font-medium mb-1">{place.name}</h4>
                          <p className="text-sm text-muted-foreground mb-3">{place.location}</p>
                          <Button size="sm" className="w-full">
                            Plan Visit
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="activity" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Activity Timeline</CardTitle>
                  <CardDescription>Your recent travel activities and contributions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-start gap-4 pb-4 border-b last:border-b-0">
                        <div className="p-2 bg-primary/10 rounded-full">
                          <activity.icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{activity.action}</p>
                          <p className="text-sm text-muted-foreground">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Settings</CardTitle>
                  <CardDescription>Update your personal information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {isEditing ? (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={handleSave}>Save Changes</Button>
                        <Button variant="outline" onClick={() => setIsEditing(false)}>
                          Cancel
                        </Button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="space-y-2">
                        <Label>Full Name</Label>
                        <p className="text-foreground">{user.name}</p>
                      </div>
                      <div className="space-y-2">
                        <Label>Email</Label>
                        <p className="text-foreground">{user.email}</p>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Notifications
                  </CardTitle>
                  <CardDescription>Manage your notification preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Email Notifications</p>
                      <p className="text-sm text-muted-foreground">Receive updates about your bookings</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Configure
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Travel Recommendations</p>
                      <p className="text-sm text-muted-foreground">Get personalized destination suggestions</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Configure
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  )
}
