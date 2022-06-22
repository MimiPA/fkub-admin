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
    router.pathname.startsWith('/pmptsp') ||
    router.pathname.startsWith('/pmptsp/daftar_pengajuan') ||
    router.pathname.startsWith('/pmptsp/riwayat_krk') ||
    router.pathname.startsWith('/kemenag') ||
    router.pathname.startsWith('/kemenag/daftar_permohonan') ||
    router.pathname.startsWith('/kemenag/daftar_permohonan/') ||
    router.pathname.startsWith('/kemenag/riwayat_rekomendasi') ||
    router.pathname.startsWith('/fkub') ||
    router.pathname.startsWith('/fkub/daftar_permohonan') ||
    router.pathname.startsWith('/fkub/daftar_permohonan/') ||
    router.pathname.startsWith('/fkub/riwayat_rekomendasi') ||
    router.pathname.startsWith('/dtr') ||
    router.pathname.startsWith('/dtr/penerbitan_krk') ||
    router.pathname.startsWith('/dtr/penerbitan_imb') ||
    router.pathname.startsWith('/dtr/riwayat_krk') ||
    router.pathname.startsWith('/dtr/riwayat_imb')
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
