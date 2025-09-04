import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { CardJunior, CardSenior } from "./components/card-team";

const Team = () => {
  return (
    <>
      <Card className="@container/card">
        <CardHeader className="gap-3 p-2 md:px-6 w-full">
          <CardTitle className="text-3xl md:text-4xl font-bold">Team</CardTitle>
          <CardDescription>
            A showcase of senior and junior team members, showing how we work,
            learn, and grow together.
          </CardDescription>
          <span className="block border-t border-dashed border-gray-800"></span>
          <CardTitle className="text-3xl md:text-4xl font-bold text-center">
            🧑‍💻 Senior Stack
          </CardTitle>
          <CardDescription className="text-center ">
            Used for complex and large-scale applications, focusing on
            performance, security, and scalability.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1  gap-5 px-4 lg:px-6">
          <CardSenior />
        </CardContent>
        <CardHeader>
          <span className="block border-t border-dashed border-gray-800"></span>
          <CardTitle className="text-3xl md:text-4xl font-bold text-center">
            🧑‍🎓 Junior Stack
          </CardTitle>
          <CardDescription className="text-center ">
            Used for simple and beginner-friendly applications, focusing on ease
            of learning and quick implementation.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1  gap-5 px-4 lg:px-6">
          <CardJunior />
        </CardContent>
      </Card>
    </>
  );
};

export default Team;
