import Head from 'next/head';
import { authPage } from '../src/middlewares/authorizationPage';

export async function getServerSideProps(ctx) {
  await authPage(ctx);
  return { props: {} };
}

export default function Home() {
  return (
    <div>
      <Head>
        <title>FKUB - Dashboard</title>
        <meta property="og:dashboard" content="dashboard" key="dashboard" />
      </Head>

      <main>
        <p>INI ADALAH HALAMAN DASHBOARD SETELAH LOGIN</p>
      </main>
    </div>
  );
}
