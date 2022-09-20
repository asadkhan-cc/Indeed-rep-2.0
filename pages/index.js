import Head from "next/head";
import Image from "next/image";
import LoginPage from "../Utils/Pages/LogInPage";

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
      </Head>

      <main>
        <h1>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>
        <div>
          <LoginPage></LoginPage>
        </div>
      </main>
    </>
  );
}
