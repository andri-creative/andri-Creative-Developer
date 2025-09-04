import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

// import { projectsData } from "@/app/api/projects/route";
import { BsFillPinFill } from "react-icons/bs";
import { useEffect, useState } from "react";

export type ProjectsData = {
  id: number;
  title: string;
  description: string;
  skills: string[];
  image: string;
  status: "active" | "inactive";
}[];

const Projects = () => {
  const [projectsData, setProjectsData] = useState<ProjectsData>([]);

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => setProjectsData(data));
  }, []);

  const sortedProjects = [...projectsData].sort((a, b) => {
    if (a.status === "active" && b.status !== "active") return -1;
    if (a.status !== "active" && b.status === "active") return 1;
    return 0;
  });

  return (
    <>
      <Card className="@container/card">
        <CardHeader className="gap-3 p-2 md:px-6 w-full">
          <CardTitle className="text-3xl md:text-4xl font-bold">
            Projects
          </CardTitle>
          <CardDescription>
            A showcase of both private and open-source projects I&#39;ve built
            or contributed to.
          </CardDescription>
          <span className="block border-t border-dashed border-gray-800"></span>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-5 px-4 lg:px-6">
          {sortedProjects.map((item) => (
            <Link key={item.id} href="#">
              <Card className="pt-0 relative">
                {item.status === "active" && (
                  <div className="absolute z-20 top-0 right-0 bg-blue-500 text-gray-100 rounded-tr-md rounded-bl-md">
                    <CardTitle className="text-sm font-bold flex px-4 py-1 items-center justify-between text-center">
                      <BsFillPinFill />
                      <span className="ms-2">Featured</span>
                    </CardTitle>
                  </div>
                )}
                <div className="w-full relative aspect-[4/3]        ">
                  <Image
                    src={item.image}
                    fill
                    alt={item.title}
                    className="object-cover rounded-t-md"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                  <CardDescription className="text-sm break-words">
                    {(() => {
                      const words = `${item.description}`.split(" ");

                      const preview = words.slice(0, 15).join(" ");
                      return preview + (words.length > 15 ? "..." : "");
                    })()}
                  </CardDescription>
                  <div className="flex flex-wrap gap-3 py-2">
                    {item.skills.map((resp, idx) => (
                      <Avatar key={idx} className="rounded-none">
                        <AvatarImage className="rounded-0" src={resp} alt="a" />
                        <AvatarFallback>SK</AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </CardContent>
      </Card>
    </>
  );
};

export default Projects;
