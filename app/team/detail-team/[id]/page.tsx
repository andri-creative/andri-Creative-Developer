
"use client";

import DetailTeam from "@/components/team/detail-team";
import { useEffect, useState } from "react";

export type Education = {
  degree: string;
  institution: string;
  graduation_year: number;
  phone: string;
};

export type TeamMember = {
  id: number;
  name: string;
  photo: string;
  roles: string[];
  description: string;
  education: Education;
  location: string;
  level: string;
  tools: number[];
  email: string;
};

export type TeamData = {
  members: TeamMember[];
  education: Education[];
};

export default function TeamDetailPage({ params }: { params: { id: string } }) {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

  useEffect(() => {
    fetch("/api/team")
      .then((res) => res.json())
      .then((data) => setTeamMembers(data));
  }, []);
  const member = teamMembers.find((m) => m.id === Number(params.id));

  if (!member) {
    return <div>Member not found</div>;
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <DetailTeam member={member} />
    </div>
  );
}
