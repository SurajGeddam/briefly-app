
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slack, FileText, Github, ArrowLeft, Check, Loader2 } from "lucide-react";

interface AuthFlowProps {
  onConnect: (service: string) => void;
  onBack: () => void;
}

const AuthFlow = ({ onConnect, onBack }: AuthFlowProps) => {
  const [connecting, setConnecting] = useState<string | null>(null);
  const [connected, setConnected] = useState<string[]>([]);

  const handleConnect = async (service: string) => {
    setConnecting(service);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setConnecting(null);
    setConnected(prev => [...prev, service]);
    onConnect(service);
  };

  const services = [
    {
      id: 'slack',
      name: 'Slack',
      description: 'Connect your Slack workspace to summarize team discussions',
      icon: Slack,
      color: 'purple',
      popular: true
    },
    {
      id: 'notion',
      name: 'Notion',
      description: 'Import and summarize your project documentation',
      icon: FileText,
      color: 'gray',
      popular: false
    },
    {
      id: 'github',
      name: 'GitHub',
      description: 'Track development progress and technical discussions',
      icon: Github,
      color: 'orange',
      popular: false
    }
  ];

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
              <FileText className="w-3 h-3 text-white" />
            </div>
            <span className="text-lg font-semibold text-gray-900">Briefly</span>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Connect Your Tools</h1>
          <p className="text-gray-600 text-lg">
            Choose where you'd like to start creating briefs. You can add more connections later.
          </p>
        </div>

        <div className="max-w-2xl mx-auto space-y-4">
          {services.map((service) => {
            const isConnected = connected.includes(service.id);
            const isConnecting = connecting === service.id;
            const IconComponent = service.icon;

            return (
              <Card 
                key={service.id} 
                className={`border-2 transition-all cursor-pointer ${
                  isConnected 
                    ? 'border-green-200 bg-green-50' 
                    : 'hover:border-blue-200 hover:shadow-md'
                }`}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        service.color === 'purple' ? 'bg-purple-100' :
                        service.color === 'gray' ? 'bg-gray-100' :
                        'bg-orange-100'
                      }`}>
                        <IconComponent className={`w-6 h-6 ${
                          service.color === 'purple' ? 'text-purple-600' :
                          service.color === 'gray' ? 'text-gray-600' :
                          'text-orange-600'
                        }`} />
                      </div>
                      <div className="text-left">
                        <div className="flex items-center gap-2">
                          <CardTitle className="text-lg">{service.name}</CardTitle>
                          {service.popular && (
                            <Badge variant="secondary" className="text-xs">
                              Most Popular
                            </Badge>
                          )}
                        </div>
                        <CardDescription className="text-sm">
                          {service.description}
                        </CardDescription>
                      </div>
                    </div>
                    
                    {isConnected ? (
                      <div className="flex items-center gap-2 text-green-600">
                        <Check className="w-5 h-5" />
                        <span className="text-sm font-medium">Connected</span>
                      </div>
                    ) : (
                      <Button
                        onClick={() => handleConnect(service.id)}
                        disabled={isConnecting}
                        variant={service.popular ? "default" : "outline"}
                        className={service.popular ? "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700" : ""}
                      >
                        {isConnecting ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Connecting...
                          </>
                        ) : (
                          'Connect'
                        )}
                      </Button>
                    )}
                  </div>
                </CardHeader>
              </Card>
            );
          })}
        </div>

        {connected.length > 0 && (
          <div className="max-w-2xl mx-auto mt-8 text-center">
            <p className="text-gray-600 mb-4">
              Great! You've connected {connected.length} service{connected.length > 1 ? 's' : ''}.
            </p>
            <Button 
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            >
              Continue to Dashboard
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthFlow;
