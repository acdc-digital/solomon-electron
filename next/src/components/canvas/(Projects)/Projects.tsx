// Dashboard Projects
// /Users/matthewsimon/Documents/GitHub/solomon-electron/solomon-electron/next/src/components/canvas/Projects.tsx

import { useEffect } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import { Title } from "./_components/Title";
import { TipTapEditor } from "./_components/TipTapEditor";
import { FileTable } from "./_components/FileTable";

// Fetch project data based on projectId
const Projects: React.FC<{ projectId: string }> = ({ projectId }) => {
  useEffect(() => {
    if (projectId) {
      console.log("Fetching data for project ID:", projectId);
    }
    // This effect runs when projectId changes
    }, [projectId]);

    {/* const projectFiles = [
    { filename: "report.pdf", type: "PDF", dateAdded: "2022-01-01" },
    { filename: "design.sketch", type: "Sketch File", dateAdded: "2022-01-02" },
      // More files
    ]; */} 

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

    if (!projectId) {
      // No project ID is set, so display a message
      return (
        <div className="flex items-center justify-center h-full">
          <p>Select a project to continue.</p>
        </div>
      );
    }

    if (project === undefined) {
      return <p>Loading...</p>
    }

    if (project === null) {
      return null;
    }

  return (
      <div className="flex flex-col">
        <p className="ml-4 mt-0 text-xs text-gray-400">
          Showing details for Convex project ID: {projectId}
        </p>
          <div className="flex flex-col items-start justify-between">
            <div className="m-3 rounded-lg border border-b">
            <Title
            initialData={project} 
            />
            </div>
          </div>
          {/* <div>
          <FileTable
            caption="Project Files"
            files={projectFiles}
          />
          </div> */} 
          <div className="ml-3 mr-6 rounded-lg border border-b">
          <TipTapEditor
          initialContent={project.content}
          onChange={onChange}
          />
          </div>
      </div>
    )
};

export default Projects;