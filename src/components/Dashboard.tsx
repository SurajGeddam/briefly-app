
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Slack, FileText, Github, Plus, Clock, Share2, Search, Filter, ArrowRight, Users, MessageSquare } from "lucide-react";

interface DashboardProps {
  onCreateBrief: () => void;
  connectedServices: string[];
}

const Dashboard = ({ onCreateBrief, connectedServices }: DashboardProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const recentBriefs = [
    {
      id: 1,
      title: "Mobile App Redesign Discussion",
      source: "slack",
      channel: "#design-team",
      messages: 23,
      timeAgo: "2 hours ago",
      readTime: "2 min",
      type: "thread"
    },
    {
      id: 2,
      title: "Q4 Marketing Strategy Document",
      source: "notion",
      workspace: "Marketing Team",
      pages: 8,
      timeAgo: "1 day ago",
      readTime: "4 min",
      type: "document"
    },
    {
      id: 3,
      title: "Authentication System Updates",
      source: "github",
      repo: "briefly-app",
      commits: 12,
      timeAgo: "3 days ago",
      readTime: "3 min",
      type: "activity"
    }
  ];

  const availableSources = [
    {
      id: 'slack-recent',
      service: 'slack',
      title: 'Recent Slack Discussions',
      items: [
        { name: '#product-updates', messages: 45, active: true },
        { name: '#engineering', messages: 23, active: true },
        { name: '#design-team', messages: 18, active: false },
      ]
    },
    {
      id: 'notion-recent',
      service: 'notion',
      title: 'Recent Notion Updates',
      items: [
        { name: 'Product Roadmap 2024', pages: 12, active: true },
        { name: 'User Research Findings', pages: 8, active: false },
        { name: 'Technical Architecture', pages: 15, active: true },
      ]
    }
  ];

  const getServiceIcon = (service: string) => {
    switch (service) {
      case 'slack': return <Slack className="w-4 h-4 text-purple-600" />;
      case 'notion': return <FileText className="w-4 h-4 text-gray-600" />;
      case 'github': return <Github className="w-4 h-4 text-orange-600" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <FileText className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-semibold text-gray-900">Briefly</span>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search briefs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button 
                onClick={onCreateBrief}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Brief
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Actions */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Create New Brief</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {availableSources.map((source) => (
                  <Card 
                    key={source.id} 
                    className="border-2 hover:border-blue-200 transition-colors cursor-pointer group"
                    onClick={onCreateBrief}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {getServiceIcon(source.service)}
                          <CardTitle className="text-lg">{source.title}</CardTitle>
                        </div>
                        <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-2">
                        {source.items.slice(0, 2).map((item, idx) => (
                          <div key={idx} className="flex items-center justify-between text-sm">
                            <span className="text-gray-700">{item.name}</span>
                            <div className="flex items-center gap-1 text-gray-500">
                              {source.service === 'slack' ? (
                                <>
                                  <MessageSquare className="w-3 h-3" />
                                  <span>{item.messages}</span>
                                </>
                              ) : (
                                <>
                                  <FileText className="w-3 h-3" />
                                  <span>{item.pages} pages</span>
                                </>
                              )}
                              {item.active && (
                                <div className="w-2 h-2 bg-green-500 rounded-full ml-1"></div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Recent Briefs */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Recent Briefs</h2>
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-1" />
                  Filter
                </Button>
              </div>
              
              <div className="space-y-4">
                {recentBriefs.map((brief) => (
                  <Card key={brief.id} className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg mb-2">{brief.title}</CardTitle>
                          <CardDescription className="flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-1">
                              {getServiceIcon(brief.source)}
                              <span>
                                {brief.source === 'slack' && `${brief.channel} • ${brief.messages} messages`}
                                {brief.source === 'notion' && `${brief.workspace} • ${brief.pages} pages`}
                                {brief.source === 'github' && `${brief.repo} • ${brief.commits} commits`}
                              </span>
                            </div>
                            <span>{brief.timeAgo}</span>
                          </CardDescription>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary">
                            <Clock className="w-3 h-3 mr-1" />
                            {brief.readTime}
                          </Badge>
                          <Button variant="ghost" size="sm">
                            <Share2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Connected Services */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Connected Services</CardTitle>
                <CardDescription>
                  Manage your integrations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {connectedServices.map((service) => (
                  <div key={service} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getServiceIcon(service)}
                      <span className="capitalize font-medium">{service}</span>
                    </div>
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                ))}
                <Button variant="outline" size="sm" className="w-full mt-4">
                  <Plus className="w-4 h-4 mr-1" />
                  Add Service
                </Button>
              </CardContent>
            </Card>

            {/* Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">This Week</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Briefs Created</span>
                  <span className="font-semibold">12</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Time Saved</span>
                  <span className="font-semibold">3.2 hours</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Briefs Shared</span>
                  <span className="font-semibold">8</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
