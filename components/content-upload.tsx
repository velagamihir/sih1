"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Upload, X, MapPin, Camera, Video, Loader2 } from "lucide-react"
import { useAuth } from "@/lib/auth-context"

interface ContentUploadProps {
  type: "gem" | "reel"
  onClose: () => void
}

export function ContentUpload({ type, onClose }: ContentUploadProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [location, setLocation] = useState("")
  const [category, setCategory] = useState("")
  const [difficulty, setDifficulty] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")
  const [files, setFiles] = useState<File[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState("")

  const { user } = useAuth()

  const categories =
    type === "gem"
      ? ["Nature", "Heritage", "Desert", "Culture", "Adventure", "Spiritual"]
      : ["Travel", "Food", "Culture", "Adventure", "Nature", "City"]

  const difficulties = ["Easy", "Moderate", "Challenging"]

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || [])
    const maxFiles = type === "gem" ? 5 : 1

    if (selectedFiles.length > maxFiles) {
      setError(`You can upload maximum ${maxFiles} ${type === "gem" ? "images" : "video"}`)
      return
    }

    // Validate file types
    const validTypes =
      type === "gem" ? ["image/jpeg", "image/png", "image/webp"] : ["video/mp4", "video/webm", "video/mov"]

    const invalidFiles = selectedFiles.filter((file) => !validTypes.includes(file.type))
    if (invalidFiles.length > 0) {
      setError(
        `Invalid file type. Please upload ${type === "gem" ? "images (JPEG, PNG, WebP)" : "videos (MP4, WebM, MOV)"}`,
      )
      return
    }

    setFiles(selectedFiles)
    setError("")
  }

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim()) && tags.length < 8) {
      setTags([...tags, newTag.trim()])
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!title || !description || !location || !category || files.length === 0) {
      setError("Please fill in all required fields and upload at least one file")
      return
    }

    setIsUploading(true)

    try {
      // Simulate upload process
      await new Promise((resolve) => setTimeout(resolve, 3000))

      // In a real app, this would upload to your backend/storage
      console.log("Uploading content:", {
        type,
        title,
        description,
        location,
        category,
        difficulty,
        tags,
        files: files.map((f) => f.name),
        submittedBy: user?.name,
      })

      onClose()
    } catch (err) {
      setError("Failed to upload content. Please try again.")
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                {type === "gem" ? <MapPin className="h-5 w-5" /> : <Video className="h-5 w-5" />}
                Share Your {type === "gem" ? "Hidden Gem" : "Travel Reel"}
              </CardTitle>
              <CardDescription>
                Help fellow travelers discover amazing {type === "gem" ? "places" : "experiences"}
              </CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* File Upload */}
            <div className="space-y-2">
              <Label>{type === "gem" ? "Photos" : "Video"} *</Label>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                <input
                  type="file"
                  multiple={type === "gem"}
                  accept={type === "gem" ? "image/*" : "video/*"}
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <div className="space-y-2">
                    {type === "gem" ? (
                      <Camera className="h-8 w-8 mx-auto text-muted-foreground" />
                    ) : (
                      <Video className="h-8 w-8 mx-auto text-muted-foreground" />
                    )}
                    <p className="text-sm text-muted-foreground">
                      Click to upload {type === "gem" ? "photos (max 5)" : "video (max 1)"}
                    </p>
                  </div>
                </label>
              </div>
              {files.length > 0 && (
                <div className="space-y-2">
                  {files.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                      <span className="text-sm">{file.name}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setFiles(files.filter((_, i) => i !== index))}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={`Give your ${type} a catchy title`}
                required
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={`Describe what makes this ${type === "gem" ? "place" : "experience"} special...`}
                rows={4}
                required
              />
            </div>

            {/* Location */}
            <div className="space-y-2">
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="City, State, Country"
                required
              />
            </div>

            {/* Category and Difficulty */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Category *</Label>
                <Select value={category} onValueChange={setCategory} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {type === "gem" && (
                <div className="space-y-2">
                  <Label>Difficulty</Label>
                  <Select value={difficulty} onValueChange={setDifficulty}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      {difficulties.map((diff) => (
                        <SelectItem key={diff} value={diff}>
                          {diff}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>

            {/* Tags */}
            <div className="space-y-2">
              <Label>Tags</Label>
              <div className="flex gap-2">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Add a tag"
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                />
                <Button type="button" onClick={addTag} disabled={tags.length >= 8}>
                  Add
                </Button>
              </div>
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="cursor-pointer" onClick={() => removeTag(tag)}>
                      {tag} <X className="h-3 w-3 ml-1" />
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Submit */}
            <div className="flex gap-3">
              <Button type="submit" disabled={isUploading} className="flex-1">
                {isUploading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    Share {type === "gem" ? "Hidden Gem" : "Reel"}
                  </>
                )}
              </Button>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
