'use client';

import { useEffect, useState } from "react";
import { File } from "lucide-react";
import { useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/clerk-react";
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { useSearch } from "@/hooks/use-search";
import { api } from "../../convex/_generated/api";

export const SearchCommand = () => {
    const { user } = useUser();
    const router = useRouter();
    const projects = useQuery(api.projects.getSearch);
    const [isMounted, setIsMounted] = useState(false);

    const toggle = useSearch((store) => store.toggle);
    const isOpen = useSearch((store) => store.isOpen);
    const onClose = useSearch((store) => store.onClose);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Add Keyboard Command for Search Function 
    {/* useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                toggle();
            }
        }

        project.addEventListener("keydown", down);
        return () => project.removeEventListener("keydown", down);
        }, [toggle]); */} 

    const onSelect = (id: string) => {
        router.push(`/projects/${id}`);
        onClose();
    };

    if (!isMounted) {
        return null;
    }

    return (
        <CommandDialog open={isOpen} onOpenChange={onClose}>
            <CommandInput
            placeholder={`Search`} />
            <CommandList>
                <CommandEmpty>
                    No Results Found.
                </CommandEmpty>
                <CommandGroup heading="Projects">
                    {projects?.map((project) =>
                    <CommandItem
                    key={project._id}
                    value={`${project._id}-${project.title}`}
                    title={project.title}
                    onSelect={onSelect}
                    >
                        {project.icon ? (
                            <p className="mr-2 text-[18px]">
                                {project.icon}
                            </p>
                        ) : (
                            <File className="mr-2 h-4 w-4" />
                        )}
                        <span>
                            {project.title}
                        </span>
                    </CommandItem>
                    )}
                </CommandGroup>
            </CommandList>
        </CommandDialog>
    )
}