import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Agent } from 'https'

import api from '../../services/api';

export default function DashboardView() {
    const [item, setItem] = useState([]);
    const [count, setCount] = useState({});

    useEffect(() => {
        const item = JSON.parse(localStorage.getItem('user'));
        if (item) {
            setItem(item);
        }
        if (item.role == "Admin") {
            api.get(`/count/admin`)
                .then(res => {
                    setCount(res.data.data);
                })
                .catch(err => {
                    setCount(0);
                });
        }
        else if (item.role == "PMPTSP") {
            api.get(`/count/pmptsp`)
                .then(res => {
                    setCount(res.data.data);
                })
                .catch(err => {
                    setCount(0);
                });
        }
        else if (item.role == "Dinas Tata Ruang") {
            api.get(`/count/dtr`)
                .then(res => {
                    setCount(res.data.data);
                })
                .catch(err => {
                    setCount(0);
                });
        }
        else if (item.role == "Kemenag") {
            api.get(`/count/kemenag`)
                .then(res => {
                    setCount(res.data.data);
                })
                .catch(err => {
                    setCount(0);
                });
        }
        else if (item.role == "FKUB") {
            api.get(`/count/fkub`)
                .then(res => {
                    setCount(res.data.data);
                })
                .catch(err => {
                    setCount(0);
                });
        }
    }, []);


    const Count = ({ role }) => {
        if (role == "Admin") {
            return (
                <>
                    <div className='bg-white rounded-xl shadow-md overflow-hidden border-x-4 border-x-sky-500 basis-1/3'>
                        <div className='flex items-start pl-5 pt-5'>
                            <p className='text-lg font-medium text-sky-500'>
                                Jumlah Pengguna
                            </p>
                        </div>
                        <div className='flex items-start pl-5 pb-5'>
                            <p className='text-xl font-bold text-black'>
                                {count.jumlahPengguna}
                            </p>
                        </div>
                    </div>

                    <div className='bg-white rounded-xl shadow-md overflow-hidden border-x-4 border-x-rose-500 basis-1/3'>
                        <div className='flex items-start pl-5 pt-5'>
                            <p className='text-lg font-medium text-rose-500'>
                                Akun Aktif
                            </p>
                        </div>
                        <div className='flex items-start pl-5 pb-5'>
                            <p className='text-xl font-bold text-black'>
                                {count.jumlahEnable}
                            </p>
                        </div>
                    </div>

                    <div className='bg-white rounded-xl shadow-md overflow-hidden border-x-4 border-x-teal-500 basis-1/3'>
                        <div className='flex items-start pl-5 pt-5'>
                            <p className='text-lg font-medium text-teal-500'>
                                Akun Tidak Aktif
                            </p>
                        </div>
                        <div className='flex items-start pl-5 pb-5'>
                            <p className='text-xl font-bold text-black'>
                                {count.jumlahDisable}
                            </p>
                        </div>
                    </div>
                </>
            );
        }
        else if (role == "PMPTSP") {
            return (
                <>
                    <div className='bg-white rounded-xl shadow-md overflow-hidden border-x-4 border-x-sky-500 basis-1/4'>
                        <div className='flex items-start pl-5 pt-5'>
                            <p className='text-lg font-medium text-sky-500'>
                                Jumlah Pengajuan
                            </p>
                        </div>
                        <div className='flex items-start pl-5 pb-5'>
                            <p className='text-xl font-bold text-black'>
                                {count.jumlahPengajuan}
                            </p>
                        </div>
                    </div>

                    <div className='bg-white rounded-xl shadow-md overflow-hidden border-x-4 border-x-rose-500 basis-1/4'>
                        <div className='flex items-start pl-5 pt-5'>
                            <p className='text-lg font-medium text-rose-500'>
                                Pengajuan Diproses
                            </p>
                        </div>
                        <div className='flex items-start pl-5 pb-5'>
                            <p className='text-xl font-bold text-black'>
                                {count.jumlahDiproses}
                            </p>
                        </div>
                    </div>

                    <div className='bg-white rounded-xl shadow-md overflow-hidden border-x-4 border-x-teal-500 basis-1/4'>
                        <div className='flex items-start pl-5 pt-5'>
                            <p className='text-lg font-medium text-teal-500'>
                                Pengajuan Ditolak
                            </p>
                        </div>
                        <div className='flex items-start pl-5 pb-5'>
                            <p className='text-xl font-bold text-black'>
                                {count.jumlahDitolak}
                            </p>
                        </div>
                    </div>

                    <div className='bg-white rounded-xl shadow-md overflow-hidden border-x-4 border-x-fuchsia-500 basis-1/4'>
                        <div className='flex items-start pl-5 pt-5'>
                            <p className='text-lg font-medium text-fuchsia-500'>
                                Permintaan KRK
                            </p>
                        </div>
                        <div className='flex items-start pl-5 pb-5'>
                            <p className='text-xl font-bold text-black'>
                                {count.jumlahPermintaanKRK}
                            </p>
                        </div>
                    </div>
                </>
            );
        }
        else if (role == "Dinas Tata Ruang") {
            return (
                <>
                    <div className='bg-white rounded-xl shadow-md overflow-hidden border-x-4 border-x-sky-500 basis-1/4'>
                        <div className='flex items-start pl-5 pt-5'>
                            <p className='text-lg font-medium text-sky-500'>
                                Pengajuan Diproses
                            </p>
                        </div>
                        <div className='flex items-start pl-5 pb-5'>
                            <p className='text-xl font-bold text-black'>
                                {count.jumlahDiproses}
                            </p>
                        </div>
                    </div>

                    <div className='bg-white rounded-xl shadow-md overflow-hidden border-x-4 border-x-rose-500 basis-1/4'>
                        <div className='flex items-start pl-5 pt-5'>
                            <p className='text-lg font-medium text-rose-500'>
                                Permintaan KRK
                            </p>
                        </div>
                        <div className='flex items-start pl-5 pb-5'>
                            <p className='text-xl font-bold text-black'>
                                {count.jumlahPermintaanKRK}
                            </p>
                        </div>
                    </div>

                    <div className='bg-white rounded-xl shadow-md overflow-hidden border-x-4 border-x-teal-500 basis-1/4'>
                        <div className='flex items-start pl-5 pt-5'>
                            <p className='text-lg font-medium text-teal-500'>
                                Penerbitan KRK
                            </p>
                        </div>
                        <div className='flex items-start pl-5 pb-5'>
                            <p className='text-xl font-bold text-black'>
                                {count.jumlahKRK}
                            </p>
                        </div>
                    </div>

                    <div className='bg-white rounded-xl shadow-md overflow-hidden border-x-4 border-x-fuchsia-500 basis-1/4'>
                        <div className='flex items-start pl-5 pt-5'>
                            <p className='text-lg font-medium text-fuchsia-500'>
                                Penerbitan IMB
                            </p>
                        </div>
                        <div className='flex items-start pl-5 pb-5'>
                            <p className='text-xl font-bold text-black'>
                                {count.jumlahIMB}
                            </p>
                        </div>
                    </div>
                </>
            );
        }
        else if (role == "Kemenag") {
            return (
                <>
                    <div className='bg-white rounded-xl shadow-md overflow-hidden border-x-4 border-x-sky-500 basis-1/3'>
                        <div className='flex items-start pl-5 pt-5'>
                            <p className='text-lg font-medium text-sky-500'>
                                Pengajuan Diproses
                            </p>
                        </div>
                        <div className='flex items-start pl-5 pb-5'>
                            <p className='text-xl font-bold text-black'>
                                {count.jumlahDiproses}
                            </p>
                        </div>
                    </div>

                    <div className='bg-white rounded-xl shadow-md overflow-hidden border-x-4 border-x-rose-500 basis-1/3'>
                        <div className='flex items-start pl-5 pt-5'>
                            <p className='text-lg font-medium text-rose-500'>
                                Permintaan Surat Rekomendasi
                            </p>
                        </div>
                        <div className='flex items-start pl-5 pb-5'>
                            <p className='text-xl font-bold text-black'>
                                {count.jumlahPermintaanRekomen}
                            </p>
                        </div>
                    </div>

                    <div className='bg-white rounded-xl shadow-md overflow-hidden border-x-4 border-x-teal-500 basis-1/3'>
                        <div className='flex items-start pl-5 pt-5'>
                            <p className='text-lg font-medium text-teal-500'>
                                Penerbitan Surat Rekomendasi
                            </p>
                        </div>
                        <div className='flex items-start pl-5 pb-5'>
                            <p className='text-xl font-bold text-black'>
                                {count.jumlahRekomendasi}
                            </p>
                        </div>
                    </div>
                </>
            );
        }
        else if (role == "FKUB") {
            return (
                <>
                    <div className='bg-white rounded-xl shadow-md overflow-hidden border-x-4 border-x-rose-500 basis-1/4'>
                        <div className='flex items-start pl-5 pt-5'>
                            <p className='text-lg font-medium text-rose-500'>
                                Permintaan Surat Rekomendasi
                            </p>
                        </div>
                        <div className='flex items-start pl-5 pb-5'>
                            <p className='text-xl font-bold text-black'>
                                {count.jumlahPermintaanRekomen}
                            </p>
                        </div>
                    </div>

                    <div className='bg-white rounded-xl shadow-md overflow-hidden border-x-4 border-x-teal-500 basis-1/4'>
                        <div className='flex items-start pl-5 pt-5'>
                            <p className='text-lg font-medium text-teal-500'>
                                Penerbitan Surat Rekomendasi
                            </p>
                        </div>
                        <div className='flex items-start pl-5 pb-5'>
                            <p className='text-xl font-bold text-black'>
                                {count.jumlahRekomendasi}
                            </p>
                        </div>
                    </div>

                    <div className='bg-white rounded-xl shadow-md overflow-hidden border-x-4 border-x-fuchsia-500 basis-1/4'>
                        <div className='flex items-start pl-5 pt-5'>
                            <p className='text-lg font-medium text-fuchsia-500'>
                                Pengajuan Diproses
                            </p>
                        </div>
                        <div className='flex items-start pl-5 pb-5'>
                            <p className='text-xl font-bold text-black'>
                                {count.jumlahDiproses}
                            </p>
                        </div>
                    </div>

                    <div className='bg-white rounded-xl shadow-md overflow-hidden border-x-4 border-x-sky-500 basis-1/4'>
                        <div className='flex items-start pl-5 pt-5'>
                            <p className='text-lg font-medium text-sky-500'>
                                Pengajuan Selesai
                            </p>
                        </div>
                        <div className='flex items-start pl-5 pb-5'>
                            <p className='text-xl font-bold text-black'>
                                {count.jumlahSelesai}
                            </p>
                        </div>
                    </div>
                </>
            );
        }
        else {
            return (<></>);
        }
    };

    return (
        <>
            <main>
                <div className="bg-[#E5E5E5] min-h-screen px-5 py-5 ">
                    <div className="pl-4 mb-5">
                        <Link href="/">
                            <span className="text-gray-400">Beranda</span>
                        </Link>
                    </div>
                    <h1 className='pl-4 mb-5 text-2xl md:text-3xl font-bold text-primary'>
                        Beranda
                    </h1>

                    <div className='pl-4 flex flex-col gap-4 lg:flex-row md:flex-row mb-5'>
                        <Count role={item.role} />
                    </div>

                    <div className='pl-4 flex flex-col gap-4 lg:flex-row md:flex-row'>
                        <div className='bg-white rounded-xl shadow-md overflow-hidden basis-1/4'>
                            <div className='flex items-start p-5 rounded-t border-b border-gray-300 bg-[#fff9f5]'>
                                <h3 className='text-xl font-semibold text-primary'>
                                    Profil Pengguna
                                </h3>
                            </div>
                            <div className='p-10 space-y-2 flex flex-col'>
                                <div className='flex justify-center'>
                                    <img src={item.foto} alt="Profile Image" width="100" height="110" className="w-[100px] rounded-lg border-1 border-gray-200 overflow-hidden" />
                                </div>
                                <div className='flex justify-center'>
                                    <p className='text-xl font-medium text-gray-500'>
                                        {item.nik}
                                    </p>
                                </div>
                                <div className='flex justify-center'>
                                    <p className='text-xl font-medium text-gray-500'>
                                        {item.nama_lengkap}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className='bg-white rounded-xl shadow-md overflow-hidden basis-3/4'>
                            <div className='flex items-start p-5 rounded-t border-b border-gray-300 bg-[#fff9f5]'>
                                <h3 className='text-xl font-semibold text-primary'>
                                    ?????
                                </h3>
                            </div>
                            <div className='p-4 flex flex-col'>
                                ?????
                            </div>
                        </div>

                    </div>
                </div>
            </main>
        </>
    );
};