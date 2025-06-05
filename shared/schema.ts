import { pgTable, text, serial, integer, real, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const typingResults = pgTable("typing_results", {
  id: serial("id").primaryKey(),
  userId: integer("user_id"),
  wpm: integer("wpm").notNull(),
  accuracy: real("accuracy").notNull(),
  duration: integer("duration").notNull(),
  errors: integer("errors").notNull(),
  charactersTyped: integer("characters_typed").notNull(),
  testMode: text("test_mode").notNull(), // 'time' or 'words'
  textUsed: text("text_used").notNull(),
  completedAt: timestamp("completed_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertTypingResultSchema = createInsertSchema(typingResults).omit({
  id: true,
  completedAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type TypingResult = typeof typingResults.$inferSelect;
export type InsertTypingResult = z.infer<typeof insertTypingResultSchema>;
