import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

export interface QuizResult {
  quizId: string;
  score: number;
  percentage: number;
  completed: boolean;
}

export interface ModuleProgress {
  moduleId: string;
  viewed: boolean;
  completed: boolean;
}

interface ProgressContextType {
  quizResults: Record<string, QuizResult>;
  moduleProgress: Record<string, ModuleProgress>;
  overallPreparedness: number;
  updateQuizResult: (quizId: string, score: number, totalQuestions: number) => void;
  markModuleViewed: (moduleId: string) => void;
  markModuleCompleted: (moduleId: string) => void;
  getModuleCompletionRate: () => number;
  getQuizCompletionRate: () => number;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export function useProgress() {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
}

interface ProgressProviderProps {
  children: ReactNode;
}

export function ProgressProvider({ children }: ProgressProviderProps) {
  const [quizResults, setQuizResults] = useState<Record<string, QuizResult>>({});
  const [moduleProgress, setModuleProgress] = useState<Record<string, ModuleProgress>>({});

  const updateQuizResult = useCallback((quizId: string, score: number, totalQuestions: number) => {
    const percentage = Math.round((score / totalQuestions) * 100);
    setQuizResults(prev => ({
      ...prev,
      [quizId]: {
        quizId,
        score,
        percentage,
        completed: true
      }
    }));
  }, []);

  const markModuleViewed = useCallback((moduleId: string) => {
    setModuleProgress(prev => ({
      ...prev,
      [moduleId]: {
        moduleId,
        viewed: true,
        completed: prev[moduleId]?.completed || false
      }
    }));
  }, []);

  const markModuleCompleted = useCallback((moduleId: string) => {
    setModuleProgress(prev => ({
      ...prev,
      [moduleId]: {
        moduleId,
        viewed: true,
        completed: true
      }
    }));
  }, []);

  const getModuleCompletionRate = useCallback(() => {
    const totalModules = 8; // earthquake, flood, fire, cyclone, pandemic, landslide, heatwave, avalanche
    const completedModules = Object.values(moduleProgress).filter(m => m.completed).length;
    return Math.round((completedModules / totalModules) * 100);
  }, [moduleProgress]);

  const getQuizCompletionRate = useCallback(() => {
    const totalQuizzes = 8; // Total available quizzes
    const completedQuizzes = Object.values(quizResults).filter(q => q.completed).length;
    return Math.round((completedQuizzes / totalQuizzes) * 100);
  }, [quizResults]);

  // Calculate overall preparedness score
  const overallPreparedness = (() => {
    const moduleRate = getModuleCompletionRate();
    const quizRate = getQuizCompletionRate();
    
    // Get average quiz scores for completed quizzes
    const completedQuizzes = Object.values(quizResults).filter(q => q.completed);
    const averageQuizScore = completedQuizzes.length > 0 
      ? completedQuizzes.reduce((sum, quiz) => sum + quiz.percentage, 0) / completedQuizzes.length 
      : 0;
    
    // Weight: 40% module completion, 30% quiz completion, 30% quiz performance
    const preparedness = Math.round(
      (moduleRate * 0.4) + 
      (quizRate * 0.3) + 
      (averageQuizScore * 0.3)
    );
    
    return Math.min(preparedness, 100); // Cap at 100%
  })();

  const value: ProgressContextType = {
    quizResults,
    moduleProgress,
    overallPreparedness,
    updateQuizResult,
    markModuleViewed,
    markModuleCompleted,
    getModuleCompletionRate,
    getQuizCompletionRate
  };

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
}