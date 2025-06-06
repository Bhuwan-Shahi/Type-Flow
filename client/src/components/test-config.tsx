import { motion } from "framer-motion";
import { Button } from "./ui/button";
import React = require("react");

interface TestConfigProps {
  mode: "time" | "words";
  duration: number;
  setMode: (mode: "time" | "words") => void;
  setDuration: (duration: number) => void;
  isActive: boolean;
}

export default function TestConfig({
  mode,
  duration,
  setMode,
  setDuration,
  isActive,
}: TestConfigProps) {
  const timeDurations = [15, 30, 60, 120];
  const wordCounts = [25, 50, 100, 200];

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-100 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-neutral-700">Test Mode:</span>
            <div className="flex rounded-lg border border-neutral-200 overflow-hidden">
              <Button
                variant={mode === "time" ? "default" : "ghost"}
                size="sm"
                onClick={() => !isActive && setMode("time")}
                disabled={isActive}
                className={mode === "time" ? "bg-primary text-white" : "text-neutral-600 hover:bg-neutral-50"}
              >
                Time
              </Button>
              <Button
                variant={mode === "words" ? "default" : "ghost"}
                size="sm"
                onClick={() => !isActive && setMode("words")}
                disabled={isActive}
                className={mode === "words" ? "bg-primary text-white" : "text-neutral-600 hover:bg-neutral-50"}
              >
                Words
              </Button>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-neutral-700">
              {mode === "time" ? "Duration:" : "Word Count:"}
            </span>
            <div className="flex space-x-2">
              {(mode === "time" ? timeDurations : wordCounts).map((value) => (
                <Button
                  key={value}
                  variant={duration === value ? "default" : "outline"}
                  size="sm"
                  onClick={() => !isActive && setDuration(value)}
                  disabled={isActive}
                  className={
                    duration === value
                      ? "bg-primary text-white border-primary"
                      : "border-neutral-200 hover:border-primary hover:text-primary"
                  }
                >
                  {mode === "time" ? `${value}s` : `${value}`}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
