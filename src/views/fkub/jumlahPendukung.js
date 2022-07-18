import React, { useState, useEffect } from 'react';

import api from '../../services/api';

export default function JumlahPendukung({ id_pengajuan }) {
    const [countPengguna, setCountPengguna] = useState(0);
    const [countMasyarakat, setCountMasyarakat] = useState(0);
    const [countPenggunaTerima, setCountPenggunaTerima] = useState(0);
    const [countMasyarakatTerima, setCountMasyarakatTerima] = useState(0);

    useEffect(() => {
        api.get(`/count/pengguna/${id_pengajuan}`)
            .then(res => {
                if (res.data.data == null || !res.data.data || res.data.data == undefined || res.data.data == 0) {
                    setCountPengguna(0);
                    setCountPenggunaTerima(0);
                }
                else {
                    setCountPengguna(res.data.data.jumlahPendukungPengguna);
                    setCountPenggunaTerima(res.data.data.jumlahPendukungPenggunaTerima);
                }
                return api.get(`/count/masyarakat/${id_pengajuan}`)
            })
            .then(res => {
                if (res.data.data == null || !res.data.data || res.data.data == undefined || res.data.data == 0) {
                    setCountMasyarakat(0);
                    setCountMasyarakatTerima(0);
                }
                else {
                    setCountMasyarakat(res.data.data.jumlahPendukungMasyarakat);
                    setCountMasyarakatTerima(res.data.data.jumlahPendukungMasyarakatTerima);
                }
            })
            .catch(err => {
                console.log(err);
                setCountPengguna(0);
                setCountPenggunaTerima(0);
                setCountMasyarakat(0);
                setCountMasyarakatTerima(0);
            });
    }, []);

    return (
        <>
            <div className='bg-white rounded-xl shadow-md overflow-hidden border-x-4 border-x-sky-500 basis-1/4'>
                <div className='flex items-start pl-5 pt-5'>
                    <p className='text-lg font-medium text-sky-500'>
                        Total Dukungan Jemaat
                    </p>
                </div>
                <div className='flex items-start pl-5 pb-5'>
                    <p className='text-xl font-bold text-black'>
                        {countPengguna}
                    </p>
                </div>
            </div>

            <div className='bg-white rounded-xl shadow-md overflow-hidden border-x-4 border-x-fuchsia-500 basis-1/4'>
                <div className='flex items-start pl-5 pt-5'>
                    <p className='text-lg font-medium text-fuchsia-500'>
                        Dukungan Jemaat
                    </p>
                </div>
                <div className='flex items-start pl-5 pb-5'>
                    <p className='text-xl font-bold text-black'>
                        {countPenggunaTerima}
                    </p>
                </div>
            </div>

            <div className='bg-white rounded-xl shadow-md overflow-hidden border-x-4 border-x-emerald-500 basis-1/4'>
                <div className='flex items-start pl-5 pt-5'>
                    <p className='text-lg font-medium text-emerald-500'>
                        Total Dukungan Masyarakat
                    </p>
                </div>
                <div className='flex items-start pl-5 pb-5'>
                    <p className='text-xl font-bold text-black'>
                        {countMasyarakat}
                    </p>
                </div>
            </div>

            <div className='bg-white rounded-xl shadow-md overflow-hidden border-x-4 border-x-rose-500 basis-1/4'>
                <div className='flex items-start pl-5 pt-5'>
                    <p className='text-lg font-medium text-rose-500'>
                        Dukungan Masyarakat
                    </p>
                </div>
                <div className='flex items-start pl-5 pb-5'>
                    <p className='text-xl font-bold text-black'>
                        {countMasyarakatTerima}
                    </p>
                </div>
            </div>
        </>
    );
}