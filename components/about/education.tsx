import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { LuGraduationCap } from "react-icons/lu";
import CardEducation from "./components/card-education";

const Education = () => {
  return (
    <>
      <Card>
        <CardHeader className="w-full">
          <CardTitle className="font-bold text-lg md:text-2xl flex items-center ">
            <span className="me-3">
              <LuGraduationCap />
            </span>
            Education
          </CardTitle>
          <CardDescription>My educational journey.</CardDescription>
        </CardHeader>
        <CardContent>
          <CardEducation />
        </CardContent>
      </Card>
    </>
  );
};

export default Education;
