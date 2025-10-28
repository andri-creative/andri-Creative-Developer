import About from "@/components/about/about";
import Career from "@/components/about/career";
import Education from "@/components/about/education";

export default function AboutPage() {
  return (
    <>
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 px-4 gap-5 lg:px-6">
          <About />

          <Education />
        </div>
        <div className="px-4 lg:px-6 ">
          <Career />
        </div>
        <div className="gap-4 px-4  lg:px-6"></div>
      </div>
    </>
  );
}
