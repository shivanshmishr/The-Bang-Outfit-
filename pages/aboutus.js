import React from "react";

export default function aboutus() {
  return (
    <div className="w-[90vw] mx-auto my-[4vh]">
      <div className="aboutUsBackground  shadow-lg">
        <div className="md:w-[65%] md:p-[10vh] p-[2vh] flex flex-col justify-center items-start">
          <h2 className="md:text-[6vh] text-[3vh] font-medium  text-gray-700 ">
            "Welcome to The Bang Outfit"
          </h2>
          <p className="md:w-[80%] pd:my-[5vh] w-[60%] text-[2vh] my-[3vh]">
            At The Bang Outfit, we proudly stand at the intersection of fashion
            and self-assurance. Our brand is not just about clothing; it's a
            celebration of individuality, a journey towards self-expression, and
            a commitment to providing you with fashion that reflects your unique
            identity.
          </p>
          <button className="p-[2vh] bg-fuchsia-600 w-[30%] text-white shadow-md rounded-md md:mb-[15vh] ">
            SHOP NOW!
          </button>
        </div>
      </div>

      <div className="flex md:flex-row flex-col justify-evenly my-[8vh] bg-yellow-200 p-[5vh] gap-[3vh] ">
        <div className="flex flex-col justify-center items-center p-[5vh]  bg-white border-[0.2vh] shadow-md">
          <img
            src="/images/about/vision.jpg"
            alt="vision"
            className="h-[20vh] "
          />
          <h1 className="text-[4vh]">Our Vision</h1>
          <p className="text-[2vh] text-justify">
            Our vision at The Bang Outfit is to redefine fashion, seeing
            clothing as a canvas for self-expression where you paint your
            personality, story, and aspirations. We accompany you on this
            artistic journey, offering a curated collection that seamlessly
            blends style, innovation, and confidence.
          </p>
        </div>
        <div className="flex flex-col justify-center items-center p-[5vh]  bg-white border-[0.2vh] shadow-md">
          <img
            src="/images/about/mission.jpg"
            alt="vision"
            className="h-[20vh] "
          />
          <h1 className="text-[4vh]">Our Mission</h1>
          <p className="text-[2vh] text-justify">
            The Bang Outfit's mission is to curate an innovative fashion
            collection that empowers individuals of all body types. Emphasizing
            quality, sustainability, and inclusivity, we aim to redefine
            fashion, fostering a diverse community that embraces limitless
            personal style.
          </p>
        </div>
        <div className="flex flex-col justify-center items-center p-[5vh] bg-white border-[0.2vh] shadow-md">
          <img
            src="/images/about/value.jpg"
            alt="vision"
            className="h-[20vh] "
          />
          <h1 className="text-[4vh]">Our Value</h1>
          <p className="text-[2vh] text-justify">
            Inclusivity is the cornerstone of The Bang Outfit, transcending
            boundaries and embracing individuals of all backgrounds and sizes.
            We create a space where everyone feels empowered to express their
            unique identity through our diverse fashion collections.
          </p>
        </div>
      </div>
    </div>
  );
}
