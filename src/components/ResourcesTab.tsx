import { Bookmark, Play, FileText, Heart, Package, MapPin, Thermometer, ChevronRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

export function ResourcesTab() {
  const categories = [
    { id: 'first-aid', name: 'First Aid', icon: Heart, color: 'bg-red-500' },
    { id: 'survival-kits', name: 'Survival Kits', icon: Package, color: 'bg-green-500' },
    { id: 'evacuation', name: 'Evacuation Planning', icon: MapPin, color: 'bg-blue-500' },
    { id: 'climate', name: 'Climate Awareness', icon: Thermometer, color: 'bg-orange-500' }
  ];

  const resources = [
    {
      id: 1,
      title: 'Essential First Aid Techniques',
      type: 'video',
      category: 'first-aid',
      duration: '12 min',
      bookmarked: true,
      description: 'Learn basic first aid techniques for emergency situations',
      image: 'https://images.unsplash.com/photo-1566889035559-b14ef9d4c365?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXJzdCUyMGFpZCUyMGtpdCUyMG1lZGljYWx8ZW58MXx8fHwxNzU3NzIzOTM4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      id: 2,
      title: 'Building Your Emergency Kit',
      type: 'article',
      category: 'survival-kits',
      readTime: '8 min read',
      bookmarked: false,
      description: 'Complete guide to assembling a comprehensive emergency preparedness kit',
      image: 'https://images.unsplash.com/photo-1566889035559-b14ef9d4c365?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXJzdCUyMGFpZCUyMGtpdCUyMG1lZGljYWx8ZW58MXx8fHwxNzU3NzIzOTM4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      id: 3,
      title: 'Earthquake Safety: Drop, Cover, Hold',
      type: 'infographic',
      category: 'evacuation',
      views: '2.5k',
      bookmarked: true,
      description: 'Visual guide to earthquake safety procedures',
      image: 'https://images.unsplash.com/photo-1708681097926-2505401227e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlYXJ0aHF1YWtlJTIwZGlzYXN0ZXJ8ZW58MXx8fHwxNzU3ODM1MDM2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      id: 4,
      title: 'Understanding Climate Change Impacts',
      type: 'video',
      category: 'climate',
      duration: '15 min',
      bookmarked: false,
      description: 'How climate change affects disaster patterns and frequency',
      image: 'https://images.unsplash.com/photo-1687982122778-9a5883144dfb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWF0d2F2ZSUyMGRlc2VydCUyMHN1bnxlbnwxfHx8fDE3NTc4MzUwMzh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      id: 5,
      title: 'Home Emergency Communication Plan',
      type: 'article',
      category: 'evacuation',
      readTime: '10 min read',
      bookmarked: true,
      description: 'Create a family communication strategy for emergencies',
      image: 'https://images.unsplash.com/photo-1566889035559-b14ef9d4c365?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXJzdCUyMGFpZCUyMGtpdCUyMG1lZGljYWx8ZW58MXx8fHwxNzU3NzIzOTM4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      id: 6,
      title: 'Water Purification Methods',
      type: 'infographic',
      category: 'survival-kits',
      views: '1.8k',
      bookmarked: false,
      description: 'Essential water purification techniques for emergencies',
      image: 'https://images.unsplash.com/photo-1657069343871-fd1476990d04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmbG9vZCUyMGRpc2FzdGVyfGVufDF8fHx8MTc1NzgzNTAzN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return Play;
      case 'article': return FileText;
      case 'infographic': return FileText;
      default: return FileText;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'video': return 'bg-red-400/20 text-red-300 border-red-400/30';
      case 'article': return 'bg-cyan-400/20 text-cyan-300 border-cyan-400/30';
      case 'infographic': return 'bg-purple-400/20 text-purple-300 border-purple-400/30';
      default: return 'bg-white/20 text-white/80 border-white/30';
    }
  };

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="pt-12 pb-2">
        <h1 className="text-3xl font-semibold text-white mb-2">Resources</h1>
        <p className="text-white/70">Educational content for disaster preparedness</p>
      </div>

      {/* Bookmarked Section */}
      <Card className="p-4 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-yellow-400/30 shadow-xl backdrop-blur-lg">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <Bookmark className="w-5 h-5 text-yellow-400 mr-2" />
            <h3 className="font-semibold text-white">Bookmarked Resources</h3>
          </div>
          <Badge variant="secondary" className="bg-yellow-400/20 text-yellow-300 border-yellow-400/30">
            3 saved
          </Badge>
        </div>
        <p className="text-sm text-white/80">Quick access to your saved learning materials</p>
      </Card>

      {/* Categories */}
      <div>
        <h3 className="font-semibold text-white mb-4">Categories</h3>
        <div className="grid grid-cols-2 gap-3">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Card key={category.id} className="p-4 bg-white/10 backdrop-blur-lg border-white/20 shadow-xl hover:bg-white/15 hover:shadow-2xl transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-full ${category.color}`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="font-medium text-white">{category.name}</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-white/60" />
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Featured Resources */}
      <div>
        <h3 className="font-semibold text-white mb-4">Featured Resources</h3>
        <div className="space-y-4">
          {resources.map((resource) => {
            const TypeIcon = getTypeIcon(resource.type);
            return (
              <Card key={resource.id} className="p-4 bg-white/10 backdrop-blur-lg border-white/20 shadow-xl hover:bg-white/15 hover:shadow-2xl transition-all duration-300">
                <div className="flex space-x-4">
                  {/* Resource Image */}
                  <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                    <ImageWithFallback
                      src={resource.image}
                      alt={resource.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <div className="p-2 bg-white/20 rounded-full backdrop-blur-sm">
                        <TypeIcon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Resource Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-white line-clamp-2">{resource.title}</h4>
                      <button className={`ml-2 p-1 rounded-full ${resource.bookmarked ? 'text-yellow-400' : 'text-white/60'} hover:text-yellow-400 transition-colors`}>
                        <Bookmark className={`w-5 h-5 ${resource.bookmarked ? 'fill-current' : ''}`} />
                      </button>
                    </div>
                    
                    <p className="text-sm text-white/80 mb-3 line-clamp-2">{resource.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary" className={getTypeColor(resource.type)}>
                          {resource.type}
                        </Badge>
                        <span className="text-xs text-white/60">
                          {resource.duration || resource.readTime || `${resource.views} views`}
                        </span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-white/60" />
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Browse More */}
      <Card className="p-4 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-cyan-400/30 shadow-xl backdrop-blur-lg">
        <div className="text-center">
          <h3 className="font-semibold text-white mb-2">Explore More Resources</h3>
          <p className="text-sm text-white/80 mb-4">Discover additional learning materials and expert insights</p>
          <button className="w-full py-2 px-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 shadow-lg">
            Browse All Resources
          </button>
        </div>
      </Card>
    </div>
  );
}