import Index from "./components/user";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const { code } = router.query as { code: string };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex mb-32 text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        <a
          href="/api/auth/login"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            LOGIN
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Find in-depth information about Next.js features and API.
          </p>
        </a>
        {code && <Index code={code} />}
      </div>
    </main>
  );
}
