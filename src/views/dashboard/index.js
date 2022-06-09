import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
//import Swal from 'sweetalert2';
//import RiwayatPengajuan from './riwayatPengajuan';

import api from '../../services/api';

export default function DashboardView() {
    const [item, setItem] = useState([]);
    const [status, setStatus] = useState("");

    useEffect(() => {
        const item = JSON.parse(localStorage.getItem('user'));
        if (item) {
            setItem(item);
        }
    }, []);

    const StatusTerkini = () => {
        api.get(`/lacak/now`)
            .then(res => {
                setStatus(res.data.data.Pelacakan.kategori_pelacakan);
            })
            .catch((err) => {
                setStatus(err.response.data.message)
            });

        return (
            <div className='bg-white rounded-xl shadow-md overflow-hidden border-x-4 border-x-teal-600'>
                <div className='flex items-start pl-5 pt-5'>
                    <p className='text-lg font-medium text-teal-600'>
                        Status Pengajuan Rumah Ibadah Anda saat ini :
                    </p>
                </div>
                <div className='flex items-start pl-5 pb-5'>
                    <p className='text-xl font-bold text-black'>
                        {status}
                    </p>
                </div>
            </div>
        );
    };

    return (
        <>
            <main>
                <div className="bg-[#E5E5E5] min-h-screen px-5 pt-5 ">
                    <div className="pl-4 mb-5">
                        <Link href="/">
                            <span className="text-gray-400">Beranda</span>
                        </Link>
                    </div>
                    <h1 className='pl-4 mb-5 text-2xl md:text-3xl font-bold text-primary'>
                        Beranda
                    </h1>

                    <div className='pl-4 flex flex-col mb-5'>
                        <StatusTerkini />
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
                                    Riwayat Pelacakan Pengajuan Terkini
                                </h3>
                            </div>
                            <div className='p-4 flex flex-col'>
                                ???
                            </div>
                        </div>

                    </div>
                </div>
            </main>
        </>
    );
};