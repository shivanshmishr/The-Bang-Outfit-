import React from 'react';
import Head from 'next/head';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

export default function Layout({children, userdetails, products, category}) {
  return (
    <div>
        <Head>
            <title>THE BANG OUTFIT</title>
        </Head>

        <header>
            <Navbar userdetails={userdetails && userdetails.length ? userdetails[0] : null}/>
        </header>

        <main>
            {children}
        </main>

        <footer>
            <Footer/>
        </footer>
    </div>
  )
}
