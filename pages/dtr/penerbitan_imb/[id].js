import Head from "next/head";
import Link from "next/link";

import React, { useState, useEffect } from 'react';
import { useRouter } from "next/router";

import { authPage } from '../../../src/middlewares/authorizationPage';

import DetailPengajuan from "../../../src/views/dtr/detailPengajuan";
import DokumenPemohonList from "../../../src/views/dtr/detailDokumenPemohon";
import DokumenInstansiList from "../../../src/views/dtr/detailDokumenInstansi";
import DokumenPendukungList from "../../../src/views/dtr/detailDokumenPendukung";
import DokumenMasyarakatList from "../../../src/views/dtr/detailDokumenMasyarakat";

export async function getServerSideProps(ctx) {
    await authPage(ctx);
    return { props: {} };
}

export default function DetailView() {
    const router = useRouter();
    const id_pengajuan = router.query.id;

    return (
        <>
            <div className="flex flex-col items-stretch md:pt-20 md:pl-20">
                <div className="grid p-5 justify-items-stretch max-w-full">
                    <Head>
                        <title>FKUB - Detail Pengajuan</title>
                        <meta property="og:user-detail" content="user-detail" key="user-detail" />
                    </Head>
                    <main>
                        <div className="bg-[#E5E5E5] h-auto px-5 py-5 ">
                            <div className="pl-4 mb-5">
                                <Link href="/">Beranda </Link>/
                                <Link href="/dtr/penerbitan_imb"> Daftar Pengajuan</Link> / {""}
                                <Link href="/">
                                    <span className="text-gray-400">Detail Pengajuan</span>
                                </Link>{""}
                            </div>
                            <h1 className='pl-4 mb-5 text-2xl md:text-3xl font-bold text-primary'>
                                Detail Pengajuan Pembangunan Rumah Ibadah
                            </h1>

                            <DetailPengajuan id_pengajuan={id_pengajuan} />

                            <div className='mt-5 pl-4 flex flex-col gap-4 lg:flex-row md:flex-row'>
                                <div className='bg-white rounded-xl shadow-md overflow-hidden basis-1/2'>
                                    <div className='flex items-start p-5 rounded-t border-b border-gray-300 bg-[#fff9f5]'>
                                        <h3 className='text-xl font-semibold text-primary'>
                                            Daftar Dokumen Administrasi
                                        </h3>
                                    </div>
                                    <DokumenPemohonList id_pengajuan={id_pengajuan} />
                                </div>

                                <div className='bg-white rounded-xl shadow-md overflow-hidden basis-1/2'>
                                    <div className='flex items-start p-5 rounded-t border-b border-gray-300 bg-[#fff9f5]'>
                                        <h3 className='text-xl font-semibold text-primary'>
                                            Daftar Dokumen Instansi
                                        </h3>
                                    </div>
                                    <DokumenInstansiList id_pengajuan={id_pengajuan} />
                                </div>
                            </div>

                            <div className='mt-5 pl-4 flex flex-col'>
                                <div className='bg-white rounded-xl shadow-md overflow-hidden'>
                                    <div className='flex items-start p-5 rounded-t border-b border-gray-300 bg-[#fff9f5]'>
                                        <h3 className='text-xl font-semibold text-primary'>
                                            Daftar Pendukung Jemaat
                                        </h3>
                                    </div>
                                    <DokumenPendukungList id_pengajuan={id_pengajuan} />
                                </div>
                            </div>

                            <div className='mt-5 pl-4 flex flex-col'>
                                <div className='bg-white rounded-xl shadow-md overflow-hidden'>
                                    <div className='flex items-start p-5 rounded-t border-b border-gray-300 bg-[#fff9f5]'>
                                        <h3 className='text-xl font-semibold text-primary'>
                                            Daftar Pendukung Masyarakat
                                        </h3>
                                    </div>
                                    <DokumenMasyarakatList id_pengajuan={id_pengajuan} />
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div >
        </>
    );
};