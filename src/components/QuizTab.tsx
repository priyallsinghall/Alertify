import { useState } from 'react';
import { Brain, Trophy, Clock, CheckCircle, XCircle, RotateCcw, Star } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { useProgress } from '../contexts/ProgressContext';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface Quiz {
  id: string;
  title: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  questions: Question[];
  timeLimit: number; // in minutes
  color: string;
}

export function QuizTab() {
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  
  const { quizResults, updateQuizResult } = useProgress();

  const quizzes: Quiz[] = [
    {
      id: 'earthquake',
      title: 'Earthquake Safety',
      category: 'Natural Disasters',
      difficulty: 'Medium',
      color: 'bg-red-500',
      timeLimit: 10,
      questions: [
        {
          id: 1,
          question: 'What should you do immediately when you feel an earthquake?',
          options: ['Run outside immediately', 'Drop, Cover, and Hold On', 'Stand in a doorway', 'Call emergency services'],
          correctAnswer: 1,
          explanation: 'Drop, Cover, and Hold On is the recommended safety action during an earthquake to protect yourself from falling objects.'
        },
        {
          id: 2,
          question: 'Where is the safest place to be during an earthquake if you are indoors?',
          options: ['Near windows', 'Under a sturdy desk or table', 'In a doorway', 'Against an exterior wall'],
          correctAnswer: 1,
          explanation: 'Under a sturdy desk or table provides the best protection from falling debris and objects.'
        },
        {
          id: 3,
          question: 'What should you avoid doing during an earthquake?',
          options: ['Staying calm', 'Running to exits during shaking', 'Protecting your head', 'Staying where you are'],
          correctAnswer: 1,
          explanation: 'Running during shaking increases the risk of falling and injury. Wait until shaking stops before moving.'
        },
        {
          id: 4,
          question: 'After an earthquake stops, what should be your first priority?',
          options: ['Check for injuries and hazards', 'Post on social media', 'Start cleanup immediately', 'Go back to normal activities'],
          correctAnswer: 0,
          explanation: 'Checking for injuries and immediate hazards like gas leaks or structural damage should be the top priority.'
        },
        {
          id: 5,
          question: 'How long should you expect aftershocks to continue?',
          options: ['A few minutes', 'A few hours', 'Days to weeks', 'Only if the earthquake was major'],
          correctAnswer: 2,
          explanation: 'Aftershocks can continue for days, weeks, or even months after the main earthquake, especially after larger events.'
        }
      ]
    },
    {
      id: 'flood',
      title: 'Flood Preparedness',
      category: 'Natural Disasters',
      difficulty: 'Easy',
      color: 'bg-blue-500',
      timeLimit: 8,
      questions: [
        {
          id: 1,
          question: 'How much moving water can knock you down?',
          options: ['12 inches (30 cm)', '6 inches (15 cm)', '3 inches (7 cm)', '18 inches (45 cm)'],
          correctAnswer: 1,
          explanation: 'Just 6 inches of moving water can knock you down. The force of moving water is much stronger than people realize.'
        },
        {
          id: 2,
          question: 'What should you do if your car stalls in flood water?',
          options: ['Try to restart it', 'Stay in the car and wait', 'Abandon the car and move to higher ground', 'Call for tow truck'],
          correctAnswer: 2,
          explanation: 'Abandon the car immediately and move to higher ground. Cars can be swept away in just 12 inches of moving water.'
        },
        {
          id: 3,
          question: 'When is the best time to evacuate during a flood warning?',
          options: ['When water reaches your door', 'When authorities issue the warning', 'When you see your neighbors leaving', 'When power goes out'],
          correctAnswer: 1,
          explanation: 'Evacuate immediately when authorities issue a warning. Don\'t wait until conditions worsen.'
        }
      ]
    },
    {
      id: 'fire',
      title: 'Fire Safety',
      category: 'Emergency Response',
      difficulty: 'Easy',
      color: 'bg-orange-500',
      timeLimit: 6,
      questions: [
        {
          id: 1,
          question: 'What does the acronym PASS stand for in fire extinguisher use?',
          options: ['Pull, Aim, Squeeze, Sweep', 'Push, Activate, Spray, Stop', 'Point, Aim, Spray, Shake', 'Pull, Activate, Squeeze, Stop'],
          correctAnswer: 0,
          explanation: 'PASS stands for Pull the pin, Aim at the base of the fire, Squeeze the handle, and Sweep side to side.'
        },
        {
          id: 2,
          question: 'How often should you test smoke detector batteries?',
          options: ['Once a year', 'Every 6 months', 'Monthly', 'When they beep'],
          correctAnswer: 2,
          explanation: 'Test smoke detector batteries monthly to ensure they\'re working properly. Replace batteries annually or when low battery warning sounds.'
        }
      ]
    },
    {
      id: 'cyclone',
      title: 'Cyclone Preparedness',
      category: 'Natural Disasters',
      difficulty: 'Medium',
      color: 'bg-gray-600',
      timeLimit: 12,
      questions: [
        {
          id: 1,
          question: 'What minimum ocean temperature is needed for cyclone formation?',
          options: ['20°C (68°F)', '23°C (73°F)', '26.5°C (80°F)', '30°C (86°F)'],
          correctAnswer: 2,
          explanation: 'Cyclones need warm ocean waters of at least 26.5°C (80°F) to provide the energy needed for formation and maintenance.'
        },
        {
          id: 2,
          question: 'During the eye of a cyclone, you should:',
          options: ['Go outside to assess damage', 'Stay indoors and prepare for more wind', 'Start cleanup activities', 'Check on neighbors'],
          correctAnswer: 1,
          explanation: 'The eye is a temporary calm period. The other side of the storm will hit with equal or greater intensity, so stay indoors.'
        },
        {
          id: 3,
          question: 'What is the most dangerous aspect of cyclones?',
          options: ['High winds', 'Storm surge', 'Lightning', 'Hail'],
          correctAnswer: 1,
          explanation: 'Storm surge causes the most cyclone-related deaths, as it can reach heights of 20+ feet and travel far inland.'
        },
        {
          id: 4,
          question: 'When should you evacuate during a cyclone warning?',
          options: ['When winds reach 100 mph', 'When authorities issue evacuation orders', 'When you see storm surge', 'When power goes out'],
          correctAnswer: 1,
          explanation: 'Evacuate immediately when authorities issue evacuation orders, as conditions can deteriorate rapidly.'
        }
      ]
    },
    {
      id: 'pandemic',
      title: 'Pandemic Preparedness',
      category: 'Health Emergency',
      difficulty: 'Easy',
      color: 'bg-purple-500',
      timeLimit: 8,
      questions: [
        {
          id: 1,
          question: 'How long should you wash your hands to effectively prevent disease transmission?',
          options: ['10 seconds', '20 seconds', '30 seconds', '1 minute'],
          correctAnswer: 1,
          explanation: 'Washing hands for at least 20 seconds with soap effectively removes most germs and viruses.'
        },
        {
          id: 2,
          question: 'What is the most effective way to prevent respiratory disease spread?',
          options: ['Taking vitamins', 'Physical distancing', 'Wearing gloves', 'Drinking hot liquids'],
          correctAnswer: 1,
          explanation: 'Physical distancing of 6 feet or more significantly reduces the transmission of respiratory droplets.'
        },
        {
          id: 3,
          question: 'During a pandemic, you should get information from:',
          options: ['Social media posts', 'Official health authorities', 'Friends and family', 'News headlines only'],
          correctAnswer: 1,
          explanation: 'Always rely on official health authorities like WHO, CDC, or local health departments for accurate information.'
        }
      ]
    },
    {
      id: 'landslide',
      title: 'Landslide Safety',
      category: 'Geological Hazards',
      difficulty: 'Medium',
      color: 'bg-amber-600',
      timeLimit: 10,
      questions: [
        {
          id: 1,
          question: 'What is a warning sign of potential landslide activity?',
          options: ['Clear sunny weather', 'Tilting trees or utility poles', 'Increased wildlife activity', 'Lower temperatures'],
          correctAnswer: 1,
          explanation: 'Tilting trees, poles, or structures indicate ground movement and potential landslide activity.'
        },
        {
          id: 2,
          question: 'If you hear rumbling sounds from a hillside, you should:',
          options: ['Investigate the source', 'Move away from the slope immediately', 'Take photos for documentation', 'Wait to see what happens'],
          correctAnswer: 1,
          explanation: 'Rumbling sounds often indicate debris flow or landslide activity. Move away from the slope path immediately.'
        },
        {
          id: 3,
          question: 'The best time to evacuate during landslide risk is:',
          options: ['During heavy rain', 'Before the rainy season', 'When you see cracks', 'After small slides occur'],
          correctAnswer: 1,
          explanation: 'Evacuate before conditions deteriorate. Don\'t wait for visible signs of movement during dangerous weather.'
        }
      ]
    },
    {
      id: 'heatwave',
      title: 'Heatwave Safety',
      category: 'Weather Emergency',
      difficulty: 'Easy',
      color: 'bg-yellow-500',
      timeLimit: 6,
      questions: [
        {
          id: 1,
          question: 'What are the peak heat hours you should avoid being outdoors?',
          options: ['8am-12pm', '10am-4pm', '12pm-6pm', '2pm-8pm'],
          correctAnswer: 1,
          explanation: '10am-4pm are typically the hottest hours when the sun is highest and heat index is most dangerous.'
        },
        {
          id: 2,
          question: 'Which population is most vulnerable to heat-related illness?',
          options: ['Teenagers', 'Young adults', 'Elderly and children', 'Middle-aged adults'],
          correctAnswer: 2,
          explanation: 'Elderly people and children are most vulnerable as their bodies are less efficient at regulating temperature.'
        },
        {
          id: 3,
          question: 'What should you do if you suspect someone has heat stroke?',
          options: ['Give them cold water to drink', 'Call 911 and cool them immediately', 'Have them rest in shade', 'Wait to see if they improve'],
          correctAnswer: 1,
          explanation: 'Heat stroke is a medical emergency. Call 911 immediately and begin aggressive cooling measures.'
        }
      ]
    },
    {
      id: 'avalanche',
      title: 'Avalanche Safety',
      category: 'Mountain Hazards',
      difficulty: 'Hard',
      color: 'bg-cyan-500',
      timeLimit: 15,
      questions: [
        {
          id: 1,
          question: 'What is the survival rate if buried in an avalanche for more than 35 minutes?',
          options: ['90%', '50%', '20%', '5%'],
          correctAnswer: 2,
          explanation: 'Survival drops dramatically after 15 minutes. After 35 minutes, survival rates are only about 20%.'
        },
        {
          id: 2,
          question: 'What essential equipment should you carry in avalanche terrain?',
          options: ['GPS and map', 'Beacon, probe, and shovel', 'First aid kit', 'Emergency shelter'],
          correctAnswer: 1,
          explanation: 'The avalanche safety trinity - beacon, probe, and shovel - are essential for rescue in avalanche terrain.'
        },
        {
          id: 3,
          question: 'If caught in an avalanche, what should you try to do?',
          options: ['Dig yourself out immediately', 'Stay calm and wait for rescue', 'Try to swim to stay on surface', 'Curl up in a ball'],
          correctAnswer: 2,
          explanation: 'Use swimming motions to try to stay on the surface of the avalanche debris as it moves downhill.'
        },
        {
          id: 4,
          question: 'Most avalanche accidents are triggered by:',
          options: ['Natural weather conditions', 'The victims themselves', 'Wildlife', 'Equipment failure'],
          correctAnswer: 1,
          explanation: '90% of avalanche fatalities involve human-triggered avalanches, usually by the victim or someone in their party.'
        }
      ]
    }
  ];



  const startQuiz = (quiz: Quiz) => {
    setSelectedQuiz(quiz);
    setCurrentQuestionIndex(0);
    setSelectedAnswers([]);
    setShowResults(false);
    setQuizCompleted(false);
    setTimeRemaining(quiz.timeLimit * 60); // Convert to seconds
  };

  const selectAnswer = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (selectedQuiz && currentQuestionIndex < selectedQuiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    if (!selectedQuiz) return;
    
    const score = selectedAnswers.reduce((acc, answer, index) => {
      return acc + (answer === selectedQuiz.questions[index].correctAnswer ? 1 : 0);
    }, 0);
    
    updateQuizResult(selectedQuiz.id, score, selectedQuiz.questions.length);
    setQuizCompleted(true);
    setShowResults(true);
  };

  const resetQuiz = () => {
    setSelectedQuiz(null);
    setCurrentQuestionIndex(0);
    setSelectedAnswers([]);
    setShowResults(false);
    setQuizCompleted(false);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-400/20 text-green-300 border-green-400/30';
      case 'Medium': return 'bg-yellow-400/20 text-yellow-300 border-yellow-400/30';
      case 'Hard': return 'bg-red-400/20 text-red-300 border-red-400/30';
      default: return 'bg-white/20 text-white/80 border-white/30';
    }
  };

  if (selectedQuiz && !showResults) {
    const currentQuestion = selectedQuiz.questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / selectedQuiz.questions.length) * 100;
    
    return (
      <div className="p-4 space-y-6">
        {/* Quiz Header */}
        <div className="pt-12 pb-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-semibold text-white mb-2">{selectedQuiz.title}</h1>
              <p className="text-white/70">Question {currentQuestionIndex + 1} of {selectedQuiz.questions.length}</p>
            </div>
            <Button onClick={resetQuiz} variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
              <RotateCcw className="w-4 h-4 mr-2" />
              Exit
            </Button>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question Card */}
        <Card className="p-6 bg-white/10 backdrop-blur-lg border-white/20 shadow-xl">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-white mb-4">{currentQuestion.question}</h2>
          </div>

          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => selectAnswer(index)}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                  selectedAnswers[currentQuestionIndex] === index
                    ? 'bg-cyan-500/20 border-cyan-400/50 text-white'
                    : 'bg-white/5 border-white/20 text-white/80 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center">
                  <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center mr-3 text-sm">
                    {String.fromCharCode(65 + index)}
                  </span>
                  {option}
                </div>
              </button>
            ))}
          </div>

          <div className="mt-6 flex justify-end">
            <Button
              onClick={nextQuestion}
              disabled={selectedAnswers[currentQuestionIndex] === undefined}
              className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
            >
              {currentQuestionIndex === selectedQuiz.questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  if (showResults && selectedQuiz) {
    const score = selectedAnswers.reduce((acc, answer, index) => {
      return acc + (answer === selectedQuiz.questions[index].correctAnswer ? 1 : 0);
    }, 0);
    const percentage = Math.round((score / selectedQuiz.questions.length) * 100);

    return (
      <div className="p-4 space-y-6">
        {/* Results Header */}
        <div className="pt-12 pb-2">
          <h1 className="text-3xl font-semibold text-white mb-2">Quiz Results</h1>
          <p className="text-white/70">{selectedQuiz.title}</p>
        </div>

        {/* Score Card */}
        <Card className="p-6 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-400/30 shadow-xl backdrop-blur-lg text-center">
          <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-white mb-2">Your Score</h2>
          <div className="text-4xl font-bold text-white mb-2">{percentage}%</div>
          <p className="text-white/80">{score} out of {selectedQuiz.questions.length} correct</p>
          
          {percentage >= 80 && (
            <Badge className="mt-4 bg-yellow-400/20 text-yellow-300 border-yellow-400/30">
              <Star className="w-4 h-4 mr-1" />
              Excellent!
            </Badge>
          )}
          {percentage >= 60 && percentage < 80 && (
            <Badge className="mt-4 bg-blue-400/20 text-blue-300 border-blue-400/30">
              Good Job!
            </Badge>
          )}
          {percentage < 60 && (
            <Badge className="mt-4 bg-orange-400/20 text-orange-300 border-orange-400/30">
              Keep Learning!
            </Badge>
          )}
        </Card>

        {/* Answer Review */}
        <div className="space-y-4">
          <h3 className="font-semibold text-white mb-4">Review Answers</h3>
          {selectedQuiz.questions.map((question, index) => {
            const userAnswer = selectedAnswers[index];
            const isCorrect = userAnswer === question.correctAnswer;
            
            return (
              <Card key={question.id} className="p-4 bg-white/10 backdrop-blur-lg border-white/20 shadow-xl">
                <div className="flex items-start space-x-3 mb-3">
                  {isCorrect ? (
                    <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                  ) : (
                    <XCircle className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
                  )}
                  <div className="flex-1">
                    <h4 className="font-medium text-white mb-2">{question.question}</h4>
                    <p className="text-sm text-white/60 mb-2">
                      Your answer: {question.options[userAnswer]}
                    </p>
                    {!isCorrect && (
                      <p className="text-sm text-emerald-300 mb-2">
                        Correct answer: {question.options[question.correctAnswer]}
                      </p>
                    )}
                    <p className="text-sm text-white/80">{question.explanation}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="flex space-x-3">
          <Button onClick={() => startQuiz(selectedQuiz)} className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500">
            <RotateCcw className="w-4 h-4 mr-2" />
            Retake Quiz
          </Button>
          <Button onClick={resetQuiz} variant="outline" className="flex-1 bg-white/10 border-white/20 text-white hover:bg-white/20">
            Back to Quizzes
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="pt-12 pb-2">
        <h1 className="text-3xl font-semibold text-white mb-2">Knowledge Quiz</h1>
        <p className="text-white/70">Test your disaster preparedness knowledge</p>
      </div>

      {/* Stats Overview */}
      <Card className="p-4 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border-emerald-400/30 shadow-xl backdrop-blur-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Brain className="w-6 h-6 text-emerald-400 mr-3" />
            <div>
              <h3 className="font-semibold text-white">Quiz Progress</h3>
              <p className="text-sm text-white/80">Complete quizzes to earn badges</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-white">{Object.keys(quizResults).length}</div>
            <p className="text-sm text-white/70">Completed</p>
          </div>
        </div>
      </Card>

      {/* Available Quizzes */}
      <div>
        <h3 className="font-semibold text-white mb-4">Available Quizzes</h3>
        <div className="space-y-4">
          {quizzes.map((quiz) => {
            const quizResult = quizResults[quiz.id];
            const hasCompleted = quizResult !== undefined;
            
            return (
              <Card key={quiz.id} className="p-4 bg-white/10 backdrop-blur-lg border-white/20 shadow-xl hover:bg-white/15 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 flex-1">
                    <div className={`p-3 rounded-full ${quiz.color}`}>
                      <Brain className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-semibold text-white">{quiz.title}</h4>
                        {hasCompleted && (
                          <Badge className="bg-emerald-400/20 text-emerald-300 border-emerald-400/30">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            {quizResult.percentage}%
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-white/70">
                        <span>{quiz.category}</span>
                        <Badge variant="secondary" className={getDifficultyColor(quiz.difficulty)}>
                          {quiz.difficulty}
                        </Badge>
                        <div className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {quiz.timeLimit} min
                        </div>
                        <span>{quiz.questions.length} questions</span>
                      </div>
                    </div>
                  </div>
                  
                  <Button
                    onClick={() => startQuiz(quiz)}
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
                  >
                    {hasCompleted ? 'Retake' : 'Start Quiz'}
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Achievements */}
      {Object.keys(quizResults).length > 0 && (
        <Card className="p-4 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-yellow-400/30 shadow-xl backdrop-blur-lg">
          <div className="flex items-center mb-4">
            <Trophy className="w-6 h-6 text-yellow-400 mr-2" />
            <h3 className="font-semibold text-white">Your Achievements</h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(quizResults).map(([quizId, result]) => {
              const quiz = quizzes.find(q => q.id === quizId);
              if (!quiz) return null;
              
              return (
                <div key={quizId} className="p-3 bg-white/10 rounded-lg">
                  <h4 className="font-medium text-white text-sm">{quiz.title}</h4>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className="text-lg font-bold text-yellow-400">{result.percentage}%</div>
                    {result.percentage >= 80 && <Star className="w-4 h-4 text-yellow-400" />}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      )}
    </div>
  );
}