import { urlFor } from "../../lib/client";
import React from "react";
import Link from "next/link";

export default function Categories({ category: { Title,slug, image, trending } }) {
  return (
    <Link href={`/category/${slug.current}`}>
      <div className="flex flex-col w-[25vh] h-[37vh] shadow-xl p-[1vh]">
        <img
          src={urlFor(image)}
          className="w-[25vh] h-[30vh] object-scale-down"
          alt=""
        />
        <h2 className="text-[2vh] text-purple-600 font-medium text-center">
          {Title}
        </h2>
        <p className="text-[1.8vh] text-center text-purple-400">{trending}</p>
      </div>
    </Link>
  );
}
