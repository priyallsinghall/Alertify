import { User, MapPin, Bookmark, Trophy, Settings, Bell, Shield, ChevronRight, Target, Brain, Book } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { useProgress } from '../contexts/ProgressContext';

export function ProfileTab() {
  const { overallPreparedness, getModuleCompletionRate, getQuizCompletionRate, quizResults, moduleProgress } = useProgress();
  
  const user = {
    name: 'Saksham Srivastava',
    location: 'Gurgaon, Haryana',
    joinDate: 'Member since Jan 2025',
    avatar: 'SS'
  };

  // Calculate quiz performance average
  const completedQuizzes = Object.values(quizResults);
  const averageQuizScore = completedQuizzes.length > 0 
    ? Math.round(completedQuizzes.reduce((sum, quiz) => sum + quiz.percentage, 0) / completedQuizzes.length)
    : 0;

  const preparednessData = {
    overallScore: overallPreparedness,
    categories: [
      { name: 'Module Completion', score: getModuleCompletionRate(), color: 'bg-blue-500', icon: Book },
      { name: 'Quiz Performance', score: averageQuizScore, color: 'bg-purple-500', icon: Brain },
      { name: 'Quiz Completion', score: getQuizCompletionRate(), color: 'bg-green-500', icon: Trophy },
      { name: 'Overall Readiness', score: overallPreparedness, color: 'bg-cyan-500', icon: Shield }
    ]
  };

  const achievements = [
    { 
      title: 'Quick Learner', 
      description: 'Completed your first disaster module', 
      earned: Object.keys(moduleProgress).filter(id => moduleProgress[id]?.completed).length > 0 
    },
    { 
      title: 'Preparedness Pro', 
      description: 'Achieved 80%+ readiness score', 
      earned: overallPreparedness >= 80 
    },
    { 
      title: 'Quiz Master', 
      description: 'Completed 5+ disaster quizzes', 
      earned: Object.keys(quizResults).length >= 5 
    },
    { 
      title: 'High Achiever', 
      description: 'Scored 90%+ on any quiz', 
      earned: completedQuizzes.some(quiz => quiz.percentage >= 90)
    },
    { 
      title: 'Knowledge Expert', 
      description: 'Completed all disaster modules', 
      earned: Object.keys(moduleProgress).filter(id => moduleProgress[id]?.completed).length >= 8 
    },
    { 
      title: 'Perfect Score', 
      description: 'Achieved 100% on any quiz', 
      earned: completedQuizzes.some(quiz => quiz.percentage === 100)
    }
  ];

  const savedItems = [
    { title: 'Essential First Aid Techniques', type: 'Video', category: 'First Aid' },
    { title: 'Earthquake Safety Guide', type: 'Module', category: 'Earthquake' },
    { title: 'Emergency Kit Checklist', type: 'Article', category: 'Survival Kits' }
  ];

  const settingsOptions = [
    { title: 'Notification Preferences', icon: Bell, description: 'Alert settings and preferences' },
    { title: 'Location Settings', icon: MapPin, description: 'Manage location sharing' },
    { title: 'Privacy & Security', icon: Shield, description: 'Account security settings' },
    { title: 'General Settings', icon: Settings, description: 'App preferences and more' }
  ];

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="pt-12 pb-2">
        <h1 className="text-3xl font-semibold text-white mb-2">Profile</h1>
        <p className="text-white/70">Manage your account and track progress</p>
      </div>

      {/* User Profile Card */}
      <Card className="p-6 bg-gradient-to-r from-cyan-500 to-blue-600 border-none shadow-2xl text-white backdrop-blur-lg">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <span className="text-xl font-semibold">{user.avatar}</span>
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-semibold mb-1">{user.name}</h2>
            <div className="flex items-center text-cyan-100 mb-1">
              <MapPin className="w-4 h-4 mr-1" />
              <span className="text-sm">{user.location}</span>
            </div>
            <p className="text-cyan-100 text-sm">{user.joinDate}</p>
          </div>
          <ChevronRight className="w-6 h-6 text-cyan-200" />
        </div>
      </Card>

      {/* Dynamic Preparedness Progress Tracker */}
      <Card className="p-6 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border-emerald-400/30 shadow-xl backdrop-blur-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Target className="w-6 h-6 text-emerald-400 mr-2" />
            <h3 className="font-semibold text-white">Preparedness Score</h3>
          </div>
          <Badge variant="secondary" className="bg-emerald-400/20 text-emerald-300 border-emerald-400/30 text-lg px-3 py-1">
            {preparednessData.overallScore}%
          </Badge>
        </div>
        
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm text-white/80">Overall Disaster Readiness</span>
            <span className="text-sm font-medium text-white">{preparednessData.overallScore}%</span>
          </div>
          <Progress value={preparednessData.overallScore} className="h-4" />
          <p className="text-xs text-white/60 mt-2">
            Based on your module completion, quiz performance, and learning progress
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {preparednessData.categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <div key={index} className="p-4 bg-white/10 rounded-lg backdrop-blur-sm">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <Icon className="w-5 h-5 text-emerald-400 mr-2" />
                    <span className="text-sm text-white/90 font-medium">{category.name}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl font-bold text-white">{category.score}%</span>
                </div>
                <Progress value={category.score} className="h-2" />
              </div>
            );
          })}
        </div>

        {/* Progress Stats */}
        <div className="mt-6 pt-4 border-t border-white/10">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-xl font-bold text-white">{Object.keys(moduleProgress).filter(id => moduleProgress[id]?.completed).length}</div>
              <p className="text-xs text-white/70">Modules Completed</p>
            </div>
            <div>
              <div className="text-xl font-bold text-white">{Object.keys(quizResults).length}</div>
              <p className="text-xs text-white/70">Quizzes Taken</p>
            </div>
            <div>
              <div className="text-xl font-bold text-white">
                {completedQuizzes.filter(quiz => quiz.percentage >= 80).length}
              </div>
              <p className="text-xs text-white/70">High Scores (80%+)</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Achievements */}
      <Card className="p-6 bg-white/10 backdrop-blur-lg border-white/20 shadow-xl">
        <div className="flex items-center mb-4">
          <Trophy className="w-6 h-6 text-yellow-400 mr-2" />
          <h3 className="font-semibold text-white">Achievements</h3>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          {achievements.map((achievement, index) => (
            <div key={index} className={`p-3 rounded-lg border-2 transition-all duration-300 ${
              achievement.earned 
                ? 'bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border-yellow-400/40 shadow-lg' 
                : 'bg-white/5 border-white/20 opacity-60'
            }`}>
              <div className="flex items-center mb-2">
                <Trophy className={`w-5 h-5 mr-2 ${
                  achievement.earned ? 'text-yellow-400' : 'text-white/40'
                }`} />
                <span className={`font-medium text-sm ${
                  achievement.earned ? 'text-white' : 'text-white/60'
                }`}>
                  {achievement.title}
                </span>
                {achievement.earned && (
                  <div className="ml-auto">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                  </div>
                )}
              </div>
              <p className={`text-xs ${
                achievement.earned ? 'text-white/80' : 'text-white/40'
              }`}>
                {achievement.description}
              </p>
            </div>
          ))}
        </div>
        
        {/* Achievement Progress */}
        <div className="mt-4 pt-4 border-t border-white/10">
          <div className="flex items-center justify-between">
            <span className="text-sm text-white/80">Achievement Progress</span>
            <span className="text-sm font-medium text-white">
              {achievements.filter(a => a.earned).length}/{achievements.length}
            </span>
          </div>
          <Progress 
            value={(achievements.filter(a => a.earned).length / achievements.length) * 100} 
            className="h-2 mt-2" 
          />
        </div>
      </Card>

      {/* Saved Resources */}
      <Card className="p-6 bg-white/10 backdrop-blur-lg border-white/20 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Bookmark className="w-6 h-6 text-cyan-400 mr-2" />
            <h3 className="font-semibold text-white">Saved Resources</h3>
          </div>
          <ChevronRight className="w-5 h-5 text-white/60" />
        </div>
        
        <div className="space-y-3">
          {savedItems.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-white/10 rounded-lg">
              <div>
                <h4 className="font-medium text-white text-sm">{item.title}</h4>
                <div className="flex items-center space-x-2 mt-1">
                  <Badge variant="secondary" className="bg-cyan-400/20 text-cyan-300 border-cyan-400/30 text-xs">
                    {item.type}
                  </Badge>
                  <span className="text-xs text-white/60">{item.category}</span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-white/60" />
            </div>
          ))}
        </div>
      </Card>

      {/* Settings */}
      <Card className="p-6 bg-white/10 backdrop-blur-lg border-white/20 shadow-xl">
        <h3 className="font-semibold text-white mb-4">Settings</h3>
        
        <div className="space-y-1">
          {settingsOptions.map((option, index) => {
            const Icon = option.icon;
            return (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-white/10 transition-colors cursor-pointer">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-white/10 rounded-full">
                    <Icon className="w-5 h-5 text-white/80" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white text-sm">{option.title}</h4>
                    <p className="text-xs text-white/60">{option.description}</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-white/60" />
              </div>
            );
          })}
        </div>
      </Card>

      {/* Sign Out */}
      <Card className="p-4 bg-red-500/20 border-red-400/30 shadow-xl backdrop-blur-lg">
        <button className="w-full py-3 text-red-300 font-medium rounded-lg hover:bg-red-500/30 transition-colors">
          Sign Out
        </button>
      </Card>
    </div>
  );
}