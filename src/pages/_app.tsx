import "@/styles/globals.css";
import Layout from "@/pages/layout";
import { AppProps } from "next/app";
import { Component, ReactElement, ReactNode } from "react";
import { NextPage } from "next";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component?.getLayout ?? ((page) => page);

  return <Layout>{getLayout(<Component {...pageProps} />)}</Layout>;
}
