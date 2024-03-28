'use client';

import { LucideIcon } from "lucide-react";

interface ProjectItemProps {
	label: string;
	onClick: () => void;
	icon: LucideIcon,
};

export const ProjectItem = ({
	label,
	onClick,
	icon: Icon, 
	}: ProjectItemProps) => {

	return (
		<div
		onClick={onClick}
		role="button"
		style={{ paddingLeft: "12px" }}
		className="ml-3 mr-5 group border border-black rounded-md  min-h-[27px] text-sm py-1 pr-3 flex items-center font-medium hover:bg-primary/5"
		>
			<Icon className="shrink-0 h-[16px] mr-2" />
			<span className="truncate" >
			  {label}
			</span>
		</div>
	)
}