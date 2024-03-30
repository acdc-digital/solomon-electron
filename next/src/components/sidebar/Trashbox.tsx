'use client'

import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { useParams, useRouter } from "next/navigation";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";
import { toast } from "sonner";
import { Search } from "lucide-react";
import { Input } from "../ui/input";

export const Trashbox = () => {
	const router = useRouter();
  	const params = useParams();
  	const projects = useQuery(api.projects.getTrash);
  	const restore = useMutation(api.projects.restore);
  	const remove = useMutation(api.projects.remove);

	const [search, setSearch] = useState("");

	const filteredProjects = projects?.filter((project) => {
		return project.title.toLowerCase().includes(search.toLowerCase());
	});

	const onClick = (projectId: string) => {
		router.push(`/projects/${projects}`);
	};

	const onRestore = (
		event: React.MouseEvent<HTMLDivElement, MouseEvent>,
		projectId: Id<"projects">,
		) => {
			event.stopPropagation();
			const promise = restore({ id: projectId });

			toast.promise(promise, {
				loading: "Retoring Project...",
				success: "Project Restored!",
				error: "Failed to Restore Project."
			});
		};

		const onRemove = (
			projectId: Id<"projects">,
			) => {
				const promise = remove({ id: projectId });
	
				toast.promise(promise, {
					loading: "Deleting Project...",
					success: "Project Deleted!",
					error: "Failed to Delete Project."
				});

				if (params.projectId === projectId) {
					router.push("/projects");
				}
			};

			if (projects === undefined) {
			  return (
				<div className="h-full flex items-center justify-center p-4">
					<p>Loading...</p>
				</div>
			  );
			}

	return (
		<div className="text-sm">
			<div className="flex items-center gap-x-1 p-2">
				<Search className="h-4 w-4" />
				<Input 
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					className="h-7 px-2 focus-visible:ring-transparent bg-secondary"
					placeholder="Filter by Project Title..."
				/>
			</div>
			<div className="mt-2 px-1 pb-1">
				<p className="hidden last:block text-sm text-center text-muted-foreground pb-2">
					No Projects Found.
				</p>
				{filteredProjects?.map((project) => (
					<div
					key={project._id}
					role="button"
					onClick={() => onClick(project._id)}
					className="text-sm rounded-sm w-full hover:bg-primary/5 flex items-center text-primary justify-between"
					>
						<span className="ml-4">
							{project.title}
						</span>
					</div>
				))}
			</div>
		</div>
	);
};