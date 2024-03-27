// Dashboard Notes
// /Users/matthewsimon/Documents/GitHub/solomon-electron/solomon-electron/next/src/components/canvas/Notes.tsx

'use client'

import React from "react";

import { useUser } from "@clerk/clerk-react";
import { toast } from "sonner";
import Image from "next/image";
import { Button } from "../ui/button";
import { PlusCircle } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

const Projects = () => {
  const { user } = useUser();
  const create = useMutation(api.projects.create);

  const onCreate = () => {
    const promise = create({ title: "New Project" });

    toast.promise(promise, {
      loading: "Creating a new Project...",
      success: "New Project Created!",
      error: "Failed to Create a new Project"
    });
  }

  return (
    <div className="flex flex-col h-full items-center justify-center space-y-4 overflow-hidden">
      <h2 className="text-lg font-medium pb-4">
        There are Currently No Projects.
      </h2>

     <Image
     src="/undraw_to_the_moon.svg"
     height="400"
     width="400"
     alt="To the moon."
     className="pb-4"
     />

     <Button onClick={onCreate}
     className="border-black"
      variant={"outline"}
     >
      <PlusCircle className="h-4 w-4 m-2" />
      Create New Project
     </Button>
    </div>
  );
}

export default Projects;