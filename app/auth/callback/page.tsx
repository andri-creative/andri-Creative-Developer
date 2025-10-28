import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const params = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const token = params.get("token");
    const name = params.get("name");
    const email = params.get("email");
    const avatarUrl = params.get("avatarUrl");

    if (token && name && email) {
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify({ name, email, avatarUrl }));
      router.replace("/chat"); // arahkan ke halaman chat
    }
  }, [params, router]);

  return null;
}
