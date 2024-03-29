"use client"

import { useParams, useRouter } from "next/navigation";
import { Doc, Id } from "../../../convex/_generated/dataModel"
import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { ProjectItem } from "./ProjectItem";
import { cn } from "@/lib/utils";
import { FileIcon, FolderIcon } from "lucide-react";

interface ProjectListProps {
	parentProjectId?: Id<"projects">;
	level?: number;
	data?: Doc<"projects">[];
}

export const ProjectList = ({
	parentProjectId,
	level = 0
}: ProjectListProps) => {
	const params = useParams();
	const router = useRouter();
	const [expanded, setExpanded] = useState<Record<string, boolean>>({});

	const onExpand = (documentId: string) => {
		setExpanded(prevExpanded => ({
			...prevExpanded,
			[documentId]: !prevExpanded[documentId]
		}));
	};

	const projects = useQuery(api.projects.getSidebar, {
		parentProject: parentProjectId
	});

	const onRedirect = (projectId: string) => {
		router.push(`/projects/${projectId}`);
	};

	if (projects === undefined) {
		return (
			<>
				<ProjectItem.Skeleton level={level} />
				{level === 0 && (
					<>
					  <ProjectItem.Skeleton level={level} />
					  <ProjectItem.Skeleton level={level} />
					</>
				)}
			</>
		);
	};

	return (
		<>
			<p
			  style={{
				paddingLeft: level ? `${(level * 12) + 25}px` : undefined
			  }}
			  className={cn(
			  "hidden text-sm font-medium text-muted-foreground/80",
			  expanded && "last:block",
			  level === 0 && "hidden"
			  )}
			>
				<p className="ml-4">
			    No Projects.
				</p>
			</p>
			{projects.map((project) => (
				<div key={project._id}>
					<ProjectItem
					id={project._id}
					onClick={() => onRedirect(project._id)}
					label={project.title}
					icon={FolderIcon}
					projectIcon={project.icon}
					active={params.projectId === project._id}
					level={level}
					onExpand={() => onExpand(project._id)}
					expanded={expanded[project._id]}
					/>
					{expanded[project._id] && (
						<ProjectList
						parentProjectId={project._id}
						level={level + 1}
						/>
					)}
				</div>
			))}
		</>
	);
};