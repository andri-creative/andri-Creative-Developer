import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const Navtitle = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // 3 detik
    return () => clearTimeout(timer); // Bersihkan timer saat unmount
  }, []);

  return (
    <div className="flex justify-center mb-5 mt-4">
      {loading ? (
        <Skeleton className="h-[20px] w-[100px] rounded-md" />
      ) : (
        <h1 className="font-bold text-3xl text-blue">Welcome</h1>
      )}
    </div>
  );
};

export default Navtitle;
