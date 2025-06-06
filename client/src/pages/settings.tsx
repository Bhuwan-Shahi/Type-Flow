import { useState } from "react";
import { motion } from "framer-motion";
import { Settings as SettingsIcon, Monitor, Moon, Sun, Volume2, VolumeX, Palette, Type, Clock, Keyboard, BarChart3, Home } from "lucide-react";
import { Link } from "wouter";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Switch } from "../components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Slider } from "../components/ui/slider";
import { Separator } from "../components/ui/separator";
import React = require("react");


export default function Settings() {
  // Theme settings
  const [theme, setTheme] = useState<"light" | "dark" | "system">("light");
  
  // Sound settings
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [soundVolume, setSoundVolume] = useState([50]);
  
  // Typing settings
  const [fontSize, setFontSize] = useState([20]);
  const [fontFamily, setFontFamily] = useState("mono");
  const [showLiveWPM, setShowLiveWPM] = useState(true);
  const [showLiveAccuracy, setShowLiveAccuracy] = useState(true);
  
  // Test settings
  const [defaultMode, setDefaultMode] = useState<"time" | "words">("time");
  const [defaultDuration, setDefaultDuration] = useState(30);
  const [smoothCaret, setSmoothCaret] = useState(true);
  
  // Difficulty settings
  const [includePunctuation, setIncludePunctuation] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [stopOnError, setStopOnError] = useState(false);

  const handleSaveSettings = () => {
    // In a real app, these would be saved to localStorage or backend
    const settings = {
      theme,
      soundEnabled,
      soundVolume: soundVolume[0],
      fontSize: fontSize[0],
      fontFamily,
      showLiveWPM,
      showLiveAccuracy,
      defaultMode,
      defaultDuration,
      smoothCaret,
      includePunctuation,
      includeNumbers,
      stopOnError,
    };
    
    localStorage.setItem("typingTestSettings", JSON.stringify(settings));
    
    // Show success feedback
    alert("Settings saved successfully!");
  };

  const handleResetSettings = () => {
    setTheme("light");
    setSoundEnabled(true);
    setSoundVolume([50]);
    setFontSize([20]);
    setFontFamily("mono");
    setShowLiveWPM(true);
    setShowLiveAccuracy(true);
    setDefaultMode("time");
    setDefaultDuration(30);
    setSmoothCaret(true);
    setIncludePunctuation(true);
    setIncludeNumbers(false);
    setStopOnError(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-white">
      {/* Header */}
      <div className="border-b border-neutral-100 bg-white/80 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
              <Link href="/statistics" className="text-neutral-500 hover:text-neutral-800 transition-colors flex items-center space-x-1">
                <BarChart3 size={16} />
                <span>Statistics</span>
              </Link>
              <Link href="/settings" className="text-primary font-medium flex items-center space-x-1">
                <SettingsIcon size={16} />
                <span>Settings</span>
              </Link>
            </nav>
          </div>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <motion.div
            className="flex items-center space-x-3"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-12 h-12 bg-gradient-to-r from-primary to-primary/80 rounded-xl flex items-center justify-center">
              <SettingsIcon className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-neutral-800">Settings</h1>
              <p className="text-neutral-500">Customize your typing experience</p>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-6">
          {/* Appearance Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Palette className="text-primary" size={20} />
                  <span>Appearance</span>
                </CardTitle>
                <CardDescription>
                  Customize the visual appearance of the application
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium text-neutral-700">Theme</label>
                    <p className="text-sm text-neutral-500">Choose your preferred color scheme</p>
                  </div>
                  <Select value={theme} onValueChange={(value: "light" | "dark" | "system") => setTheme(value)}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">
                        <div className="flex items-center space-x-2">
                          <Sun size={16} />
                          <span>Light</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="dark">
                        <div className="flex items-center space-x-2">
                          <Moon size={16} />
                          <span>Dark</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="system">
                        <div className="flex items-center space-x-2">
                          <Monitor size={16} />
                          <span>System</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-neutral-700">Font Size</label>
                    <p className="text-sm text-neutral-500 mb-3">Adjust the text size for typing tests</p>
                    <div className="flex items-center space-x-4">
                      <Slider
                        value={fontSize}
                        onValueChange={setFontSize}
                        max={32}
                        min={14}
                        step={2}
                        className="flex-1"
                      />
                      <span className="text-sm text-neutral-600 w-12">{fontSize[0]}px</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-neutral-700">Font Family</label>
                      <p className="text-sm text-neutral-500">Choose your preferred font</p>
                    </div>
                    <Select value={fontFamily} onValueChange={setFontFamily}>
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mono">Monospace</SelectItem>
                        <SelectItem value="sans">Sans Serif</SelectItem>
                        <SelectItem value="serif">Serif</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Sound Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Volume2 className="text-primary" size={20} />
                  <span>Sound</span>
                </CardTitle>
                <CardDescription>
                  Configure audio feedback and sound effects
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium text-neutral-700">Enable Sound Effects</label>
                    <p className="text-sm text-neutral-500">Play sounds for keystrokes and events</p>
                  </div>
                  <Switch checked={soundEnabled} onCheckedChange={setSoundEnabled} />
                </div>

                {soundEnabled && (
                  <>
                    <Separator />
                    <div>
                      <label className="text-sm font-medium text-neutral-700">Volume Level</label>
                      <p className="text-sm text-neutral-500 mb-3">Adjust the volume of sound effects</p>
                      <div className="flex items-center space-x-4">
                        <VolumeX size={16} className="text-neutral-400" />
                        <Slider
                          value={soundVolume}
                          onValueChange={setSoundVolume}
                          max={100}
                          min={0}
                          step={5}
                          className="flex-1"
                        />
                        <Volume2 size={16} className="text-neutral-400" />
                        <span className="text-sm text-neutral-600 w-8">{soundVolume[0]}</span>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Typing Test Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Type className="text-primary" size={20} />
                  <span>Typing Test</span>
                </CardTitle>
                <CardDescription>
                  Configure default test settings and behavior
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-neutral-700">Default Mode</label>
                      <p className="text-sm text-neutral-500">Preferred test mode</p>
                    </div>
                    <Select value={defaultMode} onValueChange={(value: "time" | "words") => setDefaultMode(value)}>
                      <SelectTrigger className="w-24">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="time">Time</SelectItem>
                        <SelectItem value="words">Words</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-neutral-700">Default Duration</label>
                      <p className="text-sm text-neutral-500">Default test length</p>
                    </div>
                    <Select value={defaultDuration.toString()} onValueChange={(value) => setDefaultDuration(parseInt(value))}>
                      <SelectTrigger className="w-20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15s</SelectItem>
                        <SelectItem value="30">30s</SelectItem>
                        <SelectItem value="60">60s</SelectItem>
                        <SelectItem value="120">120s</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-neutral-700">Show Live WPM</label>
                      <p className="text-sm text-neutral-500">Display WPM counter during typing</p>
                    </div>
                    <Switch checked={showLiveWPM} onCheckedChange={setShowLiveWPM} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-neutral-700">Show Live Accuracy</label>
                      <p className="text-sm text-neutral-500">Display accuracy percentage during typing</p>
                    </div>
                    <Switch checked={showLiveAccuracy} onCheckedChange={setShowLiveAccuracy} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-neutral-700">Smooth Caret</label>
                      <p className="text-sm text-neutral-500">Enable smooth caret movement</p>
                    </div>
                    <Switch checked={smoothCaret} onCheckedChange={setSmoothCaret} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Difficulty Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="text-primary" size={20} />
                  <span>Difficulty</span>
                </CardTitle>
                <CardDescription>
                  Adjust test difficulty and content options
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-neutral-700">Include Punctuation</label>
                      <p className="text-sm text-neutral-500">Add commas, periods, and other punctuation</p>
                    </div>
                    <Switch checked={includePunctuation} onCheckedChange={setIncludePunctuation} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-neutral-700">Include Numbers</label>
                      <p className="text-sm text-neutral-500">Add numeric characters to tests</p>
                    </div>
                    <Switch checked={includeNumbers} onCheckedChange={setIncludeNumbers} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-neutral-700">Stop on Error</label>
                      <p className="text-sm text-neutral-500">Pause test when incorrect key is pressed</p>
                    </div>
                    <Switch checked={stopOnError} onCheckedChange={setStopOnError} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            className="flex justify-between"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Button variant="outline" onClick={handleResetSettings}>
              Reset to Defaults
            </Button>
            <Button onClick={handleSaveSettings} className="bg-primary hover:bg-primary/90">
              Save Settings
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}