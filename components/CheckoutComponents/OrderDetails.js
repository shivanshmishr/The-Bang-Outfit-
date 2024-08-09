import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useStateContext } from "../../context/StateContext";
import MakePayment from "./MakePayment";

export default function OrderDetails() {
  const { data: session, status } = useSession();
  const { totalPrice } = useStateContext();
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    if (status === "authenticated" && session?.user?.name) {
      const { name } = session.user;
      const nameParts = name.split(" ");

      setFirstName(nameParts[0]);
      setLastName(nameParts.slice(1).join(" "));
    }
  }, [session, status]);

  return (
    <div>
      <div>
        <h2 className="text-[3vh] my-[0vh]">Personal Details</h2>

        <div className="flex flex-row w-full justify-between">
          <div className="p-[1vh] border-2 my-[1vh]">
            <input
              type="text"
              name=""
              className="focus:outline-none w-full md:w-[43vw]"
              value={firstName}
              placeholder="Enter Your First Name"
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          <div className="p-[1vh] border-2 my-[1vh]">
            <input
              type="text"
              name=""
              className="focus:outline-none w-full  md:w-[43vw]"
              value={lastName}
              placeholder="Enter Your Last Name"
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-row w-full justify-between">
          <div className="p-[1vh] border-2 my-[1vh]">
            <input
              type="number"
              name=""
              className="focus:outline-none w-full md:w-[43vw]"
              placeholder="Enter Your Mobile Number"
            />
          </div>

          <div className="p-[1vh] border-2 my-[1vh]">
            <input
              type="email"
              name=""
              className="focus:outline-none w-full md:w-[43vw]"
              value={session?.user.email || ""}
              placeholder="Enter Your Email Id"
            />
          </div>
        </div>

        <h2 className="text-[3vh] my-[2vh]">Billing Address</h2>

        <div className="p-[1vh] border-2 my-[1vh]">
          <input
            type="text"
            name=""
            className="focus:outline-none w-full"
            placeholder="Flat No./ Apartment Name, Street Address"
          />
        </div>

        <div className="flex flex-row w-full justify-between">
          <div className="p-[1vh] border-2 my-[1vh]">
            <input
              type="number"
              name=""
              className="focus:outline-none w-full md:w-[43vw]"
              placeholder="Zip Code"
            />
          </div>
          <div className="p-[1vh] border-2 my-[1vh]">
            <input
              type="text"
              name=""
              className="focus:outline-none w-full md:w-[43vw]"
              placeholder="City Name"
            />
          </div>
        </div>

        <div className="flex flex-row w-full justify-between">
          <div className="p-[1vh] border-2 my-[1vh]">
            <input
              type="text"
              name=""
              className="focus:outline-none w-full md:w-[43vw]"
              placeholder="State"
            />
          </div>
          <div className="p-[1vh] border-2 my-[1vh]">
            <input
              type="text"
              name=""
              className="focus:outline-none w-full md:w-[43vw]"
              placeholder="Country"
            />
          </div>
        </div>
      </div>

      <p className="text-xl font-semibold text-right">
        Total Price: Rs.{totalPrice}
      </p>

      {/* <MakePayment/> */}
    </div>
  );
}
