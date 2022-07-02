import Head from "next/head";
import Link from "next/link";
import ListPermohonan from "../../../src/views/dtr/listPermohonan";
import { authPage } from '../../../src/middlewares/authorizationPage';

export async function getServerSideProps(ctx) {
    await authPage(ctx);
    return { props: {} };
}

export default function ListPengajuan() {
    return (
        <>
            <div className="flex flex-col items-stretch md:pt-20 md:pl-20">
                <div className="grid p-5 justify-items-stretch max-w-full">
                    <Head>
                        <title>FKUB - Daftar Pengajuan</title>
                        <meta property="og:list_surat_krk" content="list_surat_krk" key="list_surat_krk" />
                    </Head>

                    <main>
                        <div className="bg-[#E5E5E5] min-h-screen px-5 py-5">
                            <div className="pl-5 mb-5">
                                <Link href="/">Beranda </Link>/
                                <Link href="/dtr/penerbitan_imb">
                                    <span className="text-gray-400"> Daftar Pengajuan</span>
                                </Link>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="md-flex mx-auto rounded-xl shadow-md overflow-hidden w-full m-4 col-span-2">
                                    <ListPermohonan />
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    )

};