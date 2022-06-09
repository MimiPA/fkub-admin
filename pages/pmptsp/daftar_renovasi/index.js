import Head from "next/head";
import Link from "next/link";
import ListRenovasi from "../../../src/views/pmptsp/listRenovasi";
import { authPage } from '../../../src/middlewares/authorizationPage';

export async function getServerSideProps(ctx) {
    await authPage(ctx);
    return { props: {} };
}

export default function ListUser() {
    return (
        <>
            <div className="flex flex-col items-stretch md:pt-20 md:pl-20">
                <div className="grid p-5 justify-items-stretch max-w-full">
                    <Head>
                        <title>FKUB - Daftar Renovasi</title>
                        <meta property="og:list_renovasi" content="list_renovasi" key="list_renovasi" />
                    </Head>

                    <main>
                        <div className="bg-[#E5E5E5] min-h-screen px-5 pt-5 ">
                            <div className="pl-5 mb-5">
                                <Link href="/">Beranda </Link>/ Daftar Pengajuan /
                                <Link href="/pmptsp/daftar_renovasi">
                                    <span className="text-gray-400"> Renovasi</span>
                                </Link>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="md-flex mx-auto rounded-xl shadow-md overflow-hidden w-full m-4 col-span-2">
                                    <ListRenovasi />
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    )

};