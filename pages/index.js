import Head from 'next/head';
import { authPage } from '../src/middlewares/authorizationPage';
import DashboardView from '../src/views/dashboard';

export async function getServerSideProps(ctx) {
  await authPage(ctx);
  return { props: {} };
}

export default function Home() {
  return (
    <div className="flex flex-col items-stretch md:pt-20 md:pl-20">
      <div className="grid p-5 justify-items-stretch max-w-full">
        <Head>
          <title>FKUB - Dashboard</title>
          <meta property="og:dashboard" content="dashboard" key="dashboard" />
        </Head>

        <DashboardView />
      </div>
    </div>
  );
}
