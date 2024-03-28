'use client';

import { ChevronDown, ChevronRight, LucideIcon } from "lucide-react";
import { Id } from "../../../convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";

interface ProjectItemProps {
	id?: Id<"projects">;
	projectIcon?: string;
	active?: boolean;
	expanded?: boolean;
	isSearch?: boolean;
	level?: number;
	onExpand?: () => void;
	label: string;
	onClick: () => void;
	icon: LucideIcon;
};

export const ProjectItem = ({
	id,
	label,
	onClick,
	icon: Icon,
	active,
	projectIcon,
	isSearch,
	level = 0,
	onExpand,
	expanded, 
	}: ProjectItemProps) => {

	const ChevronIcon = expanded ? ChevronDown : ChevronRight;

	return (
		<div
		onClick={onClick}
		role="button"
		style={{
			// Add Padding to Project Children  
			paddingLeft: level ? `${(level * 12) + 12}px` : "12px" 
			}}
		className={cn(
			"ml-3 mr-5 mb-1 group border border-black rounded-md  min-h-[27px] text-sm py-1 pr-3 flex items-center font-medium hover:bg-primary/5",
			active && "bg-primary/5 text-primary"
			)}
		  >
			{!!id && (
				<div
				  role="button"
				  className="h-full rounded-sm hover:bg-neutral-300 mr-1"
				  onClick={() => {}}
				  >
				  <ChevronIcon 
				  className="h-4 w-4 shrink-0 text-muted-foreground/50"
				  />
				</div>
			)}
			{projectIcon ? (
				<div className="shrink-0 mr-2 text-[18px]">
				  {projectIcon}
				</div>
			) : ( 
			<Icon className="shrink-0 h-[16px] mr-2" />
			)}
			<span className="truncate" >
			  {label}
			</span>
			{isSearch && (
				<kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
					<span className="text-xs">⌘</span>k
				</kbd>
			)}
		</div>
	)
}

ProjectItem.Skeleton = function ProjectItemSkeleton({ level }: {level?: number }) {
	return (
		<div
			className="flex gap-x-2 py-[3px]"
			style={{
			paddingLeft: level ? `${(level * 12) + 25}px` : "12px"
		}}>
			<Skeleton className="h-4 w-4" />
			<Skeleton className="h-4 w-[30%]" />
		</div>
	)
}