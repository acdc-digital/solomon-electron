// Schema 
// /Users/matthewsimon/Documents/GitHub/solomon-electron/solomon-electron/next/convex/schema.ts

import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Default Schema for
  projects: defineTable({
    title: v.string(),
    userId: v.string(),
    isArchived: v.boolean(),
    parentProject: v.optional(v.id("projects")),
    content: v.optional(v.string()),
    icon: v.optional(v.string()),
    isPublished: v.boolean(),
    // Chat Module 
    embedding: v.optional(v.array(v.number())),
    text: v.optional(v.string()),
    metadata: v.optional(v.any()),
  }).vectorIndex("byEmbedding", {
    vectorField: "embedding",
    dimensions: 1536,
  })
  .index("by_user", ["userId"])
  .index("by_user_parent", ["userId", "parentProject"]),
  // Simple cache to avoid recomputing embeddings
  cache: defineTable({
    // content
    key: v.string(),
    // embedding
    value: v.any(),
  }).index("byKey", ["key"]),
  messages: defineTable({
    // Which conversation this message belongs to
    sessionId: v.string(),
    message: v.object({
      // The message author, either AI or human
      type: v.string(),
      data: v.object({
        // The text of the message
        content: v.string(),
        role: v.optional(v.string()),
        name: v.optional(v.string()),
        additional_kwargs: v.optional(v.any()),
      }),
    }),
  }).index("bySessionId", ["sessionId"]),
});