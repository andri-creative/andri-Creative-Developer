"use client";
import Image from "next/image";
import { use, useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ExternalLink, Github, Sparkles, Layers, User } from "lucide-react";

type ProjectDetailProps = {
  params: Promise<{
    id: string;
  }>;
};

export default function ProjectDetail({ params }: ProjectDetailProps) {
  const { id } = use(params);
  const [project, setProject] = useState<any>(null);

  useEffect(() => {
    fetch(`/api/projects/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Project detail:", data);
        // ✅ Handle response structure
        setProject(data.project || data);
      });
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-400">Loading project details...</p>
        </div>
      </div>
    );
  }

  const statusString = project.status ? "active" : "inactive";

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          className="mb-6 group"
          onClick={() => window.history.back()}
        >
          <span className="mr-2">←</span>
          <span className="group-hover:underline">Back to Projects</span>
        </Button>

        {/* Hero Section */}
        <div className="relative w-full aspect-video overflow-hidden rounded-2xl border border-gray-800 shadow-2xl mb-8">
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent z-10" />
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover hover:scale-105 transition-transform duration-700"
            priority
          />
          {project.status === "active" && (
            <div className="absolute top-6 right-6 z-20">
              <Badge className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm font-medium shadow-lg">
                <Sparkles className="w-4 h-4 mr-2 inline" />
                Featured Project
              </Badge>
            </div>
          )}
        </div>

        {/* Title Section */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent mb-4">
            {project.title}
          </h1>
          <p className="text-lg text-gray-400 leading-relaxed max-w-4xl">
            {project.description}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 mb-12">
          {project.demoUrl && (
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Live Demo
              </a>
            </Button>
          )}
          {project.repoUrl && (
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-gray-700 hover:bg-gray-800"
            >
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="w-4 h-4 mr-2" />
                Source Code
              </a>
            </Button>
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Features Card */}
            {project.features && project.features.length > 0 && (
              <Card className="bg-gray-900/50 border-gray-800 backdrop-blur">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-2xl">
                    <Sparkles className="w-6 h-6 text-blue-500" />
                    Key Features
                  </CardTitle>
                  <CardDescription>
                    What makes this project special
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {project.features.map((feature: string, i: number) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-gray-300"
                      >
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600/20 flex items-center justify-center mt-0.5">
                          <span className="w-2 h-2 rounded-full bg-blue-500" />
                        </span>
                        <span className="leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Role Card */}
            {project.role && (
              <Card className="bg-gray-900/50 border-gray-800 backdrop-blur">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-2xl">
                    <User className="w-6 h-6 text-green-500" />
                    My Role
                  </CardTitle>
                  <CardDescription>
                    Contribution to this project
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 leading-relaxed">
                    {project.role}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Tech Stack Card */}
            {project.techStack && project.techStack.length > 0 && (
              <Card className="bg-gray-900/50 border-gray-800 backdrop-blur sticky top-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Layers className="w-5 h-5 text-purple-500" />
                    Tech Stack
                  </CardTitle>
                  <CardDescription>Technologies used</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech: string, i: number) => (
                      <Badge
                        key={i}
                        variant="secondary"
                        className="bg-gray-800 hover:bg-gray-700 border border-gray-700 px-3 py-1.5 text-sm font-medium"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Project Info Card */}
            <Card className="bg-gradient-to-br from-blue-600/10 to-purple-600/10 border-blue-800/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-xl">Project Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-sm text-gray-400 mb-1">Status</div>
                  <Badge
                    variant={
                      statusString === "active" ? "default" : "secondary"
                    }
                  >
                    {statusString === "active" ? "Active" : "Completed"}
                  </Badge>
                </div>
                <Separator className="bg-gray-800" />
                <div className="text-sm text-gray-400">
                  <p>Want to know more about this project?</p>
                  <p className="mt-2">Feel free to reach out!</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
