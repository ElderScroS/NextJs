import "@/styles/globals.css";
import type { AppProps } from "next/app";
import '../styles/styles.css';
import Navigation from "@/components/Layout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Navigation/>
      <Component {...pageProps} />
    </>
  );
}
