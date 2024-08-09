import React, { useState, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import ordersuccess from "../../public/orderplaced.json";
import { useSession } from "next-auth/react";

export default function OrderStatus() {
  // const orderConfirmed = true;

  const { data: session } = useSession();
  const email = session?.user?.email;

  return (
    <div className="">
      <div className=" rounded-[3vh] w-[70%] mx-auto">
        <Lottie
          animationData={ordersuccess}
          loop={false}
          className="w-[40vh] mx-auto"
        />
        <h1 className="text-[4.5vh] font-bold text-amber-900 mb-[2vh] text-center">
          Thank You for Order
        </h1>
        <p className=" text-amber-950 text-[2.8vh] text-center">
          Your Order Updates will be shared on your registered email address
        </p>
        <p className="text-center text-[3vh] font-semibold text-green-800 my-[2vh]">
          {email}
        </p>
        <p className="text-gray-900 font-semibold text-[2.8vh] mt-[3vh] text-center">
          Thank You, Do visit Again
        </p>
        <Link href="/shop">
          <p className="text-center my-[3vh] font-semibold shadow-md hover:scale-125 hover:bg-purple-600 hover:text-white transition-all mx-auto py-[1vh] text-purple-600  border-purple-600 border-[0.3vh] w-[35vw] md:w-[15vw]">
            Continue Shopping
          </p>
        </Link>
      </div>
    </div>
  );
}
