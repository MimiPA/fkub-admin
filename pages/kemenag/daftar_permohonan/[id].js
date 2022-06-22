import Head from "next/head";
import Link from "next/link";
import Swal from "sweetalert2";
import Image from "next/image";

import React, { useState, useEffect, Fragment } from 'react';
import { useRouter } from "next/router";
import { Dialog, Transition } from '@headlessui/react';

import api from '../../../src/services/api';
import { authPage } from '../../../src/middlewares/authorizationPage';

export async function getServerSideProps(ctx) {
    await authPage(ctx);
    return { props: {} };
}

export default function DetailView() {
    const [item, setItem] = useState([]);
    const [suratDokumen, setSuratDokumen] = useState("");

    useEffect(() => {
        const item = JSON.parse(localStorage.getItem('user'));
        if (item) {
            setItem(item);
        }
    }, []);

    const [data, setData] = useState({
        dataSurat: {
            id: 0,
            dokumen: "",
            kategori_dokumen: "",
            idUser_create: "",
            idUser_update: null,
            createdAt: "",
            updatedAt: "",
            id_pengajuan: 0,
            Pengajuan: {
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
                idUser_update: null,
                createdAt: "",
                updatedAt: "",
                id_user: "",
                Pengguna: {
                    nik: "",
                    email: "",
                    nama_depan: "",
                    nama_belakang: "",
                    jenis_kelamin: "",
                    agama: "",
                    telepon: "",
                }
            }
        },
        dataSK: {
            id: 0,
            dokumen: "",
            kategori_dokumen: "",
            idUser_create: "",
            idUser_update: null,
            createdAt: "",
            updatedAt: "",
            id_pengajuan: 0
        }
    });

    const router = useRouter();
    const id = router.query.id;

    useEffect(() => {
        api.get(`/administrasi/kemenag/list/detail/${id}`)
            .then(res => {
                setData(res.data.data);
                return api.get(`/rekomendasi/kemenag/list/detail/${res.data.data.dataSurat.id_pengajuan}`)
            })
            .then(res => {
                if (res.data.message == "Data Tidak Tersedia" || res.data.data == null || res.data.data == undefined || res.data.message == "Data Tidak Ditemukan") {
                    setSuratDokumen(null);
                }
                else {
                    setSuratDokumen(res.data.data.dokumen);
                }
            })
            .catch(err => {
                console.log(err);
                setData(null);

                Swal.fire({
                    icon: 'error',
                    title: 'Terjadi Kesalahan',
                    text: 'Detail Permohonan Rekomendasi Tidak Tersedia',
                }).then(() => (window.location.href = '/kemenag/daftar_permohonan'));
            });
    }, []);

    const DataSK = () => {
        if (data.dataSK == null || data.dataSK == undefined) {
            return (
                <p className="text-md font-semibold text-red-500 ml-2">
                    SK Panitia Pembangunan Belum Di Input
                </p>
            );
        }
        else {
            return (
                <p className="text-md font-semibold text-gray-500 ml-2">
                    <Link href={data.dataSK.dokumen}>
                        <button type="button" onClick={`window.open(${data.dataSK.dokumen}, '_blank')`}>
                            <svg className='w-5 h-5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M88 304H80V256H88C101.3 256 112 266.7 112 280C112 293.3 101.3 304 88 304zM192 256H200C208.8 256 216 263.2 216 272V336C216 344.8 208.8 352 200 352H192V256zM224 0V128C224 145.7 238.3 160 256 160H384V448C384 483.3 355.3 512 320 512H64C28.65 512 0 483.3 0 448V64C0 28.65 28.65 0 64 0H224zM64 224C55.16 224 48 231.2 48 240V368C48 376.8 55.16 384 64 384C72.84 384 80 376.8 80 368V336H88C118.9 336 144 310.9 144 280C144 249.1 118.9 224 88 224H64zM160 368C160 376.8 167.2 384 176 384H200C226.5 384 248 362.5 248 336V272C248 245.5 226.5 224 200 224H176C167.2 224 160 231.2 160 240V368zM288 224C279.2 224 272 231.2 272 240V368C272 376.8 279.2 384 288 384C296.8 384 304 376.8 304 368V320H336C344.8 320 352 312.8 352 304C352 295.2 344.8 288 336 288H304V256H336C344.8 256 352 248.8 352 240C352 231.2 344.8 224 336 224H288zM256 0L384 128H256V0z" fill='salmon' /></svg>
                        </button>
                    </Link>
                </p>
            );
        }
    }

    const ButtonStatus = () => {
        if (suratDokumen == null || suratDokumen == undefined) {
            return (
                <>
                    <div className='flex justify-start pl-5 pt-5'>
                        <p className='text-lg font-medium text-teal-600'>
                            Setelah memeriksa data berikut, Dimohon untuk memberikan Surat Rekomendasi Kemenag
                        </p>
                    </div>

                    <div className='flex justify-start items-start pl-5 pb-5 pt-2 pr-5'>
                        <button type="button" onClick={openModal} className="w-[72px] h-[32px] border border-[#adffbb] rounded-sm bg-emerald-500 hover:bg-[#adffbd] text-white text-lg font-semibold">
                            Disini
                        </button>
                    </div>
                </>
            );
        }
        else {
            return (
                <>
                    <div className='flex items-start pl-5 pt-5'>
                        <p className='text-lg font-medium text-teal-600'>
                            Status Proposal Saat Ini :
                        </p>
                    </div>

                    <div className='flex items-start pl-5 pb-5'>
                        <p className='text-xl font-bold text-black'>
                            {data.dataSurat.Pengajuan.status} ~ ~ Surat Rekomendasi Kemenag :
                        </p>

                        <Link href={suratDokumen}>
                            <button type="button" onClick={`window.open(${suratDokumen}, '_blank')`} className="ml-2">
                                <svg className='w-7 h-7' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M88 304H80V256H88C101.3 256 112 266.7 112 280C112 293.3 101.3 304 88 304zM192 256H200C208.8 256 216 263.2 216 272V336C216 344.8 208.8 352 200 352H192V256zM224 0V128C224 145.7 238.3 160 256 160H384V448C384 483.3 355.3 512 320 512H64C28.65 512 0 483.3 0 448V64C0 28.65 28.65 0 64 0H224zM64 224C55.16 224 48 231.2 48 240V368C48 376.8 55.16 384 64 384C72.84 384 80 376.8 80 368V336H88C118.9 336 144 310.9 144 280C144 249.1 118.9 224 88 224H64zM160 368C160 376.8 167.2 384 176 384H200C226.5 384 248 362.5 248 336V272C248 245.5 226.5 224 200 224H176C167.2 224 160 231.2 160 240V368zM288 224C279.2 224 272 231.2 272 240V368C272 376.8 279.2 384 288 384C296.8 384 304 376.8 304 368V320H336C344.8 320 352 312.8 352 304C352 295.2 344.8 288 336 288H304V256H336C344.8 256 352 248.8 352 240C352 231.2 344.8 224 336 224H288zM256 0L384 128H256V0z" fill='salmon' /></svg>
                            </button>
                        </Link>
                    </div>
                </>
            );
        }
    };

    let [isOpen, setIsOpen] = useState(false);

    function closeModal() {
        setIsOpen(false);
    }
    function openModal() {
        setIsOpen(true);
    }

    const [suratRekomendasi, setSuratRekomendasi] = useState(null);
    const handleFileSelect = (event) => {
        setSuratRekomendasi(event.target.files[0]);
    };

    function submit() {
        const setuju = new FormData();
        setuju.append("id_pengajuan", data.dataSurat.id_pengajuan);
        setuju.append("dokumen", suratRekomendasi);
        setuju.append("kategori_dokumen", "Surat Rekomendasi Kemenag");
        setuju.append("role", item.role);

        api.post(`/rekomendasi/kemenag/upload`, setuju, { headers: { 'Content-Type': 'multipart/form-data', } })
            .then(res => {
                Swal.fire({
                    icon: 'success',
                    title: 'Berhasil',
                    text: res.data.message,
                }).then(() => (window.location.href = '/kemenag/riwayat_rekomendasi'));
            })
            .catch(err => {
                console.log(err);

                Swal.fire({
                    icon: 'error',
                    title: 'Terjadi Kesalahan',
                    text: err.response.data.message,
                });
            });
    }

    return (
        <>
            <div className="flex flex-col items-stretch md:pt-20 md:pl-20">
                <div className="grid p-5 justify-items-stretch max-w-full">
                    <Head>
                        <title>FKUB - Permohonan Detail</title>
                        <meta property="og:user-detail" content="user-detail" key="user-detail" />
                    </Head>
                    <main>
                        <div className="bg-[#E5E5E5] min-h-screen px-5 pt-5 ">
                            <div className="pl-4 mb-5">
                                <Link href="/">Home </Link>/
                                <Link href="/dtr/penerbitan_krk">Daftar Permohonan Rekomendasi</Link> / {""}
                                <Link href="/">
                                    <span className="text-gray-400">Detail Permohonan</span>
                                </Link>{""}
                            </div>
                            <h1 className='pl-4 mb-5 text-2xl md:text-3xl font-bold text-primary'>
                                Detail Permohonan Rekomendasi
                            </h1>

                            <div className='pl-4 flex flex-col mb-5 pr-4'>
                                <div className='bg-white rounded-xl shadow-md overflow-hidden border-x-4 border-x-teal-600'>
                                    <ButtonStatus />
                                </div>
                            </div>

                            <div className='pl-4 flex flex-col gap-4 lg:flex-row md:flex-row'>
                                <div className='bg-white rounded-xl shadow-md overflow-hidden basis-1/2'>
                                    <div className='flex items-start p-5 rounded-t border-b border-gray-300 bg-[#fff9f5]'>
                                        <h3 className='text-xl font-semibold text-primary'>
                                            Profil Pemohon & SK Panitia Pembangunan
                                        </h3>
                                    </div>
                                    <div className='p-10 flex flex-col'>
                                        <div className="flex mb-3 md:mb-4">
                                            <p className="text-md font-semibold text-gray-300">
                                                Nomor Induk Kependudukan :
                                            </p>
                                            <p className="text-md font-semibold text-gray-500 ml-2">
                                                {data.dataSurat.Pengajuan.Pengguna.nik}
                                            </p>
                                        </div>
                                        <div className="flex mb-3 md:mb-4">
                                            <p className="text-md font-semibold text-gray-300">
                                                Nama Lengkap :
                                            </p>
                                            <p className="text-md font-semibold text-gray-500 ml-2">
                                                {data.dataSurat.Pengajuan.Pengguna.nama_depan + ' ' + data.dataSurat.Pengajuan.Pengguna.nama_belakang}
                                            </p>
                                        </div>
                                        <div className="flex mb-3 md:mb-4">
                                            <p className="text-md font-semibold text-gray-300">
                                                Jenis Kelamin :
                                            </p>
                                            <p className="text-md font-semibold text-gray-500 ml-2">
                                                {data.dataSurat.Pengajuan.Pengguna.jenis_kelamin}
                                            </p>
                                        </div>
                                        <div className="flex mb-3 md:mb-4">
                                            <p className="text-md font-semibold text-gray-300">
                                                Agama :
                                            </p>
                                            <p className="text-md font-semibold text-gray-500 ml-2">
                                                {data.dataSurat.Pengajuan.Pengguna.agama}
                                            </p>
                                        </div>
                                        <div className="flex mb-3 md:mb-4">
                                            <p className="text-md font-semibold text-gray-300">
                                                Nomor Telepon :
                                            </p>
                                            <p className="text-md font-semibold text-gray-500 ml-2">
                                                {data.dataSurat.Pengajuan.Pengguna.telepon}
                                            </p>
                                        </div>
                                        <div className="flex mb-3 md:mb-4">
                                            <p className="text-md font-semibold text-gray-300">
                                                SK Panitia Pembangunan :
                                            </p>
                                            <DataSK />
                                        </div>
                                    </div>
                                </div>

                                <div className='bg-white rounded-xl shadow-md overflow-hidden basis-1/2'>
                                    <div className='flex items-start p-5 rounded-t border-b border-gray-300 bg-[#fff9f5]'>
                                        <h3 className='text-xl font-semibold text-primary'>
                                            Detail Permohonan Surat Rekomendasi
                                        </h3>
                                    </div>
                                    <div className='p-10 flex flex-col'>
                                        <div className="flex mb-3 md:mb-4">
                                            <p className="text-md font-semibold text-gray-300">
                                                Jenis Tempat Ibadah :
                                            </p>
                                            <p className="text-md font-semibold text-gray-500 ml-2">
                                                {data.dataSurat.Pengajuan.tempat_ibadah}
                                            </p>
                                        </div>
                                        <div className="flex mb-3 md:mb-4">
                                            <p className="text-md font-semibold text-gray-300">
                                                Nama Tempat Ibadah :
                                            </p>
                                            <p className="text-md font-semibold text-gray-500 ml-2">
                                                {data.dataSurat.Pengajuan.nama_tempat}
                                            </p>
                                        </div>
                                        <div className="flex mb-3 md:mb-4">
                                            <p className="text-md font-semibold text-gray-300">
                                                Jenis Pembangunan :
                                            </p>
                                            <p className="text-md font-semibold text-gray-500 ml-2">
                                                {data.dataSurat.Pengajuan.jenis_pembangunan}
                                            </p>
                                        </div>
                                        <div className="flex mb-3 md:mb-4">
                                            <p className="text-md font-semibold text-gray-300">
                                                Alamat :
                                            </p>
                                            <p className="text-md font-semibold text-gray-500 ml-2">
                                                {data.dataSurat.Pengajuan.alamat}
                                            </p>
                                        </div>
                                        <div className="flex mb-3 md:mb-4">
                                            <p className="text-md font-semibold text-gray-300">
                                                RT / RW :
                                            </p>
                                            <p className="text-md font-semibold text-gray-500 ml-2">
                                                {data.dataSurat.Pengajuan.rt + ' / ' + data.dataSurat.Pengajuan.rw}
                                            </p>
                                        </div>
                                        <div className="flex mb-3 md:mb-4">
                                            <p className="text-md font-semibold text-gray-300">
                                                Surat Permohonan :
                                            </p>
                                            <p className="text-md font-semibold text-gray-500 ml-2">
                                                <Link href={data.dataSurat.dokumen}>
                                                    <button type="button" onClick={`window.open(${data.dataSurat.dokumen}, '_blank')`}>
                                                        <svg className='w-5 h-5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M88 304H80V256H88C101.3 256 112 266.7 112 280C112 293.3 101.3 304 88 304zM192 256H200C208.8 256 216 263.2 216 272V336C216 344.8 208.8 352 200 352H192V256zM224 0V128C224 145.7 238.3 160 256 160H384V448C384 483.3 355.3 512 320 512H64C28.65 512 0 483.3 0 448V64C0 28.65 28.65 0 64 0H224zM64 224C55.16 224 48 231.2 48 240V368C48 376.8 55.16 384 64 384C72.84 384 80 376.8 80 368V336H88C118.9 336 144 310.9 144 280C144 249.1 118.9 224 88 224H64zM160 368C160 376.8 167.2 384 176 384H200C226.5 384 248 362.5 248 336V272C248 245.5 226.5 224 200 224H176C167.2 224 160 231.2 160 240V368zM288 224C279.2 224 272 231.2 272 240V368C272 376.8 279.2 384 288 384C296.8 384 304 376.8 304 368V320H336C344.8 320 352 312.8 352 304C352 295.2 344.8 288 336 288H304V256H336C344.8 256 352 248.8 352 240C352 231.2 344.8 224 336 224H288zM256 0L384 128H256V0z" fill='salmon' /></svg>
                                                    </button>
                                                </Link>
                                            </p>
                                        </div>
                                        <div className="flex mb-3 md:mb-4">
                                            <p className="text-md font-semibold text-gray-300">
                                                Status :
                                            </p>
                                            <p className="text-md font-semibold text-gray-500 ml-2">
                                                {data.dataSurat.Pengajuan.status}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-center text-lg font-medium leading-6 text-black"
                                    >
                                        Menyetujui Susunan Kepanitiaan, dan Memberikan Surat Rekomendasi
                                    </Dialog.Title>
                                    <div className="mt-4">
                                        <form>
                                            <div className='input-container mb-6'>
                                                <div className='flex flex-col'>
                                                    <label className='text-primary font-bold' htmlFor='dokumen'>Surat Rekomendasi Kemenag<span className="text-black font-normal"> (.pdf)</span></label>
                                                    <input
                                                        id='dokumen'
                                                        type='file'
                                                        required
                                                        name='dokumen'
                                                        accept='.pdf'
                                                        onChange={handleFileSelect}
                                                        className={`shadow-md bg-transparent h-12 w-full pl-6 rounded-md border-2 focus:outline-none border-primary pt-1.5`} />
                                                </div>
                                            </div>
                                        </form>
                                    </div>

                                    <div className="flex justify-between mt-6">
                                        <button
                                            type="button"
                                            className="rounded-md border border-transparent bg-rose-100 px-4 py-2 text-sm font-medium text-rose-900 hover:bg-rose-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2"
                                            onClick={closeModal}
                                        >
                                            Tutup
                                        </button>

                                        <button
                                            type="button"
                                            className="rounded-md border border-transparent bg-emerald-100 px-4 py-2 text-sm font-medium text-emerald-900 hover:bg-emerald-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
                                            onClick={submit}
                                        >
                                            Memberikan
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
};