import React from "react";
import { useSession, signIn } from "next-auth/react";

export default function SignIn() {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col justify-between items-center">
      <h2 className="text-[3vh] mt-[5vh] text-center">Please Sign In</h2>
      <button
        onClick={signIn}
        className="my-[2vh] bg-purple-600 p-[1.5vh] text-[2.5vh]"
      >
        Sign In
      </button>
    </div>
  );
}
