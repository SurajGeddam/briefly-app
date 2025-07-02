
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slack, FileText, Github, Plus, Clock, Share2, ExternalLink } from "lucide-react";
import AuthFlow from "@/components/AuthFlow";
import SummaryDisplay from "@/components/SummaryDisplay";
import Dashboard from "@/components/Dashboard";

const Index = () => {
  const [currentView, setCurrentView] = useState<'landing' | 'auth' | 'dashboard' | 'summary'>('landing');
  const [connectedServices, setConnectedServices] = useState<string[]>([]);

  const handleConnect = (service: string) => {
    setConnectedServices(prev => [...prev, service]);
    if (connectedServices.length === 0) {
      setCurrentView('dashboard');
    }
  };

  if (currentView === 'auth') {
    return <AuthFlow onConnect={handleConnect} onBack={() => setCurrentView('landing')} />;
  }

  if (currentView === 'dashboard') {
    return <Dashboard onCreateBrief={() => setCurrentView('summary')} connectedServices={connectedServices} />;
  }

  if (currentView === 'summary') {
    return <SummaryDisplay onBack={() => setCurrentView('dashboard')} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <FileText className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-semibold text-gray-900">Briefly</span>
          </div>
          <Button variant="outline" size="sm">
            Sign In
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-3xl mx-auto">
          <Badge variant="secondary" className="mb-4">
            Beta • Perfect for Remote Teams
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Turn team chaos into{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              clear briefs
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Automatically summarize Slack threads, Notion docs, and GitHub activity 
            into client-ready project briefs. What happened, why it matters, next steps.
          </p>
          <Button 
            size="lg" 
            onClick={() => setCurrentView('auth')}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-6 text-lg font-medium"
          >
            Get Started - It's Free
            <ExternalLink className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* Integration Preview */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Connect Your Tools</h2>
          <p className="text-gray-600 text-lg">Start with what you already use</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Card className="border-2 hover:border-blue-200 transition-colors cursor-pointer group">
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 transition-colors">
                <Slack className="w-6 h-6 text-purple-600" />
              </div>
              <CardTitle className="text-lg">Slack Threads</CardTitle>
              <CardDescription>
                Turn lengthy discussions into structured summaries
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 hover:border-blue-200 transition-colors cursor-pointer group">
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-gray-200 transition-colors">
                <FileText className="w-6 h-6 text-gray-600" />
              </div>
              <CardTitle className="text-lg">Notion Docs</CardTitle>
              <CardDescription>
                Extract key insights from project documentation
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 hover:border-blue-200 transition-colors cursor-pointer group">
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-200 transition-colors">
                <Github className="w-6 h-6 text-orange-600" />
              </div>
              <CardTitle className="text-lg">GitHub Activity</CardTitle>
              <CardDescription>
                Summarize commits, issues, and pull requests
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Sample Brief Preview */}
      <section className="container mx-auto px-4 py-16 bg-white/50">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">See It In Action</h2>
          <p className="text-gray-600 text-lg">Sample brief generated from a Slack thread</p>
        </div>
        
        <Card className="max-w-4xl mx-auto shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl">Mobile App Redesign Discussion</CardTitle>
                <CardDescription className="flex items-center gap-2 mt-2">
                  <Slack className="w-4 h-4" />
                  #design-team • 23 messages • 2 hours ago
                </CardDescription>
              </div>
              <Badge variant="secondary">
                <Clock className="w-3 h-3 mr-1" />
                2 min read
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                What Happened
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Design team reviewed user feedback on the current mobile app. Key issues: navigation confusion (mentioned by 67% of users), slow loading times on older devices, and accessibility concerns for the checkout flow.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                Why It Matters
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Mobile conversion rate dropped 15% last quarter. Fixing these UX issues could recover lost revenue and improve user retention. The checkout accessibility issue may also have compliance implications.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Next Steps
              </h3>
              <ul className="text-gray-700 space-y-1">
                <li>• Sarah will create wireframes for simplified navigation (due Friday)</li>
                <li>• Dev team to audit performance on Android 8+ devices</li>
                <li>• Schedule accessibility review with external consultant</li>
                <li>• Present findings to stakeholders next Tuesday</li>
              </ul>
            </div>
            
            <div className="pt-4 border-t flex justify-between items-center">
              <div className="text-sm text-gray-500">
                Generated from 23 messages • Saved to Marketing briefs
              </div>
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-1" />
                Share Brief
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to turn your team discussions into action?
          </h2>
          <p className="text-gray-600 text-lg mb-8">
            Get your first brief in under 2 minutes. No credit card required.
          </p>
          <Button 
            size="lg" 
            onClick={() => setCurrentView('auth')}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-6 text-lg font-medium"
          >
            Start Creating Briefs
            <Plus className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
