import React from "react";
import Link from "next/link";
import { urlFor } from "../../lib/client";

export default function ProductCard({ product }) {
  const discount = () => {
    const discountPrice =
      product.cuttedproductprice - product.finalproductprice;
    const discountPercentage =
      (discountPrice / product.cuttedproductprice) * 100;
    return discountPercentage.toFixed(0);
    places;
  };

  return (
    <div
      key={product._id}
      className="product-item md:w-[12vw] w-[38vw] border-1 border-[#ebebeb]  shadow-md"
    >
      <Link href={`/productdetail/${product.slug.current}`}>
        <div className="relative">
          <img
            src={urlFor(product.productimage).url()}
            alt={product.productitle}
            className="w-full h-[30vh] object-scale-down"
          />

          <span className="bg-[#1E9700] absolute text-[#fff] -right-1 shadow-md -top-1 font-sans text-center px-[0.7vh] py-[0.2vh] font-bold text-[1.7vh]">
            {discount()} % OFF
          </span>

          <div className="flex flex-col mx-[1.5vh] py-[1.5vh] ">
            <h3 className=" font-medium text-gray-600  ">
              {product.productitle.slice(0, 30)}...
            </h3>
            <div className="flex flex-row justify-between items-center mt-[1vh]">
              <p className="text-purple-800  font-medium">
                Rs.{product.finalproductprice}
              </p>
              <p className="text-red-500  font-medium">
                Rs.&nbsp;
                <span className="line-through">
                  {product.cuttedproductprice}
                </span>
              </p>
              
            </div>
          </div>
        </div>
      </Link>
      {console.log(product)}
    </div>
  );
}
