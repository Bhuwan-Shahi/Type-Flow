import { motion } from "framer-motion";
import React = require("react");

interface StatisticsCardsProps {
  wpm: number;
  accuracy: number;
  timeElapsed: number;
  charactersTyped: number;
}

export default function StatisticsCards({
  wpm,
  accuracy,
  timeElapsed,
  charactersTyped,
}: StatisticsCardsProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const cards = [
    {
      value: wpm,
      label: "WPM",
      color: "text-primary",
      delay: 0,
    },
    {
      value: `${accuracy}%`,
      label: "Accuracy",
      color: "text-correct",
      delay: 0.1,
    },
    {
      value: formatTime(timeElapsed),
      label: "Time",
      color: "text-neutral-800",
      delay: 0.2,
    },
    {
      value: charactersTyped,
      label: "Characters",
      color: "text-neutral-800",
      delay: 0.3,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {cards.map((card, index) => (
          <motion.div
            key={card.label}
            className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-100 hover:shadow-md transition-shadow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: card.delay }}
            whileHover={{ y: -2 }}
          >
            <div className={`text-3xl font-bold ${card.color} mb-1`}>
              {card.value}
            </div>
            <div className="text-sm text-neutral-500 font-medium">
              {card.label}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
