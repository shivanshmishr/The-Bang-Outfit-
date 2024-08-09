import React from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import PersonIcon from "@mui/icons-material/Person";
import AddHomeIcon from "@mui/icons-material/AddHome";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export default function AccountSidebar() {
  const { data: session } = useSession();
  const { user } = session;

  return (
    <div className="md:w-[30vw] my-[5vh] font-sans flex flex-col w-full mx-auto ">
      <div className="flex flex-col justify-around text-gray-600 mx-auto place-items-stretch md:items-start">
        <img
          className="w-[25vh] mb-[2vh] rounded-full mx-auto md:mx-[0vh]"
          src={user?.image}
          alt="profile"
        />
        <p className="text-[3vh] font-medium my-[0.5vh]">Name: {user?.name}</p>
        <p className="text-[3vh] font-normal my-[0.5vh]">Email: {user.email}</p>


        <Link href="" >
          <div className="flex flex-row items-center text-[3vh] font-medium my-[0.5vh]"> 
            <PersonIcon className="text-[4vh] mr-[1vh]" />
            <h2>Account Details</h2>
          </div>
        </Link>

        <Link href="" >
          <div className="flex flex-row items-center text-[3vh] font-medium my-[0.5vh]"> 
            <AddHomeIcon className="text-[4vh] mr-[1vh]"/>
            <h2>Billing Details</h2>
          </div>
        </Link>

        <Link href="" >
          <div className="flex flex-row items-center text-[3vh] font-medium my-[0.5vh]"> 
            <ShoppingCartIcon className="text-[4vh] mr-[1vh]"/>
            <h2>My Orders</h2>
          </div>
        </Link>

        <button
          onClick={signOut}
          className=" my-[3vh] text-[2.5vh]  md:w-[15vw] rounded-md  p-[1.5vh] bg-gradient-to-r from-[#FF001F] to-black text-white"
        >
          LogOut
        </button>
      </div>
    </div>
  );
}