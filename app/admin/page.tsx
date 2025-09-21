"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  MapPin,
  Hotel,
  Bus,
  Camera,
  AlertTriangle,
  CheckCircle,
  XCircle,
  TrendingUp,
  DollarSign,
  Eye,
  MoreHorizontal,
} from "lucide-react"
import AuthGuard from "@/components/auth-guard"

const dashboardStats = {
  totalUsers: 1247,
  totalBookings: 856,
  totalRevenue: 425000,
  pendingReviews: 23,
  activeVendors: 45,
  newSignups: 12,
}

const pendingContent = [
  {
    id: 1,
    type: "place",
    title: "Secret Waterfall in Coorg",
    author: "Rahul Kumar",
    submitted: "2 hours ago",
    status: "pending",
    category: "Hidden Gem",
  },
  {
    id: 2,
    type: "reel",
    title: "Sunrise at Nandi Hills",
    author: "Priya Sharma",
    submitted: "5 hours ago",
    status: "pending",
    category: "Video Content",
  },
  {
    id: 3,
    type: "review",
    title: "Review for Mysore Palace Hotel",
    author: "Amit Patel",
    submitted: "1 day ago",
    status: "flagged",
    category: "User Review",
  },
]

const recentBookings = [
  {
    id: 1,
    user: "Sarah Johnson",
    destination: "Mysore Palace",
    type: "Hotel",
    amount: 4500,
    date: "2024-01-20",
    status: "confirmed",
  },
  {
    id: 2,
    user: "Raj Mehta",
    destination: "Hampi Express",
    type: "Transport",
    amount: 850,
    date: "2024-01-19",
    status: "completed",
  },
  {
    id: 3,
    user: "Lisa Chen",
    destination: "Coorg Resort",
    type: "Hotel",
    amount: 6200,
    date: "2024-01-18",
    status: "pending",
  },
]

const vendors = [
  {
    id: 1,
    name: "Royal Orchid Hotels",
    type: "Hotel",
    location: "Mysore",
    status: "active",
    rating: 4.5,
    bookings: 156,
    revenue: 78000,
  },
  {
    id: 2,
    name: "Karnataka State Transport",
    type: "Transport",
    location: "Statewide",
    status: "active",
    rating: 4.2,
    bookings: 324,
    revenue: 45000,
  },
  {
    id: 3,
    name: "Coorg Adventure Tours",
    type: "Experience",
    location: "Coorg",
    status: "pending",
    rating: 0,
    bookings: 0,
    revenue: 0,
  },
]

function AdminDashboard() {
  const [selectedTab, setSelectedTab] = useState("overview")

  const handleContentAction = (id: number, action: "approve" | "reject") => {
    // In real app, this would call API to approve/reject content
    console.log(`${action} content ${id}`)
  }

  const handleVendorAction = (id: number, action: "approve" | "suspend") => {
    // In real app, this would call API to manage vendor
    console.log(`${action} vendor ${id}`)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage Swadeshi Trails platform</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <Users className="h-8 w-8 mx-auto mb-2 text-primary" />
                <div className="text-2xl font-bold">{dashboardStats.totalUsers}</div>
                <p className="text-sm text-muted-foreground">Total Users</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <MapPin className="h-8 w-8 mx-auto mb-2 text-primary" />
                <div className="text-2xl font-bold">{dashboardStats.totalBookings}</div>
                <p className="text-sm text-muted-foreground">Bookings</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <DollarSign className="h-8 w-8 mx-auto mb-2 text-primary" />
                <div className="text-2xl font-bold">₹{(dashboardStats.totalRevenue / 1000).toFixed(0)}K</div>
                <p className="text-sm text-muted-foreground">Revenue</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <AlertTriangle className="h-8 w-8 mx-auto mb-2 text-orange-500" />
                <div className="text-2xl font-bold">{dashboardStats.pendingReviews}</div>
                <p className="text-sm text-muted-foreground">Pending Reviews</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <Hotel className="h-8 w-8 mx-auto mb-2 text-primary" />
                <div className="text-2xl font-bold">{dashboardStats.activeVendors}</div>
                <p className="text-sm text-muted-foreground">Active Vendors</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <TrendingUp className="h-8 w-8 mx-auto mb-2 text-green-500" />
                <div className="text-2xl font-bold">{dashboardStats.newSignups}</div>
                <p className="text-sm text-muted-foreground">New Signups</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="content">Content Moderation</TabsTrigger>
            <TabsTrigger value="vendors">Vendor Management</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 border rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <div className="flex-1">
                        <p className="font-medium">New vendor approved</p>
                        <p className="text-sm text-muted-foreground">Coorg Adventure Tours - 2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 border rounded-lg">
                      <Camera className="h-5 w-5 text-blue-500" />
                      <div className="flex-1">
                        <p className="font-medium">Content submitted for review</p>
                        <p className="text-sm text-muted-foreground">Hidden waterfall in Coorg - 3 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 border rounded-lg">
                      <Users className="h-5 w-5 text-purple-500" />
                      <div className="flex-1">
                        <p className="font-medium">12 new user registrations</p>
                        <p className="text-sm text-muted-foreground">Today</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Review Flagged Content ({dashboardStats.pendingReviews})
                  </Button>
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <Users className="h-4 w-4 mr-2" />
                    Approve Pending Vendors (3)
                  </Button>
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    View Analytics Report
                  </Button>
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <MapPin className="h-4 w-4 mr-2" />
                    Add New Destination
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="content" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Content Moderation Queue</CardTitle>
                <CardDescription>Review user-submitted content and reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingContent.map((content) => (
                    <div key={content.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          {content.type === "reel" ? <Camera className="h-5 w-5" /> : <MapPin className="h-5 w-5" />}
                        </div>
                        <div>
                          <h4 className="font-medium">{content.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            By {content.author} • {content.submitted}
                          </p>
                          <Badge variant="outline" className="mt-1">
                            {content.category}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={content.status === "flagged" ? "destructive" : "secondary"}>
                          {content.status}
                        </Badge>
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-1" />
                          Review
                        </Button>
                        <Button size="sm" onClick={() => handleContentAction(content.id, "approve")}>
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleContentAction(content.id, "reject")}
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="vendors" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Vendor Management</CardTitle>
                <CardDescription>Manage vendor partnerships and applications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {vendors.map((vendor) => (
                    <div key={vendor.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          {vendor.type === "Hotel" ? <Hotel className="h-5 w-5" /> : <Bus className="h-5 w-5" />}
                        </div>
                        <div>
                          <h4 className="font-medium">{vendor.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {vendor.type} • {vendor.location}
                          </p>
                          <div className="flex items-center gap-4 mt-1">
                            <span className="text-sm">Rating: {vendor.rating || "N/A"}</span>
                            <span className="text-sm">Bookings: {vendor.bookings}</span>
                            <span className="text-sm">Revenue: ₹{vendor.revenue}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={vendor.status === "active" ? "default" : "secondary"}>{vendor.status}</Badge>
                        {vendor.status === "pending" ? (
                          <>
                            <Button size="sm" onClick={() => handleVendorAction(vendor.id, "approve")}>
                              Approve
                            </Button>
                            <Button size="sm" variant="destructive">
                              Reject
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button size="sm" variant="outline">
                              View Details
                            </Button>
                            <Button size="sm" variant="outline">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bookings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Bookings</CardTitle>
                <CardDescription>Monitor platform bookings and transactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentBookings.map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          {booking.type === "Hotel" ? <Hotel className="h-5 w-5" /> : <Bus className="h-5 w-5" />}
                        </div>
                        <div>
                          <h4 className="font-medium">{booking.destination}</h4>
                          <p className="text-sm text-muted-foreground">
                            {booking.user} • {booking.type} • {booking.date}
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
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default function AdminPage() {
  return (
    <AuthGuard>
      <AdminDashboard />
    </AuthGuard>
  )
}
