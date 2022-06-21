import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

import api from '../../services/api';

export default function JumlahPendukung({ id_pengajuan }) {
    const [countPengguna, setCountPengguna] = useState(0);
    const [countMasyarakat, setCountMasyarakat] = useState(0);
    const [countPenentang, setCountPenentang] = useState(0);

    useEffect(() => {
        api.get(`/count/pengguna/${id_pengajuan}`)
            .then(res => {
                setCountPengguna(res.data.data);
                return api.get(`/count/masyarakat/${id_pengajuan}`)
            })
            .then(res => {
                if (res.data.data == null || !res.data.data || res.data.data == undefined || res.data.data == 0) {
                    setCountMasyarakat(0);
                }
                else {
                    setCountMasyarakat(res.data.data);
                }
                return api.get(`/count/penentang/${id_pengajuan}`)
            })
            .then(res => {
                if (res.data.data == null || !res.data.data || res.data.data == undefined || res.data.data == 0) {
                    setCountPenentang(0);
                }
                else {
                    setCountPenentang(res.data.data);
                }
            })
            .catch(err => {
                console.log(err);
                setCountPengguna(0);
                setCountMasyarakat(0);
                setCountPenentang(0);
            });
    }, []);

    return (
        <>
            <div className='bg-white rounded-xl shadow-md overflow-hidden border-x-4 border-x-sky-500 basis-1/3'>
                <div className='flex items-start pl-5 pt-5'>
                    <p className='text-lg font-medium text-sky-500'>
                        Jumlah Pendukung Pengguna
                    </p>
                </div>
                <div className='flex items-start pl-5 pb-5'>
                    <p className='text-xl font-bold text-black'>
                        {countPengguna}
                    </p>
                </div>
            </div>

            <div className='bg-white rounded-xl shadow-md overflow-hidden border-x-4 border-x-rose-500 basis-1/3'>
                <div className='flex items-start pl-5 pt-5'>
                    <p className='text-lg font-medium text-rose-500'>
                        Jumlah Pendukung Masyarakat
                    </p>
                </div>
                <div className='flex items-start pl-5 pb-5'>
                    <p className='text-xl font-bold text-black'>
                        {countMasyarakat}
                    </p>
                </div>
            </div>

            <div className='bg-white rounded-xl shadow-md overflow-hidden border-x-4 border-x-teal-500 basis-1/3'>
                <div className='flex items-start pl-5 pt-5'>
                    <p className='text-lg font-medium text-teal-500'>
                        Jumlah Penentang
                    </p>
                </div>
                <div className='flex items-start pl-5 pb-5'>
                    <p className='text-xl font-bold text-black'>
                        {countPenentang}
                    </p>
                </div>
            </div>
        </>
    );
}