import React, { useState, useEffect } from 'react';
import '../styles/globals.css';
import { Layout } from '../components';
import { Toaster } from 'react-hot-toast';
import { SessionProvider } from 'next-auth/react';
import { StateContext } from '../context/StateContext';
import '../utils/fontawesome';

export default function App({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
  }, []);

  return (
    <>
      {loading ? (
        <SessionProvider session={pageProps.session}>
          <StateContext>
            <Layout {...pageProps}>
              <Toaster />
              <Component {...pageProps} />
            </Layout>
          </StateContext>
        </SessionProvider>
      ) : null}
    </>
  );
}
