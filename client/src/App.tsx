import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
// import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "./components/ui/tooltip";
import { Toaster } from "./components/ui/toaster";
import TypingTest from "./pages/typing-test";
import Settings from "./pages/settings";
import Statistics from "./pages/statistics";
import NotFound from "./pages/not-found";

import React = require("react");

function Router() {
  return (
    <Switch>
      <Route path="/" component={TypingTest} />
      <Route path="/settings" component={Settings} />
      <Route path="/statistics" component={Statistics} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
