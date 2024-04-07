// Dashboard Projects
// /Users/matthewsimon/Documents/GitHub/solomon-electron/solomon-electron/next/src/components/canvas/Projects.tsx

import { useEffect } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import { Title } from "./_components/Title";
import { Editor } from "./_components/Editor";
import { TipTapEditor } from "./_components/TipTapEditor";

// Fetch project data based on projectId
const Projects: React.FC<{ projectId: string }> = ({ projectId }) => {
  useEffect(() => {
    if (projectId) {
      console.log("Fetching data for project ID:", projectId);
    }
    // This effect runs when projectId changes
    }, [projectId]);

  const update = useMutation(api.projects.update);
  const onChange = async (content: string) => {
    try {
      await update({ id: projectId, content });
    } catch (error) {
      console.error("Update error:", error);
    }
  };  

  const projectIdOrUndefined = projectId ?? undefined;
  const project = useQuery(api.projects.getById, { projectId: projectIdOrUndefined as Id<"projects"> | undefined });

    if (project === undefined) {
      return <p>Loading...</p>
    }

    if (project === null) {
      return null;
    }

  return (
      <div className="flex flex-col">
        <p className="text-xs text-gray-400">
          Showing details for Convex project ID: {projectId}
        </p>
          <div className="flex flex-col items-start justify-between">
            <div className="p-1">
            <Title 
            initialData={project} 
            />
            </div>
          </div>
          <div>
          <TipTapEditor
          initialContent={project.content}
          onChange={onChange}
          />
          </div>
      </div>
    )
};

export default Projects;