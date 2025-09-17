import { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, CheckCircle, Clock, Target, Trophy, Star, AlertTriangle, MapPin, Users, Timer } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { toast } from 'sonner@2.0.3';

interface DrillScenario {
  id: string;
  name: string;
  type: 'earthquake' | 'fire' | 'flood' | 'medical' | 'evacuation' | 'shelter';
  difficulty: 'beginner' | 'intermediate' | 'expert';
  duration: number; // in minutes
  description: string;
  objectives: string[];
  steps: Array<{
    id: string;
    instruction: string;
    timeLimit: number; // in seconds
    type: 'action' | 'decision' | 'knowledge';
    options?: string[];
    correctAnswer?: number;
    points: number;
  }>;
  tips: string[];
  badges: string[];
}

interface DrillSession {
  id: string;
  scenarioId: string;
  startTime: Date;
  endTime?: Date;
  currentStep: number;
  completedSteps: string[];
  score: number;
  timeSpent: number;
  mistakes: number;
  status: 'not_started' | 'in_progress' | 'paused' | 'completed' | 'failed';
}

interface DrillHistory {
  id: string;
  scenarioName: string;
  completedAt: Date;
  score: number;
  timeSpent: number;
  rating: number; // 1-5 stars
  badgesEarned: string[];
}

export function EmergencyDrillTab() {
  const [activeView, setActiveView] = useState<'scenarios' | 'active' | 'history'>('scenarios');
  const [selectedScenario, setSelectedScenario] = useState<DrillScenario | null>(null);
  const [currentSession, setCurrentSession] = useState<DrillSession | null>(null);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const [drillScenarios, setDrillScenarios] = useState<DrillScenario[]>([
    {
      id: '1',
      name: 'Office Earthquake Response',
      type: 'earthquake',
      difficulty: 'beginner',
      duration: 10,
      description: 'Practice proper earthquake response procedures in an office environment. Learn the Drop, Cover, and Hold On technique.',
      objectives: [
        'Execute Drop, Cover, and Hold On within 5 seconds',
        'Identify safe spots and hazards in the office',
        'Follow proper evacuation procedures',
        'Account for all team members'
      ],
      steps: [
        {
          id: '1',
          instruction: 'You feel strong shaking in your office. What is your immediate response?',
          timeLimit: 10,
          type: 'decision',
          options: ['Run outside immediately', 'Drop, Cover, and Hold On', 'Stand in doorway', 'Hide under stairs'],
          correctAnswer: 1,
          points: 100
        },
        {
          id: '2',
          instruction: 'Drop to your hands and knees. Take cover under your desk.',
          timeLimit: 5,
          type: 'action',
          points: 150
        },
        {
          id: '3',
          instruction: 'Hold on to your shelter and protect your head and neck with your arms.',
          timeLimit: 30,
          type: 'action',
          points: 100
        },
        {
          id: '4',
          instruction: 'Shaking has stopped. What should you do next?',
          timeLimit: 15,
          type: 'decision',
          options: ['Use elevator to evacuate', 'Check for injuries and hazards', 'Call emergency services immediately', 'Return to work'],
          correctAnswer: 1,
          points: 100
        }
      ],
      tips: [
        'Practice Drop, Cover, and Hold On monthly',
        'Identify safe spots in each room',
        'Keep emergency supplies accessible',
        'Never run during shaking'
      ],
      badges: ['Earthquake Responder', 'Safety First', 'Quick Thinker']
    },
    {
      id: '2',
      name: 'Home Fire Evacuation',
      type: 'fire',
      difficulty: 'intermediate',
      duration: 8,
      description: 'Navigate through a house fire scenario, making critical decisions about evacuation routes and family safety.',
      objectives: [
        'Escape safely using proper techniques',
        'Alert family members quickly',
        'Test doors for heat before opening',
        'Meet at designated meeting point'
      ],
      steps: [
        {
          id: '1',
          instruction: 'Smoke alarm is ringing. You smell smoke. What\'s your first action?',
          timeLimit: 5,
          type: 'decision',
          options: ['Investigate the source', 'Alert family members', 'Call 911 first', 'Open windows for ventilation'],
          correctAnswer: 1,
          points: 100
        },
        {
          id: '2',
          instruction: 'Alert your family by shouting "FIRE! EVERYONE OUT!" Move to your bedroom door.',
          timeLimit: 10,
          type: 'action',
          points: 150
        },
        {
          id: '3',
          instruction: 'Before opening the door, you should:',
          timeLimit: 10,
          type: 'decision',
          options: ['Open it quickly', 'Feel the door for heat', 'Look through keyhole', 'Wait for help'],
          correctAnswer: 1,
          points: 100
        },
        {
          id: '4',
          instruction: 'The door is cool. Open carefully and check hallway for smoke and fire.',
          timeLimit: 15,
          type: 'action',
          points: 100
        }
      ],
      tips: [
        'Stay low in smoke - crawl if necessary',
        'Have two escape routes from each room',
        'Never go back inside for belongings',
        'Meet at your designated meeting point'
      ],
      badges: ['Fire Safety Expert', 'Family Protector', 'Evacuation Master']
    },
    {
      id: '3',
      name: 'Flood Emergency Response',
      type: 'flood',
      difficulty: 'expert',
      duration: 15,
      description: 'Advanced flood response scenario involving water rescue, shelter preparation, and community coordination.',
      objectives: [
        'Execute proper flood evacuation',
        'Secure important documents',
        'Coordinate with emergency services',
        'Assist vulnerable community members'
      ],
      steps: [
        {
          id: '1',
          instruction: 'Flash flood warning issued. Water rising rapidly. Priority action?',
          timeLimit: 8,
          type: 'decision',
          options: ['Move to higher ground immediately', 'Save belongings first', 'Help neighbors', 'Wait for rescue'],
          correctAnswer: 0,
          points: 150
        },
        {
          id: '2',
          instruction: 'Grab your emergency Go-Bag and important documents. Move to upper floor.',
          timeLimit: 30,
          type: 'action',
          points: 100
        },
        {
          id: '3',
          instruction: 'You see a neighbor struggling in flood water. How do you help?',
          timeLimit: 15,
          type: 'decision',
          options: ['Jump in to save them', 'Throw rope or flotation device', 'Call for help only', 'Use a boat if available'],
          correctAnswer: 1,
          points: 200
        }
      ],
      tips: [
        'Never drive through flooded roads',
        'Turn around, don\'t drown',
        'Keep emergency supplies on upper floors',
        'Know your evacuation zone'
      ],
      badges: ['Flood Warrior', 'Community Hero', 'Water Safety Expert']
    }
  ]);

  const [drillHistory, setDrillHistory] = useState<DrillHistory[]>([
    {
      id: '1',
      scenarioName: 'Office Earthquake Response',
      completedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      score: 85,
      timeSpent: 450,
      rating: 4,
      badgesEarned: ['Earthquake Responder', 'Quick Thinker']
    },
    {
      id: '2',
      scenarioName: 'Home Fire Evacuation',
      completedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      score: 92,
      timeSpent: 380,
      rating: 5,
      badgesEarned: ['Fire Safety Expert', 'Family Protector']
    }
  ]);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const startDrill = (scenario: DrillScenario) => {
    const session: DrillSession = {
      id: Date.now().toString(),
      scenarioId: scenario.id,
      startTime: new Date(),
      currentStep: 0,
      completedSteps: [],
      score: 0,
      timeSpent: 0,
      mistakes: 0,
      status: 'in_progress'
    };
    
    setCurrentSession(session);
    setSelectedScenario(scenario);
    setActiveView('active');
    setTimer(0);
    setIsTimerRunning(true);
    toast.success(`🎯 Starting ${scenario.name} drill!`);
  };

  const completeStep = (stepId: string, isCorrect: boolean = true) => {
    if (!currentSession || !selectedScenario) return;

    const step = selectedScenario.steps.find(s => s.id === stepId);
    if (!step) return;

    const updatedSession = {
      ...currentSession,
      completedSteps: [...currentSession.completedSteps, stepId],
      score: currentSession.score + (isCorrect ? step.points : step.points * 0.5),
      mistakes: currentSession.mistakes + (isCorrect ? 0 : 1),
      currentStep: currentSession.currentStep + 1
    };

    setCurrentSession(updatedSession);

    if (isCorrect) {
      toast.success(`✅ Step completed! +${step.points} points`);
    } else {
      toast.error(`❌ Incorrect response. +${Math.round(step.points * 0.5)} points`);
    }

    // Check if drill is complete
    if (updatedSession.currentStep >= selectedScenario.steps.length) {
      completeDrill(updatedSession);
    }
  };

  const completeDrill = (session: DrillSession) => {
    const finalSession = {
      ...session,
      endTime: new Date(),
      timeSpent: timer,
      status: 'completed' as const
    };

    setCurrentSession(finalSession);
    setIsTimerRunning(false);

    // Calculate rating
    const accuracy = (selectedScenario!.steps.length - session.mistakes) / selectedScenario!.steps.length;
    const timeBonus = timer < (selectedScenario!.duration * 60) ? 1 : 0;
    const rating = Math.min(5, Math.max(1, Math.round(accuracy * 4 + timeBonus)));

    // Add to history
    const historyEntry: DrillHistory = {
      id: Date.now().toString(),
      scenarioName: selectedScenario!.name,
      completedAt: new Date(),
      score: session.score,
      timeSpent: timer,
      rating,
      badgesEarned: rating >= 4 ? selectedScenario!.badges : selectedScenario!.badges.slice(0, 1)
    };

    setDrillHistory(prev => [historyEntry, ...prev]);
    toast.success(`🏆 Drill completed! Score: ${session.score} | Rating: ${rating}⭐`);
  };

  const pauseDrill = () => {
    setIsTimerRunning(false);
    if (currentSession) {
      setCurrentSession({ ...currentSession, status: 'paused' });
    }
  };

  const resumeDrill = () => {
    setIsTimerRunning(true);
    if (currentSession) {
      setCurrentSession({ ...currentSession, status: 'in_progress' });
    }
  };

  const resetDrill = () => {
    setCurrentSession(null);
    setSelectedScenario(null);
    setTimer(0);
    setIsTimerRunning(false);
    setActiveView('scenarios');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-400 bg-green-500/20 border-green-400/40';
      case 'intermediate': return 'text-yellow-400 bg-yellow-500/20 border-yellow-400/40';
      case 'expert': return 'text-red-400 bg-red-500/20 border-red-400/40';
      default: return 'text-gray-400 bg-gray-500/20 border-gray-400/40';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'earthquake': return AlertTriangle;
      case 'fire': return AlertTriangle;
      case 'flood': return AlertTriangle;
      case 'medical': return AlertTriangle;
      case 'evacuation': return MapPin;
      case 'shelter': return Users;
      default: return AlertTriangle;
    }
  };

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="pt-12 pb-2">
        <h1 className="text-3xl font-semibold text-white mb-2">Emergency Drills</h1>
        <p className="text-white/70">Practice and perfect your emergency response skills</p>
      </div>

      {/* Active Drill Timer (if in progress) */}
      {currentSession && isTimerRunning && (
        <Card className="p-4 bg-gradient-to-r from-red-500/30 to-orange-500/30 border-red-400/40 shadow-xl backdrop-blur-lg animate-pulse">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Timer className="w-6 h-6 text-red-400 mr-2" />
              <div>
                <h3 className="font-semibold text-white">Drill In Progress</h3>
                <p className="text-sm text-red-200">{selectedScenario?.name}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-white">{formatTime(timer)}</div>
              <p className="text-xs text-red-200">
                Step {(currentSession.currentStep || 0) + 1} of {selectedScenario?.steps.length || 0}
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Navigation Tabs */}
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {[
          { id: 'scenarios', label: 'Drill Scenarios', icon: Target },
          { id: 'active', label: 'Active Drill', icon: Play },
          { id: 'history', label: 'History', icon: Trophy }
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

      {/* Drill Scenarios */}
      {activeView === 'scenarios' && (
        <div className="space-y-4">
          {drillScenarios.map((scenario) => {
            const TypeIcon = getTypeIcon(scenario.type);
            return (
              <Card key={scenario.id} className="p-6 bg-white/10 backdrop-blur-lg border-white/20 shadow-xl">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-cyan-400/20 rounded-lg">
                      <TypeIcon className="w-6 h-6 text-cyan-400" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-white mb-2">{scenario.name}</h4>
                      <p className="text-sm text-white/80 mb-3">{scenario.description}</p>
                      
                      <div className="flex items-center space-x-3 mb-3">
                        <Badge className={getDifficultyColor(scenario.difficulty)}>
                          {scenario.difficulty.charAt(0).toUpperCase() + scenario.difficulty.slice(1)}
                        </Badge>
                        <div className="flex items-center text-white/60">
                          <Clock className="w-4 h-4 mr-1" />
                          <span className="text-sm">{scenario.duration} min</span>
                        </div>
                        <div className="flex items-center text-white/60">
                          <Target className="w-4 h-4 mr-1" />
                          <span className="text-sm">{scenario.steps.length} steps</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <h5 className="font-medium text-white mb-2">Objectives:</h5>
                  <ul className="space-y-1">
                    {scenario.objectives.map((objective, index) => (
                      <li key={index} className="text-sm text-white/80 flex items-start">
                        <CheckCircle className="w-4 h-4 text-emerald-400 mr-2 mt-0.5 flex-shrink-0" />
                        {objective}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-4">
                  <h5 className="font-medium text-white mb-2">Badges Available:</h5>
                  <div className="flex flex-wrap gap-2">
                    {scenario.badges.map((badge, index) => (
                      <Badge key={index} variant="outline" className="text-xs bg-yellow-400/20 text-yellow-300 border-yellow-400/30">
                        <Star className="w-3 h-3 mr-1" />
                        {badge}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button 
                  onClick={() => startDrill(scenario)}
                  className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600"
                  disabled={currentSession?.status === 'in_progress'}
                >
                  <Play className="w-4 h-4 mr-2" />
                  Start Drill
                </Button>
              </Card>
            );
          })}
        </div>
      )}

      {/* Active Drill */}
      {activeView === 'active' && selectedScenario && currentSession && (
        <div className="space-y-6">
          {/* Drill Progress */}
          <Card className="p-6 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-cyan-400/30 shadow-xl backdrop-blur-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-white">{selectedScenario.name}</h3>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="text-lg font-bold text-white">{formatTime(timer)}</div>
                  <p className="text-xs text-white/70">Elapsed</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-white">{currentSession.score}</div>
                  <p className="text-xs text-white/70">Score</p>
                </div>
              </div>
            </div>
            
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-white/80">
                  Step {currentSession.currentStep + 1} of {selectedScenario.steps.length}
                </span>
                <span className="text-sm text-white/80">
                  {Math.round(((currentSession.currentStep) / selectedScenario.steps.length) * 100)}% Complete
                </span>
              </div>
              <Progress value={((currentSession.currentStep) / selectedScenario.steps.length) * 100} className="h-3" />
            </div>

            <div className="flex space-x-2">
              {currentSession.status === 'in_progress' ? (
                <Button onClick={pauseDrill} variant="outline" size="sm">
                  <Pause className="w-4 h-4 mr-2" />
                  Pause
                </Button>
              ) : (
                <Button onClick={resumeDrill} size="sm">
                  <Play className="w-4 h-4 mr-2" />
                  Resume
                </Button>
              )}
              <Button onClick={resetDrill} variant="outline" size="sm">
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
            </div>
          </Card>

          {/* Current Step */}
          {currentSession.currentStep < selectedScenario.steps.length && (
            <Card className="p-6 bg-white/10 backdrop-blur-lg border-white/20 shadow-xl">
              {(() => {
                const step = selectedScenario.steps[currentSession.currentStep];
                return (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold text-white">Current Step</h4>
                      <div className="flex items-center text-white/60">
                        <Clock className="w-4 h-4 mr-1" />
                        <span className="text-sm">{step.timeLimit}s limit</span>
                      </div>
                    </div>
                    
                    <p className="text-white/90 mb-6">{step.instruction}</p>
                    
                    {step.type === 'decision' && step.options && (
                      <div className="space-y-3">
                        {step.options.map((option, index) => (
                          <Button
                            key={index}
                            onClick={() => completeStep(step.id, index === step.correctAnswer)}
                            variant="outline"
                            className="w-full text-left justify-start h-auto py-3 px-4"
                          >
                            <span className="w-6 h-6 bg-cyan-400/20 text-cyan-300 rounded-full flex items-center justify-center text-sm mr-3">
                              {index + 1}
                            </span>
                            {option}
                          </Button>
                        ))}
                      </div>
                    )}
                    
                    {step.type === 'action' && (
                      <Button
                        onClick={() => completeStep(step.id)}
                        className="w-full bg-emerald-500 hover:bg-emerald-600"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Action Completed
                      </Button>
                    )}
                    
                    <div className="mt-4 text-xs text-white/60">
                      Points available: {step.points}
                    </div>
                  </div>
                );
              })()}
            </Card>
          )}

          {/* Drill Completed */}
          {currentSession.status === 'completed' && (
            <Card className="p-6 bg-gradient-to-r from-emerald-500/20 to-green-500/20 border-emerald-400/30 shadow-xl backdrop-blur-lg">
              <div className="text-center">
                <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">Drill Completed!</h3>
                <p className="text-white/80 mb-6">Great job on completing the emergency drill</p>
                
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">{currentSession.score}</div>
                    <p className="text-sm text-white/70">Final Score</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">{formatTime(currentSession.timeSpent)}</div>
                    <p className="text-sm text-white/70">Time Taken</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">{currentSession.mistakes}</div>
                    <p className="text-sm text-white/70">Mistakes</p>
                  </div>
                </div>
                
                <Button onClick={resetDrill} className="w-full">
                  Start Another Drill
                </Button>
              </div>
            </Card>
          )}
        </div>
      )}

      {/* Drill History */}
      {activeView === 'history' && (
        <div className="space-y-4">
          {drillHistory.map((entry) => (
            <Card key={entry.id} className="p-6 bg-white/10 backdrop-blur-lg border-white/20 shadow-xl">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-semibold text-white mb-1">{entry.scenarioName}</h4>
                  <p className="text-sm text-white/70">
                    Completed on {entry.completedAt.toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <div className="flex items-center justify-end mb-1">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < entry.rating ? 'text-yellow-400 fill-current' : 'text-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-white/60">{entry.rating}/5 stars</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-3">
                <div>
                  <p className="text-xs text-white/60">Score</p>
                  <p className="text-lg font-bold text-white">{entry.score}</p>
                </div>
                <div>
                  <p className="text-xs text-white/60">Time</p>
                  <p className="text-lg font-bold text-white">{formatTime(entry.timeSpent)}</p>
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium text-white mb-2">Badges Earned:</p>
                <div className="flex flex-wrap gap-2">
                  {entry.badgesEarned.map((badge, index) => (
                    <Badge key={index} variant="outline" className="text-xs bg-yellow-400/20 text-yellow-300 border-yellow-400/30">
                      <Star className="w-3 h-3 mr-1" />
                      {badge}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}