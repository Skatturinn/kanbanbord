import React, { useEffect, useState } from 'react';

interface Project {
  title: string;
  status: string;
}

export function Project({ projectId }: { projectId: string }) {
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects/${projectId}`)
      .then((response) => response.json())
      .then((data) => setProject(data));
  }, [projectId]);

  if (!project) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h3>{project.title}</h3>
      <p>Status: {project.status}</p>
    </div>
  );
}