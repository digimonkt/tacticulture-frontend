import "@/styles/globals.css";

import "bootstrap/dist/css/bootstrap.min.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { store } from "@/redux/store/store";
import { Provider } from "react-redux";
import { useRouter } from "next/router";
import { useEffect } from "react";
import GlobalCompRender from "@/component/globalCompRender";
import AuthEventListner from "@/HOC/authEventListner";

export default function App({ Component, pageProps }: AppProps) {
  // router
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
        <Provider store={store}>
          <AuthEventListner>
            <Component {...pageProps} />
          </AuthEventListner>
          <GlobalCompRender />
        </Provider>
      </main>
    </>
  );
}
