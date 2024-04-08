// Load, Ingest, Embed, Store 
// /Users/matthewsimon/Documents/github/solomon-electron/solomon-electron/next/convex/ingest/load.ts

import { internalAction, v } from "convex/server";
import { RecursiveCharacterTextSplitter, CacheBackedEmbeddings, ConvexKVStore, ConvexVectorStore, OpenAIEmbeddings } from "some-import-path"; // Ensure to import or define these classes correctly

// Assuming a simple function to extract text from HTML
// This is a very basic approach; consider using a more robust method for complex HTML.
function extractTextFromHtml(html) {
    return html.replace(/<[^>]*>?/gm, '');
}

// Fetch Content from Convex Database, Extract Text, Split, Embed, and Store
export const fetchAndEmbedContent = internalAction({
    args: {
        projectId: v.string(),
    },
    handler: async (ctx, { projectId }) => {
        // Fetch content from the database
        const project = await ctx.db.get("projects", projectId);
        if (!project) {
            throw new Error("Project not found");
        }
        const htmlContent = project.content;
    
        // Extract text from HTML
        const textContent = extractTextFromHtml(htmlContent);
    
        // Split the content into manageable chunks
        const textSplitter = new RecursiveCharacterTextSplitter({
            chunkSize: 1000,
            chunkOverlap: 200,
        });
        const splitDocs = await textSplitter.splitDocuments(textContent);
    
        // Generate embeddings and store them
        const embeddings = new CacheBackedEmbeddings({
            underlyingEmbeddings: new OpenAIEmbeddings(),
            documentEmbeddingStore: new ConvexKVStore({ ctx }),
        });
        await ConvexVectorStore.fromDocuments(splitDocs, embeddings, { ctx });
    },
});
