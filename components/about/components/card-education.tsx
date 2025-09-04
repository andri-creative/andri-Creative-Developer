import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import Image from "next/image";

const CardEducation = () => {
  return (
    <>
      <Card className="flex flex-col justify-center p-4">
        <div className="flex items-start gap-4">
          <Image src="/logo/logo-untag.png" width={85} height={85} alt="edu" />
          <div className="flex flex-col  w-full">
            <CardTitle className="text-lg font-semibold">
              Universitas 17 Agustus 1945 (Untag) Surabaya
            </CardTitle>
            <CardDescription>
              Bachelor&#39;s degree • Informatics Engineering, (S.Kom)
            </CardDescription>
            <CardDescription>2021 - 2025 • Surabaya, Indonesia</CardDescription>
          </div>
        </div>
      </Card>
    </>
  );
};

export default CardEducation;
