import { useState } from 'react';
import { Home, Book, Phone, Lightbulb, User, Brain, Package, Users, Shield, Zap, Bell, Map } from 'lucide-react';
import { HomeTab } from './components/HomeTab';
import { ModulesTab } from './components/ModulesTab';
import { EmergencyTab } from './components/EmergencyTab';
import { ResourcesTab } from './components/ResourcesTab';
import { ProfileTab } from './components/ProfileTab';
import { QuizTab } from './components/QuizTab';
import { EmergencyKitTab } from './components/EmergencyKitTab';
import { FamilySafetyTab } from './components/FamilySafetyTab';
import { LiveAlertsTab } from './components/LiveAlertsTab';
import { CommunityTab } from './components/CommunityTab';
import { AIRiskAssessment } from './components/AIRiskAssessment';
import { EmergencyDrillTab } from './components/EmergencyDrillTab';
import { ProgressProvider } from './contexts/ProgressContext';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');

  const tabs = [
    { id: 'community', icon: Users, label: 'Community' },
    { id: 'kit', icon: Package, label: 'Kit' },
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'alerts', icon: Bell, label: 'Alerts' },
    { id: 'family', icon: Shield, label: 'Family' },
  ];

  const handleQuickGuideClick = (moduleId: string) => {
    setActiveTab('modules');
    // We'll pass this to the ModulesTab to automatically select the module
    setTimeout(() => {
      const event = new CustomEvent('selectModule', { detail: { moduleId } });
      window.dispatchEvent(event);
    }, 100);
  };

  const handleNavigateToQuiz = (moduleId: string) => {
    setActiveTab('quiz');
    // Navigate to specific quiz
    setTimeout(() => {
      const event = new CustomEvent('selectQuiz', { detail: { quizId: moduleId } });
      window.dispatchEvent(event);
    }, 100);
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'home':
        return <HomeTab onNavigateToModule={handleQuickGuideClick} onNavigateToTab={setActiveTab} />;
      case 'modules':
        return <ModulesTab onNavigateToQuiz={handleNavigateToQuiz} />;
      case 'quiz':
        return <QuizTab />;
      case 'emergency':
        return <EmergencyTab />;
      case 'profile':
        return <ProfileTab />;
      case 'kit':
        return <EmergencyKitTab />;
      case 'family':
        return <FamilySafetyTab />;
      case 'alerts':
        return <LiveAlertsTab />;
      case 'community':
        return <CommunityTab />;
      case 'resources':
        return <ResourcesTab />;
      case 'risk':
        return <AIRiskAssessment />;
      case 'drills':
        return <EmergencyDrillTab />;
      case 'emergency':
        return <EmergencyTab />;
      case 'profile':
        return <ProfileTab />;
      default:
        return <HomeTab onNavigateToModule={handleQuickGuideClick} onNavigateToTab={setActiveTab} />;
    }
  };

  return (
    <ProgressProvider>
      <div className="h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-black flex flex-col">
        {/* Main Content */}
        <div className="flex-1 overflow-auto pb-20">
          {renderActiveTab()}
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-black/40 backdrop-blur-xl border-t border-white/10 px-2 py-1">
          <div className="flex justify-around items-end max-w-md mx-auto">
            {tabs.map((tab, index) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              const isCenter = index === 2; // Home tab is now at index 2
              
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex flex-col items-center transition-all duration-300 ${
                    isCenter 
                      ? `py-1 px-3 ${isActive ? 'transform -translate-y-2 scale-110' : 'transform scale-105'}` 
                      : 'py-2 px-3'
                  } ${
                    isActive && !isCenter
                      ? 'transform scale-105'
                      : ''
                  }`}
                >
                  <div className={`relative transition-all duration-300 ${
                    isActive
                      ? isCenter 
                        ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-white shadow-2xl shadow-cyan-400/50 rounded-2xl p-3 mb-1'
                        : 'bg-gradient-to-r from-cyan-400 to-blue-500 text-white shadow-lg shadow-cyan-400/30 rounded-xl p-2 mb-1'
                      : isCenter
                        ? 'bg-white/10 text-white/80 rounded-2xl p-3 mb-1 hover:bg-white/20 hover:text-cyan-300'
                        : 'text-white/60 hover:text-cyan-300 rounded-xl p-2 mb-1 hover:bg-white/10'
                  }`}>
                    <Icon 
                      className={`${isCenter ? 'w-7 h-7' : 'w-6 h-6'} ${
                        tab.id === 'emergency' && isActive ? 'fill-current' : ''
                      }`} 
                    />
                    {isActive && isCenter && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full animate-ping"></div>
                    )}
                  </div>
                  <span className={`text-xs transition-all duration-300 ${
                    isActive 
                      ? isCenter ? 'text-cyan-300 font-semibold' : 'text-cyan-300 font-medium'
                      : 'text-white/70'
                  } ${isCenter ? 'text-sm' : ''}`}>
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </ProgressProvider>
  );
}