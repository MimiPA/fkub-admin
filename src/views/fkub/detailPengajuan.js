import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Swal from 'sweetalert2';

import api from '../../services/api';
import moment from 'moment';

export default function DetailPengajuan({ id_pengajuan }) {
    const [data, setData] = useState({
        id: 0,
        referral_code: "",
        jenis_pembangunan: "",
        nama_tempat: "",
        tempat_ibadah: "",
        alamat: "",
        rt: "",
        rw: "",
        surat_permohonan: "",
        status: "",
        idUser_create: "",
        idUser_update: "",
        createdAt: "",
        updatedAt: "",
        id_user: "",
        Pengguna: {
            nama_lengkap: "",
            nik: "",
            email: "",
            nama_depan: "",
            nama_belakang: "",
            jenis_kelamin: "",
            agama: "",
            telepon: "",
            tempat_lahir: "",
            tanggal_lahir: "",
            alamat: "",
            rt: "",
            rw: "",
            kecamatan: "",
            kelurahan: "",
            foto: "",
        }
    });

    useEffect(() => {
        api.get(`/proposal/fkub/list/detail/${id_pengajuan}`)
            .then(res => {
                setData(res.data.data);
            })
            .catch(err => {
                console.log(err);
                setData(null);

                Swal.fire({
                    icon: 'error',
                    title: 'Terjadi Kesalahan',
                    text: 'Detail Pengajuan Tidak Tersedia',
                }).then(() => (window.location.href = '/fkub/daftar_permohonan'));
            });
    }, []);

    return (
        <>
            <div className='pl-4 flex flex-col gap-4 lg:flex-row md:flex-row'>
                <div className='bg-white rounded-xl shadow-md overflow-hidden basis-1/2'>
                    <div className='flex items-start p-5 rounded-t border-b border-gray-300 bg-[#fff9f5]'>
                        <h3 className='text-xl font-semibold text-primary'>
                            Profil Pemohon
                        </h3>
                    </div>
                    <div className='p-10 flex flex-col'>
                        <div className="flex flex-col lg:flex-row md:flex-row justify-between">
                            <div className='mb-3 md:mb-4 content-center items-center self-center lg:ml-8 md:ml-6'>
                                <img src={data.Pengguna.foto} alt="Profile Image" width="130" height="140" className="w-[130px] rounded-md border-1 border-gray-200 overflow-hidden" />
                            </div>
                            <div>
                                <div className="flex flex-row mb-3 md:mb-4">
                                    <p className="text-md font-semibold text-gray-300">
                                        Nomor Induk Kependudukan :
                                    </p>
                                    <p className="text-md font-semibold text-gray-500 ml-2">
                                        {data.Pengguna.nik}
                                    </p>
                                </div>
                                <div className="flex mb-3 md:mb-4">
                                    <p className="text-md font-semibold text-gray-300">
                                        Nama Lengkap :
                                    </p>
                                    <p className="text-md font-semibold text-gray-500 ml-2">
                                        {data.Pengguna.nama_depan + ' ' + data.Pengguna.nama_belakang}
                                    </p>
                                </div>
                                <div className="flex mb-3 md:mb-4">
                                    <p className="text-md font-semibold text-gray-300">
                                        Jenis Kelamin :
                                    </p>
                                    <p className="text-md font-semibold text-gray-500 ml-2">
                                        {data.Pengguna.jenis_kelamin}
                                    </p>
                                </div>
                                <div className="flex mb-3 md:mb-4">
                                    <p className="text-md font-semibold text-gray-300">
                                        Agama :
                                    </p>
                                    <p className="text-md font-semibold text-gray-500 ml-2">
                                        {data.Pengguna.agama}
                                    </p>
                                </div>
                                <div className="flex mb-3 md:mb-4">
                                    <p className="text-md font-semibold text-gray-300">
                                        Email :
                                    </p>
                                    <p className="text-md font-semibold text-gray-500 ml-2">
                                        {data.Pengguna.email}
                                    </p>
                                </div>
                                <div className="flex mb-3 md:mb-4">
                                    <p className="text-md font-semibold text-gray-300">
                                        Nomor Telepon :
                                    </p>
                                    <p className="text-md font-semibold text-gray-500 ml-2">
                                        {data.Pengguna.telepon}
                                    </p>
                                </div>
                                <div className="flex mb-3 md:mb-4">
                                    <p className="text-md font-semibold text-gray-300">
                                        Tempat / Tanggal Lahir :
                                    </p>
                                    <p className="text-md font-semibold text-gray-500 ml-2">
                                        {data.Pengguna.tempat_lahir + " / " + data.Pengguna.tanggal_lahir}
                                    </p>
                                </div>
                                <div className="flex mb-3 md:mb-4">
                                    <p className="text-md font-semibold text-gray-300">
                                        Alamat :
                                    </p>
                                    <p className="text-md font-semibold text-gray-500 ml-2">
                                        {data.Pengguna.alamat}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='bg-white rounded-xl shadow-md overflow-hidden basis-1/2'>
                    <div className='flex items-start p-5 rounded-t border-b border-gray-300 bg-[#fff9f5]'>
                        <h3 className='text-xl font-semibold text-primary'>
                            Detail Permohonan
                        </h3>
                    </div>
                    <div className='p-10 flex flex-col'>
                        <div className="flex mb-3 md:mb-4">
                            <p className="text-md font-semibold text-gray-300">
                                Referral Code :
                            </p>
                            <p className="text-md font-semibold text-gray-500 ml-2">
                                {data.referral_code}
                            </p>
                        </div>
                        <div className="flex mb-3 md:mb-4">
                            <p className="text-md font-semibold text-gray-300">
                                Jenis Tempat Ibadah :
                            </p>
                            <p className="text-md font-semibold text-gray-500 ml-2">
                                {data.tempat_ibadah}
                            </p>
                        </div>
                        <div className="flex mb-3 md:mb-4">
                            <p className="text-md font-semibold text-gray-300">
                                Nama Tempat Ibadah :
                            </p>
                            <p className="text-md font-semibold text-gray-500 ml-2">
                                {data.nama_tempat}
                            </p>
                        </div>
                        <div className="flex mb-3 md:mb-4">
                            <p className="text-md font-semibold text-gray-300">
                                Jenis Pembangunan :
                            </p>
                            <p className="text-md font-semibold text-gray-500 ml-2">
                                {data.jenis_pembangunan}
                            </p>
                        </div>
                        <div className="flex mb-3 md:mb-4">
                            <p className="text-md font-semibold text-gray-300">
                                Alamat :
                            </p>
                            <p className="text-md font-semibold text-gray-500 ml-2">
                                {data.alamat}
                            </p>
                        </div>
                        <div className="flex mb-3 md:mb-4">
                            <p className="text-md font-semibold text-gray-300">
                                RT / RW :
                            </p>
                            <p className="text-md font-semibold text-gray-500 ml-2">
                                {data.rt} / {data.rw}
                            </p>
                        </div>
                        <div className="flex mb-3 md:mb-4">
                            <p className="text-md font-semibold text-gray-300">
                                Status :
                            </p>
                            <p className="text-md font-semibold text-gray-500 ml-2">
                                {data.status}
                            </p>
                        </div>
                        <div className="flex mb-3 md:mb-4">
                            <p className="text-md font-semibold text-gray-300">
                                Tanggal Pengajuan :
                            </p>
                            <p className="text-md font-semibold text-gray-500 ml-2">
                                {moment(data.createdAt).format('LLL')}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}