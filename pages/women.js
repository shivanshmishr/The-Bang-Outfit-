import React from 'react'
import { client } from '../lib/client';
import { ProductCard } from '../components';


export default function women({products, categorys}) {
  return (
    <div className='mb-[2vh]'>
        <h2 className='text-[4vh] font-medium my-[3vh] text-center'>WOMEN Section</h2>

        <div className="products-container flex flex-row flex-wrap justify-center gap-[3vh]">
          {products.map((product) => (
            <ProductCard product={product}/>
          ))}
        </div>

    </div>
  )
}

export const getServerSideProps = async () => {
  const productquery = '*[_type == "product" && (gender == "women" || gender == "unisex")]';
  const products = await client.fetch(productquery);

  const categoryquery = '*[_type == "category" && (gender == "women" || gender == "unisex")]';
  const categorys = await client.fetch(categoryquery);

  return {
    props: { products, categorys},
  };
}





