import { useState, useEffect } from 'react';
import { Brain, MapPin, TrendingUp, AlertTriangle, Shield, Target, Zap, Eye, Calendar, Clock, BarChart, Activity } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Button } from './ui/button';

interface RiskFactor {
  id: string;
  name: string;
  category: 'geological' | 'weather' | 'human' | 'environmental' | 'infrastructure';
  probability: number; // 0-100
  impact: number; // 0-100
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  trend: 'increasing' | 'decreasing' | 'stable';
  description: string;
  recommendations: string[];
  dataQuality: number; // 0-100
  lastUpdated: string;
}

interface LocationRisk {
  location: string;
  coordinates: { lat: number; lng: number };
  overallRisk: number;
  riskFactors: RiskFactor[];
  preparednessRecommendations: string[];
  nearbyResources: Array<{
    type: string;
    name: string;
    distance: number;
    contact: string;
  }>;
  evacuationRoutes: Array<{
    name: string;
    distance: number;
    estimatedTime: number;
    currentStatus: 'clear' | 'congested' | 'blocked';
  }>;
}

interface Prediction {
  id: string;
  type: string;
  probability: number;
  timeframe: string;
  confidence: number;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  affectedRadius: number; // in km
  preparationTime: number; // in hours
}

export function AIRiskAssessment() {
  const [selectedLocation, setSelectedLocation] = useState('current');
  const [timeframe, setTimeframe] = useState<'24h' | '7d' | '30d' | '1y'>('7d');

  const [locationRisk, setLocationRisk] = useState<LocationRisk>({
    location: 'Gurgaon, Haryana, India',
    coordinates: { lat: 28.4595, lng: 77.0266 },
    overallRisk: 68,
    riskFactors: [
      {
        id: '1',
        name: 'Flash Flooding',
        category: 'weather',
        probability: 75,
        impact: 80,
        riskLevel: 'high',
        trend: 'increasing',
        description: 'Monsoon season increases flood risk due to poor drainage infrastructure',
        recommendations: [
          'Stock emergency supplies and waterproof containers',
          'Identify high ground evacuation routes',
          'Install flood detection sensors',
          'Keep vehicles fueled and ready'
        ],
        dataQuality: 92,
        lastUpdated: new Date().toISOString()
      },
      {
        id: '2',
        name: 'Earthquake',
        category: 'geological',
        probability: 35,
        impact: 95,
        riskLevel: 'medium',
        trend: 'stable',
        description: 'Delhi NCR lies in seismic zone IV with moderate earthquake risk',
        recommendations: [
          'Secure heavy furniture and appliances',
          'Practice drop, cover, and hold on drills',
          'Keep emergency kit in accessible location',
          'Identify safe spots in each room'
        ],
        dataQuality: 88,
        lastUpdated: new Date().toISOString()
      },
      {
        id: '3',
        name: 'Air Pollution Crisis',
        category: 'environmental',
        probability: 85,
        impact: 65,
        riskLevel: 'high',
        trend: 'increasing',
        description: 'Winter months see severe air quality degradation affecting health',
        recommendations: [
          'Use air purifiers and N95 masks',
          'Limit outdoor activities during high AQI',
          'Keep indoor plants and air cleaning systems',
          'Monitor AQI levels regularly'
        ],
        dataQuality: 95,
        lastUpdated: new Date().toISOString()
      },
      {
        id: '4',
        name: 'Heat Wave',
        category: 'weather',
        probability: 90,
        impact: 70,
        riskLevel: 'high',
        trend: 'increasing',
        description: 'Summer temperatures exceeding 45°C pose significant health risks',
        recommendations: [
          'Stay hydrated and avoid sun exposure',
          'Use cooling systems and light clothing',
          'Check on elderly and vulnerable people',
          'Plan activities during cooler hours'
        ],
        dataQuality: 90,
        lastUpdated: new Date().toISOString()
      }
    ],
    preparednessRecommendations: [
      'Develop comprehensive family emergency plan',
      'Build 72-hour emergency supply kit',
      'Install early warning systems',
      'Join local emergency response network',
      'Practice evacuation routes monthly'
    ],
    nearbyResources: [
      { type: 'Hospital', name: 'Max Hospital Gurgaon', distance: 2.5, contact: '+91-124-6623000' },
      { type: 'Fire Station', name: 'Gurgaon Fire Department', distance: 1.8, contact: '101' },
      { type: 'Police Station', name: 'Sector 14 Police Station', distance: 1.2, contact: '100' },
      { type: 'Emergency Shelter', name: 'Community Center', distance: 0.8, contact: '+91-124-2345678' }
    ],
    evacuationRoutes: [
      { name: 'NH-8 to Delhi', distance: 15, estimatedTime: 45, currentStatus: 'clear' },
      { name: 'Dwarka Expressway', distance: 12, estimatedTime: 35, currentStatus: 'congested' },
      { name: 'Sohna Road', distance: 20, estimatedTime: 55, currentStatus: 'clear' }
    ]
  });

  const [predictions, setPredictions] = useState<Prediction[]>([
    {
      id: '1',
      type: 'Heavy Rainfall',
      probability: 78,
      timeframe: 'Next 48 hours',
      confidence: 85,
      severity: 'medium',
      description: 'Monsoon system approaching from Bay of Bengal likely to bring intense rainfall',
      affectedRadius: 50,
      preparationTime: 24
    },
    {
      id: '2',
      type: 'Air Quality Deterioration',
      probability: 92,
      timeframe: 'Next 7 days',
      confidence: 94,
      severity: 'high',
      description: 'Crop burning season combined with weather patterns will worsen air quality',
      affectedRadius: 100,
      preparationTime: 12
    },
    {
      id: '3',
      type: 'Traffic Congestion',
      probability: 65,
      timeframe: 'Next 24 hours',
      confidence: 75,
      severity: 'low',
      description: 'Festival season and weather may impact major evacuation routes',
      affectedRadius: 25,
      preparationTime: 6
    }
  ]);

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'critical': return 'text-red-400 bg-red-500/20 border-red-400/40';
      case 'high': return 'text-orange-400 bg-orange-500/20 border-orange-400/40';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20 border-yellow-400/40';
      case 'low': return 'text-green-400 bg-green-500/20 border-green-400/40';
      default: return 'text-gray-400 bg-gray-500/20 border-gray-400/40';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'increasing': return '↗️';
      case 'decreasing': return '↘️';
      case 'stable': return '➡️';
      default: return '➡️';
    }
  };

  const getRouteStatusColor = (status: string) => {
    switch (status) {
      case 'clear': return 'text-green-400 bg-green-500/20';
      case 'congested': return 'text-yellow-400 bg-yellow-500/20';
      case 'blocked': return 'text-red-400 bg-red-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const calculateRiskScore = () => {
    const weights = { critical: 4, high: 3, medium: 2, low: 1 };
    const totalWeight = locationRisk.riskFactors.reduce((sum, factor) => sum + weights[factor.riskLevel], 0);
    const maxWeight = locationRisk.riskFactors.length * 4;
    return Math.round((totalWeight / maxWeight) * 100);
  };

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="pt-12 pb-2">
        <h1 className="text-3xl font-semibold text-white mb-2">AI Risk Assessment</h1>
        <p className="text-white/70">Advanced predictive analysis for your location</p>
      </div>

      {/* Overall Risk Score */}
      <Card className="p-6 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-400/30 shadow-xl backdrop-blur-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Brain className="w-6 h-6 text-purple-400 mr-2" />
            <h3 className="font-semibold text-white">AI Risk Analysis</h3>
          </div>
          <Badge variant="secondary" className="bg-purple-400/20 text-purple-300 border-purple-400/30 text-lg px-3 py-1">
            Risk Score: {locationRisk.overallRisk}
          </Badge>
        </div>
        
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <MapPin className="w-4 h-4 text-white/80 mr-2" />
              <span className="text-white/80">{locationRisk.location}</span>
            </div>
            <span className="text-sm font-medium text-white">
              {locationRisk.overallRisk >= 80 ? 'Critical' :
               locationRisk.overallRisk >= 60 ? 'High' :
               locationRisk.overallRisk >= 40 ? 'Medium' : 'Low'} Risk
            </span>
          </div>
          <Progress value={locationRisk.overallRisk} className="h-4" />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-3 bg-white/10 rounded-lg">
            <div className="text-xl font-bold text-white">{locationRisk.riskFactors.length}</div>
            <p className="text-xs text-white/70">Risk Factors</p>
          </div>
          <div className="text-center p-3 bg-white/10 rounded-lg">
            <div className="text-xl font-bold text-white">{predictions.length}</div>
            <p className="text-xs text-white/70">Active Predictions</p>
          </div>
          <div className="text-center p-3 bg-white/10 rounded-lg">
            <div className="text-xl font-bold text-white">
              {Math.round(locationRisk.riskFactors.reduce((sum, f) => sum + f.dataQuality, 0) / locationRisk.riskFactors.length)}%
            </div>
            <p className="text-xs text-white/70">Data Quality</p>
          </div>
        </div>
      </Card>

      {/* Time Frame Selection */}
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {[
          { id: '24h', label: '24 Hours' },
          { id: '7d', label: '7 Days' },
          { id: '30d', label: '30 Days' },
          { id: '1y', label: '1 Year' }
        ].map((period) => (
          <button
            key={period.id}
            onClick={() => setTimeframe(period.id as any)}
            className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
              timeframe === period.id
                ? 'bg-cyan-400/30 text-cyan-300 border border-cyan-400/40'
                : 'bg-white/10 text-white/70 hover:bg-white/20'
            }`}
          >
            {period.label}
          </button>
        ))}
      </div>

      {/* AI Predictions */}
      <Card className="p-6 bg-white/10 backdrop-blur-lg border-white/20 shadow-xl">
        <div className="flex items-center mb-4">
          <Activity className="w-6 h-6 text-cyan-400 mr-2" />
          <h3 className="font-semibold text-white">AI Predictions</h3>
        </div>
        
        <div className="space-y-4">
          {predictions.map((prediction) => (
            <div key={prediction.id} className="p-4 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-400/20 rounded-lg">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-semibold text-white mb-1">{prediction.type}</h4>
                  <p className="text-sm text-white/80">{prediction.description}</p>
                </div>
                <Badge className={getRiskColor(prediction.severity)}>
                  {prediction.severity.charAt(0).toUpperCase() + prediction.severity.slice(1)}
                </Badge>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-3">
                <div>
                  <p className="text-xs text-white/60">Probability</p>
                  <div className="flex items-center">
                    <Progress value={prediction.probability} className="h-2 flex-1 mr-2" />
                    <span className="text-sm font-medium text-white">{prediction.probability}%</span>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-white/60">Confidence</p>
                  <div className="flex items-center">
                    <Progress value={prediction.confidence} className="h-2 flex-1 mr-2" />
                    <span className="text-sm font-medium text-white">{prediction.confidence}%</span>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-white/60">Timeframe</p>
                  <p className="text-sm font-medium text-white">{prediction.timeframe}</p>
                </div>
              </div>
              
              <div className="flex justify-between items-center text-xs text-white/60">
                <span>Affected radius: {prediction.affectedRadius}km</span>
                <span>Prep time: {prediction.preparationTime}h</span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Risk Factors */}
      <Card className="p-6 bg-white/10 backdrop-blur-lg border-white/20 shadow-xl">
        <div className="flex items-center mb-4">
          <AlertTriangle className="w-6 h-6 text-orange-400 mr-2" />
          <h3 className="font-semibold text-white">Risk Factors Analysis</h3>
        </div>
        
        <div className="space-y-4">
          {locationRisk.riskFactors.map((factor) => (
            <div key={factor.id} className="p-4 border border-white/20 rounded-lg">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="font-semibold text-white">{factor.name}</h4>
                    <Badge className={getRiskColor(factor.riskLevel)}>
                      {factor.riskLevel.charAt(0).toUpperCase() + factor.riskLevel.slice(1)}
                    </Badge>
                    <span className="text-sm">{getTrendIcon(factor.trend)}</span>
                  </div>
                  <p className="text-sm text-white/80 mb-3">{factor.description}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-xs text-white/60 mb-1">Probability</p>
                  <div className="flex items-center">
                    <Progress value={factor.probability} className="h-2 flex-1 mr-2" />
                    <span className="text-sm font-medium text-white">{factor.probability}%</span>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-white/60 mb-1">Impact</p>
                  <div className="flex items-center">
                    <Progress value={factor.impact} className="h-2 flex-1 mr-2" />
                    <span className="text-sm font-medium text-white">{factor.impact}%</span>
                  </div>
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium text-white mb-2">AI Recommendations:</p>
                <ul className="space-y-1">
                  {factor.recommendations.map((rec, index) => (
                    <li key={index} className="text-sm text-white/80 flex items-start">
                      <span className="w-4 h-4 bg-cyan-400/20 text-cyan-300 rounded-full flex items-center justify-center text-xs mr-2 mt-0.5">
                        {index + 1}
                      </span>
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="flex justify-between items-center mt-3 pt-3 border-t border-white/10">
                <div className="flex items-center space-x-4">
                  <span className="text-xs text-white/60">Data Quality: {factor.dataQuality}%</span>
                  <span className="text-xs text-white/60 capitalize">Category: {factor.category}</span>
                </div>
                <span className="text-xs text-white/50">
                  Updated: {new Date(factor.lastUpdated).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Evacuation Routes */}
      <Card className="p-6 bg-white/10 backdrop-blur-lg border-white/20 shadow-xl">
        <div className="flex items-center mb-4">
          <Target className="w-6 h-6 text-green-400 mr-2" />
          <h3 className="font-semibold text-white">Evacuation Routes Status</h3>
        </div>
        
        <div className="space-y-3">
          {locationRisk.evacuationRoutes.map((route, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <div className="flex-1">
                <h4 className="font-medium text-white">{route.name}</h4>
                <p className="text-sm text-white/70">{route.distance}km • Est. {route.estimatedTime} minutes</p>
              </div>
              <Badge className={getRouteStatusColor(route.currentStatus)}>
                {route.currentStatus.charAt(0).toUpperCase() + route.currentStatus.slice(1)}
              </Badge>
            </div>
          ))}
        </div>
      </Card>

      {/* Nearby Resources */}
      <Card className="p-6 bg-white/10 backdrop-blur-lg border-white/20 shadow-xl">
        <div className="flex items-center mb-4">
          <Shield className="w-6 h-6 text-blue-400 mr-2" />
          <h3 className="font-semibold text-white">Emergency Resources Nearby</h3>
        </div>
        
        <div className="grid grid-cols-1 gap-3">
          {locationRisk.nearbyResources.map((resource, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <div>
                <h4 className="font-medium text-white">{resource.name}</h4>
                <p className="text-sm text-white/70">{resource.type} • {resource.distance}km away</p>
              </div>
              <Button size="sm" variant="outline" className="text-cyan-400 border-cyan-400/40">
                Call
              </Button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}