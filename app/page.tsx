"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Megaphone,
  CheckCircle,
  AlertCircle,
  Lightbulb,
  FileText,
  BarChart3,
  Palette,
  Brain,
  Target,
  TrendingUp,
  Zap,
  Eye,
  Clock,
  Users,
  Heart,
  Share2,
  Camera,
  Calendar,
  DollarSign,
} from "lucide-react"

interface AISuggestion {
  id: string
  type: "engagement" | "clarity" | "tone" | "call-to-action" | "accessibility" | "branding"
  category: "marketing" | "enhancement" | "audience"
  text: string
  suggestion: string
  explanation: string
  position: { start: number; end: number }
  severity: "critical" | "important" | "suggestion"
  confidence: number
  accepted?: boolean
}

interface ExhibitionGoals {
  contentType:
    | "exhibition-description"
    | "artist-statement"
    | "press-release"
    | "social-media"
    | "wall-text"
    | "grant-proposal"
  targetAudience: "general-public" | "art-collectors" | "students" | "professionals" | "media"
  exhibitionType: "solo-show" | "group-show" | "pop-up" | "online-exhibition" | "installation"
  tone: "professional" | "casual" | "artistic" | "academic" | "playful"
  targetLength: number
}

interface PromotionMetrics {
  engagementScore: number
  accessibilityScore: number
  callToActionStrength: number
  brandConsistency: number
  audienceAlignment: number
  overallEffectiveness: number
}

export default function ArtWritePromo() {
  const [text, setText] =
    useState(`Join us for "Fragments of Memory," a compelling solo exhibition featuring mixed-media installations that explore themes of nostalgia and identity. 

This immersive experience invites viewers to journey through reconstructed memories, where found objects and personal artifacts create a dialogue between past and present. Each piece in the exhibition challenges our understanding of how memory shapes identity.

The exhibition runs from March 15-30 at the University Gallery. Opening reception Friday, March 15, 6-9 PM with artist talk at 7 PM. Light refreshments will be provided.

Don't miss this opportunity to experience art that speaks to the universal human experience of memory and belonging.`)

  const [suggestions, setSuggestions] = useState<AISuggestion[]>([
    {
      id: "1",
      type: "engagement",
      category: "marketing",
      text: "Join us for",
      suggestion: "Step into the world of",
      explanation:
        "More immersive language creates immediate engagement and draws readers into the experience rather than just inviting attendance.",
      position: { start: 0, end: 11 },
      severity: "important",
      confidence: 0.88,
    },
    {
      id: "2",
      type: "call-to-action",
      category: "marketing",
      text: "Don't miss this opportunity",
      suggestion: "Reserve your spot now - limited gallery capacity ensures an intimate viewing experience",
      explanation:
        "Creates urgency while highlighting the exclusive nature of the experience. Specific details make the CTA more compelling.",
      position: { start: 456, end: 482 },
      severity: "critical",
      confidence: 0.92,
    },
    {
      id: "3",
      type: "accessibility",
      category: "audience",
      text: "mixed-media installations that explore themes of nostalgia and identity",
      suggestion: "mixed-media installations that explore how our personal memories shape who we are",
      explanation:
        "Simplifies academic language while maintaining depth. Makes the concept more relatable to general audiences.",
      position: { start: 89, end: 154 },
      severity: "suggestion",
      confidence: 0.75,
    },
    {
      id: "4",
      type: "branding",
      category: "enhancement",
      text: "University Gallery",
      suggestion: "University Gallery (Building A, 2nd Floor)",
      explanation: "Adding location details helps visitors find the venue and shows professionalism in event planning.",
      position: { start: 398, end: 415 },
      severity: "important",
      confidence: 0.83,
    },
  ])

  const [goals, setGoals] = useState<ExhibitionGoals>({
    contentType: "exhibition-description",
    targetAudience: "general-public",
    exhibitionType: "solo-show",
    tone: "professional",
    targetLength: 300,
  })

  const [metrics, setMetrics] = useState<PromotionMetrics>({
    engagementScore: 72,
    accessibilityScore: 68,
    callToActionStrength: 45,
    brandConsistency: 81,
    audienceAlignment: 59,
    overallEffectiveness: 65,
  })

  const [activeTab, setActiveTab] = useState("editor")
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  // Simulate AI analysis
  const analyzeText = useCallback(async () => {
    setIsAnalyzing(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsAnalyzing(false)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      analyzeText()
    }, 2000)
    return () => clearTimeout(timer)
  }, [text, analyzeText])

  const applySuggestion = (suggestionId: string) => {
    const suggestion = suggestions.find((s) => s.id === suggestionId)
    if (suggestion) {
      const newText =
        text.slice(0, suggestion.position.start) + suggestion.suggestion + text.slice(suggestion.position.end)
      setText(newText)
      setSuggestions((prev) =>
        prev.map((s) => (s.id === suggestionId ? { ...s, accepted: true } : s)).filter((s) => s.id !== suggestionId),
      )
    }
  }

  const dismissSuggestion = (suggestionId: string) => {
    setSuggestions((prev) => prev.filter((s) => s.id !== suggestionId))
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "critical":
        return <AlertCircle className="w-4 h-4 text-red-500" />
      case "important":
        return <AlertCircle className="w-4 h-4 text-orange-500" />
      default:
        return <Lightbulb className="w-4 h-4 text-blue-500" />
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "border-red-200 bg-red-50"
      case "important":
        return "border-orange-200 bg-orange-50"
      default:
        return "border-blue-200 bg-blue-50"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "marketing":
        return <Megaphone className="w-3 h-3" />
      case "enhancement":
        return <TrendingUp className="w-3 h-3" />
      default:
        return <Users className="w-3 h-3" />
    }
  }

  const getContentTypeIcon = (type: string) => {
    switch (type) {
      case "exhibition-description":
        return <Eye className="w-4 h-4" />
      case "artist-statement":
        return <Palette className="w-4 h-4" />
      case "press-release":
        return <Megaphone className="w-4 h-4" />
      case "social-media":
        return <Share2 className="w-4 h-4" />
      case "wall-text":
        return <FileText className="w-4 h-4" />
      case "grant-proposal":
        return <DollarSign className="w-4 h-4" />
      default:
        return <FileText className="w-4 h-4" />
    }
  }

  const wordCount = text
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0).length
  const progressToTarget = Math.min(100, (wordCount / goals.targetLength) * 100)

  const engagementWords = ["experience", "journey", "explore", "discover", "immersive", "compelling", "captivating"]
  const engagementCount = engagementWords.filter((word) => text.toLowerCase().includes(word)).length

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 px-6 py-4 sticky top-0 z-50">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 rounded-xl">
              <Megaphone className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                ArtWrite Promo
              </h1>
              <p className="text-sm text-gray-500">AI-Powered Promotion Assistant for Art Exhibitions</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {isAnalyzing && (
              <div className="flex items-center gap-2 text-sm text-purple-600">
                <div className="w-4 h-4 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                AI Optimizing...
              </div>
            )}
            <Button variant="outline" size="sm">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button size="sm" className="bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600">
              Publish
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="editor" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Content Editor
            </TabsTrigger>
            <TabsTrigger value="suggestions" className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              AI Optimization
              <Badge variant="secondary">{suggestions.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="metrics" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Performance
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              Campaign Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="editor" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Main Editor */}
              <div className="lg:col-span-3">
                <Card className="h-[600px] shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-pink-50 via-purple-50 to-blue-50">
                    <CardTitle className="flex items-center gap-2">
                      {getContentTypeIcon(goals.contentType)}
                      {goals.contentType.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                      <Badge variant="outline" className="ml-auto">
                        {goals.targetAudience.replace("-", " ").toUpperCase()}
                      </Badge>
                    </CardTitle>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {wordCount} / {goals.targetLength} words
                      </span>
                      <Progress value={progressToTarget} className="w-32" />
                      <span>{Math.round(progressToTarget)}%</span>
                      <Badge variant="secondary" className="ml-auto">
                        {goals.tone.toUpperCase()}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="h-full pb-6">
                    <textarea
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      className="w-full h-full resize-none border-0 focus:outline-none text-gray-900 leading-relaxed text-lg"
                      placeholder="Start crafting your exhibition promotion here. Our AI will help you create compelling content that attracts visitors and builds excitement..."
                    />
                  </CardContent>
                </Card>
              </div>

              {/* Quick Optimization Sidebar */}
              <div className="lg:col-span-1">
                <Card className="h-[600px] shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-pink-50 via-purple-50 to-blue-50">
                    <CardTitle className="flex items-center gap-2 text-sm">
                      <Brain className="w-4 h-4" />
                      AI Insights
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <ScrollArea className="h-[520px]">
                      <div className="p-4 space-y-4">
                        {suggestions.slice(0, 3).map((suggestion) => (
                          <div
                            key={suggestion.id}
                            className={`p-3 rounded-lg border ${getSeverityColor(suggestion.severity)}`}
                          >
                            <div className="flex items-start gap-2 mb-2">
                              {getSeverityIcon(suggestion.severity)}
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <Badge variant="outline" className="text-xs">
                                    {suggestion.type}
                                  </Badge>
                                  <span className="text-xs text-gray-500">
                                    {Math.round(suggestion.confidence * 100)}%
                                  </span>
                                </div>
                                <p className="text-sm font-medium text-gray-900 mb-1">
                                  "{suggestion.text.slice(0, 30)}..."
                                </p>
                                <p className="text-xs text-gray-600 mb-2">{suggestion.explanation}</p>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-xs h-6"
                                onClick={() => applySuggestion(suggestion.id)}
                              >
                                Apply
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="text-xs h-6"
                                onClick={() => dismissSuggestion(suggestion.id)}
                              >
                                Dismiss
                              </Button>
                            </div>
                          </div>
                        ))}

                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full"
                          onClick={() => setActiveTab("suggestions")}
                        >
                          View All Optimizations ({suggestions.length})
                        </Button>

                        <div className="border-t pt-4 space-y-3">
                          <h4 className="text-sm font-medium">Quick Templates</h4>
                          <Button variant="ghost" size="sm" className="w-full justify-start text-xs">
                            <Camera className="w-3 h-3 mr-2" />
                            Instagram Caption
                          </Button>
                          <Button variant="ghost" size="sm" className="w-full justify-start text-xs">
                            <Megaphone className="w-3 h-3 mr-2" />
                            Press Release
                          </Button>
                          <Button variant="ghost" size="sm" className="w-full justify-start text-xs">
                            <Calendar className="w-3 h-3 mr-2" />
                            Event Description
                          </Button>
                        </div>
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Promotion Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
              <Card className="shadow-sm">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-gray-900">{wordCount}</div>
                  <div className="text-sm text-gray-500">Words</div>
                </CardContent>
              </Card>
              <Card className="shadow-sm">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-pink-600">{engagementCount}</div>
                  <div className="text-sm text-gray-500">Engagement Words</div>
                </CardContent>
              </Card>
              <Card className="shadow-sm">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {text.split("!").length - 1 + text.split("?").length - 1}
                  </div>
                  <div className="text-sm text-gray-500">Excitement Level</div>
                </CardContent>
              </Card>
              <Card className="shadow-sm">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">A</div>
                  <div className="text-sm text-gray-500">Marketing Grade</div>
                </CardContent>
              </Card>
              <Card className="shadow-sm">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {Math.round((text.split(".").length - 1) / (wordCount / 100))}
                  </div>
                  <div className="text-sm text-gray-500">Readability</div>
                </CardContent>
              </Card>
              <Card className="shadow-sm">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-orange-600">
                    {suggestions.filter((s) => s.type === "call-to-action").length}
                  </div>
                  <div className="text-sm text-gray-500">CTA Opportunities</div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="suggestions" className="space-y-6">
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-pink-50 via-purple-50 to-blue-50">
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  AI-Powered Marketing Optimization
                  <Badge variant="secondary" className="ml-auto">
                    {suggestions.length} Recommendations
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {suggestions.map((suggestion) => (
                    <div
                      key={suggestion.id}
                      className={`p-4 rounded-lg border ${getSeverityColor(suggestion.severity)} hover:shadow-md transition-shadow`}
                    >
                      <div className="flex items-start gap-3">
                        {getSeverityIcon(suggestion.severity)}
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline" className="text-xs">
                              {suggestion.type}
                            </Badge>
                            <Badge variant="secondary" className="text-xs">
                              {getCategoryIcon(suggestion.category)}
                              {suggestion.category}
                            </Badge>
                            <span className="text-xs text-gray-500 ml-auto">
                              Impact: {Math.round(suggestion.confidence * 100)}%
                            </span>
                          </div>
                          <div className="mb-3">
                            <p className="text-sm font-medium text-gray-900 mb-1">Current: "{suggestion.text}"</p>
                            <p className="text-sm text-green-700 font-medium mb-2">
                              Optimized: "{suggestion.suggestion}"
                            </p>
                            <p className="text-sm text-gray-600">{suggestion.explanation}</p>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              className="bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600"
                              onClick={() => applySuggestion(suggestion.id)}
                            >
                              Apply Optimization
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => dismissSuggestion(suggestion.id)}>
                              Skip
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="metrics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-pink-50 via-purple-50 to-blue-50">
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Marketing Performance
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Engagement Score</span>
                      <span className="text-sm text-gray-500">{metrics.engagementScore}%</span>
                    </div>
                    <Progress value={metrics.engagementScore} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Accessibility Score</span>
                      <span className="text-sm text-gray-500">{metrics.accessibilityScore}%</span>
                    </div>
                    <Progress value={metrics.accessibilityScore} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Call-to-Action Strength</span>
                      <span className="text-sm text-gray-500">{metrics.callToActionStrength}%</span>
                    </div>
                    <Progress value={metrics.callToActionStrength} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Brand Consistency</span>
                      <span className="text-sm text-gray-500">{metrics.brandConsistency}%</span>
                    </div>
                    <Progress value={metrics.brandConsistency} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Audience Alignment</span>
                      <span className="text-sm text-gray-500">{metrics.audienceAlignment}%</span>
                    </div>
                    <Progress value={metrics.audienceAlignment} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-pink-50 via-purple-50 to-blue-50">
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="w-5 h-5" />
                    Campaign Insights
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="text-4xl font-bold text-purple-600 mb-2">{metrics.overallEffectiveness}%</div>
                    <p className="text-gray-600">Overall Effectiveness</p>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-sm">Strong brand consistency</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                      <AlertCircle className="w-5 h-5 text-yellow-600" />
                      <span className="text-sm">Strengthen call-to-action</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                      <Lightbulb className="w-5 h-5 text-blue-600" />
                      <span className="text-sm">Improve audience targeting</span>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t">
                    <h4 className="text-sm font-medium mb-3">Predicted Engagement</h4>
                    <div className="grid grid-cols-3 gap-3 text-center">
                      <div>
                        <div className="text-lg font-bold text-pink-600">
                          <Heart className="w-4 h-4 inline mr-1" />
                          127
                        </div>
                        <div className="text-xs text-gray-500">Likes</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-blue-600">
                          <Share2 className="w-4 h-4 inline mr-1" />
                          23
                        </div>
                        <div className="text-xs text-gray-500">Shares</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-green-600">
                          <Users className="w-4 h-4 inline mr-1" />
                          45
                        </div>
                        <div className="text-xs text-gray-500">Attendees</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-pink-50 via-purple-50 to-blue-50">
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Campaign Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Content Type</label>
                      <select
                        value={goals.contentType}
                        onChange={(e) => setGoals((prev) => ({ ...prev, contentType: e.target.value as any }))}
                        className="w-full p-2 border rounded-lg"
                      >
                        <option value="exhibition-description">Exhibition Description</option>
                        <option value="artist-statement">Artist Statement</option>
                        <option value="press-release">Press Release</option>
                        <option value="social-media">Social Media Post</option>
                        <option value="wall-text">Wall Text</option>
                        <option value="grant-proposal">Grant Proposal</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Target Audience</label>
                      <select
                        value={goals.targetAudience}
                        onChange={(e) => setGoals((prev) => ({ ...prev, targetAudience: e.target.value as any }))}
                        className="w-full p-2 border rounded-lg"
                      >
                        <option value="general-public">General Public</option>
                        <option value="art-collectors">Art Collectors</option>
                        <option value="students">Students</option>
                        <option value="professionals">Art Professionals</option>
                        <option value="media">Media/Press</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Exhibition Type</label>
                      <select
                        value={goals.exhibitionType}
                        onChange={(e) => setGoals((prev) => ({ ...prev, exhibitionType: e.target.value as any }))}
                        className="w-full p-2 border rounded-lg"
                      >
                        <option value="solo-show">Solo Show</option>
                        <option value="group-show">Group Show</option>
                        <option value="pop-up">Pop-up Exhibition</option>
                        <option value="online-exhibition">Online Exhibition</option>
                        <option value="installation">Installation</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Tone</label>
                      <select
                        value={goals.tone}
                        onChange={(e) => setGoals((prev) => ({ ...prev, tone: e.target.value as any }))}
                        className="w-full p-2 border rounded-lg"
                      >
                        <option value="professional">Professional</option>
                        <option value="casual">Casual</option>
                        <option value="artistic">Artistic</option>
                        <option value="academic">Academic</option>
                        <option value="playful">Playful</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Target Length (words)</label>
                      <input
                        type="number"
                        value={goals.targetLength}
                        onChange={(e) =>
                          setGoals((prev) => ({ ...prev, targetLength: Number.parseInt(e.target.value) }))
                        }
                        className="w-full p-2 border rounded-lg"
                      />
                    </div>
                    <div className="pt-4">
                      <h4 className="text-sm font-medium mb-3">Quick Actions</h4>
                      <div className="space-y-2">
                        <Button variant="outline" size="sm" className="w-full justify-start">
                          <Camera className="w-4 h-4 mr-2" />
                          Generate Social Media Variants
                        </Button>
                        <Button variant="outline" size="sm" className="w-full justify-start">
                          <Megaphone className="w-4 h-4 mr-2" />
                          Create Press Kit
                        </Button>
                        <Button variant="outline" size="sm" className="w-full justify-start">
                          <DollarSign className="w-4 h-4 mr-2" />
                          Export for Grant Application
                        </Button>
                      </div>
                    </div>
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
