import { api } from "@/utils/api";
import "@/styles/globals.css";
import { AppProps, type AppType } from 'next/app'
import Head from "next/head";
import { Provider } from "jotai";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { NextPage } from "next";
import HeadBar from "../components/HeadBar";
import Footer from "../components/Footer";


// import type { AppProps } from "next/app";

// export default function App({ Component, pageProps }: AppProps) {
//   return <Component {...pageProps} />;
// }

type NextPageWithHideFooterProps = NextPage & {
  hideFooter?: boolean
  hideBar?: boolean
}

type CustomAppProps = AppProps & {
  Component: NextPageWithHideFooterProps
}


const MyApp: AppType<CustomAppProps> = ({ Component, pageProps: { ...pageProps } }: CustomAppProps) => {
  const hideFooter = Component.hideFooter || false
  const hideBar = Component.hideBar || false

  return (
    <Provider>
      <Head>
        <title>GenDAM</title>
        <meta name="description" content="Search your videos with GenAI" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen font-IBMPlexMono">
        <UserProvider>
          {!hideBar && <HeadBar />}
          <Component {...pageProps} />
        </UserProvider>
        {!hideFooter && <Footer />}
      </main>
    </Provider>
  );
};

export default api.withTRPC(MyApp);
