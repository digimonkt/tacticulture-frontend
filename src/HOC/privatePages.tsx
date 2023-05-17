import { useAppSelector } from "@/redux/hooks/hooks";
import { isLoggedIn } from "@/redux/reducers/user";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function PrivateRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  // router
  const router = useRouter();

  // redux
  const isUserLoggedIn = useAppSelector(isLoggedIn);

  useEffect(() => {
    if (!isUserLoggedIn) {
      router.push("/login");
    }
  }, [isUserLoggedIn, router]);

  return <>{children}</>;
}
