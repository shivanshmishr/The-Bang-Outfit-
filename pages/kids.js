import React from "react";
import { client } from "../lib/client";
import { ProductCard } from "../components";

export default function kids({ products }) {
  return (
    <div>
      <h2 className="text-[4vh] font-medium my-[10vh] text-center">
        KIDS Section
      </h2>

      {products.length === 0 ? (
        <div>
          <h2 className="text-[3vh] text-center font-semibold text-red-600 mb-[4vh]">
            No Products Found😔
          </h2>
        </div>
      ) : (
        <div className="products-container flex flex-row flex-wrap justify-center gap-[3vh]">
          {products.map((product) => (
            <ProductCard product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export const getServerSideProps = async () => {
  const productquery = '*[_type == "product" && (gender == "kids")]';
  const products = await client.fetch(productquery);

  const categoryquery = '*[_type == "category" && (gender == "kids")]';
  const categorys = await client.fetch(categoryquery);

  return {
    props: { products, categorys },
  };
};
