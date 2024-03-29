'use client'

import React from "react";
import { useUser } from "@clerk/clerk-react";

import Image from "next/image";
import { Button } from "../ui/button";
import { PlusCircle } from "lucide-react";

const Admin = () => {
  const { user } = useUser();

  return (
    <div className="mt-24 flex flex-col h-full items-center space-y-4 overflow-hidden">
      <h2 className="text-lg font-medium pb-4">
        Welcome to {user?.firstName}&apos;s Admin Panel
      </h2>

     <Image
     src="/undraw_to_the_stars.svg"
     height="400"
     width="400"
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

export default Admin;