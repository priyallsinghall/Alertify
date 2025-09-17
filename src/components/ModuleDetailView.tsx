import { ArrowLeft, CheckCircle, XCircle, AlertTriangle, Lightbulb, Book, Users, Brain } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useProgress } from '../contexts/ProgressContext';

interface ModuleDetail {
  id: string;
  title: string;
  icon: any;
  color: string;
  image: string;
  description: string;
  whatIs: string;
  causes: string[];
  dos: string[];
  donts: string[];
  beforeTips: string[];
  duringTips: string[];
  afterTips: string[];
  facts: string[];
  preparednessLevel: number;
}

interface ModuleDetailViewProps {
  module: ModuleDetail;
  onBack: () => void;
  onNavigateToQuiz?: (moduleId: string) => void;
}

export function ModuleDetailView({ module, onBack, onNavigateToQuiz }: ModuleDetailViewProps) {
  const Icon = module.icon;
  const { markModuleCompleted, quizResults } = useProgress();
  
  const handleCompleteModule = () => {
    markModuleCompleted(module.id);
  };

  const hasQuizCompleted = quizResults[module.id] !== undefined;

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="pt-12 pb-2">
        <div className="flex items-center mb-4">
          <Button
            onClick={onBack}
            variant="outline"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20 mr-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div className="flex items-center space-x-3">
            <div className={`p-3 rounded-full ${module.color}`}>
              <Icon className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-semibold text-white">{module.title}</h1>
              <p className="text-white/70">Complete disaster guide</p>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Image */}
      <Card className="p-0 bg-white/10 backdrop-blur-lg border-white/20 shadow-xl overflow-hidden">
        <div className="relative h-48">
          <ImageWithFallback
            src={module.image}
            alt={module.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <div className={`p-4 rounded-full ${module.color} bg-opacity-90`}>
              <Icon className="w-12 h-12 text-white" />
            </div>
          </div>
        </div>
        <div className="p-6">
          <h2 className="text-xl font-semibold text-white mb-2">What is {module.title}?</h2>
          <p className="text-white/80">{module.whatIs}</p>
        </div>
      </Card>

      {/* Causes */}
      <Card className="p-6 bg-white/10 backdrop-blur-lg border-white/20 shadow-xl">
        <div className="flex items-center mb-4">
          <Book className="w-6 h-6 text-cyan-400 mr-2" />
          <h3 className="font-semibold text-white">Main Causes</h3>
        </div>
        <div className="space-y-2">
          {module.causes.map((cause, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-white/80">{cause}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Do's and Don'ts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Do's */}
        <Card className="p-6 bg-emerald-500/10 border-emerald-400/30 shadow-xl backdrop-blur-lg">
          <div className="flex items-center mb-4">
            <CheckCircle className="w-6 h-6 text-emerald-400 mr-2" />
            <h3 className="font-semibold text-white">Do's</h3>
          </div>
          <div className="space-y-3">
            {module.dos.map((item, index) => (
              <div key={index} className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <p className="text-white/90 text-sm">{item}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Don'ts */}
        <Card className="p-6 bg-red-500/10 border-red-400/30 shadow-xl backdrop-blur-lg">
          <div className="flex items-center mb-4">
            <XCircle className="w-6 h-6 text-red-400 mr-2" />
            <h3 className="font-semibold text-white">Don'ts</h3>
          </div>
          <div className="space-y-3">
            {module.donts.map((item, index) => (
              <div key={index} className="flex items-start space-x-3">
                <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-white/90 text-sm">{item}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Timeline Preparedness */}
      <Card className="p-6 bg-white/10 backdrop-blur-lg border-white/20 shadow-xl">
        <div className="flex items-center mb-6">
          <AlertTriangle className="w-6 h-6 text-yellow-400 mr-2" />
          <h3 className="font-semibold text-white">Preparedness Timeline</h3>
        </div>

        <div className="space-y-6">
          {/* Before */}
          <div>
            <h4 className="font-medium text-white mb-3 flex items-center">
              <div className="w-3 h-3 bg-blue-400 rounded-full mr-2"></div>
              Before {module.title}
            </h4>
            <div className="space-y-2 ml-5">
              {module.beforeTips.map((tip, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-white/80 text-sm">{tip}</p>
                </div>
              ))}
            </div>
          </div>

          {/* During */}
          <div>
            <h4 className="font-medium text-white mb-3 flex items-center">
              <div className="w-3 h-3 bg-orange-400 rounded-full mr-2"></div>
              During {module.title}
            </h4>
            <div className="space-y-2 ml-5">
              {module.duringTips.map((tip, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-white/80 text-sm">{tip}</p>
                </div>
              ))}
            </div>
          </div>

          {/* After */}
          <div>
            <h4 className="font-medium text-white mb-3 flex items-center">
              <div className="w-3 h-3 bg-emerald-400 rounded-full mr-2"></div>
              After {module.title}
            </h4>
            <div className="space-y-2 ml-5">
              {module.afterTips.map((tip, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-white/80 text-sm">{tip}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Interesting Facts */}
      <Card className="p-6 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-400/30 shadow-xl backdrop-blur-lg">
        <div className="flex items-center mb-4">
          <Lightbulb className="w-6 h-6 text-purple-400 mr-2" />
          <h3 className="font-semibold text-white">Did You Know?</h3>
        </div>
        <div className="space-y-3">
          {module.facts.map((fact, index) => (
            <div key={index} className="p-3 bg-white/10 rounded-lg">
              <p className="text-white/90 text-sm">{fact}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Community Resources */}
      <Card className="p-6 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-cyan-400/30 shadow-xl backdrop-blur-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Users className="w-6 h-6 text-cyan-400 mr-2" />
            <h3 className="font-semibold text-white">Community Resources</h3>
          </div>
          <Badge className="bg-cyan-400/20 text-cyan-300 border-cyan-400/30">
            Available 24/7
          </Badge>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-white/10 rounded-lg">
            <h4 className="font-medium text-white mb-2">Local Emergency Services</h4>
            <p className="text-white/80 text-sm">Connect with local disaster response teams and volunteer organizations in your area.</p>
          </div>
          <div className="p-4 bg-white/10 rounded-lg">
            <h4 className="font-medium text-white mb-2">Expert Consultation</h4>
            <p className="text-white/80 text-sm">Access to certified disaster preparedness experts for personalized guidance.</p>
          </div>
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button 
            className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600"
            onClick={() => onNavigateToQuiz?.(module.id)}
          >
            <Brain className="w-4 h-4 mr-2" />
            {hasQuizCompleted ? 'Retake Quiz' : `Take ${module.title} Quiz`}
            {hasQuizCompleted && (
              <CheckCircle className="w-4 h-4 ml-2 text-emerald-200" />
            )}
          </Button>
          <Button variant="outline" className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20">
            <Users className="w-4 h-4 mr-2" />
            Join Community Discussion
          </Button>
        </div>
        
        <Button 
          onClick={handleCompleteModule}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
        >
          <CheckCircle className="w-4 h-4 mr-2" />
          Mark Module as Complete
        </Button>
      </div>
    </div>
  );
}