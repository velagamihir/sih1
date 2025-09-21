"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Hotel, Star, Calendar, DollarSign, Users, CheckCircle, Clock, Upload } from "lucide-react"
import AuthGuard from "@/components/auth-guard"

const vendorStats = {
  totalBookings: 156,
  totalRevenue: 78000,
  averageRating: 4.5,
  activeListings: 8,
  pendingBookings: 3,
  completedBookings: 153,
}

const recentBookings = [
  {
    id: 1,
    guest: "Sarah Johnson",
    service: "Deluxe Room",
    checkIn: "2024-01-20",
    checkOut: "2024-01-22",
    amount: 4500,
    status: "confirmed",
  },
  {
    id: 2,
    guest: "Raj Mehta",
    service: "Premium Suite",
    checkIn: "2024-01-18",
    checkOut: "2024-01-20",
    amount: 6200,
    status: "completed",
  },
  {
    id: 3,
    guest: "Lisa Chen",
    service: "Standard Room",
    checkIn: "2024-01-25",
    checkOut: "2024-01-27",
    amount: 3200,
    status: "pending",
  },
]

const listings = [
  {
    id: 1,
    name: "Deluxe Room with Garden View",
    type: "Hotel Room",
    price: 2250,
    status: "active",
    bookings: 45,
    rating: 4.6,
  },
  {
    id: 2,
    name: "Premium Suite with Balcony",
    type: "Hotel Room",
    price: 3100,
    status: "active",
    bookings: 32,
    rating: 4.8,
  },
  {
    id: 3,
    name: "Standard AC Room",
    type: "Hotel Room",
    price: 1600,
    status: "active",
    bookings: 67,
    rating: 4.3,
  },
]

function VendorDashboard() {
  const [selectedTab, setSelectedTab] = useState("overview")
  const [isOnboarding, setIsOnboarding] = useState(false)

  const handleOnboardingSubmit = () => {
    // In real app, this would submit vendor application
    alert("Vendor application submitted successfully!")
    setIsOnboarding(false)
  }

  if (isOnboarding) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Vendor Onboarding</CardTitle>
                <CardDescription>Join Swadeshi Trails as a verified vendor partner</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="businessName">Business Name</Label>
                    <Input id="businessName" placeholder="Enter your business name" />
                  </div>
                  <div>
                    <Label htmlFor="businessType">Business Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select business type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hotel">Hotel/Resort</SelectItem>
                        <SelectItem value="transport">Transport Service</SelectItem>
                        <SelectItem value="experience">Experience Provider</SelectItem>
                        <SelectItem value="restaurant">Restaurant</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input id="city" placeholder="City" />
                    </div>
                    <div>
                      <Label htmlFor="state">State</Label>
                      <Input id="state" placeholder="State" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="address">Full Address</Label>
                    <Textarea id="address" placeholder="Enter complete business address" />
                  </div>
                  <div>
                    <Label htmlFor="description">Business Description</Label>
                    <Textarea id="description" placeholder="Describe your business and services" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" placeholder="Business phone" />
                    </div>
                    <div>
                      <Label htmlFor="email">Business Email</Label>
                      <Input id="email" type="email" placeholder="Business email" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="documents">Business Documents</Label>
                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                      <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        Upload business license, tax documents, and other certifications
                      </p>
                      <Button variant="outline" className="mt-2 bg-transparent">
                        Choose Files
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleOnboardingSubmit} className="flex-1">
                    Submit Application
                  </Button>
                  <Button variant="outline" onClick={() => setIsOnboarding(false)}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Vendor Dashboard</h1>
              <p className="text-muted-foreground">Royal Orchid Hotels - Mysore</p>
            </div>
            <Button onClick={() => setIsOnboarding(true)}>Add New Listing</Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <Calendar className="h-8 w-8 mx-auto mb-2 text-primary" />
                <div className="text-2xl font-bold">{vendorStats.totalBookings}</div>
                <p className="text-sm text-muted-foreground">Total Bookings</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <DollarSign className="h-8 w-8 mx-auto mb-2 text-primary" />
                <div className="text-2xl font-bold">₹{(vendorStats.totalRevenue / 1000).toFixed(0)}K</div>
                <p className="text-sm text-muted-foreground">Revenue</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <Star className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
                <div className="text-2xl font-bold">{vendorStats.averageRating}</div>
                <p className="text-sm text-muted-foreground">Avg Rating</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <Hotel className="h-8 w-8 mx-auto mb-2 text-primary" />
                <div className="text-2xl font-bold">{vendorStats.activeListings}</div>
                <p className="text-sm text-muted-foreground">Active Listings</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <Clock className="h-8 w-8 mx-auto mb-2 text-orange-500" />
                <div className="text-2xl font-bold">{vendorStats.pendingBookings}</div>
                <p className="text-sm text-muted-foreground">Pending</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-500" />
                <div className="text-2xl font-bold">{vendorStats.completedBookings}</div>
                <p className="text-sm text-muted-foreground">Completed</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="listings">Listings</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Bookings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentBookings.slice(0, 3).map((booking) => (
                      <div key={booking.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <h4 className="font-medium">{booking.guest}</h4>
                          <p className="text-sm text-muted-foreground">
                            {booking.service} • {booking.checkIn} to {booking.checkOut}
                          </p>
                          <p className="text-sm font-medium">₹{booking.amount}</p>
                        </div>
                        <Badge
                          variant={
                            booking.status === "completed"
                              ? "default"
                              : booking.status === "confirmed"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {booking.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Performance Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Occupancy Rate</span>
                    <span className="font-medium">78%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Average Daily Rate</span>
                    <span className="font-medium">₹2,450</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Guest Satisfaction</span>
                    <span className="font-medium">4.5/5</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Response Time</span>
                    <span className="font-medium">&lt; 2 hours</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="bookings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>All Bookings</CardTitle>
                <CardDescription>Manage your property bookings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentBookings.map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Users className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-medium">{booking.guest}</h4>
                          <p className="text-sm text-muted-foreground">
                            {booking.service} • {booking.checkIn} to {booking.checkOut}
                          </p>
                          <p className="text-sm font-medium">₹{booking.amount}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={
                            booking.status === "completed"
                              ? "default"
                              : booking.status === "confirmed"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {booking.status}
                        </Badge>
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                        {booking.status === "pending" && <Button size="sm">Confirm</Button>}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="listings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Listings</CardTitle>
                <CardDescription>Manage your property listings and availability</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {listings.map((listing) => (
                    <div key={listing.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Hotel className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-medium">{listing.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {listing.type} • ₹{listing.price}/night
                          </p>
                          <div className="flex items-center gap-4 mt-1">
                            <span className="text-sm">Bookings: {listing.bookings}</span>
                            <span className="text-sm flex items-center gap-1">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              {listing.rating}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="default">{listing.status}</Badge>
                        <Button size="sm" variant="outline">
                          Edit
                        </Button>
                        <Button size="sm" variant="outline">
                          Manage
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Analytics</CardTitle>
                <CardDescription>Track your earnings and performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">Monthly Revenue</h4>
                    <div className="text-3xl font-bold">₹78,000</div>
                    <p className="text-sm text-green-600">+12% from last month</p>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-medium">Booking Trends</h4>
                    <div className="text-3xl font-bold">156</div>
                    <p className="text-sm text-green-600">+8% from last month</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default function VendorPage() {
  return (
    <AuthGuard>
      <VendorDashboard />
    </AuthGuard>
  )
}
