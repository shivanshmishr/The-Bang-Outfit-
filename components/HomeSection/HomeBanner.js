import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import "aos/dist/aos.css";
import AOS from "aos";

import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

export default function HomeBanner() {

  useEffect(() => {
    AOS.init({});
    AOS.refresh();
    return () => {
      AOS.refreshHard();
    };
  }, []);

  const images = [
    { id: 3, source: "/images/slider/mainbgframe.webp" },
    { id: 1, source: "/images/slider/banner2.jpg" },
    { id: 2, source: "/images/slider/banner3.webp" },
  ];

  return (
    <div>
      <div
        data-aos="zoom-in"
        data-aos-duration="800"
        className="flex flex-row md:h-[90vh] object-cover select-none overflow-hidden"
      >
        <Swiper 
          navigation={true} 
          className="mySwiper"
          modules={[Autoplay, Pagination, Navigation]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 2000 }}
          loop={true}
        >
          {images.map((image) => (
            <SwiperSlide>
              <img
                key={image.id}
                src={image.source}
                alt={`Banner ${image.id}`}
                className="w-[100%] md:h-[90vh] h-[60vh] object-fill"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {/* <div className="w-[85vw] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-2xl md:bg-gradient-to-r backdrop-blur-xl md:from-[#dae9f598] md:to-[#ffffff] bg-gradient-to-r from-[#cbc8eda3] to-[#ffffffab] md:w-[37vw] flex flex-col space-y-4 p-[5vh]">
        <h3 className="text-[#333333] font-semibold text-[2.5vh]">New Arrival</h3>
        <h1 className="text-purple-600 text-[3vh] md:text-[4.5vh] font-bold font-mono leading-tight">
          Discover Our New Collection
        </h1>
        <p className="text-[#333333] font-medium text-[2vh]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
          tellus, luctus nec ullamcorper mattis.
        </p>
        <Link href="/shop">
          <button className="bg-purple-500 text-[1.8vh] text-white font-bold w-fit  p-[1.5vh]">
            Shop Now
          </button>
        </Link>
      </div> */}
    </div>
  );
}
