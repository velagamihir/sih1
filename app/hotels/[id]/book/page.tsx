"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { MapPin, Star, CalendarIcon, CreditCard, Shield, CheckCircle, ArrowLeft } from "lucide-react"
import { format } from "date-fns"
import { useAuth } from "@/lib/auth-context"

// Mock hotel data - in real app this would come from API
const hotelData = {
  id: 1,
  name: "Royal Orchid Metropole",
  location: "Mysore, Karnataka",
  rating: 4.5,
  reviews: 1247,
  image: "/hotel-royal-orchid.jpg",
  amenities: ["Wifi", "Parking", "Restaurant", "Pool", "Spa"],
  category: "Luxury",
  distance: "0.8 km from Mysore Palace",
}

const roomTypes = [
  {
    id: 1,
    name: "Deluxe Room",
    price: 4500,
    originalPrice: 5200,
    features: ["King Bed", "City View", "32 sqm", "Free WiFi"],
    maxGuests: 2,
    available: 3,
  },
  {
    id: 2,
    name: "Executive Suite",
    price: 6800,
    originalPrice: 7500,
    features: ["King Bed", "Palace View", "45 sqm", "Free WiFi", "Balcony"],
    maxGuests: 3,
    available: 2,
  },
  {
    id: 3,
    name: "Royal Suite",
    price: 9500,
    originalPrice: 11000,
    features: ["King Bed", "Palace View", "65 sqm", "Free WiFi", "Balcony", "Living Area"],
    maxGuests: 4,
    available: 1,
  },
]

export default function HotelBookingPage({ params }: { params: { id: string } }) {
  const [selectedRoom, setSelectedRoom] = useState<number | null>(null)
  const [checkIn, setCheckIn] = useState<Date>()
  const [checkOut, setCheckOut] = useState<Date>()
  const [guests, setGuests] = useState("2")
  const [rooms, setRooms] = useState("1")
  const [guestName, setGuestName] = useState("")
  const [guestEmail, setGuestEmail] = useState("")
  const [guestPhone, setGuestPhone] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("upi")
  const [specialRequests, setSpecialRequests] = useState("")
  const [agreeToTerms, setAgreeToTerms] = useState(false)
  const [isBooking, setIsBooking] = useState(false)

  const { user } = useAuth()
  const router = useRouter()

  const selectedRoomData = roomTypes.find((room) => room.id === selectedRoom)
  const nights = checkIn && checkOut ? Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)) : 0
  const subtotal = selectedRoomData ? selectedRoomData.price * nights * Number.parseInt(rooms) : 0
  const taxes = Math.round(subtotal * 0.18) // 18% GST
  const total = subtotal + taxes

  const handleBooking = async () => {
    if (!selectedRoomData || !checkIn || !checkOut || !guestName || !guestEmail || !agreeToTerms) {
      return
    }

    setIsBooking(true)

    try {
      // Simulate booking process
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // In a real app, this would call your booking API
      console.log("Booking details:", {
        hotel: hotelData,
        room: selectedRoomData,
        checkIn,
        checkOut,
        guests,
        rooms,
        guestDetails: { name: guestName, email: guestEmail, phone: guestPhone },
        paymentMethod,
        specialRequests,
        total,
      })

      // Redirect to confirmation page
      router.push(`/bookings/confirmation?id=${Date.now()}`)
    } catch (error) {
      console.error("Booking failed:", error)
    } finally {
      setIsBooking(false)
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Login Required</h1>
          <p className="text-muted-foreground mb-8">Please login to continue with your booking.</p>
          <Button onClick={() => router.push("/login")}>Login</Button>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Button variant="ghost" onClick={() => router.back()} className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Hotels
          </Button>

          <div className="flex items-center gap-4 mb-4">
            <img
              src={hotelData.image || "/placeholder.svg"}
              alt={hotelData.name}
              className="w-20 h-20 rounded-lg object-cover"
            />
            <div>
              <h1 className="text-2xl font-bold text-foreground">{hotelData.name}</h1>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                {hotelData.location}
              </div>
              <div className="flex items-center gap-2 mt-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{hotelData.rating}</span>
                <span className="text-sm text-muted-foreground">({hotelData.reviews} reviews)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Dates and Guests */}
            <Card>
              <CardHeader>
                <CardTitle>Booking Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Check-in Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {checkIn ? format(checkIn, "PPP") : "Select check-in date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={checkIn} onSelect={setCheckIn} initialFocus />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label>Check-out Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {checkOut ? format(checkOut, "PPP") : "Select check-out date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={checkOut} onSelect={setCheckOut} initialFocus />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Guests</Label>
                    <Select value={guests} onValueChange={setGuests}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6].map((num) => (
                          <SelectItem key={num} value={num.toString()}>
                            {num} Guest{num > 1 ? "s" : ""}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Rooms</Label>
                    <Select value={rooms} onValueChange={setRooms}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4].map((num) => (
                          <SelectItem key={num} value={num.toString()}>
                            {num} Room{num > 1 ? "s" : ""}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {nights > 0 && (
                  <Alert>
                    <CheckCircle className="h-4 w-4" />
                    <AlertDescription>
                      Your stay: {nights} night{nights > 1 ? "s" : ""} • {guests} guest
                      {Number.parseInt(guests) > 1 ? "s" : ""} • {rooms} room{Number.parseInt(rooms) > 1 ? "s" : ""}
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>

            {/* Room Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Select Room Type</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={selectedRoom?.toString()}
                  onValueChange={(value) => setSelectedRoom(Number.parseInt(value))}
                >
                  <div className="space-y-4">
                    {roomTypes.map((room) => (
                      <div key={room.id} className="flex items-center space-x-3 p-4 border rounded-lg">
                        <RadioGroupItem value={room.id.toString()} id={room.id.toString()} />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <Label htmlFor={room.id.toString()} className="text-base font-medium cursor-pointer">
                              {room.name}
                            </Label>
                            <div className="text-right">
                              <div className="flex items-center gap-2">
                                <span className="text-lg font-bold">₹{room.price}</span>
                                <span className="text-sm text-muted-foreground line-through">
                                  ₹{room.originalPrice}
                                </span>
                              </div>
                              <div className="text-sm text-muted-foreground">per night</div>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2 mb-2">
                            {room.features.map((feature, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {feature}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <span>Max {room.maxGuests} guests</span>
                            <span className="text-orange-600 font-medium">{room.available} rooms left</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Guest Information */}
            <Card>
              <CardHeader>
                <CardTitle>Guest Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="guestName">Full Name *</Label>
                    <Input
                      id="guestName"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      placeholder="Enter full name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="guestEmail">Email Address *</Label>
                    <Input
                      id="guestEmail"
                      type="email"
                      value={guestEmail}
                      onChange={(e) => setGuestEmail(e.target.value)}
                      placeholder="Enter email address"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="guestPhone">Phone Number</Label>
                  <Input
                    id="guestPhone"
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    placeholder="Enter phone number"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="specialRequests">Special Requests</Label>
                  <Input
                    id="specialRequests"
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    placeholder="Any special requests or preferences"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 border rounded-lg">
                      <RadioGroupItem value="upi" id="upi" />
                      <Label htmlFor="upi" className="flex-1 cursor-pointer">
                        <div className="flex items-center justify-between">
                          <span>UPI Payment</span>
                          <Badge variant="secondary">Recommended</Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">Pay using Google Pay, PhonePe, Paytm</div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-3 border rounded-lg">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="flex-1 cursor-pointer">
                        <span>Credit/Debit Card</span>
                        <div className="text-sm text-muted-foreground">Visa, Mastercard, RuPay</div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-3 border rounded-lg">
                      <RadioGroupItem value="netbanking" id="netbanking" />
                      <Label htmlFor="netbanking" className="flex-1 cursor-pointer">
                        <span>Net Banking</span>
                        <div className="text-sm text-muted-foreground">All major banks supported</div>
                      </Label>
                    </div>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>
          </div>

          {/* Booking Summary */}
          <div className="space-y-6">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedRoomData && checkIn && checkOut && (
                  <>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{selectedRoomData.name}</span>
                        <span>₹{selectedRoomData.price}/night</span>
                      </div>
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>
                          {nights} nights × {rooms} room{Number.parseInt(rooms) > 1 ? "s" : ""}
                        </span>
                        <span>₹{subtotal}</span>
                      </div>
                    </div>

                    <Separator />

                    <div className="flex justify-between text-sm">
                      <span>Taxes & Fees</span>
                      <span>₹{taxes}</span>
                    </div>

                    <Separator />

                    <div className="flex justify-between font-semibold">
                      <span>Total Amount</span>
                      <span>₹{total}</span>
                    </div>

                    <div className="space-y-3 pt-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="terms"
                          checked={agreeToTerms}
                          onCheckedChange={(checked) => setAgreeToTerms(checked as boolean)}
                        />
                        <Label htmlFor="terms" className="text-sm cursor-pointer">
                          I agree to the terms and conditions
                        </Label>
                      </div>

                      <Button
                        className="w-full"
                        size="lg"
                        onClick={handleBooking}
                        disabled={
                          !selectedRoomData ||
                          !checkIn ||
                          !checkOut ||
                          !guestName ||
                          !guestEmail ||
                          !agreeToTerms ||
                          isBooking
                        }
                      >
                        {isBooking ? "Processing..." : `Book Now - ₹${total}`}
                      </Button>

                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Shield className="h-4 w-4" />
                        <span>Secure payment • Free cancellation until 24 hours before check-in</span>
                      </div>
                    </div>
                  </>
                )}

                {(!selectedRoomData || !checkIn || !checkOut) && (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>Please select dates and room type to see pricing</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
