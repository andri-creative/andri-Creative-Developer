"use client";

import Achievements from "@/components/achievements/achievements";
import { useEffect, useState } from "react";

export default function AchievementsPage() {
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    const fetchAchie = async () => {
      try {
        const response = await fetch("/api/achievements");

        const data = await response.json();

        setAchievements(data);
      } catch (error) {
        console.log("data error", error);
      }
    };
    fetchAchie();
  }, []);

  console.log("ini achie", achievements);

  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <div className="grid grid-cols-1 px-4 lg:px-6">
        <Achievements dataAchievements={achievements} />
      </div>
      <div className="px-4 lg:px-6 "></div>
      <div className="gap-4 px-4  lg:px-6"></div>
    </div>
  );
}
