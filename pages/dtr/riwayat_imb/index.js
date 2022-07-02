import Head from "next/head";
import Link from "next/link";
import ListSuratIMB from "../../../src/views/dtr/riwayatSuratIMB";
import { authPage } from '../../../src/middlewares/authorizationPage';

export async function getServerSideProps(ctx) {
    await authPage(ctx);
    return { props: {} };
}

export default function ListKRK() {
    return (
        <>
            <div className="flex flex-col items-stretch md:pt-20 md:pl-20">
                <div className="grid p-5 justify-items-stretch max-w-full">
                    <Head>
                        <title>FKUB - Riwayat Surat IMB</title>
                        <meta property="og:list_surat_imb" content="list_surat_imb" key="list_surat_imb" />
                    </Head>

                    <main>
                        <div className="bg-[#E5E5E5] min-h-screen px-5 py-5 ">
                            <div className="pl-5 mb-5">
                                <Link href="/">Beranda </Link>/
                                <Link href="/dtr/riwayat_imb">
                                    <span className="text-gray-400"> Riwayat Surat IMB</span>
                                </Link>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="md-flex mx-auto rounded-xl shadow-md overflow-hidden w-full m-4 col-span-2">
                                    <ListSuratIMB />
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    )

};