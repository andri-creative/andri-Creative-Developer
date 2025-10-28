import Featured from "@/components/home/featured";
import Home from "@/components/home/home";
import Skills from "@/components/home/skills";
import { Card } from "@/components/ui/card";

export default function HomePage() {
  return (
    <>
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <div className="grid grid-cols-1 gap-4 px-4 md:grid-cols-1 lg:grid-cols-2 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
          <Home />
        </div>

        <div className="px-4 lg:px-6">
          <Skills />
        </div>

        <div className="gap-4 px-4 lg:px-6">
          <Featured />
        </div>
      </div>
    </>
  );
}
