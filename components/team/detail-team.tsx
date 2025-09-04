import Link from "next/link";
import { Card, CardContent, CardDescription, CardTitle } from "../ui/card";

import { TiArrowBackOutline } from "react-icons/ti";
import Image from "next/image";
import { useEffect, useState } from "react";

type Member = {
  id: number;
  name: string;
  photo: string;
  roles: string[];
  description: string;
  education: {
    degree: string;
    institution: string;
    graduation_year: number;
    phone?: string;
  };
  location: string;
  level: string;
  tools?: number[];
  email?: string;
};

type Tool = {
  id: number;
  name: string;
  icons: string;
};

const DetailTeam = ({ member }: { member: Member }) => {
  const [tools, setTools] = useState<Tool[]>([]);

  useEffect(() => {
    fetch("/api/tools")
      .then((res) => res.json())
      .then((data) => setTools(data));
  }, []);

  return (
    <div>
      <Card className="px-6">
        <Link href="/team">
          <span className="border-b-2 border-gray-500 border-dashed flex items-center gap-3 pb-1">
            <TiArrowBackOutline />
            Back
          </span>
        </Link>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4 justify-center px-0">
          <div className="col-span-2">
            <h1 className="text-3xl font-bold mb-2">About</h1>
            <span className="border-b-[2px] border-dashed flex mb-4"></span>
            <CardTitle className="text-2xl font-bold mb-2">
              {member.name}
            </CardTitle>
            <CardDescription className="text-md mb-3">
              {member.description}
            </CardDescription>
            <div>
              <h2 className="text-xl font-bold mb-2">Roles</h2>
              <span className="border-b-[2px] border-dashed flex mb-4"></span>

              {/* Roles */}
              <div className="flex flex-wrap gap-2 mb-3">
                {member.roles.map((role) => (
                  <span
                    key={role}
                    className="bg-gray-200 dark:bg-gray-700 rounded-full px-3 py-1 text-sm font-bold"
                  >
                    {role}
                  </span>
                ))}
              </div>

              {/* Tools */}
              <h2 className="text-xl font-bold mb-2">Tools</h2>
              <span className="border-b-[2px] border-dashed flex mb-4"></span>
              <div className="flex flex-wrap gap-2 mb-3">
                {member.tools?.map((toolId) => {
                  const tool = tools.find((t) => t.id === toolId);
                  if (!tool) return null;

                  return (
                    <div
                      key={tool.id}
                      className="flex items-center gap-2 bg-blue-200 dark:bg-gray-700 rounded-full  text-sm font-semibold"
                    >
                      <Image
                        src={tool.icons}
                        alt={tool.name}
                        className="w-10 h-10 p-2 object-cover rounded-full"
                        width={150}
                        height={150}
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-2">Education</h2>
              <span className="border-b-[2px] border-dashed flex mb-4"></span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <span className="bg-gray-200 dark:bg-gray-700 rounded-full px-3 py-1 text-sm">
                  🎓 {member.education.degree}
                </span>
                <span className="bg-gray-200 dark:bg-gray-700 rounded-full px-3 py-1 text-sm">
                  🏫 {member.education.institution}
                </span>
                <span className="bg-gray-200 dark:bg-gray-700 rounded-full px-3 py-1 text-sm">
                  📅 {member.education.graduation_year}
                </span>
                <span className="bg-gray-200 dark:bg-gray-700 rounded-full px-3 py-1 text-sm">
                  📞 {member.education.phone}
                </span>
              </div>
            </div>
          </div>
          <div className="justify-self-center ">
            <Image
              src={member.photo}
              alt={member.name}
              width={200}
              height={300}
              className="objek-cover rounded-lg"
            />
          </div>
        </CardContent>
        <CardContent className="px-0">
          <div>
            <h2 className="text-xl font-bold mb-2">Location</h2>
            <span className="border-b-[2px] border-dashed flex mb-4"></span>
            <p className="text-md mb-3">{member.location}</p>
          </div>
          <div className="mt-6">
            <h2 className="text-xl font-bold mb-2">Contact</h2>
            <span className="border-b-[2px] border-dashed flex mb-4"></span>
            <form className="space-y-4">
              {/* Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                {/* Subject */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    placeholder="Enter subject"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              {/* Message */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Message
                </label>
                <textarea
                  placeholder="Write your message..."
                  rows={4}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
export default DetailTeam;
