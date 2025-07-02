
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Share2, Download, Copy, Edit3, Slack, Clock, Users, MessageSquare, CheckCircle, AlertCircle, ArrowRight, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface SummaryDisplayProps {
  onBack: () => void;
}

const SummaryDisplay = ({ onBack }: SummaryDisplayProps) => {
  const [isGenerating, setIsGenerating] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editableContent, setEditableContent] = useState({
    whatHappened: "",
    whyItMatters: "",
    nextSteps: ""
  });

  // Simulate generation process
  useState(() => {
    const timer = setTimeout(() => {
      setIsGenerating(false);
      setEditableContent({
        whatHappened: "Design team reviewed user feedback on the current mobile app. Key issues identified include navigation confusion (mentioned by 67% of users), slow loading times on older devices, and accessibility concerns for the checkout flow. The team discussed three potential solutions and reached consensus on a phased approach to address the most critical issues first.",
        whyItMatters: "Mobile conversion rate dropped 15% last quarter, directly impacting revenue. Fixing these UX issues could recover an estimated $50k in monthly lost revenue and improve user retention by 25%. The checkout accessibility issue may also have compliance implications under WCAG guidelines, creating potential legal risk.",
        nextSteps: "• Sarah will create wireframes for simplified navigation (due Friday)\n• Dev team to audit performance on Android 8+ devices\n• Schedule accessibility review with external consultant\n• Present findings to stakeholders next Tuesday\n• Begin Phase 1 implementation following stakeholder approval"
      });
    }, 3000);
    
    return () => clearTimeout(timer);
  });

  const handleCopy = () => {
    const fullBrief = `# Mobile App Redesign Discussion

## What Happened
${editableContent.whatHappened}

## Why It Matters
${editableContent.whyItMatters}

## Next Steps
${editableContent.nextSteps}`;

    navigator.clipboard.writeText(fullBrief);
    toast({
      title: "Brief copied!",
      description: "The brief has been copied to your clipboard.",
    });
  };

  const handleShare = () => {
    // Simulate sharing
    toast({
      title: "Share link created!",
      description: "Anyone with the link can view this brief.",
    });
  };

  if (isGenerating) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        {/* Header */}
        <header className="border-b bg-white/80 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4 flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gradient-to-br from-blue-600 to-indigo-600 rounded flex items-center justify-center">
                <Slack className="w-3 h-3 text-white" />
              </div>
              <span className="text-lg font-semibold text-gray-900">Generating Brief...</span>
            </div>
          </div>
        </header>

        {/* Loading Content */}
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <Card className="shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl flex items-center gap-2">
                      <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
                      Analyzing #design-team conversation...
                    </CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-2">
                      <Slack className="w-4 h-4" />
                      23 messages • Processing insights
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="space-y-6">
                  <div className="animate-pulse">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-2 h-2 bg-blue-200 rounded-full"></div>
                      <div className="h-4 bg-blue-200 rounded w-32"></div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-full"></div>
                      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                      <div className="h-4 bg-gray-200 rounded w-4/5"></div>
                    </div>
                  </div>
                  
                  <div className="animate-pulse">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-2 h-2 bg-amber-200 rounded-full"></div>
                      <div className="h-4 bg-amber-200 rounded w-28"></div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-full"></div>
                      <div className="h-4 bg-gray-200 rounded w-4/5"></div>
                    </div>
                  </div>
                  
                  <div className="animate-pulse">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-2 h-2 bg-green-200 rounded-full"></div>
                      <div className="h-4 bg-green-200 rounded w-24"></div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                      <div className="h-4 bg-gray-200 rounded w-4/5"></div>
                      <div className="h-4 bg-gray-200 rounded w-full"></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gradient-to-br from-blue-600 to-indigo-600 rounded flex items-center justify-center">
                <Slack className="w-3 h-3 text-white" />
              </div>
              <span className="text-lg font-semibold text-gray-900">Mobile App Redesign Discussion</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setIsEditing(!isEditing)}>
              <Edit3 className="w-4 h-4 mr-1" />
              {isEditing ? 'Done Editing' : 'Edit'}
            </Button>
            <Button variant="outline" size="sm" onClick={handleCopy}>
              <Copy className="w-4 h-4 mr-1" />
              Copy
            </Button>
            <Button variant="outline" size="sm" onClick={handleShare}>
              <Share2 className="w-4 h-4 mr-1" />
              Share
            </Button>
            <Button size="sm" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
              <Download className="w-4 h-4 mr-1" />
              Export
            </Button>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Main Brief */}
            <div className="lg:col-span-3">
              <Card className="shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-2xl">Mobile App Redesign Discussion</CardTitle>
                      <CardDescription className="flex items-center gap-4 mt-2 text-base">
                        <div className="flex items-center gap-1">
                          <Slack className="w-4 h-4" />
                          <span>#design-team</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageSquare className="w-4 h-4" />
                          <span>23 messages</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>5 participants</span>
                        </div>
                        <span>2 hours ago</span>
                      </CardDescription>
                    </div>
                    <Badge variant="secondary" className="text-sm">
                      <Clock className="w-3 h-3 mr-1" />
                      3 min read
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-8">
                  {/* What Happened */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-lg">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      What Happened
                    </h3>
                    {isEditing ? (
                      <Textarea
                        value={editableContent.whatHappened}
                        onChange={(e) => setEditableContent(prev => ({ ...prev, whatHappened: e.target.value }))}
                        className="min-h-[120px] text-base leading-relaxed"
                      />
                    ) : (
                      <p className="text-gray-700 leading-relaxed text-base">
                        {editableContent.whatHappened}
                      </p>
                    )}
                  </div>
                  
                  {/* Why It Matters */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-lg">
                      <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                      Why It Matters
                    </h3>
                    {isEditing ? (
                      <Textarea
                        value={editableContent.whyItMatters}
                        onChange={(e) => setEditableContent(prev => ({ ...prev, whyItMatters: e.target.value }))}
                        className="min-h-[100px] text-base leading-relaxed"
                      />
                    ) : (
                      <p className="text-gray-700 leading-relaxed text-base">
                        {editableContent.whyItMatters}
                      </p>
                    )}
                  </div>
                  
                  {/* Next Steps */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-lg">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      Next Steps
                    </h3>
                    {isEditing ? (
                      <Textarea
                        value={editableContent.nextSteps}
                        onChange={(e) => setEditableContent(prev => ({ ...prev, nextSteps: e.target.value }))}
                        className="min-h-[120px] text-base leading-relaxed font-mono"
                      />
                    ) : (
                      <div className="text-gray-700 text-base leading-relaxed">
                        {editableContent.nextSteps.split('\n').map((step, idx) => (
                          <div key={idx} className="flex items-start gap-2 mb-2">
                            {step.startsWith('•') ? (
                              <>
                                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <span>{step.substring(1).trim()}</span>
                              </>
                            ) : (
                              <span>{step}</span>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Source Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Source Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Platform</span>
                    <div className="flex items-center gap-1">
                      <Slack className="w-4 h-4 text-purple-600" />
                      <span className="font-medium">Slack</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Channel</span>
                    <span className="font-medium">#design-team</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Messages</span>
                    <span className="font-medium">23</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Participants</span>
                    <span className="font-medium">5</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Time Range</span>
                    <span className="font-medium">2h 15m</span>
                  </div>
                </CardContent>
              </Card>

              {/* Key Participants */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Key Participants</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium text-blue-700">SA</span>
                    </div>
                    <div>
                      <div className="font-medium">Sarah Anderson</div>
                      <div className="text-sm text-gray-500">Lead Designer</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium text-green-700">MJ</span>
                    </div>
                    <div>
                      <div className="font-medium">Mike Johnson</div>
                      <div className="text-sm text-gray-500">Frontend Dev</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium text-purple-700">AL</span>
                    </div>
                    <div>
                      <div className="font-medium">Alex Liu</div>
                      <div className="text-sm text-gray-500">Product Manager</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <AlertCircle className="w-4 h-4 mr-2" />
                    Create Follow-up
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Users className="w-4 h-4 mr-2" />
                    Share with Team
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <ArrowRight className="w-4 h-4 mr-2" />
                    Add to Project
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryDisplay;
