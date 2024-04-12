import { api } from "@/pages/utils/api";

import "./styles/globals.css";
import { type AppType } from "next/app";
import Head from "next/head";
import { Provider } from "jotai";
import { UserProvider } from "@auth0/nextjs-auth0/client";

// import type { AppProps } from "next/app";

// export default function App({ Component, pageProps }: AppProps) {
//   return <Component {...pageProps} />;
// }

const MyApp: AppType = ({ Component, pageProps: { ...pageProps } }) => {
  return (
    <Provider>
      <Head>
        <title>MuseAI Admin</title>
      </Head>
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </Provider>
  );
};

export default api.withTRPC(MyApp);
