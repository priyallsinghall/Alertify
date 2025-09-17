import { Phone, Search, MapPin, Clock, AlertTriangle } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';

export function EmergencyTab() {
  const emergencyContacts = [
    {
      service: 'National Disaster Response Force',
      number: '1078',
      description: 'Natural disaster emergency response',
      category: 'disaster',
      available: '24/7'
    },
    {
      service: 'Police Emergency',
      number: '100',
      description: 'Law enforcement emergency services',
      category: 'police',
      available: '24/7'
    },
    {
      service: 'Fire Emergency',
      number: '101',
      description: 'Fire and rescue services',
      category: 'fire',
      available: '24/7'
    },
    {
      service: 'Medical Emergency',
      number: '102',
      description: 'Ambulance and medical emergency',
      category: 'medical',
      available: '24/7'
    },
    {
      service: 'Disaster Helpline',
      number: '108',
      description: 'Emergency response and disaster management',
      category: 'disaster',
      available: '24/7'
    },
    {
      service: 'Women Helpline',
      number: '1091',
      description: 'Women in distress emergency helpline',
      category: 'support',
      available: '24/7'
    },
    {
      service: 'Child Helpline',
      number: '1098',
      description: 'Child emergency and support services',
      category: 'support',
      available: '24/7'
    },
    {
      service: 'Tourist Emergency',
      number: '1363',
      description: 'Tourist assistance and emergency help',
      category: 'support',
      available: '24/7'
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'disaster': return 'bg-red-400/20 text-red-300 border-red-400/30';
      case 'police': return 'bg-blue-400/20 text-blue-300 border-blue-400/30';
      case 'fire': return 'bg-orange-400/20 text-orange-300 border-orange-400/30';
      case 'medical': return 'bg-emerald-400/20 text-emerald-300 border-emerald-400/30';
      case 'support': return 'bg-purple-400/20 text-purple-300 border-purple-400/30';
      default: return 'bg-white/20 text-white/80 border-white/30';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'disaster': return AlertTriangle;
      case 'police': case 'fire': case 'medical': case 'support': return Phone;
      default: return Phone;
    }
  };

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="pt-12 pb-2">
        <h1 className="text-3xl font-semibold text-white mb-2">Emergency</h1>
        <p className="text-white/70">Quick access to emergency services</p>
      </div>

      {/* Emergency Call Button */}
      <Card className="p-6 bg-gradient-to-r from-red-500 to-red-600 border-red-400 shadow-2xl backdrop-blur-lg">
        <div className="text-center text-white">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Phone className="w-8 h-8 text-white fill-current" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Emergency Call</h2>
          <p className="text-red-100 mb-4">Tap to call emergency services immediately</p>
          <button className="w-full py-3 px-6 bg-white text-red-600 rounded-xl font-semibold hover:bg-red-50 transition-colors shadow-lg">
            Call 112 - Universal Emergency
          </button>
        </div>
      </Card>

      {/* Location Status */}
      <Card className="p-4 bg-cyan-500/20 border-cyan-400/30 shadow-xl backdrop-blur-lg">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-cyan-500 rounded-full">
            <MapPin className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-white">Current Location</h3>
            <p className="text-sm text-white/80">Mumbai, Maharashtra • Location sharing enabled</p>
          </div>
          <Badge variant="secondary" className="bg-emerald-400/20 text-emerald-300 border-emerald-400/30">
            Active
          </Badge>
        </div>
      </Card>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
        <Input
          placeholder="Search emergency services by state or city"
          className="pl-10 py-3 bg-white/10 backdrop-blur-lg border-white/20 rounded-xl text-white placeholder:text-white/60"
        />
      </div>

      {/* Emergency Contacts */}
      <div>
        <h3 className="font-semibold text-white mb-4">Emergency Contacts</h3>
        <div className="space-y-3">
          {emergencyContacts.map((contact, index) => {
            const CategoryIcon = getCategoryIcon(contact.category);
            return (
              <Card key={index} className="p-4 bg-white/10 backdrop-blur-lg border-white/20 shadow-xl hover:bg-white/15 hover:shadow-2xl transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 flex-1">
                    <div className="p-2 bg-white/10 rounded-full">
                      <CategoryIcon className="w-5 h-5 text-white/80" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-semibold text-white">{contact.service}</h4>
                        <Badge variant="secondary" className="bg-white/10 text-white/80 border-white/20">
                          {contact.category}
                        </Badge>
                      </div>
                      <p className="text-sm text-white/80 mb-1">{contact.description}</p>
                      <div className="flex items-center text-xs text-white/60">
                        <Clock className="w-3 h-3 mr-1" />
                        {contact.available}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="text-right">
                      <div className="text-2xl font-bold text-cyan-400">{contact.number}</div>
                    </div>
                    <button className="p-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 shadow-lg">
                      <Phone className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Additional Info */}
      <Card className="p-4 bg-yellow-500/20 border-yellow-400/30 shadow-xl backdrop-blur-lg">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5" />
          <div>
            <h3 className="font-semibold text-white mb-1">Important Notes</h3>
            <ul className="text-sm text-white/80 space-y-1">
              <li>• All emergency numbers are toll-free and available 24/7</li>
              <li>• Provide clear location details when calling</li>
              <li>• Stay calm and speak clearly</li>
              <li>• Keep your phone charged during emergencies</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}