import { useState, useEffect } from 'react';
import { AlertTriangle, Cloud, Sun, CloudRain, Zap, Wind, Thermometer, Eye, MapPin, Clock, Bell, Satellite, Radio } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { toast } from 'sonner@2.0.3';

interface WeatherAlert {
  id: string;
  type: 'severe_weather' | 'flood' | 'fire' | 'earthquake' | 'cyclone' | 'heatwave';
  severity: 'watch' | 'warning' | 'emergency';
  title: string;
  description: string;
  location: string;
  startTime: string;
  endTime: string;
  source: string;
  actionRequired: string[];
  affectedAreas: string[];
  isActive: boolean;
}

interface WeatherCondition {
  location: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
  visibility: number;
  pressure: number;
  condition: string;
  uvIndex: number;
  airQuality: {
    aqi: number;
    level: string;
  };
  forecast: Array<{
    day: string;
    high: number;
    low: number;
    condition: string;
    icon: any;
  }>;
}

interface EmergencyBroadcast {
  id: string;
  type: 'government' | 'local' | 'weather_service' | 'emergency_services';
  priority: 'critical' | 'high' | 'medium' | 'low';
  title: string;
  message: string;
  location: string;
  timestamp: string;
  validUntil: string;
  channels: string[];
}

export function LiveAlertsTab() {
  const [activeTab, setActiveTab] = useState<'alerts' | 'weather' | 'broadcasts'>('alerts');
  const [alertsEnabled, setAlertsEnabled] = useState(true);

  const [weatherAlerts, setWeatherAlerts] = useState<WeatherAlert[]>([
    {
      id: '1',
      type: 'severe_weather',
      severity: 'warning',
      title: 'Severe Thunderstorm Warning',
      description: 'Severe thunderstorms with heavy rain, lightning, and possible hail expected. Winds up to 70 mph possible.',
      location: 'Delhi NCR, Gurgaon, Noida',
      startTime: new Date().toISOString(),
      endTime: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(), // 6 hours from now
      source: 'India Meteorological Department',
      actionRequired: [
        'Stay indoors and away from windows',
        'Avoid outdoor activities',
        'Secure loose objects outside',
        'Have emergency kit ready'
      ],
      affectedAreas: ['Gurgaon', 'Delhi', 'Noida', 'Faridabad'],
      isActive: true
    },
    {
      id: '2',
      type: 'heatwave',
      severity: 'watch',
      title: 'Heat Wave Advisory',
      description: 'Temperatures expected to reach 45°C (113°F) over the next 3 days. High risk of heat-related illness.',
      location: 'Rajasthan, Haryana, Delhi',
      startTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // Tomorrow
      endTime: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 days from now
      source: 'India Meteorological Department',
      actionRequired: [
        'Stay hydrated - drink water regularly',
        'Avoid outdoor activities during peak hours (10 AM - 4 PM)',
        'Wear light-colored, loose-fitting clothing',
        'Check on elderly and vulnerable people'
      ],
      affectedAreas: ['Jaipur', 'Gurgaon', 'Delhi', 'Hisar'],
      isActive: false
    }
  ]);

  const [currentWeather, setCurrentWeather] = useState<WeatherCondition>({
    location: 'Gurgaon, Haryana',
    temperature: 28,
    humidity: 65,
    windSpeed: 12,
    visibility: 8,
    pressure: 1013,
    condition: 'Partly Cloudy',
    uvIndex: 6,
    airQuality: {
      aqi: 150,
      level: 'Moderate'
    },
    forecast: [
      { day: 'Today', high: 32, low: 22, condition: 'Thunderstorms', icon: CloudRain },
      { day: 'Tomorrow', high: 30, low: 20, condition: 'Cloudy', icon: Cloud },
      { day: 'Wednesday', high: 35, low: 25, condition: 'Sunny', icon: Sun },
      { day: 'Thursday', high: 38, low: 28, condition: 'Hot', icon: Sun },
      { day: 'Friday', high: 42, low: 30, condition: 'Very Hot', icon: Sun }
    ]
  });

  const [emergencyBroadcasts, setEmergencyBroadcasts] = useState<EmergencyBroadcast[]>([
    {
      id: '1',
      type: 'government',
      priority: 'critical',
      title: 'Emergency Evacuation Notice',
      message: 'Due to rising water levels in Yamuna river, residents of low-lying areas are advised to evacuate immediately. Temporary shelters have been set up at designated locations.',
      location: 'Delhi Riverfront Areas',
      timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30 minutes ago
      validUntil: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString(), // 12 hours from now
      channels: ['Emergency Alert System', 'Radio', 'TV', 'SMS']
    },
    {
      id: '2',
      type: 'local',
      priority: 'high',
      title: 'Traffic Advisory - Road Closure',
      message: 'NH-8 closed between Gurgaon and Delhi due to waterlogging. Alternative routes via Dwarka Expressway recommended. Emergency vehicles have priority access.',
      location: 'NH-8, Gurgaon-Delhi',
      timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString(), // 1 hour ago
      validUntil: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(), // 6 hours from now
      channels: ['Traffic Control', 'Local Radio', 'Mobile Apps']
    }
  ]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'emergency': return 'bg-red-500/30 text-red-300 border-red-400/40';
      case 'warning': return 'bg-orange-500/30 text-orange-300 border-orange-400/40';
      case 'watch': return 'bg-yellow-500/30 text-yellow-300 border-yellow-400/40';
      default: return 'bg-gray-500/30 text-gray-300 border-gray-400/40';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-500/30 text-red-300 border-red-400/40';
      case 'high': return 'bg-orange-500/30 text-orange-300 border-orange-400/40';
      case 'medium': return 'bg-yellow-500/30 text-yellow-300 border-yellow-400/40';
      case 'low': return 'bg-green-500/30 text-green-300 border-green-400/40';
      default: return 'bg-gray-500/30 text-gray-300 border-gray-400/40';
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'severe_weather': return CloudRain;
      case 'flood': return CloudRain;
      case 'fire': return Zap;
      case 'earthquake': return AlertTriangle;
      case 'cyclone': return Wind;
      case 'heatwave': return Sun;
      default: return AlertTriangle;
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

  const getTimeUntil = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((time.getTime() - now.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 0) return 'Expired';
    if (diffInMinutes < 60) return `${diffInMinutes}m remaining`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h remaining`;
    return `${Math.floor(diffInMinutes / 1440)}d remaining`;
  };

  const activeAlerts = weatherAlerts.filter(alert => alert.isActive);

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="pt-12 pb-2">
        <h1 className="text-3xl font-semibold text-white mb-2">Live Alerts</h1>
        <p className="text-white/70">Real-time emergency alerts and weather monitoring</p>
      </div>

      {/* Alert Status Banner */}
      {activeAlerts.length > 0 && (
        <Card className="p-4 bg-gradient-to-r from-red-500/30 to-orange-500/30 border-red-400/40 shadow-xl backdrop-blur-lg animate-pulse">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <AlertTriangle className="w-6 h-6 text-red-400 mr-2" />
              <div>
                <h3 className="font-semibold text-white">Active Emergency Alerts</h3>
                <p className="text-sm text-red-200">{activeAlerts.length} alert(s) in your area</p>
              </div>
            </div>
            <Badge className="bg-red-500/30 text-red-300 border-red-400/40 text-lg px-3 py-1">
              {activeAlerts.length}
            </Badge>
          </div>
        </Card>
      )}

      {/* Current Weather Card */}
      <Card className="p-6 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border-blue-400/30 shadow-xl backdrop-blur-lg">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold text-white mb-1">Current Weather</h3>
            <div className="flex items-center text-white/70">
              <MapPin className="w-4 h-4 mr-1" />
              <span className="text-sm">{currentWeather.location}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-white">{currentWeather.temperature}°C</div>
            <p className="text-sm text-white/70">{currentWeather.condition}</p>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-4">
          <div className="text-center p-2 bg-white/10 rounded-lg">
            <Wind className="w-5 h-5 text-blue-400 mx-auto mb-1" />
            <div className="text-sm font-semibold text-white">{currentWeather.windSpeed}</div>
            <p className="text-xs text-white/70">km/h</p>
          </div>
          <div className="text-center p-2 bg-white/10 rounded-lg">
            <Eye className="w-5 h-5 text-cyan-400 mx-auto mb-1" />
            <div className="text-sm font-semibold text-white">{currentWeather.humidity}%</div>
            <p className="text-xs text-white/70">Humidity</p>
          </div>
          <div className="text-center p-2 bg-white/10 rounded-lg">
            <Thermometer className="w-5 h-5 text-orange-400 mx-auto mb-1" />
            <div className="text-sm font-semibold text-white">{currentWeather.uvIndex}</div>
            <p className="text-xs text-white/70">UV Index</p>
          </div>
          <div className="text-center p-2 bg-white/10 rounded-lg">
            <Satellite className="w-5 h-5 text-purple-400 mx-auto mb-1" />
            <div className="text-sm font-semibold text-white">{currentWeather.airQuality.aqi}</div>
            <p className="text-xs text-white/70">AQI</p>
          </div>
        </div>

        {/* 5-Day Forecast */}
        <div className="grid grid-cols-5 gap-2">
          {currentWeather.forecast.map((day, index) => {
            const Icon = day.icon;
            return (
              <div key={index} className="text-center p-2 bg-white/5 rounded-lg">
                <p className="text-xs text-white/70 mb-1">{day.day}</p>
                <Icon className="w-4 h-4 text-cyan-400 mx-auto mb-1" />
                <div className="text-xs">
                  <div className="text-white font-medium">{day.high}°</div>
                  <div className="text-white/60">{day.low}°</div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Tab Navigation */}
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {[
          { id: 'alerts', label: 'Weather Alerts', icon: AlertTriangle },
          { id: 'weather', label: 'Weather Details', icon: Cloud },
          { id: 'broadcasts', label: 'Emergency Broadcasts', icon: Radio }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                activeTab === tab.id
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

      {/* Weather Alerts */}
      {activeTab === 'alerts' && (
        <div className="space-y-4">
          {weatherAlerts.map((alert) => {
            const Icon = getAlertIcon(alert.type);
            return (
              <Card key={alert.id} className={`p-6 backdrop-blur-lg shadow-xl ${
                alert.isActive ? 'bg-red-500/20 border-red-400/40' : 'bg-white/10 border-white/20'
              }`}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-lg ${alert.isActive ? 'bg-red-400/30' : 'bg-white/10'}`}>
                      <Icon className={`w-6 h-6 ${alert.isActive ? 'text-red-300' : 'text-white/70'}`} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">{alert.title}</h4>
                      <p className="text-sm text-white/80">{alert.description}</p>
                    </div>
                  </div>
                  <Badge className={getSeverityColor(alert.severity)}>
                    {alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1)}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-white/60 mb-1">Affected Areas</p>
                    <div className="flex flex-wrap gap-1">
                      {alert.affectedAreas.map((area, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {area}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-white/60 mb-1">Duration</p>
                    <p className="text-sm text-white">
                      {new Date(alert.startTime).toLocaleString()} - {new Date(alert.endTime).toLocaleString()}
                    </p>
                    <p className="text-xs text-white/60">{getTimeUntil(alert.endTime)}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm font-medium text-white mb-2">Recommended Actions:</p>
                  <ul className="space-y-1">
                    {alert.actionRequired.map((action, index) => (
                      <li key={index} className="text-sm text-white/80 flex items-start">
                        <span className="w-4 h-4 bg-cyan-400/20 text-cyan-300 rounded-full flex items-center justify-center text-xs mr-2 mt-0.5">
                          {index + 1}
                        </span>
                        {action}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex justify-between items-center pt-3 border-t border-white/10">
                  <p className="text-xs text-white/50">Source: {alert.source}</p>
                  {alert.isActive && (
                    <Button size="sm" className="bg-red-500 hover:bg-red-600">
                      <Bell className="w-4 h-4 mr-2" />
                      Set Reminder
                    </Button>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Emergency Broadcasts */}
      {activeTab === 'broadcasts' && (
        <div className="space-y-4">
          {emergencyBroadcasts.map((broadcast) => (
            <Card key={broadcast.id} className="p-6 bg-white/10 backdrop-blur-lg border-white/20 shadow-xl">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-white/10 rounded-lg">
                    <Radio className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-semibold text-white">{broadcast.title}</h4>
                      <Badge className={getPriorityColor(broadcast.priority)}>
                        {broadcast.priority.charAt(0).toUpperCase() + broadcast.priority.slice(1)}
                      </Badge>
                    </div>
                    <p className="text-sm text-white/80 mb-2">{broadcast.message}</p>
                    <div className="flex items-center text-xs text-white/60">
                      <MapPin className="w-3 h-3 mr-1" />
                      <span className="mr-4">{broadcast.location}</span>
                      <Clock className="w-3 h-3 mr-1" />
                      <span>{getTimeAgo(broadcast.timestamp)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <p className="text-xs text-white/60 mb-1">Broadcast Channels</p>
                <div className="flex flex-wrap gap-1">
                  {broadcast.channels.map((channel, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {channel}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center pt-3 border-t border-white/10">
                <p className="text-xs text-white/50">Valid until: {new Date(broadcast.validUntil).toLocaleString()}</p>
                <p className="text-xs text-white/60 capitalize">{broadcast.type.replace('_', ' ')}</p>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Alert Settings */}
      <Card className="p-6 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-400/30 shadow-xl backdrop-blur-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Bell className="w-6 h-6 text-purple-400 mr-2" />
            <h3 className="font-semibold text-white">Alert Preferences</h3>
          </div>
          <button
            onClick={() => {
              setAlertsEnabled(!alertsEnabled);
              toast.success(alertsEnabled ? 'Alerts disabled' : 'Alerts enabled');
            }}
            className={`px-4 py-2 rounded-lg transition-all ${
              alertsEnabled 
                ? 'bg-emerald-400/30 text-emerald-300 border border-emerald-400/40'
                : 'bg-red-400/30 text-red-300 border border-red-400/40'
            }`}
          >
            {alertsEnabled ? 'Enabled' : 'Disabled'}
          </button>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-white/10 rounded-lg">
            <h4 className="font-medium text-white mb-1">Push Notifications</h4>
            <p className="text-xs text-white/70">Instant alerts on your device</p>
          </div>
          <div className="p-3 bg-white/10 rounded-lg">
            <h4 className="font-medium text-white mb-1">SMS Alerts</h4>
            <p className="text-xs text-white/70">Text messages for critical alerts</p>
          </div>
          <div className="p-3 bg-white/10 rounded-lg">
            <h4 className="font-medium text-white mb-1">Email Updates</h4>
            <p className="text-xs text-white/70">Detailed alert summaries</p>
          </div>
          <div className="p-3 bg-white/10 rounded-lg">
            <h4 className="font-medium text-white mb-1">Location-Based</h4>
            <p className="text-xs text-white/70">Alerts for your area only</p>
          </div>
        </div>
      </Card>
    </div>
  );
}