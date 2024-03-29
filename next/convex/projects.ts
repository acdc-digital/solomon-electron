// Convex Projects 
// /Users/matthewsimon/Documents/GitHub/solomon-electron/solomon-electron/next/convex/projects.ts

import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";

export const archive = mutation({
	args: { id: v.id("projects") },
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity();

		if (!identity) {
			throw new Error("User Not Authenticated.");
		}

		const userId = identity.subject;
		const existingProject = await ctx.db.get(args.id);

		if (!existingProject) {
			throw new Error("No Existing Projects.");
		}

		if (existingProject.userId !== userId) {
			throw new Error("User not Authorized to Modify Projects.");
		}

		const recursiveArchive = async (projectId: Id<"projects">) => {
			const children = await ctx.db
			.query("projects")
			.withIndex("by_user_parent", (q) => (
				q
				.eq("userId", userId)
				.eq("parentProject", projectId)
			))
			.collect();

			for (const child of children) {
				await ctx.db.patch(child._id, {
					isArchived: true,
				});

				await recursiveArchive(child._id);
			}
		}

		const project = await ctx.db.patch(args.id, {
			isArchived: true,
		});

		recursiveArchive(args.id);

		return project;
	}
})

export const getSidebar = query({
	args: {
		parentProject: v.optional(v.id("projects"))
	},
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity();

		if (!identity) {
			throw new Error("User Not Authenticated.");
		}

		const userId = identity.subject;

		const projects = await ctx.db
		.query("projects")
		.withIndex("by_user_parent", (q) => q
			.eq("userId", userId)
			.eq("parentProject", args.parentProject)
		)
		.filter((q) =>
		q.eq(q.field("isArchived"), false)
		)
		.order("desc")
		.collect();

		return projects;
	},
});

export const create = mutation({
	args: {
		title: v.string(),
		parentProject: v.optional(v.id("projects"))
	},
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity();

		if (!identity) {
			throw new Error("User Not Authenticated.");
		}

		const userId = identity.subject;

		const project = await ctx.db.insert("projects", {
			title: args.title,
			parentProject: args.parentProject,
			userId,
			isArchived: false, 
			isPublished: false,
		});
	}
});