import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

const About = () => {
  return (
    <>
      <Card className="@container/card">
        <CardHeader className="gap-3 p-2 md:px-6 w-full">
          <CardTitle className="text-3xl md:text-4xl font-bold">
            About
          </CardTitle>
          <CardDescription>A brief introduction to who I am.</CardDescription>
          <span className="block border-t border-dashed border-gray-800"></span>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-gray-800 dark:text-gray-200 font-medium space-y-4 leading-relaxed text-justify">
            <p>
              I am an experienced and passionate Full-Stack Developer with a
              strong foundation in Informatics Engineering from University 17
              August 1945 Surabaya. I specialize in developing scalable,
              efficient, and user-centric digital solutions across platforms.
            </p>

            <p>
              On the frontend, I leverage modern frameworks such as React.js and
              Next.js, along with Tailwind CSS, to build responsive and
              accessible interfaces. On the backend, I work with Laravel,
              Express.js, and Golang to design and implement reliable services.
              For interactive user experiences, I also integrate data
              visualization into my projects, ensuring clarity and usability.
            </p>

            <p>
              I thrive in collaborative environments and take pride in being
              detail-oriented, adaptable, and committed to continuous learning.
              With every project, my goal is to deliver high-performance
              applications that create meaningful impact for users.
            </p>

            <div className="pt-4">
              <p>Best regards,</p>
              <p className="text-3xl font-white-star text-green-400 italic">
                Andri
              </p>
            </div>
          </CardDescription>
        </CardContent>
      </Card>
    </>
  );
};

export default About;
