import { useState, useEffect } from 'react';
import { Package, Plus, Check, X, ShoppingCart, Calendar, AlertTriangle, Star, QrCode, Camera, Zap } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Input } from './ui/input';
import { toast } from 'sonner@2.0.3';

interface EmergencyKitItem {
  id: string;
  name: string;
  category: string;
  required: boolean;
  owned: boolean;
  quantity: number;
  requiredQuantity: number;
  expiryDate?: string;
  priority: 'high' | 'medium' | 'low';
  tips: string[];
  cost?: number;
}

export function EmergencyKitTab() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAddItem, setShowAddItem] = useState(false);

  const categories = [
    { id: 'all', name: 'All Items', icon: Package, color: 'text-white' },
    { id: 'water', name: 'Water & Food', icon: Package, color: 'text-blue-400' },
    { id: 'medical', name: 'Medical Supplies', icon: Package, color: 'text-red-400' },
    { id: 'tools', name: 'Tools & Equipment', icon: Package, color: 'text-yellow-400' },
    { id: 'communication', name: 'Communication', icon: Package, color: 'text-green-400' },
    { id: 'shelter', name: 'Shelter & Warmth', icon: Package, color: 'text-purple-400' },
    { id: 'documents', name: 'Important Documents', icon: Package, color: 'text-cyan-400' },
    { id: 'personal', name: 'Personal Care', icon: Package, color: 'text-pink-400' }
  ];

  const [emergencyKit, setEmergencyKit] = useState<EmergencyKitItem[]>([
    // Water & Food
    {
      id: '1',
      name: 'Water (1 gallon per person per day)',
      category: 'water',
      required: true,
      owned: false,
      quantity: 0,
      requiredQuantity: 14, // 2 weeks supply
      priority: 'high',
      tips: ['Store in cool, dark place', 'Rotate every 6 months', 'Consider water purification tablets'],
      cost: 20
    },
    {
      id: '2',
      name: 'Non-perishable Food (3 days minimum)',
      category: 'water',
      required: true,
      owned: false,
      quantity: 0,
      requiredQuantity: 21, // 21 meals for 3 days
      priority: 'high',
      tips: ['Include can opener', 'Choose foods that require no preparation', 'Consider dietary restrictions'],
      cost: 75
    },
    // Medical Supplies
    {
      id: '3',
      name: 'First Aid Kit',
      category: 'medical',
      required: true,
      owned: false,
      quantity: 0,
      requiredQuantity: 1,
      priority: 'high',
      tips: ['Check expiration dates monthly', 'Include prescription medications', 'Learn basic first aid'],
      cost: 45
    },
    {
      id: '4',
      name: 'Prescription Medications (7-day supply)',
      category: 'medical',
      required: true,
      owned: false,
      quantity: 0,
      requiredQuantity: 7,
      priority: 'high',
      tips: ['Keep in original containers', 'Rotate stock regularly', 'Include medical information'],
      cost: 30
    },
    // Tools & Equipment
    {
      id: '5',
      name: 'Flashlight (with extra batteries)',
      category: 'tools',
      required: true,
      owned: false,
      quantity: 0,
      requiredQuantity: 2,
      priority: 'high',
      tips: ['LED flashlights last longer', 'Hand-crank models don\'t need batteries', 'Store batteries separately'],
      cost: 25
    },
    {
      id: '6',
      name: 'Emergency Radio (Weather/NOAA)',
      category: 'tools',
      required: true,
      owned: false,
      quantity: 0,
      requiredQuantity: 1,
      priority: 'high',
      tips: ['Choose hand-crank or solar powered', 'Test monthly', 'Learn emergency frequencies'],
      cost: 35
    },
    // Communication
    {
      id: '7',
      name: 'Cell Phone Charger (Portable Battery)',
      category: 'communication',
      required: true,
      owned: false,
      quantity: 0,
      requiredQuantity: 2,
      priority: 'high',
      tips: ['Keep charged at all times', 'Solar chargers are ideal', 'Multiple charging cables'],
      cost: 40
    },
    {
      id: '8',
      name: 'Emergency Contact List (Physical Copy)',
      category: 'communication',
      required: true,
      owned: false,
      quantity: 0,
      requiredQuantity: 3, // Multiple copies
      priority: 'medium',
      tips: ['Laminate for protection', 'Include out-of-state contacts', 'Update annually'],
      cost: 5
    },
    // Additional items...
    {
      id: '9',
      name: 'Emergency Cash ($500-1000)',
      category: 'documents',
      required: true,
      owned: false,
      quantity: 0,
      requiredQuantity: 1,
      priority: 'high',
      tips: ['Small bills preferred', 'Store in waterproof container', 'ATMs may not work'],
      cost: 500
    },
    {
      id: '10',
      name: 'Sleeping Bags/Blankets',
      category: 'shelter',
      required: true,
      owned: false,
      quantity: 0,
      requiredQuantity: 4, // Per family member
      priority: 'medium',
      tips: ['One per person minimum', 'Thermal blankets are compact', 'Consider temperature rating'],
      cost: 60
    }
  ]);

  const calculateCompletionRate = () => {
    const requiredItems = emergencyKit.filter(item => item.required);
    const completedItems = requiredItems.filter(item => item.owned && item.quantity >= item.requiredQuantity);
    return Math.round((completedItems.length / requiredItems.length) * 100);
  };

  const calculateTotalCost = () => {
    return emergencyKit
      .filter(item => !item.owned && item.required)
      .reduce((total, item) => total + (item.cost || 0), 0);
  };

  const getItemsExpiringSoon = () => {
    return emergencyKit.filter(item => {
      if (!item.expiryDate || !item.owned) return false;
      const expiryDate = new Date(item.expiryDate);
      const thirtyDaysFromNow = new Date();
      thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
      return expiryDate <= thirtyDaysFromNow;
    });
  };

  const toggleItemOwnership = (itemId: string) => {
    setEmergencyKit(prev => prev.map(item => 
      item.id === itemId 
        ? { ...item, owned: !item.owned, quantity: !item.owned ? item.requiredQuantity : 0 }
        : item
    ));
    
    const item = emergencyKit.find(i => i.id === itemId);
    if (item && !item.owned) {
      toast.success(`✅ ${item.name} added to your emergency kit!`);
    }
  };

  const updateItemQuantity = (itemId: string, quantity: number) => {
    setEmergencyKit(prev => prev.map(item => 
      item.id === itemId 
        ? { ...item, quantity: Math.max(0, quantity) }
        : item
    ));
  };

  const filteredItems = emergencyKit.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const completionRate = calculateCompletionRate();
  const totalCost = calculateTotalCost();
  const expiringItems = getItemsExpiringSoon();

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="pt-12 pb-2">
        <h1 className="text-3xl font-semibold text-white mb-2">Emergency Kit</h1>
        <p className="text-white/70">Build and maintain your disaster preparedness supplies</p>
      </div>

      {/* Kit Overview Stats */}
      <Card className="p-6 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border-emerald-400/30 shadow-xl backdrop-blur-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Package className="w-6 h-6 text-emerald-400 mr-2" />
            <h3 className="font-semibold text-white">Kit Readiness</h3>
          </div>
          <Badge variant="secondary" className="bg-emerald-400/20 text-emerald-300 border-emerald-400/30 text-lg px-3 py-1">
            {completionRate}%
          </Badge>
        </div>
        
        <Progress value={completionRate} className="h-4 mb-6" />
        
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="p-3 bg-white/10 rounded-lg">
            <div className="text-xl font-bold text-white">{emergencyKit.filter(i => i.owned).length}</div>
            <p className="text-xs text-white/70">Items Owned</p>
          </div>
          <div className="p-3 bg-white/10 rounded-lg">
            <div className="text-xl font-bold text-white">${totalCost}</div>
            <p className="text-xs text-white/70">Remaining Cost</p>
          </div>
          <div className="p-3 bg-white/10 rounded-lg">
            <div className="text-xl font-bold text-white">{expiringItems.length}</div>
            <p className="text-xs text-white/70">Expiring Soon</p>
          </div>
        </div>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-blue-400/30 shadow-xl backdrop-blur-lg">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-white mb-1">Smart Shopping List</h4>
              <p className="text-xs text-white/70">Generate optimized shopping list</p>
            </div>
            <ShoppingCart className="w-6 h-6 text-blue-400" />
          </div>
        </Card>
        
        <Card className="p-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-400/30 shadow-xl backdrop-blur-lg">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-white mb-1">Scan Barcode</h4>
              <p className="text-xs text-white/70">Quick add with camera</p>
            </div>
            <QrCode className="w-6 h-6 text-purple-400" />
          </div>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        <Input
          placeholder="Search emergency kit items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
        />
        
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center px-3 py-2 rounded-lg whitespace-nowrap transition-all ${
                  selectedCategory === category.id
                    ? 'bg-cyan-400/30 text-cyan-300 border border-cyan-400/40'
                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
              >
                <Icon className="w-4 h-4 mr-2" />
                {category.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Emergency Kit Items */}
      <div className="space-y-3">
        {filteredItems.map((item) => (
          <Card key={item.id} className={`p-4 backdrop-blur-lg shadow-xl transition-all ${
            item.owned 
              ? 'bg-emerald-500/20 border-emerald-400/40' 
              : item.priority === 'high'
                ? 'bg-red-500/10 border-red-400/30'
                : 'bg-white/10 border-white/20'
          }`}>
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <h4 className="font-semibold text-white mr-2">{item.name}</h4>
                  {item.required && (
                    <Badge variant="secondary" className="bg-red-400/20 text-red-300 border-red-400/30 text-xs">
                      Required
                    </Badge>
                  )}
                  {item.priority === 'high' && (
                    <AlertTriangle className="w-4 h-4 text-red-400 ml-2" />
                  )}
                </div>
                
                <div className="flex items-center space-x-4 mb-2">
                  <div className="flex items-center">
                    <span className="text-sm text-white/70 mr-2">Quantity:</span>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                        className="w-6 h-6 bg-white/20 rounded text-white hover:bg-white/30"
                        disabled={!item.owned}
                      >
                        -
                      </button>
                      <span className="text-white font-medium">{item.quantity}/{item.requiredQuantity}</span>
                      <button
                        onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                        className="w-6 h-6 bg-white/20 rounded text-white hover:bg-white/30"
                        disabled={!item.owned}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  
                  {item.cost && (
                    <div className="text-sm">
                      <span className="text-white/70">Cost: </span>
                      <span className="text-green-400 font-medium">${item.cost}</span>
                    </div>
                  )}
                </div>

                {/* Tips */}
                <div className="space-y-1">
                  {item.tips.slice(0, 2).map((tip, index) => (
                    <p key={index} className="text-xs text-white/60 flex items-center">
                      <Star className="w-3 h-3 mr-1 text-yellow-400" />
                      {tip}
                    </p>
                  ))}
                </div>
              </div>
              
              <button
                onClick={() => toggleItemOwnership(item.id)}
                className={`p-2 rounded-lg transition-all ${
                  item.owned
                    ? 'bg-emerald-400/30 text-emerald-300 hover:bg-emerald-400/40'
                    : 'bg-white/20 text-white/70 hover:bg-white/30'
                }`}
              >
                {item.owned ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
              </button>
            </div>
            
            {item.owned && item.quantity < item.requiredQuantity && (
              <div className="mt-3 p-2 bg-yellow-400/20 border border-yellow-400/30 rounded-lg">
                <p className="text-xs text-yellow-300">
                  ⚠️ You have {item.quantity} but need {item.requiredQuantity}. Consider getting more.
                </p>
              </div>
            )}
          </Card>
        ))}
      </div>

      {/* Smart Recommendations */}
      <Card className="p-6 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-cyan-400/30 shadow-xl backdrop-blur-lg">
        <div className="flex items-center mb-4">
          <Zap className="w-6 h-6 text-cyan-400 mr-2" />
          <h3 className="font-semibold text-white">AI Recommendations</h3>
        </div>
        
        <div className="space-y-3">
          <div className="p-3 bg-white/10 rounded-lg">
            <h4 className="font-medium text-white mb-1">Priority Items Missing</h4>
            <p className="text-sm text-white/70">
              Based on your location and family size, you should prioritize: Water storage, First aid kit, and Emergency radio.
            </p>
          </div>
          
          <div className="p-3 bg-white/10 rounded-lg">
            <h4 className="font-medium text-white mb-1">Budget-Friendly Tip</h4>
            <p className="text-sm text-white/70">
              Build your kit gradually. Start with $50/month and focus on water and non-perishable food first.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}