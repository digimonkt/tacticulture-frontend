import "@/styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  useEffect(() => {
    if (router.pathname === "/") {
      router.push("/login");
    }
  }, [router]);
  return (
    <>
      <Head>
        <title>Tacticulture</title>
      </Head>
      <main>
        <Component {...pageProps} />
      </main>
    </>
  );
}
