import { useState, useEffect } from 'react';
import { Users, MapPin, Phone, MessageCircle, Shield, Heart, Clock, AlertTriangle, Navigation, CheckCircle, UserPlus, Map, Bell } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Avatar } from './ui/avatar';
import { Progress } from './ui/progress';
import { toast } from 'sonner@2.0.3';

interface FamilyMember {
  id: string;
  name: string;
  relation: string;
  phone: string;
  email: string;
  lastKnownLocation: {
    lat: number;
    lng: number;
    address: string;
    timestamp: string;
  };
  status: 'safe' | 'danger' | 'unknown' | 'offline';
  emergencyContacts: string[];
  medicalInfo: {
    bloodType?: string;
    allergies: string[];
    medications: string[];
    emergencyConditions: string[];
  };
  avatar: string;
  isConnected: boolean;
}

interface EmergencyPlan {
  id: string;
  name: string;
  type: 'evacuation' | 'shelter' | 'communication' | 'medical';
  steps: string[];
  meetingPoints: Array<{
    name: string;
    address: string;
    lat: number;
    lng: number;
    type: 'primary' | 'secondary' | 'backup';
  }>;
  lastUpdated: string;
  isActive: boolean;
}

export function FamilySafetyTab() {
  const [activeView, setActiveView] = useState<'family' | 'plans' | 'communication' | 'location'>('family');
  const [showAddMember, setShowAddMember] = useState(false);

  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([
    {
      id: '1',
      name: 'Saksham Srivastava',
      relation: 'self',
      phone: '+91-9876543210',
      email: 'saksham@example.com',
      lastKnownLocation: {
        lat: 28.4595,
        lng: 77.0266,
        address: 'Gurgaon, Haryana, India',
        timestamp: new Date().toISOString()
      },
      status: 'safe',
      emergencyContacts: ['2', '3'],
      medicalInfo: {
        bloodType: 'O+',
        allergies: ['Peanuts'],
        medications: [],
        emergencyConditions: []
      },
      avatar: 'SS',
      isConnected: true
    },
    {
      id: '2',
      name: 'Priya Srivastava',
      relation: 'spouse',
      phone: '+91-9876543211',
      email: 'priya@example.com',
      lastKnownLocation: {
        lat: 28.4595,
        lng: 77.0266,
        address: 'Gurgaon, Haryana, India',
        timestamp: new Date(Date.now() - 1800000).toISOString() // 30 minutes ago
      },
      status: 'safe',
      emergencyContacts: ['1', '3'],
      medicalInfo: {
        bloodType: 'A+',
        allergies: [],
        medications: ['Thyroid medication'],
        emergencyConditions: []
      },
      avatar: 'PS',
      isConnected: true
    },
    {
      id: '3',
      name: 'Arjun Srivastava',
      relation: 'child',
      phone: '+91-9876543212',
      email: 'arjun@example.com',
      lastKnownLocation: {
        lat: 28.4595,
        lng: 77.0266,
        address: 'Delhi Public School, Gurgaon',
        timestamp: new Date(Date.now() - 3600000).toISOString() // 1 hour ago
      },
      status: 'unknown',
      emergencyContacts: ['1', '2'],
      medicalInfo: {
        bloodType: 'O+',
        allergies: ['Dairy'],
        medications: [],
        emergencyConditions: ['Asthma']
      },
      avatar: 'AS',
      isConnected: false
    },
    {
      id: '4',
      name: 'Rajesh Srivastava',
      relation: 'parent',
      phone: '+91-9876543213',
      email: 'rajesh@example.com',
      lastKnownLocation: {
        lat: 28.4595,
        lng: 77.0266,
        address: 'Sector 14, Gurgaon',
        timestamp: new Date(Date.now() - 7200000).toISOString() // 2 hours ago
      },
      status: 'safe',
      emergencyContacts: ['1', '2'],
      medicalInfo: {
        bloodType: 'B+',
        allergies: [],
        medications: ['Blood pressure medication', 'Diabetes medication'],
        emergencyConditions: ['Diabetes', 'Hypertension']
      },
      avatar: 'RS',
      isConnected: true
    }
  ]);

  const [emergencyPlans, setEmergencyPlans] = useState<EmergencyPlan[]>([
    {
      id: '1',
      name: 'Home Evacuation Plan',
      type: 'evacuation',
      steps: [
        'Alert all family members immediately',
        'Grab emergency bags (Go-Bags)',
        'Check on elderly/disabled family members',
        'Meet at primary evacuation point',
        'Contact emergency services if needed',
        'Head to secondary location if primary is unsafe'
      ],
      meetingPoints: [
        {
          name: 'Neighborhood Park',
          address: 'Sector 14 Park, Gurgaon',
          lat: 28.4595,
          lng: 77.0266,
          type: 'primary'
        },
        {
          name: 'Community Center',
          address: 'Gurgaon Community Center',
          lat: 28.4500,
          lng: 77.0300,
          type: 'secondary'
        }
      ],
      lastUpdated: '2025-01-10',
      isActive: false
    },
    {
      id: '2',
      name: 'Earthquake Response Plan',
      type: 'shelter',
      steps: [
        'Drop, Cover, and Hold On immediately',
        'Stay where you are until shaking stops',
        'Check for injuries and hazards',
        'Turn off gas, water, and electricity if safe',
        'Evacuate if building is damaged',
        'Meet at designated safe zone'
      ],
      meetingPoints: [
        {
          name: 'Open Field - Sector 15',
          address: 'Sector 15 Open Ground, Gurgaon',
          lat: 28.4600,
          lng: 77.0250,
          type: 'primary'
        }
      ],
      lastUpdated: '2025-01-05',
      isActive: false
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'safe': return 'text-emerald-400 bg-emerald-400/20 border-emerald-400/30';
      case 'danger': return 'text-red-400 bg-red-400/20 border-red-400/30';
      case 'unknown': return 'text-yellow-400 bg-yellow-400/20 border-yellow-400/30';
      case 'offline': return 'text-gray-400 bg-gray-400/20 border-gray-400/30';
      default: return 'text-gray-400 bg-gray-400/20 border-gray-400/30';
    }
  };

  const getTimeAgo = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - time.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const sendEmergencyAlert = () => {
    toast.success('🚨 Emergency alert sent to all family members!');
    // In real app, this would trigger push notifications and SMS
  };

  const checkIn = (memberId: string) => {
    setFamilyMembers(prev => prev.map(member =>
      member.id === memberId
        ? {
            ...member,
            status: 'safe',
            lastKnownLocation: {
              ...member.lastKnownLocation,
              timestamp: new Date().toISOString()
            }
          }
        : member
    ));
    toast.success('✅ Check-in successful!');
  };

  const safeCount = familyMembers.filter(m => m.status === 'safe').length;
  const totalMembers = familyMembers.length;

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="pt-12 pb-2">
        <h1 className="text-3xl font-semibold text-white mb-2">Family Safety</h1>
        <p className="text-white/70">Keep your loved ones safe and connected</p>
      </div>

      {/* Safety Status Overview */}
      <Card className="p-6 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border-emerald-400/30 shadow-xl backdrop-blur-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Shield className="w-6 h-6 text-emerald-400 mr-2" />
            <h3 className="font-semibold text-white">Family Status</h3>
          </div>
          <Badge variant="secondary" className="bg-emerald-400/20 text-emerald-300 border-emerald-400/30">
            {safeCount}/{totalMembers} Safe
          </Badge>
        </div>
        
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center p-3 bg-white/10 rounded-lg">
            <div className="text-2xl font-bold text-emerald-400">{safeCount}</div>
            <p className="text-xs text-white/70">Safe</p>
          </div>
          <div className="text-center p-3 bg-white/10 rounded-lg">
            <div className="text-2xl font-bold text-yellow-400">
              {familyMembers.filter(m => m.status === 'unknown').length}
            </div>
            <p className="text-xs text-white/70">Unknown</p>
          </div>
          <div className="text-center p-3 bg-white/10 rounded-lg">
            <div className="text-2xl font-bold text-cyan-400">
              {familyMembers.filter(m => m.isConnected).length}
            </div>
            <p className="text-xs text-white/70">Connected</p>
          </div>
        </div>

        <Button 
          onClick={sendEmergencyAlert}
          className="w-full bg-red-500 hover:bg-red-600 text-white"
        >
          <AlertTriangle className="w-4 h-4 mr-2" />
          Send Emergency Alert to All
        </Button>
      </Card>

      {/* Navigation Tabs */}
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {[
          { id: 'family', label: 'Family', icon: Users },
          { id: 'plans', label: 'Emergency Plans', icon: Map },
          { id: 'communication', label: 'Communication', icon: MessageCircle },
          { id: 'location', label: 'Locations', icon: MapPin }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveView(tab.id as any)}
              className={`flex items-center px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                activeView === tab.id
                  ? 'bg-cyan-400/30 text-cyan-300 border border-cyan-400/40'
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              <Icon className="w-4 h-4 mr-2" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Family Members View */}
      {activeView === 'family' && (
        <div className="space-y-4">
          {familyMembers.map((member) => (
            <Card key={member.id} className="p-4 bg-white/10 backdrop-blur-lg border-white/20 shadow-xl">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold">{member.avatar}</span>
                    </div>
                    {member.isConnected && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">{member.name}</h4>
                    <p className="text-sm text-white/70 capitalize">{member.relation}</p>
                  </div>
                </div>
                
                <Badge className={`${getStatusColor(member.status)} font-medium`}>
                  {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-3">
                <div>
                  <p className="text-xs text-white/60">Last Location</p>
                  <p className="text-sm text-white">{member.lastKnownLocation.address}</p>
                  <p className="text-xs text-white/50">{getTimeAgo(member.lastKnownLocation.timestamp)}</p>
                </div>
                <div>
                  <p className="text-xs text-white/60">Contact</p>
                  <p className="text-sm text-white">{member.phone}</p>
                  <p className="text-xs text-white/50">{member.email}</p>
                </div>
              </div>

              {/* Medical Info */}
              {member.medicalInfo.bloodType && (
                <div className="mb-3 p-2 bg-white/5 rounded-lg">
                  <p className="text-xs text-white/60 mb-1">Medical Info</p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="text-xs">Blood: {member.medicalInfo.bloodType}</Badge>
                    {member.medicalInfo.allergies.map((allergy, idx) => (
                      <Badge key={idx} variant="destructive" className="text-xs">Allergy: {allergy}</Badge>
                    ))}
                    {member.medicalInfo.emergencyConditions.map((condition, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">{condition}</Badge>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex space-x-2">
                <Button 
                  size="sm" 
                  onClick={() => checkIn(member.id)}
                  className="flex-1 bg-emerald-500 hover:bg-emerald-600"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Check In
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  <Phone className="w-4 h-4 mr-2" />
                  Call
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Message
                </Button>
              </div>
            </Card>
          ))}

          <Button 
            onClick={() => setShowAddMember(true)}
            className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/20"
            variant="outline"
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Add Family Member
          </Button>
        </div>
      )}

      {/* Emergency Plans View */}
      {activeView === 'plans' && (
        <div className="space-y-4">
          {emergencyPlans.map((plan) => (
            <Card key={plan.id} className="p-6 bg-white/10 backdrop-blur-lg border-white/20 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="font-semibold text-white">{plan.name}</h4>
                  <p className="text-sm text-white/70 capitalize">{plan.type} Plan</p>
                </div>
                <div className="flex items-center space-x-2">
                  {plan.isActive && (
                    <Badge className="bg-red-400/20 text-red-300 border-red-400/30">
                      ACTIVE
                    </Badge>
                  )}
                  <Button size="sm" variant="outline">
                    {plan.isActive ? 'Deactivate' : 'Activate'}
                  </Button>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <h5 className="font-medium text-white mb-2">Action Steps:</h5>
                  <ol className="space-y-1">
                    {plan.steps.map((step, index) => (
                      <li key={index} className="text-sm text-white/80 flex items-start">
                        <span className="w-6 h-6 bg-cyan-400/20 text-cyan-300 rounded-full flex items-center justify-center text-xs mr-2 mt-0.5">
                          {index + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>

                <div>
                  <h5 className="font-medium text-white mb-2">Meeting Points:</h5>
                  <div className="space-y-2">
                    {plan.meetingPoints.map((point, index) => (
                      <div key={index} className="p-2 bg-white/5 rounded-lg flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-white">{point.name}</p>
                          <p className="text-xs text-white/60">{point.address}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge 
                            variant="secondary" 
                            className={`text-xs ${
                              point.type === 'primary' ? 'bg-emerald-400/20 text-emerald-300' :
                              point.type === 'secondary' ? 'bg-yellow-400/20 text-yellow-300' :
                              'bg-gray-400/20 text-gray-300'
                            }`}
                          >
                            {point.type}
                          </Badge>
                          <Navigation className="w-4 h-4 text-cyan-400" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-white/10">
                  <p className="text-xs text-white/50">Last updated: {plan.lastUpdated}</p>
                  <Button size="sm" variant="ghost" className="text-cyan-400 hover:text-cyan-300">
                    Edit Plan
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Quick Emergency Actions */}
      <Card className="p-6 bg-gradient-to-r from-red-500/20 to-orange-500/20 border-red-400/30 shadow-xl backdrop-blur-lg">
        <div className="flex items-center mb-4">
          <AlertTriangle className="w-6 h-6 text-red-400 mr-2" />
          <h3 className="font-semibold text-white">Quick Emergency Actions</h3>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <Button variant="destructive" className="h-12">
            <Phone className="w-4 h-4 mr-2" />
            Call 911
          </Button>
          <Button variant="outline" className="h-12 border-white/20 text-white">
            <Bell className="w-4 h-4 mr-2" />
            Alert Family
          </Button>
          <Button variant="outline" className="h-12 border-white/20 text-white">
            <MapPin className="w-4 h-4 mr-2" />
            Share Location
          </Button>
          <Button variant="outline" className="h-12 border-white/20 text-white">
            <Heart className="w-4 h-4 mr-2" />
            Medical Alert
          </Button>
        </div>
      </Card>
    </div>
  );
}