import { motion } from "framer-motion";
import { BarChart3, TrendingUp, Target, Clock, Calendar, Trophy, ArrowUp, ArrowDown, Keyboard, Settings, Home } from "lucide-react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Progress } from "../components/ui/progress";
import LineChart from "recharts/lib/chart/LineChart";
import Line from "recharts/lib/cartesian/Line";
import XAxis from "recharts/lib/cartesian/XAxis";
import YAxis from "recharts/lib/cartesian/YAxis";
import CartesianGrid from "recharts/lib/cartesian/CartesianGrid";
import Tooltip from "recharts/lib/component/Tooltip";
import ResponsiveContainer from "recharts/lib/component/ResponsiveContainer";
import BarChart from "recharts/lib/chart/BarChart";
import Bar from "recharts/lib/cartesian/Bar";
import React = require("react");

export default function Statistics() {
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ["/api/stats"],
    staleTime: 5 * 60 * 1000,
  });

  const { data: results, isLoading: resultsLoading } = useQuery({
    queryKey: ["/api/typing-results"],
    staleTime: 5 * 60 * 1000,
  });

  const isLoading = statsLoading || resultsLoading;

  // Ensure results is an array
  const resultsArray = Array.isArray(results) ? results : [];

  // Process data for charts
  const chartData = resultsArray.slice(-10).map((result: any, index: number) => ({
    test: index + 1,
    wpm: result.wpm,
    accuracy: result.accuracy,
    date: new Date(result.completedAt).toLocaleDateString(),
  }));

  const wpmTrend = resultsArray.length >= 2 
    ? ((resultsArray[resultsArray.length - 1]?.wpm - resultsArray[resultsArray.length - 2]?.wpm) / resultsArray[resultsArray.length - 2]?.wpm * 100)
    : 0;

  const accuracyTrend = resultsArray.length >= 2 
    ? ((resultsArray[resultsArray.length - 1]?.accuracy - resultsArray[resultsArray.length - 2]?.accuracy) / resultsArray[resultsArray.length - 2]?.accuracy * 100)
    : 0;

  // Calculate daily/weekly stats
  const today = new Date().toDateString();
  const todayTests = resultsArray.filter((result: any) => 
    new Date(result.completedAt).toDateString() === today
  );

  const thisWeek = new Date();
  thisWeek.setDate(thisWeek.getDate() - 7);
  const weekTests = resultsArray.filter((result: any) => 
    new Date(result.completedAt) >= thisWeek
  );

  const avgWpmToday = todayTests.length > 0 
    ? Math.round(todayTests.reduce((sum: number, test: any) => sum + test.wpm, 0) / todayTests.length)
    : 0;

  const avgAccuracyToday = todayTests.length > 0 
    ? Math.round(todayTests.reduce((sum: number, test: any) => sum + test.accuracy, 0) / todayTests.length)
    : 0;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-white">
        {/* Header */}
        <div className="border-b border-neutral-100 bg-white/80 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link href="/" className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-primary to-primary/80 rounded-xl flex items-center justify-center">
                  <Keyboard className="text-white" size={20} />
                </div>
                <span className="text-xl font-bold text-neutral-800">TypeFlow</span>
              </Link>
              
              <nav className="flex items-center space-x-6">
                <Link href="/" className="text-neutral-500 hover:text-neutral-800 transition-colors flex items-center space-x-1">
                  <Home size={16} />
                  <span>Dashboard</span>
                </Link>
                <Link href="/statistics" className="text-primary font-medium flex items-center space-x-1">
                  <BarChart3 size={16} />
                  <span>Statistics</span>
                </Link>
                <Link href="/settings" className="text-neutral-500 hover:text-neutral-800 transition-colors flex items-center space-x-1">
                  <Settings size={16} />
                  <span>Settings</span>
                </Link>
              </nav>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="animate-pulse">
            <div className="h-8 bg-neutral-200 rounded w-48 mb-2"></div>
            <div className="h-4 bg-neutral-200 rounded w-72"></div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-100 animate-pulse">
                <div className="h-6 bg-neutral-200 rounded mb-4"></div>
                <div className="h-32 bg-neutral-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-white">
      {/* Header */}
      <div className="border-b border-neutral-100 bg-white/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <motion.div
            className="flex items-center space-x-3"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-12 h-12 bg-gradient-to-r from-primary to-primary/80 rounded-xl flex items-center justify-center">
              <BarChart3 className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-neutral-800">Statistics</h1>
              <p className="text-neutral-500">Track your typing progress and performance</p>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
            <TabsTrigger value="detailed">Detailed</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Quick Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Best WPM</CardTitle>
                    <Trophy className="h-4 w-4 text-primary" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-primary">{(stats as any)?.bestWpm || 0}</div>
                    <p className="text-xs text-neutral-500">Personal record</p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Average WPM</CardTitle>
                    <TrendingUp className="h-4 w-4 text-correct" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-correct">{(stats as any)?.averageWpm || 0}</div>
                    <div className="flex items-center text-xs text-neutral-500">
                      {wpmTrend > 0 ? (
                        <ArrowUp className="h-3 w-3 text-correct mr-1" />
                      ) : wpmTrend < 0 ? (
                        <ArrowDown className="h-3 w-3 text-incorrect mr-1" />
                      ) : null}
                      {Math.abs(wpmTrend).toFixed(1)}% from last test
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Best Accuracy</CardTitle>
                    <Target className="h-4 w-4 text-correct" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-correct">{(stats as any)?.bestAccuracy || 0}%</div>
                    <p className="text-xs text-neutral-500">Highest precision</p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Tests</CardTitle>
                    <Clock className="h-4 w-4 text-neutral-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-neutral-800">{(stats as any)?.totalTests || 0}</div>
                    <p className="text-xs text-neutral-500">Tests completed</p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Today's Performance */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="text-primary" size={20} />
                    <span>Today's Performance</span>
                  </CardTitle>
                  <CardDescription>Your typing performance for today</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Tests Today</span>
                        <span className="font-medium">{todayTests.length}</span>
                      </div>
                      <Progress value={(todayTests.length / 10) * 100} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Average WPM</span>
                        <span className="font-medium">{avgWpmToday}</span>
                      </div>
                      <Progress value={(avgWpmToday / 100) * 100} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Average Accuracy</span>
                        <span className="font-medium">{avgAccuracyToday}%</span>
                      </div>
                      <Progress value={avgAccuracyToday} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="progress" className="space-y-6">
            {/* WPM Progress Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>WPM Progress</CardTitle>
                  <CardDescription>Your typing speed over recent tests</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="test" />
                        <YAxis />
                        <Tooltip 
                          formatter={(value, name) => [value, name === 'wpm' ? 'WPM' : 'Accuracy']}
                          labelFormatter={(label) => `Test ${label}`}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="wpm" 
                          stroke="hsl(var(--primary))" 
                          strokeWidth={3}
                          dot={{ fill: 'hsl(var(--primary))' }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Accuracy Progress Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Accuracy Progress</CardTitle>
                  <CardDescription>Your typing accuracy over recent tests</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="test" />
                        <YAxis domain={[0, 100]} />
                        <Tooltip 
                          formatter={(value) => [`${value}%`, 'Accuracy']}
                          labelFormatter={(label) => `Test ${label}`}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="accuracy" 
                          stroke="hsl(var(--correct))" 
                          strokeWidth={3}
                          dot={{ fill: 'hsl(var(--correct))' }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="detailed" className="space-y-6">
            {/* Test Distribution */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Test Distribution</CardTitle>
                  <CardDescription>WPM distribution across all your tests</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="test" />
                        <YAxis />
                        <Tooltip 
                          formatter={(value) => [value, 'WPM']}
                          labelFormatter={(label) => `Test ${label}`}
                        />
                        <Bar 
                          dataKey="wpm" 
                          fill="hsl(var(--primary))" 
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Detailed Statistics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Detailed Statistics</CardTitle>
                  <CardDescription>Comprehensive breakdown of your performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm text-neutral-700">Total Time Practiced</h4>
                      <p className="text-2xl font-bold text-neutral-800">
                        {Math.floor(((stats as any)?.totalTime || 0) / 60)}m {((stats as any)?.totalTime || 0) % 60}s
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm text-neutral-700">Tests This Week</h4>
                      <p className="text-2xl font-bold text-neutral-800">{weekTests.length}</p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm text-neutral-700">Average Accuracy</h4>
                      <p className="text-2xl font-bold text-neutral-800">{(stats as any)?.averageAccuracy || 0}%</p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm text-neutral-700">Improvement Rate</h4>
                      <p className="text-2xl font-bold text-neutral-800">
                        {Math.abs(wpmTrend).toFixed(1)}%
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm text-neutral-700">Best Day</h4>
                      <p className="text-lg font-medium text-neutral-800">
                        {resultsArray.length > 0 ? new Date(resultsArray[0].completedAt).toLocaleDateString() : 'N/A'}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm text-neutral-700">Consistency Score</h4>
                      <p className="text-2xl font-bold text-neutral-800">
                        {resultsArray.length > 0 ? Math.round(100 - ((stats as any)?.bestWpm - (stats as any)?.averageWpm) / (stats as any)?.bestWpm * 100) || 0 : 0}%
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}