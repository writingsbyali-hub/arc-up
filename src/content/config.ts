// ====================================================================
// CONTENT COLLECTIONS CONFIGURATION
// Defines schemas for markdown-based project content
// ====================================================================
import { defineCollection, z } from 'astro:content';

const projectsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    stream: z.enum([
      'physical',    // Physical Plasma Systems
      'water',       // Plasma-Water Interface
      'ecosystem',   // Ecosystem Sensing
      'protocols',   // Protocols & Standards
      'governance',  // Governance Models
      'validation',  // Validation & Replication
      'data',        // Data Infrastructure
      'visualization', // Visualization Tools
      'modeling',    // Ecosystem Modeling
    ]),
    pillar: z.enum(['lab', 'framework', 'commons']),
    status: z.enum(['active', 'forming', 'early-idea', 'concept']),
    tags: z.array(z.string()),
    skills: z.array(z.string()),
    updated: z.string(), // Format: "YYYY-MM-DD" or "Month YYYY"
    lookingFor: z.string().optional(), // Who we're looking for (one sentence)
  }),
});

export const collections = {
  projects: projectsCollection,
};
