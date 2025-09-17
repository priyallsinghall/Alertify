import { useState, useEffect } from 'react';
import { Users, MapPin, Star, MessageCircle, Share2, Trophy, Heart, AlertTriangle, Calendar, Camera, ThumbsUp, Award, Target, TrendingUp } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Avatar } from './ui/avatar';
import { Progress } from './ui/progress';
import { toast } from 'sonner@2.0.3';

interface CommunityMember {
  id: string;
  name: string;
  avatar: string;
  location: string;
  preparednessScore: number;
  badges: string[];
  contributions: number;
  joinDate: string;
  lastActive: string;
  expertise: string[];
  verified: boolean;
}

interface CommunityPost {
  id: string;
  author: CommunityMember;
  content: string;
  type: 'tip' | 'question' | 'alert' | 'story' | 'resource';
  timestamp: string;
  likes: number;
  comments: number;
  shares: number;
  tags: string[];
  location?: string;
  media?: string[];
  isLiked: boolean;
  urgency?: 'low' | 'medium' | 'high' | 'critical';
}

interface LocalGroup {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  category: string;
  location: string;
  activityLevel: 'low' | 'medium' | 'high';
  nextEvent?: {
    title: string;
    date: string;
    location: string;
  };
  recentActivity: string;
  admins: string[];
  isJoined: boolean;
}

interface LeaderboardEntry {
  rank: number;
  member: CommunityMember;
  points: number;
  change: number; // +/- from last week
}

export function CommunityTab() {
  const [activeView, setActiveView] = useState<'feed' | 'groups' | 'leaderboard' | 'events'>('feed');
  const [filterTag, setFilterTag] = useState('all');

  const [communityPosts, setCommunityPosts] = useState<CommunityPost[]>([
    {
      id: '1',
      author: {
        id: '1',
        name: 'Dr. Raj Sharma',
        avatar: 'RS',
        location: 'Delhi, India',
        preparednessScore: 95,
        badges: ['Expert', 'First Responder', 'Community Leader'],
        contributions: 247,
        joinDate: '2024-03-15',
        lastActive: 'Online now',
        expertise: ['Medical Emergency', 'Earthquake Safety'],
        verified: true
      },
      content: 'Essential tip for earthquake preparedness: Always keep a "Go Bag" ready with 72 hours of supplies. Include water, non-perishable food, first aid kit, flashlight, radio, and important documents. Practice your evacuation route with family monthly. #EarthquakePrep #EmergencyKit',
      type: 'tip',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
      likes: 89,
      comments: 23,
      shares: 34,
      tags: ['earthquake', 'preparedness', 'emergency-kit'],
      isLiked: false,
      urgency: 'medium'
    },
    {
      id: '2',
      author: {
        id: '2',
        name: 'Priya Patel',
        avatar: 'PP',
        location: 'Mumbai, Maharashtra',
        preparednessScore: 78,
        badges: ['Helper', 'Weather Watcher'],
        contributions: 156,
        joinDate: '2024-06-20',
        lastActive: '1 hour ago',
        expertise: ['Flood Safety', 'Community Organizing'],
        verified: false
      },
      content: 'Monsoon season is here! Our local community has organized sandbagging volunteers for low-lying areas. If you\'re in Andheri East, we meet every weekend at 7 AM near the community center. Let\'s protect our neighborhood together! 💪',
      type: 'alert',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4 hours ago
      likes: 156,
      comments: 45,
      shares: 67,
      tags: ['flood', 'volunteer', 'mumbai', 'community'],
      location: 'Andheri East, Mumbai',
      isLiked: true,
      urgency: 'high'
    },
    {
      id: '3',
      author: {
        id: '3',
        name: 'Captain Arjun Singh',
        avatar: 'AS',
        location: 'Chandigarh, Punjab',
        preparednessScore: 92,
        badges: ['Expert', 'Trainer', 'Fire Safety Specialist'],
        contributions: 312,
        joinDate: '2024-01-10',
        lastActive: '30 minutes ago',
        expertise: ['Fire Safety', 'Emergency Response', 'Training'],
        verified: true
      },
      content: 'Just completed a fire safety drill at a local school. 200+ students learned proper evacuation procedures. Remember: In a fire emergency, stay low, check doors for heat before opening, and never use elevators. Every second counts! 🔥🚒',
      type: 'story',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6 hours ago
      likes: 203,
      comments: 67,
      shares: 89,
      tags: ['fire-safety', 'training', 'school', 'evacuation'],
      isLiked: false,
      urgency: 'medium'
    }
  ]);

  const [localGroups, setLocalGroups] = useState<LocalGroup[]>([
    {
      id: '1',
      name: 'Delhi NCR Emergency Response Team',
      description: 'A community of trained volunteers ready to respond to emergencies in Delhi NCR region. We conduct monthly drills and training sessions.',
      memberCount: 1247,
      category: 'Emergency Response',
      location: 'Delhi NCR',
      activityLevel: 'high',
      nextEvent: {
        title: 'First Aid Training Workshop',
        date: '2025-01-20',
        location: 'Community Center, Gurgaon'
      },
      recentActivity: '15 new posts this week',
      admins: ['Dr. Raj Sharma', 'Captain Arjun Singh'],
      isJoined: true
    },
    {
      id: '2',
      name: 'Mumbai Flood Preparedness Network',
      description: 'Preparing Mumbai communities for monsoon floods. Share resources, coordinate relief efforts, and build resilient neighborhoods.',
      memberCount: 892,
      category: 'Flood Safety',
      location: 'Mumbai, Maharashtra',
      activityLevel: 'high',
      nextEvent: {
        title: 'Sandbag Distribution Drive',
        date: '2025-01-18',
        location: 'Multiple locations across Mumbai'
      },
      recentActivity: '23 new members this week',
      admins: ['Priya Patel'],
      isJoined: false
    },
    {
      id: '3',
      name: 'Bangalore IT Sector Safety Alliance',
      description: 'Workplace emergency preparedness for IT professionals. Focus on office building safety, evacuation procedures, and business continuity.',
      memberCount: 567,
      category: 'Workplace Safety',
      location: 'Bangalore, Karnataka',
      activityLevel: 'medium',
      recentActivity: '8 new discussions this week',
      admins: ['Tech Safety Team'],
      isJoined: false
    }
  ]);

  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([
    {
      rank: 1,
      member: {
        id: '1',
        name: 'Dr. Raj Sharma',
        avatar: 'RS',
        location: 'Delhi, India',
        preparednessScore: 95,
        badges: ['Expert', 'First Responder', 'Community Leader'],
        contributions: 247,
        joinDate: '2024-03-15',
        lastActive: 'Online now',
        expertise: ['Medical Emergency', 'Earthquake Safety'],
        verified: true
      },
      points: 2847,
      change: +23
    },
    {
      rank: 2,
      member: {
        id: '3',
        name: 'Captain Arjun Singh',
        avatar: 'AS',
        location: 'Chandigarh, Punjab',
        preparednessScore: 92,
        badges: ['Expert', 'Trainer', 'Fire Safety Specialist'],
        contributions: 312,
        joinDate: '2024-01-10',
        lastActive: '30 minutes ago',
        expertise: ['Fire Safety', 'Emergency Response', 'Training'],
        verified: true
      },
      points: 2756,
      change: +45
    },
    {
      rank: 3,
      member: {
        id: '4',
        name: 'Lt. Col. Meera Reddy',
        avatar: 'MR',
        location: 'Hyderabad, Telangana',
        preparednessScore: 89,
        badges: ['Military Veteran', 'Disaster Response Expert'],
        contributions: 198,
        joinDate: '2024-02-28',
        lastActive: '2 hours ago',
        expertise: ['Military Operations', 'Disaster Management'],
        verified: true
      },
      points: 2634,
      change: -12
    }
  ]);

  const currentUser = {
    id: 'current',
    name: 'Saksham Srivastava',
    avatar: 'SS',
    location: 'Gurgaon, Haryana',
    preparednessScore: 76,
    badges: ['Learner', 'Quiz Master'],
    contributions: 45,
    points: 892,
    rank: 15
  };

  const getPostTypeColor = (type: string) => {
    switch (type) {
      case 'tip': return 'bg-blue-500/20 text-blue-300 border-blue-400/30';
      case 'question': return 'bg-purple-500/20 text-purple-300 border-purple-400/30';
      case 'alert': return 'bg-red-500/20 text-red-300 border-red-400/30';
      case 'story': return 'bg-green-500/20 text-green-300 border-green-400/30';
      case 'resource': return 'bg-yellow-500/20 text-yellow-300 border-yellow-400/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-400/30';
    }
  };

  const getUrgencyColor = (urgency?: string) => {
    switch (urgency) {
      case 'critical': return 'border-l-red-500';
      case 'high': return 'border-l-orange-500';
      case 'medium': return 'border-l-yellow-500';
      case 'low': return 'border-l-green-500';
      default: return 'border-l-gray-500';
    }
  };

  const getActivityLevelColor = (level: string) => {
    switch (level) {
      case 'high': return 'text-emerald-400 bg-emerald-400/20';
      case 'medium': return 'text-yellow-400 bg-yellow-400/20';
      case 'low': return 'text-gray-400 bg-gray-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
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

  const toggleLike = (postId: string) => {
    setCommunityPosts(prev => prev.map(post =>
      post.id === postId
        ? {
            ...post,
            isLiked: !post.isLiked,
            likes: post.isLiked ? post.likes - 1 : post.likes + 1
          }
        : post
    ));
  };

  const joinGroup = (groupId: string) => {
    setLocalGroups(prev => prev.map(group =>
      group.id === groupId
        ? {
            ...group,
            isJoined: true,
            memberCount: group.memberCount + 1
          }
        : group
    ));
    toast.success('Successfully joined the group!');
  };

  const tags = ['all', 'earthquake', 'flood', 'fire-safety', 'medical', 'training', 'community', 'volunteer'];
  const filteredPosts = filterTag === 'all' 
    ? communityPosts 
    : communityPosts.filter(post => post.tags.includes(filterTag));

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="pt-12 pb-2">
        <h1 className="text-3xl font-semibold text-white mb-2">Community</h1>
        <p className="text-white/70">Connect, learn, and prepare together</p>
      </div>

      {/* Community Stats */}
      <Card className="p-6 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-400/30 shadow-xl backdrop-blur-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Users className="w-6 h-6 text-purple-400 mr-2" />
            <h3 className="font-semibold text-white">Your Community Impact</h3>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-white">#{currentUser.rank}</div>
            <p className="text-xs text-white/70">Rank</p>
          </div>
        </div>
        
        <div className="grid grid-cols-4 gap-4">
          <div className="text-center p-3 bg-white/10 rounded-lg">
            <div className="text-xl font-bold text-white">{currentUser.points}</div>
            <p className="text-xs text-white/70">Points</p>
          </div>
          <div className="text-center p-3 bg-white/10 rounded-lg">
            <div className="text-xl font-bold text-white">{currentUser.contributions}</div>
            <p className="text-xs text-white/70">Contributions</p>
          </div>
          <div className="text-center p-3 bg-white/10 rounded-lg">
            <div className="text-xl font-bold text-white">{currentUser.badges.length}</div>
            <p className="text-xs text-white/70">Badges</p>
          </div>
          <div className="text-center p-3 bg-white/10 rounded-lg">
            <div className="text-xl font-bold text-white">{localGroups.filter(g => g.isJoined).length}</div>
            <p className="text-xs text-white/70">Groups</p>
          </div>
        </div>
      </Card>

      {/* Navigation Tabs */}
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {[
          { id: 'feed', label: 'Community Feed', icon: MessageCircle },
          { id: 'groups', label: 'Local Groups', icon: Users },
          { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
          { id: 'events', label: 'Events', icon: Calendar }
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

      {/* Community Feed */}
      {activeView === 'feed' && (
        <div className="space-y-6">
          {/* Create Post */}
          <Card className="p-4 bg-white/10 backdrop-blur-lg border-white/20 shadow-xl">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold">{currentUser.avatar}</span>
              </div>
              <Input
                placeholder="Share a tip, ask a question, or report an alert..."
                className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
              <Button size="sm" className="bg-cyan-500 hover:bg-cyan-600">
                <Camera className="w-4 h-4 mr-2" />
                Post
              </Button>
            </div>
          </Card>

          {/* Tag Filters */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => setFilterTag(tag)}
                className={`px-3 py-1 rounded-full text-sm whitespace-nowrap transition-all ${
                  filterTag === tag
                    ? 'bg-cyan-400/30 text-cyan-300 border border-cyan-400/40'
                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>

          {/* Posts */}
          <div className="space-y-4">
            {filteredPosts.map((post) => (
              <Card key={post.id} className={`p-6 bg-white/10 backdrop-blur-lg border-white/20 shadow-xl border-l-4 ${getUrgencyColor(post.urgency)}`}>
                <div className="flex items-start space-x-3 mb-4">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold">{post.author.avatar}</span>
                    </div>
                    {post.author.verified && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full flex items-center justify-center">
                        <Star className="w-2 h-2 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-white">{post.author.name}</h4>
                        <div className="flex items-center space-x-2">
                          <p className="text-sm text-white/70">{post.author.location}</p>
                          <p className="text-xs text-white/50">•</p>
                          <p className="text-xs text-white/50">{getTimeAgo(post.timestamp)}</p>
                        </div>
                      </div>
                      <Badge className={getPostTypeColor(post.type)}>
                        {post.type.charAt(0).toUpperCase() + post.type.slice(1)}
                      </Badge>
                    </div>
                    
                    {/* Author badges */}
                    <div className="flex flex-wrap gap-1 mb-2">
                      {post.author.badges.slice(0, 3).map((badge, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {badge}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-white/90 mb-3">{post.content}</p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.tags.map((tag, index) => (
                      <span key={index} className="text-cyan-400 text-sm">#{tag}</span>
                    ))}
                  </div>

                  {/* Location if present */}
                  {post.location && (
                    <div className="flex items-center text-sm text-white/60 mb-3">
                      <MapPin className="w-4 h-4 mr-1" />
                      {post.location}
                    </div>
                  )}
                </div>

                {/* Engagement Actions */}
                <div className="flex items-center justify-between pt-3 border-t border-white/10">
                  <div className="flex items-center space-x-6">
                    <button
                      onClick={() => toggleLike(post.id)}
                      className={`flex items-center space-x-2 transition-colors ${
                        post.isLiked ? 'text-red-400' : 'text-white/60 hover:text-red-400'
                      }`}
                    >
                      <Heart className={`w-5 h-5 ${post.isLiked ? 'fill-current' : ''}`} />
                      <span className="text-sm">{post.likes}</span>
                    </button>
                    <button className="flex items-center space-x-2 text-white/60 hover:text-cyan-400 transition-colors">
                      <MessageCircle className="w-5 h-5" />
                      <span className="text-sm">{post.comments}</span>
                    </button>
                    <button className="flex items-center space-x-2 text-white/60 hover:text-green-400 transition-colors">
                      <Share2 className="w-5 h-5" />
                      <span className="text-sm">{post.shares}</span>
                    </button>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-white/60">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm">{post.author.preparednessScore}%</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Local Groups */}
      {activeView === 'groups' && (
        <div className="space-y-4">
          {localGroups.map((group) => (
            <Card key={group.id} className="p-6 bg-white/10 backdrop-blur-lg border-white/20 shadow-xl">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="font-semibold text-white">{group.name}</h4>
                    <Badge className={getActivityLevelColor(group.activityLevel)}>
                      {group.activityLevel} activity
                    </Badge>
                  </div>
                  <p className="text-sm text-white/80 mb-3">{group.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-white/60">Members</p>
                      <p className="text-sm font-medium text-white">{group.memberCount.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-white/60">Category</p>
                      <p className="text-sm font-medium text-white">{group.category}</p>
                    </div>
                    <div>
                      <p className="text-xs text-white/60">Location</p>
                      <p className="text-sm font-medium text-white">{group.location}</p>
                    </div>
                    <div>
                      <p className="text-xs text-white/60">Recent Activity</p>
                      <p className="text-sm font-medium text-white">{group.recentActivity}</p>
                    </div>
                  </div>

                  {/* Next Event */}
                  {group.nextEvent && (
                    <div className="p-3 bg-cyan-400/20 border border-cyan-400/30 rounded-lg mb-4">
                      <h5 className="font-medium text-cyan-300 mb-1">Upcoming Event</h5>
                      <p className="text-sm text-white">{group.nextEvent.title}</p>
                      <div className="flex items-center text-xs text-cyan-200 mt-1">
                        <Calendar className="w-3 h-3 mr-1" />
                        <span className="mr-3">{new Date(group.nextEvent.date).toLocaleDateString()}</span>
                        <MapPin className="w-3 h-3 mr-1" />
                        <span>{group.nextEvent.location}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-white/60">Admins:</span>
                  <div className="flex flex-wrap gap-1">
                    {group.admins.map((admin, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {admin}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <Button
                  onClick={() => !group.isJoined && joinGroup(group.id)}
                  size="sm"
                  className={
                    group.isJoined
                      ? 'bg-emerald-500/30 text-emerald-300 border border-emerald-400/40'
                      : 'bg-cyan-500 hover:bg-cyan-600'
                  }
                  disabled={group.isJoined}
                >
                  {group.isJoined ? 'Joined' : 'Join Group'}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Leaderboard */}
      {activeView === 'leaderboard' && (
        <div className="space-y-4">
          <Card className="p-6 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-yellow-400/30 shadow-xl backdrop-blur-lg">
            <div className="flex items-center mb-4">
              <Trophy className="w-6 h-6 text-yellow-400 mr-2" />
              <h3 className="font-semibold text-white">Top Contributors This Month</h3>
            </div>
            
            <div className="space-y-3">
              {leaderboard.map((entry) => (
                <div key={entry.member.id} className="flex items-center justify-between p-4 bg-white/10 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                      entry.rank === 1 ? 'bg-yellow-400 text-black' :
                      entry.rank === 2 ? 'bg-gray-300 text-black' :
                      entry.rank === 3 ? 'bg-amber-600 text-white' :
                      'bg-white/20 text-white'
                    }`}>
                      {entry.rank}
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center relative">
                        <span className="text-white font-semibold">{entry.member.avatar}</span>
                        {entry.member.verified && (
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full flex items-center justify-center">
                            <Star className="w-2 h-2 text-white" />
                          </div>
                        )}
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-white">{entry.member.name}</h4>
                        <p className="text-sm text-white/70">{entry.member.location}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-white">{entry.points}</span>
                      <div className={`flex items-center ${
                        entry.change > 0 ? 'text-emerald-400' : 'text-red-400'
                      }`}>
                        <TrendingUp className={`w-4 h-4 ${entry.change < 0 ? 'rotate-180' : ''}`} />
                        <span className="text-sm">{Math.abs(entry.change)}</span>
                      </div>
                    </div>
                    <p className="text-xs text-white/60">{entry.member.contributions} contributions</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Your Ranking */}
          <Card className="p-6 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-cyan-400/30 shadow-xl backdrop-blur-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold">{currentUser.avatar}</span>
                </div>
                <div>
                  <h4 className="font-semibold text-white">Your Ranking</h4>
                  <p className="text-sm text-white/70">Keep contributing to climb higher!</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-white">#{currentUser.rank}</div>
                <p className="text-sm text-cyan-300">{currentUser.points} points</p>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}