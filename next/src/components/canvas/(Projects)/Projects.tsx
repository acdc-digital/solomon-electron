// Dashboard Projects
// /Users/matthewsimon/Documents/GitHub/solomon-electron/solomon-electron/next/src/components/canvas/Projects.tsx

import { useEffect } from "react";

const Projects: React.FC<{ projectId: string | null }> = ({ projectId }) => {
  // Example logic to fetch project data based on projectId
  // This could be a call to a backend API or a lookup in a local store

  useEffect(() => {
    if (projectId) {
      console.log("Fetching data for project ID:", projectId);
      // Fetch project data from your backend or state management store
      // setProjectData(...);
    }
  }, [projectId]); // This effect runs when projectId changes

  return (
    <div>
      <h1>Project Page</h1>
      {projectId ? (
        <div>
          {/* Render your project details here */}
          <p>Showing details for project ID: {projectId}</p>
          {/* Example: <p>Title: {projectData.title}</p> */}
        </div>
      ) : (
        <p>Please select a project from the sidebar.</p>
      )}
    </div>
  );
};

export default Projects;
