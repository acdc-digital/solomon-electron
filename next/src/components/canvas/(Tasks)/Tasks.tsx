'use client'

import React from "react";
import { useUser } from "@clerk/clerk-react";

import Image from "next/image";
import { Button } from "../../ui/button";
import { PlusCircle } from "lucide-react";

const Tasks = () => {
  const { user } = useUser();

  return (
    <div className="mt-24 flex flex-col h-full items-center space-y-4 overflow-hidden">
      <h2 className="text-lg font-medium pb-4">
        There are Currently No Tasks.
      </h2>

     <Image
     src="/undraw_outer_space.svg"
     height="350"
     width="350"
     alt="To the moon."
     className="pb-4"
     />

     <Button
     className="border-black"
      variant={"outline"}
     >
      <PlusCircle className="h-4 w-4 m-2" />
      Create New Project
     </Button>
    </div>
  );
}

export default Tasks;