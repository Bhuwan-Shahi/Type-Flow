import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Play, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TypingInterfaceProps {
  isActive: boolean;
  isCompleted: boolean;
  currentIndex: number;
  currentText: string;
  userInput: string;
  incorrectChars: Set<number>;
  startTest: () => void;
  resetTest: () => void;
  handleInput: (value: string) => void;
  handleKeyDown: (e: React.KeyboardEvent) => void;
}

export default function TypingInterface({
  isActive,
  isCompleted,
  currentIndex,
  currentText,
  userInput,
  incorrectChars,
  startTest,
  resetTest,
  handleInput,
  handleKeyDown,
}: TypingInterfaceProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isActive && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isActive]);

  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" && !isActive && !isCompleted) {
        e.preventDefault();
        startTest();
      } else if (e.code === "Escape") {
        e.preventDefault();
        resetTest();
      }
    };

    document.addEventListener("keydown", handleGlobalKeyDown);
    return () => document.removeEventListener("keydown", handleGlobalKeyDown);
  }, [isActive, isCompleted, startTest, resetTest]);

  const renderText = () => {
    return currentText.split("").map((char, index) => {
      let className = "relative";
      
      if (index < currentIndex) {
        // Already typed
        if (incorrectChars.has(index)) {
          className += " bg-incorrect/20 text-incorrect";
        } else {
          className += " bg-correct/20 text-correct";
        }
      } else if (index === currentIndex && isActive) {
        // Current character
        className += " bg-primary/20 text-primary border-l-2 border-primary";
      } else {
        // Not yet typed
        className += " text-neutral-400";
      }

      return (
        <span key={index} className={className}>
          {char === " " ? "\u00A0" : char}
        </span>
      );
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div 
        className="bg-white rounded-2xl p-8 shadow-sm border border-neutral-100 relative"
        whileHover={{ boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
        transition={{ duration: 0.2 }}
      >
        {/* Typing Text Display */}
        <div 
          className="text-xl leading-relaxed text-neutral-800 font-mono mb-6 select-none cursor-text max-w-none break-words whitespace-pre-wrap"
          style={{ 
            lineHeight: '2.2rem',
            wordBreak: 'keep-all',
            overflowWrap: 'break-word',
            hyphens: 'none'
          }}
          onClick={() => isActive && inputRef.current?.focus()}
        >
          {renderText()}
          {isActive && currentIndex === currentText.length && (
            <span className="typing-cursor border-r-2 border-primary ml-1"></span>
          )}
        </div>

        {/* Hidden Input for Capturing Keystrokes */}
        <input
          ref={inputRef}
          type="text"
          className="absolute opacity-0 pointer-events-none"
          value={userInput}
          onChange={(e) => handleInput(e.target.value)}
          onKeyDown={handleKeyDown}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
        />

        {/* Start/Restart Button */}
        <div className="flex justify-center mt-8">
          <Button
            onClick={isActive || isCompleted ? resetTest : startTest}
            className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white px-8 py-3 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
            size="lg"
          >
            {isActive || isCompleted ? (
              <>
                <RotateCcw className="mr-2" size={20} />
                Restart Test
              </>
            ) : (
              <>
                <Play className="mr-2" size={20} />
                Start Test
              </>
            )}
          </Button>
        </div>

        {/* Instructions */}
        <div className="mt-6 text-center text-sm text-neutral-500">
          <p>
            Click "Start Test" or press{" "}
            <kbd className="px-2 py-1 bg-neutral-100 rounded font-mono text-xs">Space</kbd>{" "}
            to begin
          </p>
          <p className="mt-1">
            Press{" "}
            <kbd className="px-2 py-1 bg-neutral-100 rounded font-mono text-xs">Esc</kbd>{" "}
            to restart at any time
          </p>
        </div>
      </motion.div>
    </div>
  );
}
