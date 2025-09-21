"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, MapPin, Clock, Users, CreditCard, Shield } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import AuthGuard from "@/components/auth-guard"

const transportDetails = {
  1: {
    type: "bus",
    operator: "Karnataka State Road Transport",
    route: "Bangalore → Mysore",
    departure: "06:00 AM",
    arrival: "09:30 AM",
    duration: "3h 30m",
    price: 250,
    amenities: ["AC", "WiFi", "Charging Port"],
    image: "/bus-transport.jpg",
  },
}

function BookingForm() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const [passengers, setPassengers] = useState(1)
  const [selectedSeats, setSelectedSeats] = useState<string[]>([])

  const transport = transportDetails[1] // In real app, fetch by params.id
  const basePrice = transport.price
  const taxes = Math.round(basePrice * 0.18)
  const totalPrice = (basePrice + taxes) * passengers

  const handleBooking = () => {
    // In real app, process payment and create booking
    alert("Booking confirmed! Redirecting to confirmation page...")
    router.push("/profile?tab=bookings")
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link
            href="/transport"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Transport
          </Link>
          <h1 className="text-3xl font-bold">Complete Your Booking</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Transport Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Journey Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg">{transport.operator}</h3>
                    <p className="text-muted-foreground">{transport.route}</p>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="font-semibold">{transport.departure}</div>
                      <div className="text-sm text-muted-foreground">Departure</div>
                    </div>
                    <div className="flex items-center justify-center">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        {transport.duration}
                      </div>
                    </div>
                    <div>
                      <div className="font-semibold">{transport.arrival}</div>
                      <div className="text-sm text-muted-foreground">Arrival</div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {transport.amenities.map((amenity) => (
                      <Badge key={amenity} variant="outline">
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Passenger Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Passenger Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="passengers">Number of Passengers</Label>
                  <Select
                    value={passengers.toString()}
                    onValueChange={(value) => setPassengers(Number.parseInt(value))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 6].map((num) => (
                        <SelectItem key={num} value={num.toString()}>
                          {num} Passenger{num > 1 ? "s" : ""}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {Array.from({ length: passengers }, (_, i) => (
                  <div key={i} className="space-y-3 p-4 border rounded-lg">
                    <h4 className="font-medium">Passenger {i + 1}</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor={`firstName-${i}`}>First Name</Label>
                        <Input id={`firstName-${i}`} placeholder="Enter first name" />
                      </div>
                      <div>
                        <Label htmlFor={`lastName-${i}`}>Last Name</Label>
                        <Input id={`lastName-${i}`} placeholder="Enter last name" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor={`age-${i}`}>Age</Label>
                        <Input id={`age-${i}`} type="number" placeholder="Age" />
                      </div>
                      <div>
                        <Label htmlFor={`gender-${i}`}>Gender</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Contact Details */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue={user?.email} placeholder="Enter email" />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" placeholder="Enter phone number" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>
                      Base Price ({passengers} passenger{passengers > 1 ? "s" : ""})
                    </span>
                    <span>₹{basePrice * passengers}</span>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Taxes & Fees</span>
                    <span>₹{taxes * passengers}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total Amount</span>
                    <span>₹{totalPrice}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="card">Credit/Debit Card</SelectItem>
                    <SelectItem value="upi">UPI</SelectItem>
                    <SelectItem value="netbanking">Net Banking</SelectItem>
                    <SelectItem value="wallet">Digital Wallet</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Shield className="h-4 w-4" />
                  <span>Your payment information is secure and encrypted</span>
                </div>

                <Button onClick={handleBooking} className="w-full" size="lg">
                  Pay ₹{totalPrice} & Confirm Booking
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="text-sm text-muted-foreground space-y-2">
                  <p>• Free cancellation up to 2 hours before departure</p>
                  <p>• E-tickets will be sent to your email</p>
                  <p>• 24/7 customer support available</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function TransportBookingPage() {
  return (
    <AuthGuard>
      <BookingForm />
    </AuthGuard>
  )
}
