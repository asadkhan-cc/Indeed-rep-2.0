import Head from "next/head";
import Image from "next/image";
import LoginPage from "../src/Pages/LogInPage";

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
      </Head>

      <main>
        <h1 className="text-center">
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>
        <div>
          <div className=" mt-2 lg:mt-0 w-auto md:w-1/2 mx-auto text-center">
            <h1 className="text-xl font-bold md:text-3xl sm:font-bold lg:text-6xl lg:font-extrabold ">
              Home Page
            </h1>
            <hr />
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi,
              laboriosam error voluptas consequatur nostrum commodi dolor
              temporibus! Natus, veritatis soluta minima, consequatur optio
              veniam provident delectus dicta deserunt amet molestias!
            </p>{" "}
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi,
              laboriosam error voluptas consequatur nostrum commodi dolor
              temporibus! Natus, veritatis soluta minima, consequatur optio
              veniam provident delectus dicta deserunt amet molestias!
            </p>{" "}
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi,
              laboriosam error voluptas consequatur nostrum commodi dolor
              temporibus! Natus, veritatis soluta minima, consequatur optio
              veniam provident delectus dicta deserunt amet molestias!
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
