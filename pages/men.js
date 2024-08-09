import React, { useState } from "react";
import { client, urlFor } from "../lib/client";
import { ProductCard } from "../components";

export default function Men({ products }) {
  return (
    <div className="w-full mx-auto flex flex-col mb-[2vh]">
      {/* Title Section */}
      <div>
        <h2 className="md:text-[4vh] text-[3vh] py-[6vh]  text-center text-gray-700 font-medium font-poppins ">
          Men Section
        </h2>
      </div>

      {/* Category Section */}
      <div className="flex flex-col-reverse md:flex-row ">
        {/* <div className="w-full md:w-[30%] border-t-[0.3vh] shadow-sm">
          <button className="w-full">
            <h1 className="text-[3vh] text-center p-[1.5vh] border-b-2 mb-[1vh]">
              CATEGORIES
            </h1>
          </button>

          <div className="mx-auto">
            <ul className="flex flex-col gap-[2vh] pl-[3vh] text-[2.5vh] text-gray-600  ">
              {[
                "T-shirts",
                "Shirts",
                "Sweatshirts",
                "Kurtas",
                "Jackets",
                "Sweaters",
                "Blazers",
                "Jeans",
                "Trousers",
                "Shorts",
                "Track Pants",
              ].map((category) => (
                <li key={category}>
                  <input type="checkbox" />
                  &nbsp;{category}
                </li>
              ))}
            </ul>
          </div>
        </div> */}

        {/* Product Display Section */}
        <div>
          <div className="p-[2vh]">
            {products.length === 0 ? (
              <div>
                <h2>No Products Found</h2>
              </div>
            ) : (
              <div className=" products-container flex justify-center flex-row flex-wrap w-[90%] mx-auto gap-[3vh]">
                {products.map((product) => (
                  <ProductCard product={product} />
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export const getServerSideProps = async () => {
  const productquery =
    '*[_type == "product" && (gender == "men" || gender == "unisex")]';
  const products = await client.fetch(productquery);

  const categoryquery =
    '*[_type == "category" && (gender == "men" || gender == "unisex")]';
  const categorys = await client.fetch(categoryquery);

  return {
    props: { products, categorys },
  };
};
