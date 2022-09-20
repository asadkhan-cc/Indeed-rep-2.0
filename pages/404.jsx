import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import img404 from "../public/img404.png";
function NotFound() {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      // router.go();
      router.push("/");
    }, 3000);
  }, [router]);

  return (
    <div className="w-1/2 mx-auto text-center">
      <Image
        alt="404 error Page not fouond"
        src={img404}
        width={500}
        height={500}
      />
      <Link href={"/"}>
        <div>
          <a>GOTO HOMEPAGE</a>
        </div>
      </Link>
    </div>
  );
}

export default NotFound;
