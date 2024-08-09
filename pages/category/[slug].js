import React from "react";
import { client, urlFor } from "../../lib/client";
import Link from "next/link";
import {ProductCard} from "../../components";


export default function CategoryProduct({ products, category }) {
  return (
    <>
      <div className="w-[90vw] mx-auto p-[2vh]">
        <h2 className="text-[3vh] font-semibold text-center mt-[12vh] my-[3vh]">
          {category.Title}
        </h2>

        {/* Displaying products */}

        <div className="products-container  flex flex-row flex-wrap justify-center gap-[3vh]">
          {products.map((product) => (
            <ProductCard product={product}/>
          ))}
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const { slug } = context.params;

  const categoryQuery = `*[_type == "category" && slug.current == $slug][0]`;
  const category = await client.fetch(categoryQuery, { slug });

  if (!category) {
    return {
      notFound: true,
    };
  }

  const productsQuery = `*[_type == "product" && references($category._id)]`;
  const products = await client.fetch(productsQuery, { category });

  return {
    props: {
      category,
      products,
    },
  };
}
