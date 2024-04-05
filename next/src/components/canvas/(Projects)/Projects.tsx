// Dashboard Projects
// /Users/matthewsimon/Documents/GitHub/solomon-electron/solomon-electron/next/src/components/canvas/Projects.tsx

import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import { Title } from "./_components/Title";

// Fetch project data based on projectId
const Projects: React.FC<{ projectId: string | null }> = ({ projectId }) => {
{/* const params = useParams(); */} 
  const projectIdOrUndefined = projectId ?? undefined;
  const project = useQuery(api.projects.getById, { projectId: projectIdOrUndefined });

    if (project === undefined) {
      return <p>Loading...</p>
    }

    if (project === null) {
      return null;
    }

  {/* useEffect(() => {
    if (projectId) {
      console.log("Fetching data for project ID:", projectId);
    }
    // This effect runs when projectId changes
    }, [projectId]); */}

  return (
      <div>
        <p className="text-xs text-gray-400">
          Showing details for Convex project ID: {projectId}
        </p>
          <div className="flex items-center justify-between">
            <Title initialData={project} />
          </div>
      </div>
    )
};

export default Projects;