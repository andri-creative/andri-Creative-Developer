"use client";

import Image from "next/image";
import { Card, CardDescription, CardTitle } from "../../ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../ui/accordion";

import { useState } from "react";

import { experienceData } from "@/app/api/career/route";

const CardCareer = () => {
  const [openId, setOpenId] = useState<string | undefined>(undefined);

  return (
    <>
      <Accordion
        type="single"
        collapsible={true}
        value={openId}
        onValueChange={(val) => setOpenId(val)}
        className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full"
      >
        {experienceData.map((item) => (
          <AccordionItem key={item.id} value={item.id.toString()}>
            <Card className="flex flex-col p-4">
              <div className="flex items-start gap-4">
                <Image
                  src={item.companyLogo}
                  width={60}
                  height={60}
                  alt="Company Logo"
                  className="rounded-md"
                />
                <div className="flex flex-col w-full">
                  <CardTitle className="text-lg font-semibold">
                    {item.title}
                  </CardTitle>
                  <CardDescription className="text-xs md:text-sm">
                    {item.company} • {item.location}
                  </CardDescription>
                  <div className="text-xs text-muted-foreground mt-1">
                    <ul className="flex ml-4 flex-col md:flex-row md:gap-5 lg:gap-7 md:ml-6 list-disc mb-4 text-xs md:text-sm">
                      <li>{item.period}</li>
                      <li>{item.duration}</li>
                      <li>{item.type}</li>
                      <li>{item.mode}</li>
                    </ul>
                  </div>
                  <AccordionTrigger className="w-full">
                    {openId === item.id.toString()
                      ? "Hide responsibilities"
                      : "Show responsibilities"}
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="flex flex-col gap-2 ml-6 list-disc mb-4 text-sm">
                      {item.responsibilities.map((resp, idx) => (
                        <li key={idx}>{resp}</li>
                      ))}
                    </ul>
                  </AccordionContent>
                </div>
              </div>
            </Card>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
};

export default CardCareer;
