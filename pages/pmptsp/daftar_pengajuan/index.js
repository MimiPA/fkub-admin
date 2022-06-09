import Head from "next/head";
import Link from "next/link";
import ListPengajuan from "../../../src/views/pmptsp/listPengajuan";
import { authPage } from '../../../src/middlewares/authorizationPage';

export async function getServerSideProps(ctx) {
    await authPage(ctx);
    return { props: {} };
}

export default function ListPengajuanProposal() {
    return (
        <>
            <div className="flex flex-col items-stretch md:pt-20 md:pl-20">
                <div className="grid p-5 justify-items-stretch max-w-full">
                    <Head>
                        <title>FKUB - Daftar Pengajuan</title>
                        <meta property="og:list_pengajuan" content="list_pengajuan" key="list_pengajuan" />
                    </Head>

                    <main>
                        <div className="bg-[#E5E5E5] min-h-screen px-5 pt-5 ">
                            <div className="pl-5 mb-5">
                                <Link href="/">Beranda </Link>/
                                <Link href="/pmptsp/daftar_pengajuan">
                                    <span className="text-gray-400"> Daftar Pengajuan</span>
                                </Link>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="md-flex mx-auto rounded-xl shadow-md overflow-hidden w-full m-4 col-span-2">
                                    <ListPengajuan />
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    )

};