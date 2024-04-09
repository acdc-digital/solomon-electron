// Docs 
// /Users/matthewsimon/Documents/github/solomon-electron/solomon-electron/next/src/components/canvas/(Docs)/Docs.tsx

'use client'

import React from "react";
import { useUser } from "@clerk/clerk-react";
import { Badge } from "@/components/ui/badge"

const Docs = () => {
  const { user } = useUser();

    return (
        <div>
            {/* Other documentation components */}
            <div className="mt-5  mr-2 flex flex-row gap-x-3 justify-center">
              <Badge>Next.js</Badge>
              <Badge>Typescript</Badge>
              <Badge>Tailwind</Badge>
              <Badge>ShadCN</Badge>
              <Badge>Convex DB</Badge>
              <Badge>TipTap Editor</Badge>
              <Badge>Clerk Auth</Badge>
              <Badge>OpenAI Chat</Badge>
            </div>
            {/* More components or documentation sections */}
        </div>
    );
}
  
export default Docs;
