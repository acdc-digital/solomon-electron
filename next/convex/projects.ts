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

export const getTrash = query({
	handler: async (ctx) => {
		const identity = await ctx.auth.getUserIdentity();

		if (!identity) {
			throw new Error("User Not Authenticated.");
		}

		const userId = identity.subject;

		const projects = await ctx.db
		.query("projects")
		.withIndex("by_user", (q) => q.eq("userId", userId))
		.filter((q) =>
			q.eq(q.field("isArchived"), true),
			)
			.order("desc")
			.collect();

		return projects;
	}
});

export const restore = mutation({
	args: { id: v.id("projects") },
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity();

		if (!identity) {
			throw new Error("User Not Authenticated.");
		}

		const userId = identity.subject;

		const existingProject = await ctx.db.get(args.id);

		if (!existingProject) {
			throw new Error("Project Not Found.");
		}

		if (existingProject.userId !== userId) {
			throw new Error("User not Authorized.")
		}

		const recursiveRestore = async (projectId: Id<"projects">) => {
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
				isArchived: false,
			});

			await recursiveRestore(child._id);
			}
		}

		const options: Partial<Doc<"projects">> = {
			isArchived: false,
		};

		if (existingProject.parentProject) {
			const parent = await ctx.db.get(existingProject.parentProject);
			if (parent?.isArchived) {
				options.parentProject = undefined;
			}
		}

		const project = await ctx.db.patch(args.id, options);

		recursiveRestore(args.id);

		return project;
	}
});

export const remove = mutation({
	args: { id: v.id("projects") },
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity();

		if (!identity) {
			throw new Error("User Not Authenticated.");
		}

		const userId = identity.subject;

		const existingProject = await ctx.db.get(args.id);

		if (!existingProject) {
			throw new Error("Not Found.");
		}

		if (existingProject.userId !== userId) {
			throw new Error("User not Authorized.");
		}

		const project = await ctx.db.delete(args.id);

		return project;
	}
});

export const getSearch = query({
	handler: async (ctx) => {
		const identity = await ctx.auth.getUserIdentity();

		if (!identity) {
			throw new Error("User Not Authenticated.");
		}

		const userId = identity.subject;

		const projects = await ctx.db
		.query("projects")
		.withIndex("by_user", (q) => q.eq("userId", userId))
		.filter((q) =>
		q.eq(q.field("isArchived"), false),
		)
		.order("desc")
		.collect()
		
		return projects;
	}
});

export const getById = query({
	args: { projectId: v.optional(v.id("projects")) },
	handler: async (ctx, args) => {
		if (!args.projectId) {
			return null;
		}
		
	  const identity = await ctx.auth.getUserIdentity();
  
	  const project = await ctx.db.get(args.projectId);
  
	  if (!project) {
		throw new Error("Not found");
	  }
  
	  if (project.isPublished && !project.isArchived) {
		return project;
	  }
  
	  if (!identity) {
		throw new Error("Not authenticated");
	  }
  
	  const userId = identity.subject;
  
	  if (project.userId !== userId) {
		throw new Error("Unauthorized");
	  }
  
	  return project;
	}
  });

  export const update = mutation({
	args: {
	  id: v.id("projects"),
	  title: v.optional(v.string()),
	  content: v.optional(v.string()),
	  icon: v.optional(v.string()),
	  isPublished: v.optional(v.boolean())
	},
	handler: async (ctx, args) => {
	  const identity = await ctx.auth.getUserIdentity();
  
	  if (!identity) {
		throw new Error("Unauthenticated");
	  }
  
	  const userId = identity.subject;
  
	  const { id, ...rest } = args;
  
	  const existingProject = await ctx.db.get(args.id);
  
	  if (!existingProject) {
		throw new Error("Not found");
	  }
  
	  if (existingProject.userId !== userId) {
		throw new Error("Unauthorized");
	  }
  
	  const project = await ctx.db.patch(args.id, {
		...rest,
	  });
  
	  return project;
	},
  });