import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Footer() {
  return (
    <div className="black">
      <div className="flex md:flex-row  justify-around  footerbg  ">
        <img
          src="/images/footerbg.jpg"
          className="md:w-[50vh] md:block hidden "
        />
        <div className="flex flex-col md:flex-row p-[5vh] md:gap-x-[15vh] gap-[2vh] text-center md:text-justify ">
          <div>
            <h1 className="text-[3vh] font-semibold">CONTACT US</h1>
            <FontAwesomeIcon icon="fa-solid fa-phone" />
            <p> 9152537338</p>
            <FontAwesomeIcon icon="fa-solid fa-envelope" />
            <p> thebangoutfit@gmail.com</p>
          </div>
          <div>
            <h1 className="text-[3vh] font-semibold">QUICK LINK</h1>
            <p>Home</p>
            <p>About</p>
            <p>Men</p>
            <p>Women</p>
            <p>Kids</p>
            <p>Contact us</p>
          </div>
          <div>
            <h1 className="text-[3vh] font-semibold">FOLLOW US ON</h1>
            <p>Instagram</p>
            <p>Facebook</p>
            <p>Linkdln</p>
          </div>
        </div>
      </div>
      <div className=" flex md:flex-row flex-col md:justify-between md:px-[5vh] py-[2vh] bg-[#EAB6A8] font-medium md:text-[2.5vh]">
        <p className="text-center">
          CopyRight© 2023 The Bang Jeans. All Rights Reserved.
        </p>
        <p className="text-center">Designed and Developed by G & R</p>
      </div>
    </div>
  );
}
