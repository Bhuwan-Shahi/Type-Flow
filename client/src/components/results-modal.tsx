import { motion, AnimatePresence } from "framer-motion";
import { Check, Trophy, RotateCcw, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ResultsModalProps {
  showResults: boolean;
  finalStats: {
    wpm: number;
    accuracy: number;
    timeElapsed: number;
    errors: number;
  };
  closeResults: () => void;
  restartTest: () => void;
}

export default function ResultsModal({
  showResults,
  finalStats,
  closeResults,
  restartTest,
}: ResultsModalProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <AnimatePresence>
      {showResults && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeResults}
        >
          <motion.div
            className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center">
              <motion.div
                className="w-16 h-16 bg-gradient-to-r from-correct to-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", damping: 15 }}
              >
                <Trophy className="text-white text-2xl" size={32} />
              </motion.div>
              
              <motion.h3
                className="text-2xl font-bold text-neutral-800 mb-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Test Complete!
              </motion.h3>
              
              <motion.p
                className="text-neutral-500 mb-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Great job on completing the typing test
              </motion.p>

              <motion.div
                className="grid grid-cols-2 gap-4 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="bg-neutral-50 rounded-xl p-4">
                  <div className="text-2xl font-bold text-primary">
                    {finalStats.wpm}
                  </div>
                  <div className="text-sm text-neutral-500">WPM</div>
                </div>
                <div className="bg-neutral-50 rounded-xl p-4">
                  <div className="text-2xl font-bold text-correct">
                    {finalStats.accuracy}%
                  </div>
                  <div className="text-sm text-neutral-500">Accuracy</div>
                </div>
                <div className="bg-neutral-50 rounded-xl p-4">
                  <div className="text-lg font-bold text-neutral-800">
                    {formatTime(finalStats.timeElapsed)}
                  </div>
                  <div className="text-sm text-neutral-500">Time</div>
                </div>
                <div className="bg-neutral-50 rounded-xl p-4">
                  <div className="text-lg font-bold text-neutral-800">
                    {finalStats.errors}
                  </div>
                  <div className="text-sm text-neutral-500">Errors</div>
                </div>
              </motion.div>

              <motion.div
                className="flex space-x-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Button
                  onClick={() => {
                    closeResults();
                    restartTest();
                  }}
                  className="flex-1 bg-primary hover:bg-primary/90 text-white py-3 rounded-xl font-semibold transition-colors"
                >
                  <RotateCcw className="mr-2" size={16} />
                  Try Again
                </Button>
                <Button
                  onClick={closeResults}
                  variant="outline"
                  className="flex-1 border border-neutral-200 hover:bg-neutral-50 text-neutral-700 py-3 rounded-xl font-semibold transition-colors"
                >
                  <X className="mr-2" size={16} />
                  Close
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
