import { useState, useEffect, useCallback } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { getRandomText } from "@/lib/typing-texts";

interface TypingTestState {
  isActive: boolean;
  isCompleted: boolean;
  startTime: number | null;
  currentIndex: number;
  errors: number;
  wpm: number;
  accuracy: number;
  mode: "time" | "words";
  duration: number;
  timeElapsed: number;
  currentText: string;
  userInput: string;
  incorrectChars: Set<number>;
  showResults: boolean;
  finalStats: {
    wpm: number;
    accuracy: number;
    timeElapsed: number;
    errors: number;
  };
}

export function useTypingTest() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [state, setState] = useState<TypingTestState>({
    isActive: false,
    isCompleted: false,
    startTime: null,
    currentIndex: 0,
    errors: 0,
    wpm: 0,
    accuracy: 100,
    mode: "time",
    duration: 30,
    timeElapsed: 0,
    currentText: getRandomText(),
    userInput: "",
    incorrectChars: new Set(),
    showResults: false,
    finalStats: {
      wpm: 0,
      accuracy: 0,
      timeElapsed: 0,
      errors: 0,
    },
  });

  const submitResultMutation = useMutation({
    mutationFn: async (result: any) => {
      return apiRequest("POST", "/api/typing-results", result);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/stats"] });
      queryClient.invalidateQueries({ queryKey: ["/api/typing-results"] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to save test result",
        variant: "destructive",
      });
    },
  });

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (state.isActive && !state.isCompleted) {
      interval = setInterval(() => {
        setState(prev => {
          const newTimeElapsed = prev.timeElapsed + 1;
          
          // Check if time-based test is complete
          if (prev.mode === "time" && newTimeElapsed >= prev.duration) {
            endTest({ ...prev, timeElapsed: newTimeElapsed });
            return { ...prev, timeElapsed: newTimeElapsed, isActive: false, isCompleted: true };
          }
          
          return { ...prev, timeElapsed: newTimeElapsed };
        });
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [state.isActive, state.isCompleted, state.mode, state.duration]);

  // Calculate WPM and accuracy
  useEffect(() => {
    if (state.timeElapsed > 0) {
      const minutes = state.timeElapsed / 60;
      const words = state.currentIndex / 5; // Standard: 5 characters = 1 word
      const wpm = Math.round(words / minutes);
      
      const totalTyped = state.currentIndex + state.errors;
      const accuracy = totalTyped > 0 ? Math.round((state.currentIndex / totalTyped) * 100) : 100;
      
      setState(prev => ({ ...prev, wpm, accuracy }));
    }
  }, [state.currentIndex, state.errors, state.timeElapsed]);

  const startTest = useCallback(() => {
    setState(prev => ({
      ...prev,
      isActive: true,
      isCompleted: false,
      startTime: Date.now(),
      currentIndex: 0,
      errors: 0,
      timeElapsed: 0,
      userInput: "",
      incorrectChars: new Set(),
      showResults: false,
    }));
  }, []);

  const resetTest = useCallback(() => {
    setState(prev => ({
      ...prev,
      isActive: false,
      isCompleted: false,
      startTime: null,
      currentIndex: 0,
      errors: 0,
      wpm: 0,
      accuracy: 100,
      timeElapsed: 0,
      currentText: getRandomText(),
      userInput: "",
      incorrectChars: new Set(),
      showResults: false,
    }));
  }, []);

  const endTest = useCallback((finalState: TypingTestState) => {
    const finalStats = {
      wpm: finalState.wpm,
      accuracy: finalState.accuracy,
      timeElapsed: finalState.timeElapsed,
      errors: finalState.errors,
    };

    // Submit result to backend
    submitResultMutation.mutate({
      wpm: finalState.wpm,
      accuracy: finalState.accuracy,
      duration: finalState.timeElapsed,
      errors: finalState.errors,
      charactersTyped: finalState.currentIndex,
      testMode: finalState.mode,
      textUsed: finalState.currentText,
      userId: null, // For now, not implementing user authentication
    });

    setState(prev => ({
      ...prev,
      isActive: false,
      isCompleted: true,
      showResults: true,
      finalStats,
    }));
  }, [submitResultMutation]);

  const handleInput = useCallback((value: string) => {
    if (!state.isActive) return;

    setState(prev => {
      const newInput = value;
      const newIndex = newInput.length;
      const newIncorrectChars = new Set(prev.incorrectChars);
      let newErrors = prev.errors;

      // Check for new character
      if (newInput.length > prev.userInput.length) {
        const typedChar = newInput[newInput.length - 1];
        const expectedChar = prev.currentText[newInput.length - 1];
        
        if (typedChar !== expectedChar) {
          newIncorrectChars.add(newInput.length - 1);
          newErrors++;
        }
      }

      const newState = {
        ...prev,
        userInput: newInput,
        currentIndex: newIndex,
        incorrectChars: newIncorrectChars,
        errors: newErrors,
      };

      // Check if test is complete (word-based or reached end of text)
      if (
        (prev.mode === "words" && newIndex >= prev.duration) ||
        newIndex >= prev.currentText.length
      ) {
        setTimeout(() => endTest({ ...newState, isActive: false, isCompleted: true }), 100);
      }

      return newState;
    });
  }, [state.isActive, endTest]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (!state.isActive) return;

    // Prevent certain keys that shouldn't affect the test
    if (e.key === "Tab" || e.key === "Enter" || e.key === "Escape") {
      e.preventDefault();
    }
  }, [state.isActive]);

  const setMode = useCallback((mode: "time" | "words") => {
    if (!state.isActive) {
      setState(prev => ({ ...prev, mode }));
    }
  }, [state.isActive]);

  const setDuration = useCallback((duration: number) => {
    if (!state.isActive) {
      setState(prev => ({ ...prev, duration }));
    }
  }, [state.isActive]);

  const closeResults = useCallback(() => {
    setState(prev => ({ ...prev, showResults: false }));
  }, []);

  const restartTest = useCallback(() => {
    resetTest();
    setTimeout(startTest, 100);
  }, [resetTest, startTest]);

  return {
    // State
    isActive: state.isActive,
    isCompleted: state.isCompleted,
    currentIndex: state.currentIndex,
    wpm: state.wpm,
    accuracy: state.accuracy,
    timeElapsed: state.timeElapsed,
    charactersTyped: state.currentIndex,
    mode: state.mode,
    duration: state.duration,
    currentText: state.currentText,
    userInput: state.userInput,
    incorrectChars: state.incorrectChars,
    showResults: state.showResults,
    finalStats: state.finalStats,
    
    // Actions
    startTest,
    resetTest,
    handleInput,
    handleKeyDown,
    setMode,
    setDuration,
    closeResults,
    restartTest,
  };
}
