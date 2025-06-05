import { users, typingResults, type User, type InsertUser, type TypingResult, type InsertTypingResult } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createTypingResult(result: InsertTypingResult): Promise<TypingResult>;
  getTypingResultsByUser(userId?: number): Promise<TypingResult[]>;
  getAllTypingResults(): Promise<TypingResult[]>;
  getUserStats(userId?: number): Promise<{
    totalTests: number;
    bestWpm: number;
    bestAccuracy: number;
    averageWpm: number;
    averageAccuracy: number;
    totalTime: number;
  }>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private typingResults: Map<number, TypingResult>;
  private currentUserId: number;
  private currentResultId: number;

  constructor() {
    this.users = new Map();
    this.typingResults = new Map();
    this.currentUserId = 1;
    this.currentResultId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createTypingResult(insertResult: InsertTypingResult): Promise<TypingResult> {
    const id = this.currentResultId++;
    const result: TypingResult = {
      ...insertResult,
      id,
      completedAt: new Date(),
    };
    this.typingResults.set(id, result);
    return result;
  }

  async getTypingResultsByUser(userId?: number): Promise<TypingResult[]> {
    const results = Array.from(this.typingResults.values());
    if (userId) {
      return results.filter(result => result.userId === userId);
    }
    return results.filter(result => result.userId === null);
  }

  async getAllTypingResults(): Promise<TypingResult[]> {
    return Array.from(this.typingResults.values());
  }

  async getUserStats(userId?: number): Promise<{
    totalTests: number;
    bestWpm: number;
    bestAccuracy: number;
    averageWpm: number;
    averageAccuracy: number;
    totalTime: number;
  }> {
    const results = await this.getTypingResultsByUser(userId);
    
    if (results.length === 0) {
      return {
        totalTests: 0,
        bestWpm: 0,
        bestAccuracy: 0,
        averageWpm: 0,
        averageAccuracy: 0,
        totalTime: 0,
      };
    }

    const totalTests = results.length;
    const bestWpm = Math.max(...results.map(r => r.wpm));
    const bestAccuracy = Math.max(...results.map(r => r.accuracy));
    const averageWpm = Math.round(results.reduce((sum, r) => sum + r.wpm, 0) / totalTests);
    const averageAccuracy = Math.round(results.reduce((sum, r) => sum + r.accuracy, 0) / totalTests);
    const totalTime = results.reduce((sum, r) => sum + r.duration, 0);

    return {
      totalTests,
      bestWpm,
      bestAccuracy,
      averageWpm,
      averageAccuracy,
      totalTime,
    };
  }
}

export const storage = new MemStorage();
