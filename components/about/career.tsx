import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { IoBriefcaseOutline } from "react-icons/io5";

import CardCareer from "./components/card-career-data.";

const Career = () => {
  return (
    <>
      <Card>
        <CardHeader className="w-full">
          <CardTitle className="font-bold text-lg md:text-2xl flex items-center ">
            <span className="me-3">
              <IoBriefcaseOutline />
            </span>
            Career
          </CardTitle>
          <CardDescription>My professional journey.</CardDescription>
        </CardHeader>
        <CardContent>
          <CardCareer />
        </CardContent>
      </Card>
    </>
  );
};

export default Career;
