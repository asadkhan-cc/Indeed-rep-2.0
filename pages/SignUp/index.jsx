import Link from "next/link";
import React from "react";

const SignUp = () => {
  return (
    <section className="flex lg:flex-col align-middle justify-center p-4 lg:p-44">
      <div className="flex  text-center align-middle justify-center ">
        <Link href={"/SignUp/SignUpUsers"}>
          <div className="grow  border-r-black border-r-2 cursor-pointer">
            Sighnup For <br />
            <span className="text-cyan-500 active:text-red-500">
              Job Seekers
            </span>
          </div>
        </Link>
        <Link href={"/SignUp/SignUpEmployers"}>
          <div className="grow cursor-pointer">
            Sighnup For <br />
            <span className="text-cyan-500 active:text-red-500">
              Employeers
            </span>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default SignUp;
