import { motion } from "framer-motion";
import { Trophy, TrendingUp, ArrowUp } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export default function PersonalRecords() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["/api/stats"],
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-neutral-800 mb-6">Personal Records</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[1, 2].map((i) => (
            <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-100 animate-pulse">
              <div className="h-6 bg-neutral-200 rounded mb-4"></div>
              <div className="space-y-3">
                {[1, 2, 3].map((j) => (
                  <div key={j} className="flex justify-between items-center">
                    <div className="h-4 bg-neutral-200 rounded w-24"></div>
                    <div className="h-4 bg-neutral-200 rounded w-16"></div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const improvement = stats?.totalTests > 1 
    ? Math.round(((stats.bestWpm - stats.averageWpm) / stats.averageWpm) * 100)
    : 0;

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-neutral-800 mb-6">Personal Records</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-100"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          whileHover={{ y: -2 }}
        >
          <h3 className="text-lg font-semibold text-neutral-800 mb-4 flex items-center">
            <Trophy className="text-yellow-500 mr-2" size={20} />
            Best Performance
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-neutral-600">Highest WPM</span>
              <span className="font-semibold text-primary">
                {stats?.bestWpm || 0} WPM
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-neutral-600">Best Accuracy</span>
              <span className="font-semibold text-correct">
                {stats?.bestAccuracy || 0}%
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-neutral-600">Total Time</span>
              <span className="font-semibold text-neutral-800">
                {Math.floor((stats?.totalTime || 0) / 60)}m {(stats?.totalTime || 0) % 60}s
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-100"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          whileHover={{ y: -2 }}
        >
          <h3 className="text-lg font-semibold text-neutral-800 mb-4 flex items-center">
            <TrendingUp className="text-primary mr-2" size={20} />
            Recent Progress
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-neutral-600">Tests Completed</span>
              <span className="font-semibold text-neutral-800">
                {stats?.totalTests || 0}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-neutral-600">Average WPM</span>
              <span className="font-semibold text-primary">
                {stats?.averageWpm || 0} WPM
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-neutral-600">Improvement</span>
              <span className={`font-semibold flex items-center ${improvement >= 0 ? 'text-correct' : 'text-incorrect'}`}>
                {improvement >= 0 ? '+' : ''}{improvement}%
                {improvement > 0 && <ArrowUp className="ml-1" size={12} />}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
