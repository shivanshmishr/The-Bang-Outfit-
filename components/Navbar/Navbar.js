import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession, signIn, signOut } from "next-auth/react";
import { useStateContext } from "../../context/StateContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CircularProgress from "@mui/material/CircularProgress";
import BackdropLoader from "../Backdroploader/BackdropLoader";

export default function Navbar() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [showSignInButton, setShowSignInButton] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const { totalQuantities } = useStateContext();

  const [scrolldirection, setScrollDirection] = useState(null);

  const toggleMobileNav = () => {
    setMobileNavOpen(!mobileNavOpen);
  };

  useEffect(() => {
    setShowSignInButton(true);
    const timeout = setTimeout(() => {
      setShowSignInButton(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  const handleHoverIcon = () => {
    setShowSignInButton(true);
  };

  const handleHoverDiv = () => {
    setIsHovered(true);
  };

  const handleLeaveDiv = () => {
    setIsHovered(false);
    setShowSignInButton(false);
  };

  const handleSignInOut = async () => {
    if (session) {
      await signOut();
    } else {
      await signIn();
    }
  };

  const handleProfileClick = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (session) {
        router.push("/myaccount");
      } else {
        router.push("/signin");
      }
    }, 1000);
  };

  useEffect(() => {
    setShowSignInButton(!session);
  }, [session]);

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, []);

  return (
    <>
    <BackdropLoader open={loading} />
    <div 
      className={`navbar bg-white py-[1vh] shadow-md sticky top-0 left-0 w-full transition-transform duration-300 ${scrolldirection === "down" ? "-translate-y-full":"translate-y-0"
      }`}
    >

      <div className="  flex flex-row justify-around items-center">
        {/* Logo section */}
        <div className="flex flex-row justify-start items-center">
          <div
            onClick={toggleMobileNav}
            className="md:hidden mr-[2vh] cursor-pointer"
          >
            <FontAwesomeIcon className="text-[3.5vh]" icon="fa-solid fa-bars" />
          </div>

          <div>
            <Link href="/">
              <img
                src="/logo.png"
                className="w-[6vh] md:w-[8vh]  md:mx-[1vh] shadow-2xlxl"
                alt=""
              />
            </Link>
          </div>
        </div>

        <div className="navlinks">
          <ul className="flex flex-row gap-x-[3vh]">
            <Link href="/">
              <li className="text-[2.5vh] font-medium">Home</li>
            </Link>
            {/* <Link href="/aboutus">
              <li className="text-[2.5vh] font-medium">About</li>
            </Link> */}
            <Link href="/men">
              <li className="text-[2.5vh] font-medium">Men</li>
            </Link>
            <Link href="/women">
              <li className="text-[2.5vh] font-medium">Women</li>
            </Link>
            {/* <Link href="/kids">
              <li className="text-[2.5vh] font-medium">Kids</li>
            </Link>
            <Link href="/contact">
              <li className="text-[2.5vh] font-medium">Contact</li>
            </Link> */}
          </ul>
        </div>

        {/* Search Bar */}

        <div className="flex flex-row justify-start items-center">
          <div className="md:border-2 md:border-gray-600 p-[1vh] flex flex-row items-center mr-[1vh] md:mr-[3vh]">
            <input
              type="text"
              placeholder="Search Clothing.."
              className="focus:outline-none hidden md:block md:w-[30vh] bg-transparent"
            />
            <Link href="">
              <FontAwesomeIcon
                className="text-gray-600 text-[3vh] md:text-[2.5vh]"
                icon="fa-solid fa-magnifying-glass"
              />
            </Link>
          </div>

          <Link href="">
            <div className="mr-[1.5vh] md:mr-[2.5vh] relative">
              {!session ? (
                <FontAwesomeIcon
                  className="text-[3.7vh] text-gray-600"
                  icon="fa-solid fa-user"
                  onMouseEnter={handleHoverIcon}
                  onMouseLeave={handleHoverIcon}
                  onClick={handleHoverIcon}
                />
              ) : (
                <img
                  src={session.user.image}
                  alt="Profile"
                  className="w-[7vh] rounded-full"
                  onMouseEnter={handleHoverIcon}
                  onMouseLeave={handleHoverIcon}
                  onClick={handleHoverIcon}
                />
              )}

              <div
                className={`absolute z-[50] signHover w-[42vw] top-[8vh] -right-[5vh] md:top-[8vh] md:w-[14vw] md:-right-[12vh] shadow-2xl bg-white bottom-[0vh] ${
                  showSignInButton ? "shadow-black" : "hidden"
                }`}
                onMouseEnter={handleHoverDiv}
                onMouseLeave={handleLeaveDiv}
              >
                <div className="absolute text-white triangle"></div>
                {!session ? (
                  <div className="bg-white shadow-2xl mt-[1vh] p-[1vh] md:p-[2vh]">
                    <button
                      onClick={signIn}
                      className="bluebtn text-[2vh] md:text-[2.5vh] w-full bg-purple-500 p-[1vh] rounded-lg flex flex-row justify-center items-center text-white font-semibold"
                    >
                      Sign In
                    </button>
                    <h2 className="text-center text-[2vh] md:text-[2.5vh] mt-[1vh]">
                      Please Sign In!
                    </h2>
                  </div>
                ) : (
                  <div className="bg-white shadow-2xl mt-[1vh] p-[1vh] md:p-[2vh]">
                    <Link href="/myaccount">
                      <div
                        onClick={handleProfileClick}
                        className="text-center mt-[1vh] flex flex-row items-center mb-[1.5vh]"
                      >
                        <FontAwesomeIcon
                          className="text-[2.2vh] md:text-[3vh] md:ml-[0.5vh] text-gray-600"
                          icon="fa-solid fa-user"
                        />
                        <h2 className="text-[2vh] md:text-[2.5vh] ml-[1vh] text-wrap md:ml-[1.5vh]">
                          My Account
                        </h2>
                      </div>
                    </Link>
                    <button
                      onClick={signOut}
                      className="redbtn text-[2.2vh] md:text-[2.5vh] w-full bg-red-500 p-[1vh] rounded-lg flex flex-row justify-center items-center text-white font-semibold"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </Link>

          <Link href="/checkout">
            <div className=" relative">
              <FontAwesomeIcon
                className="text-[3.7vh] text-gray-600"
                icon="fa-solid fa-cart-shopping"
              />

              <h1 className="bg-purple-700 w-[3.5vh] h-[3.5vh] rounded-full -top-[2vh] -right-[2vh] border-2 border-white text-[2.2vh] text-white absolute flex flex-row justify-center items-center">
                {totalQuantities}
              </h1>
            </div>
          </Link>
        </div>
      </div>

      <div
        className={`navlinks-mobile md:hidden fixed z-50 h-[100vh] w-[80%] top-0 bg-white flex flex-col justify-center items-center transition-transform duration-500 ease-in-out  ${
          mobileNavOpen ? "-translate-x-[0vh]" : "-translate-x-[100vw]"
        }`}
      >
        <div
          onClick={toggleMobileNav}
          className="absolute cursor-pointer top-0 right-0 p-[4vh]"
        >
          <FontAwesomeIcon
            className="text-[6vh] text-gray-700"
            icon="fa-solid fa-xmark"
          />
        </div>
        <ul className="flex flex-col justify-center text-gray-700 items-center gap-x-[3vh]">
          <Link href="/" onClick={toggleMobileNav}>
            <li className="text-[3.5vh] my-[2vh] font-medium focus:underline">
              Home
            </li>
          </Link>
          {/* <Link href="/aboutus" onClick={toggleMobileNav}>
            <li className="text-[3.5vh] my-[2vh] font-medium">About</li>
          </Link> */}
          <Link href="/men" onClick={toggleMobileNav}>
            <li className="text-[3.5vh] my-[2vh] font-medium">Men</li>
          </Link>
          <Link href="/women" onClick={toggleMobileNav}>
            <li className="text-[3.5vh] my-[2vh] font-medium">Women</li>
          </Link>
          {/* <Link href="/kids" onClick={toggleMobileNav}>
            <li className="text-[3.5vh] my-[2vh] font-medium">Kids</li>
          </Link>
          <Link href="/contact" onClick={toggleMobileNav}>
            <li className="text-[3.5vh] my-[2vh] font-medium">Contact</li>
          </Link> */}
        </ul>
      </div>
    </div>
    </>
  );
}
