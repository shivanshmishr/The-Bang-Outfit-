import React, { useState } from 'react';
import { useRouter } from 'next/router';
import {ProductCard} from '../components';
import {client }from '../lib/client';

export default function Search({ products }) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState(router.query.query || '');

  return (
    <div className='w-[90%] mx-auto'>

      <h2>Search Results</h2>
      <div className='flex flex-row flex-wrap justify-center gap-[2vh]'>
        {products.map((product) => {
          const categoryTitle = (product.category && product.category.Title) || "";
          const productTitle = product.productitle || "";

          if (
            (categoryTitle.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (productTitle.toLowerCase().includes(searchTerm.toLowerCase()))
          ) {
            return <ProductCard key={product._id} product={product} />;
          }

          return null;
        })}
      </div>
    </div>
  );
}

export const getServerSideProps = async (context) => {
  let searchTerm = context.query.query || '';
  searchTerm = searchTerm.split(' ').join('* ');

  const productquery = `*[_type == "product" && (productitle match "${searchTerm}*" || category.Title match "${searchTerm}*")]`;
  const products = await client.fetch(productquery);

  return {
    props: { products },
  };
}

