import { MapPin, AlertTriangle, Info, Phone, ChevronRight, Flame, Droplets, Wind, Heart, Mountain, Sun, Snowflake, Package, Users, Shield, Bell, Brain, Book, Zap, TrendingUp, Star, Target } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

interface HomeTabProps {
  onNavigateToModule: (moduleId: string) => void;
  onNavigateToTab?: (tabId: string) => void;
}

export function HomeTab({ onNavigateToModule, onNavigateToTab }: HomeTabProps) {
  const currentAlert = {
    title: "Heavy Rainfall Alert",
    location: "Gurgaon, Haryana",
    severity: "yellow",
    time: "2 hours ago",
    description: "Moderate to heavy rainfall expected in the next 24 hours"
  };

  const tips = [
    "Keep emergency supplies kit ready with water, food, and first aid",
    "Know your evacuation routes and have a family emergency plan",
    "Stay informed through official weather alerts and emergency services"
  ];

  const quickGuides = [
    { id: 'earthquake', title: 'Earthquake', icon: AlertTriangle, color: 'bg-red-500', image: 'https://images.unsplash.com/photo-1708681097926-2505401227e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlYXJ0aHF1YWtlJTIwZGlzYXN0ZXJ8ZW58MXx8fHwxNzU3ODM1MDM2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' },
    { id: 'flood', title: 'Flood', icon: Droplets, color: 'bg-blue-500', image: 'https://images.unsplash.com/photo-1657069343871-fd1476990d04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmbG9vZCUyMGRpc2FzdGVyfGVufDF8fHx8MTc1NzgzNTAzN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' },
    { id: 'fire', title: 'Fire Safety', icon: Flame, color: 'bg-orange-500', image: 'https://images.unsplash.com/photo-1639369488374-561b5486177d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXJlJTIwZGlzYXN0ZXJ8ZW58MXx8fHwxNzU3ODM1MDM3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' },
    { id: 'cyclone', title: 'Cyclone', icon: Wind, color: 'bg-gray-600', image: 'https://images.unsplash.com/photo-1641933002369-1122e78d0b47?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWNsb25lJTIwaHVycmljYW5lfGVufDF8fHx8MTc1NzgzNTAzN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' },
    { id: 'pandemic', title: 'Pandemic', icon: Heart, color: 'bg-purple-500', image: 'https://images.unsplash.com/photo-1604161547272-167c2fd11c7a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYW5kZW1pYyUyMGNvdmlkJTIwbWFza3xlbnwxfHx8fDE3NTc4MzUwMzh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' },
    { id: 'landslide', title: 'Landslide', icon: Mountain, color: 'bg-amber-600', image: 'https://images.unsplash.com/photo-1728723320952-56e1090e4e4c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHx8bGFuZHNsaWRlJTIwbW91bnRhaW58ZW58MXx8fHwxNzU3ODM1MDM4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'green': return 'bg-green-500';
      case 'yellow': return 'bg-yellow-500';
      case 'red': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="pt-12 pb-2">
        <h1 className="text-3xl font-semibold text-white mb-2">Alertify</h1>
        <div className="flex items-center text-white/70">
          <MapPin className="w-4 h-4 mr-1" />
          <span className="text-sm">Mumbai, Maharashtra</span>
        </div>
      </div>

      {/* Live Alert */}
      <Card className="p-4 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-yellow-400/30 shadow-xl backdrop-blur-lg">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${getSeverityColor(currentAlert.severity)}`} />
            <Badge variant="secondary" className="bg-yellow-400/20 text-yellow-300 border-yellow-400/30">
              LIVE ALERT
            </Badge>
          </div>
          <span className="text-xs text-white/60">{currentAlert.time}</span>
        </div>
        
        <h3 className="font-semibold text-white mb-1">{currentAlert.title}</h3>
        <p className="text-sm text-white/80 mb-2">{currentAlert.description}</p>
        
        <div className="flex items-center text-sm text-white/70">
          <MapPin className="w-4 h-4 mr-1" />
          {currentAlert.location}
        </div>
      </Card>

      {/* Quick Actions Hub */}
      <Card className="p-6 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-cyan-400/30 shadow-xl backdrop-blur-lg">
        <div className="flex items-center mb-4">
          <Zap className="w-6 h-6 text-cyan-400 mr-2" />
          <h3 className="font-semibold text-white">Quick Actions</h3>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <Button 
            onClick={() => onNavigateToTab?.('kit')}
            className="h-16 bg-gradient-to-r from-emerald-500/30 to-green-500/30 border border-emerald-400/40 hover:from-emerald-500/40 hover:to-green-500/40 text-white flex flex-col items-center justify-center"
            variant="outline"
          >
            <Package className="w-6 h-6 mb-1" />
            <span className="text-sm">Emergency Kit</span>
          </Button>
          
          <Button 
            onClick={() => onNavigateToTab?.('family')}
            className="h-16 bg-gradient-to-r from-purple-500/30 to-pink-500/30 border border-purple-400/40 hover:from-purple-500/40 hover:to-pink-500/40 text-white flex flex-col items-center justify-center"
            variant="outline"
          >
            <Shield className="w-6 h-6 mb-1" />
            <span className="text-sm">Family Safety</span>
          </Button>
          
          <Button 
            onClick={() => onNavigateToTab?.('alerts')}
            className="h-16 bg-gradient-to-r from-orange-500/30 to-red-500/30 border border-orange-400/40 hover:from-orange-500/40 hover:to-red-500/40 text-white flex flex-col items-center justify-center"
            variant="outline"
          >
            <Bell className="w-6 h-6 mb-1" />
            <span className="text-sm">Live Alerts</span>
          </Button>
          
          <Button 
            onClick={() => onNavigateToTab?.('community')}
            className="h-16 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 border border-blue-400/40 hover:from-blue-500/40 hover:to-cyan-500/40 text-white flex flex-col items-center justify-center"
            variant="outline"
          >
            <Users className="w-6 h-6 mb-1" />
            <span className="text-sm">Community</span>
          </Button>
        </div>
        
        {/* Additional Features Row */}
        <div className="grid grid-cols-2 gap-3 mt-3">
          <Button 
            onClick={() => onNavigateToTab?.('risk')}
            className="h-14 bg-gradient-to-r from-pink-500/30 to-rose-500/30 border border-pink-400/40 hover:from-pink-500/40 hover:to-rose-500/40 text-white flex flex-col items-center justify-center"
            variant="outline"
          >
            <Brain className="w-5 h-5 mb-1" />
            <span className="text-xs">AI Risk</span>
          </Button>
          
          <Button 
            onClick={() => onNavigateToTab?.('drills')}
            className="h-14 bg-gradient-to-r from-amber-500/30 to-orange-500/30 border border-amber-400/40 hover:from-amber-500/40 hover:to-orange-500/40 text-white flex flex-col items-center justify-center"
            variant="outline"
          >
            <Target className="w-5 h-5 mb-1" />
            <span className="text-xs">Drills</span>
          </Button>
        </div>
        
        {/* Learning Features Row */}
        <div className="grid grid-cols-2 gap-3 mt-3">
          <Button 
            onClick={() => onNavigateToTab?.('modules')}
            className="h-14 bg-gradient-to-r from-indigo-500/30 to-blue-500/30 border border-indigo-400/40 hover:from-indigo-500/40 hover:to-blue-500/40 text-white flex flex-col items-center justify-center"
            variant="outline"
          >
            <Book className="w-5 h-5 mb-1" />
            <span className="text-xs">Learn</span>
          </Button>
          
          <Button 
            onClick={() => onNavigateToTab?.('quiz')}
            className="h-14 bg-gradient-to-r from-violet-500/30 to-purple-500/30 border border-violet-400/40 hover:from-violet-500/40 hover:to-purple-500/40 text-white flex flex-col items-center justify-center"
            variant="outline"
          >
            <TrendingUp className="w-5 h-5 mb-1" />
            <span className="text-xs">Quiz</span>
          </Button>
        </div>
      </Card>

      {/* Map Preview */}
      <Card className="p-4 bg-white/10 backdrop-blur-lg border-white/20 shadow-xl">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-white">Affected Areas</h3>
          <ChevronRight className="w-5 h-5 text-white/60" />
        </div>
        <div className="h-32 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-lg flex items-center justify-center border border-cyan-400/20">
          <div className="text-center">
            <MapPin className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
            <p className="text-sm text-white/70">Interactive map coming soon</p>
          </div>
        </div>
      </Card>

      {/* Tips of the Day */}
      <Card className="p-4 bg-white/10 backdrop-blur-lg border-white/20 shadow-xl">
        <div className="flex items-center mb-3">
          <Info className="w-5 h-5 text-cyan-400 mr-2" />
          <h3 className="font-semibold text-white">Tips of the Day</h3>
        </div>
        <div className="space-y-3">
          {tips.map((tip, index) => (
            <div key={index} className="p-3 bg-cyan-500/10 rounded-lg border-l-4 border-cyan-400">
              <p className="text-sm text-white/90">{tip}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Quick Guides */}
      <div>
        <h3 className="font-semibold text-white mb-4">Quick Guides</h3>
        <div className="grid grid-cols-2 gap-3">
          {quickGuides.map((guide) => {
            const Icon = guide.icon;
            return (
              <Card 
                key={guide.id} 
                className="p-4 bg-white/10 backdrop-blur-lg border-white/20 shadow-xl hover:shadow-2xl hover:bg-white/15 transition-all duration-300 cursor-pointer transform hover:scale-105"
                onClick={() => onNavigateToModule(guide.id)}
              >
                <div className="relative h-24 mb-3 rounded-lg overflow-hidden">
                  <ImageWithFallback
                    src={guide.image}
                    alt={guide.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className={`p-2 rounded-full ${guide.color} bg-opacity-90`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>
                <h4 className="font-medium text-white text-center">{guide.title}</h4>
                <div className="flex items-center justify-center mt-2">
                  <ChevronRight className="w-4 h-4 text-white/60" />
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Bottom Action Cards */}
      <div className="grid grid-cols-2 gap-4">
        <Card 
          className="p-4 bg-gradient-to-r from-red-500/20 to-pink-500/20 border-red-400/30 shadow-xl backdrop-blur-lg cursor-pointer hover:shadow-2xl transition-all"
          onClick={() => onNavigateToTab?.('emergency')}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="p-2 bg-red-500 rounded-full mr-3">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Emergency</h3>
                <p className="text-sm text-white/80">Instant help</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-white/60" />
          </div>
        </Card>
        
        <Card 
          className="p-4 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-cyan-400/30 shadow-xl backdrop-blur-lg cursor-pointer hover:shadow-2xl transition-all"
          onClick={() => onNavigateToTab?.('profile')}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="p-2 bg-cyan-500 rounded-full mr-3">
                <Star className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Profile</h3>
                <p className="text-sm text-white/80">Track progress</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-white/60" />
          </div>
        </Card>
      </div>
    </div>
  );
}