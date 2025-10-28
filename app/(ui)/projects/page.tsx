"use client";

import Projects from "@/components/projects/projects";
import { useEffect, useState } from "react";
import { ProjectData } from "@/components/projects/projects";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<ProjectData[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/api/projects");
        const data = await response.json();

        console.log("Raw API response:", data);

        if (data.projects && Array.isArray(data.projects)) {
          setProjects(data.projects);
        } else if (data.project && Array.isArray(data.project)) {
          setProjects(data.project);
        } else if (Array.isArray(data)) {
          setProjects(data);
        } else {
          console.warn("Unexpected API response format:", data);
          setProjects([]);
        }
      } catch (err) {
        console.error("Error fetching projects:", err);
        setProjects([]);
      }
    };

    fetchProjects();
  }, []);
  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <div className="grid grid-cols-1 px-4 lg:px-6">
        <Projects projects={projects} />
      </div>
      <div className="px-4 lg:px-6 "></div>
      <div className="gap-4 px-4  lg:px-6"></div>
    </div>
  );
}
