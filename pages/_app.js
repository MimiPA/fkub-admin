import '../styles/globals.css';
import 'tailwindcss/tailwind.css';
import Head from 'next/head';
import MainLayout from '../src/components/layout/MainLayout';
import React from 'react';
import { UserProvider } from '../src/components/providers/userProvider';

export const AuthContext = React.createContext();

function MyApp({ Component, pageProps, router }) {
  if (
    router.pathname === '/' ||
    router.pathname.startsWith('/profile') ||
    router.pathname.startsWith('/user') ||
    router.pathname.startsWith('/bangun_baru') ||
    router.pathname.startsWith('/renovasi') ||
    router.pathname.startsWith('/list_pengajuan') ||
    router.pathname.startsWith('/berkas_pendukung')
  ) {
    return (
      <UserProvider>
        <Head>
          <link rel='icon' href='/logo.png' className='w-64 md:w-72' />
        </Head>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </UserProvider>
    );
  }
  else {
    return (
      <UserProvider>
        <Head>
          <link rel='icon' href='/logo.png' className='w-64 md:w-72' />
        </Head>
        <Component {...pageProps} />
      </UserProvider>
    );
  }
}

export default MyApp;
