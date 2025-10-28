// components/team/detail-team.tsx
"use client";

import Link from "next/link";
import { Card, CardContent, CardDescription, CardTitle } from "../ui/card";
import { TiArrowBackOutline } from "react-icons/ti";
import Image from "next/image";

export type Member = {
  id: string;
  name: string;
  photo: string;
  roles: string[];
  description: string;
  education?: {
    degree?: string;
    institution?: string;
    graduation_year?: number;
    phone?: string;
  };
  location?: string;
  email?: string;
  tools?: Array<{
    id: string;
    title: string;
    image: string;
    url: string;
  }>;
};

const DetailTeam = ({ member }: { member: Member }) => {
  return (
    <div>
      <Card className="px-6">
        <div className="border-b-2 border-gray-500 border-dashed flex items-center gap-3 pb-1 justify-between">
          <Link href="/team">
            <span className="flex gap-3 items-center hover:text-blue-600 transition-colors">
              <TiArrowBackOutline />
              Back to Team
            </span>
          </Link>
        </div>

        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-center px-0 py-6">
          <div className="col-span-2 space-y-6">
            {/* About Section */}
            <div>
              <h1 className="text-3xl font-bold mb-2">About</h1>
              <span className="border-b-[2px] border-dashed flex mb-4"></span>
              <CardTitle className="text-2xl font-bold mb-2">
                {member.name}
              </CardTitle>
              <CardDescription className="text-md mb-3">
                {member.description}
              </CardDescription>

              {/* Email */}
              {member.email && (
                <div className="mt-4">
                  <p className="text-sm text-gray-600">
                    <strong>Email:</strong> {member.email}
                  </p>
                </div>
              )}
            </div>

            {/* Roles Section */}
            <div>
              <h2 className="text-xl font-bold mb-2">
                Roles & Specializations
              </h2>
              <span className="border-b-[2px] border-dashed flex mb-4"></span>
              <div className="flex flex-wrap gap-2 mb-3">
                {member.roles && member.roles.length > 0 ? (
                  member.roles.map((role) => (
                    <span
                      key={role}
                      className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full px-3 py-1 text-sm font-semibold"
                    >
                      {role}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-500 text-sm">
                    No roles specified
                  </span>
                )}
              </div>
            </div>

            {/* Tools & Technologies Section */}
            {member.tools && member.tools.length > 0 && (
              <div>
                <h2 className="text-xl font-bold mb-2">Tools & Technologies</h2>
                <span className="border-b-[2px] border-dashed flex mb-4"></span>
                <div className="flex flex-wrap gap-3 mb-3">
                  {member.tools.map((tool) => (
                    <div
                      key={tool.id}
                      className="flex items-center gap-2 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-lg px-3 py-2 text-sm font-medium transition-transform hover:scale-105"
                    >
                      <Image
                        src={tool.url || tool.image || "/skills/01.png"}
                        alt={tool.title}
                        className="w-8 h-8 object-cover rounded"
                        width={32}
                        height={32}
                        onError={(e) => {
                          e.currentTarget.src = "/skills/01.png";
                        }}
                      />
                      <span>{tool.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education Section */}
            {member.education && (
              <div>
                <h2 className="text-xl font-bold mb-2">
                  Education & Background
                </h2>
                <span className="border-b-[2px] border-dashed flex mb-4"></span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {member.education.degree && (
                    <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-lg p-3">
                      <span className="text-lg">🎓</span>
                      <div>
                        <p className="font-semibold text-sm">Degree</p>
                        <p className="text-sm">{member.education.degree}</p>
                      </div>
                    </div>
                  )}

                  {member.education.institution && (
                    <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-lg p-3">
                      <span className="text-lg">🏫</span>
                      <div>
                        <p className="font-semibold text-sm">Institution</p>
                        <p className="text-sm">
                          {member.education.institution}
                        </p>
                      </div>
                    </div>
                  )}

                  {member.education.graduation_year && (
                    <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-lg p-3">
                      <span className="text-lg">📅</span>
                      <div>
                        <p className="font-semibold text-sm">Graduation Year</p>
                        <p className="text-sm">
                          {member.education.graduation_year}
                        </p>
                      </div>
                    </div>
                  )}

                  {member.education.phone && (
                    <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-lg p-3">
                      <span className="text-lg">📞</span>
                      <div>
                        <p className="font-semibold text-sm">Phone</p>
                        <p className="text-sm">{member.education.phone}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Photo Section */}
          <div className="justify-self-center space-y-4">
            <div className="text-center">
              <Image
                src={member.photo || "/foto/03.png"}
                alt={member.name}
                width={200}
                height={250}
                className="object-cover rounded-lg shadow-md"
                onError={(e) => {
                  e.currentTarget.src = "/foto/03.png";
                }}
              />
            </div>

            {/* Quick Info */}
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 space-y-2">
              <h3 className="font-semibold text-sm text-blue-800 dark:text-blue-300">
                Quick Info
              </h3>

              {member.location && (
                <div className="flex items-center gap-2 text-sm">
                  <span>📍</span>
                  <span>{member.location}</span>
                </div>
              )}

              {member.email && (
                <div className="flex items-center gap-2 text-sm">
                  <span>✉️</span>
                  <span className="truncate">{member.email}</span>
                </div>
              )}

              {member.roles && member.roles.length > 0 && (
                <div className="text-sm">
                  <span className="font-medium">Specializes in:</span>
                  <p className="text-xs mt-1 text-blue-700 dark:text-blue-300">
                    {member.roles.slice(0, 2).join(", ")}
                    {member.roles.length > 2 &&
                      ` +${member.roles.length - 2} more`}
                  </p>
                </div>
              )}
            </div>
          </div>
        </CardContent>

        {/* Contact Form Section */}
        <CardContent className="px-0 pt-6 border-t">
          <div className="mt-6">
            <h2 className="text-xl font-bold mb-2">Get In Touch</h2>
            <span className="border-b-[2px] border-dashed flex mb-4"></span>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Your Email
                  </label>
                  <input
                    type="email"
                    placeholder="your.email@example.com"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    placeholder="Project collaboration inquiry"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Message
                </label>
                <textarea
                  placeholder={`Hello ${member.name}, I'm interested in...`}
                  rows={4}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600"
                  required
                />
              </div>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
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
