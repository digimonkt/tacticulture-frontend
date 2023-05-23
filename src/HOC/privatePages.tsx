import { useAppSelector } from "@/redux/hooks/hooks";
import { isLoggedIn } from "@/redux/reducers/user";
import { useRouter } from "next/router";
import { useEffect } from "react";

interface IPrivateRoute {
  children: React.ReactNode;
}

export default function PrivateRoute({ children }: IPrivateRoute) {
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
