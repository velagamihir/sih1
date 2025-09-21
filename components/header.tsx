"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Search, Menu, X, MapPin, User, Settings, LogOut } from "lucide-react"
import { useAuth } from "@/lib/auth-context"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    setIsMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <MapPin className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-foreground">Swadeshi Trails</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/search?category=destinations"
              className="text-muted-foreground hover:text-primary transition-colors font-medium"
            >
              Destinations
            </Link>
            <Link
              href="/hidden-gems"
              className="text-muted-foreground hover:text-primary transition-colors font-medium"
            >
              Hidden Gems
            </Link>
            <Link href="/reels" className="text-muted-foreground hover:text-primary transition-colors font-medium">
              Travel Reels
            </Link>
            <Link
              href="/search?category=experiences"
              className="text-muted-foreground hover:text-primary transition-colors font-medium"
            >
              Experiences
            </Link>
          </nav>

          {/* Search Bar & Auth */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search destinations..." className="pl-10 w-64" />
            </div>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">{user.name}</p>
                      <p className="w-[200px] truncate text-sm text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/bookings">
                      <Settings className="mr-2 h-4 w-4" />
                      My Bookings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button variant="outline" asChild>
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild>
                  <Link href="/signup">Sign Up</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/search?category=destinations"
                className="text-muted-foreground hover:text-primary transition-colors font-medium"
              >
                Destinations
              </Link>
              <Link
                href="/hidden-gems"
                className="text-muted-foreground hover:text-primary transition-colors font-medium"
              >
                Hidden Gems
              </Link>
              <Link href="/reels" className="text-muted-foreground hover:text-primary transition-colors font-medium">
                Travel Reels
              </Link>
              <Link
                href="/search?category=experiences"
                className="text-muted-foreground hover:text-primary transition-colors font-medium"
              >
                Experiences
              </Link>
              <div className="pt-4 space-y-2">
                {user ? (
                  <>
                    <div className="flex items-center space-x-3 p-2 bg-muted/50 rounded-lg">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full bg-transparent" asChild>
                      <Link href="/profile">Profile</Link>
                    </Button>
                    <Button variant="outline" className="w-full bg-transparent" onClick={handleLogout}>
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="outline" className="w-full bg-transparent" asChild>
                      <Link href="/login">Login</Link>
                    </Button>
                    <Button className="w-full" asChild>
                      <Link href="/signup">Sign Up</Link>
                    </Button>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
