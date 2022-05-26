import Head from "next/head";
import Link from "next/link";
import Swal from "sweetalert2";
import Image from "next/image";

import React, { useState, useEffect, Fragment } from 'react';
import { useRouter } from "next/router";
import { Dialog, Transition } from '@headlessui/react';

// import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as Yup from 'yup';

import api from '../../../src/services/api';
// import { authPage } from '../../src/middlewares/authorizationPage';

// export async function getServerSideProps(ctx) {
//     await authPage(ctx);
//     return { props: {} };
// }

export default function DetailUser() {
    const [data, setData] = useState({
        nama_lengkap: "",
        id: 0,
        nik: "",
        nama_depan: "",
        nama_belakang: "",
        jenis_kelamin: "",
        telepon: "",
        tempat_lahir: "",
        tanggal_lahir: "",
        alamat: "",
        rt: "",
        rw: "",
        kelurahan: "",
        kecamatan: "",
        foto: "",
        idUser_create: 0,
        createdAt: "",
        updatedAt: "-",
        Master_religion: {
            agama: ""
        },
        Master_account: {
            id: 0,
            email: "",
            is_active: "",
            Master_role: {
                role: ""
            }
        }
    });
    const router = useRouter();
    const id = router.query.id;

    useEffect(() => {
        api
            .get(`/user/admin/${id}`)
            .then(res => {
                setData(res.data.data);
            })
            .catch(err => {
                console.log(err);
                setData(null);

                Swal.fire({
                    icon: 'error',
                    title: 'Terjadi Kesalahan',
                    text: 'Detail User Tidak Tersedia',
                }).then(() => (window.location.href = '/user/'));
            });
    }, []);

    let [isOpen, setIsOpen] = useState(false);

    function closeModal() {
        setIsOpen(false);
    }
    function openModal() {
        setIsOpen(true);
    }

    function changeStatus() {
        api
            .put(`/user/admin/${id}/status?status=${data.Master_account.is_active}`)
            .then(res => {
                Swal.fire({
                    icon: 'success',
                    title: 'Berhasil',
                    text: res.data.message,
                }).then(() => (window.location.href = '/user/'));
            })
            .catch(err => {
                console.log(err);
                setStatus(null);

                Swal.fire({
                    icon: 'error',
                    title: 'Terjadi Kesalahan',
                    text: 'Tidak Dapat Mengubah Status. Mohon Coba Lagi.',
                }).then(() => (window.location.href = '/user/'));
            });
    }

    const StatusAkun = ({ is_active }) => {
        if (is_active == "Disable") {
            return (
                <button type="button" onClick={openModal} className="w-[72px] h-[32px] border border-[#ffadad] rounded-sm bg-rose-500 hover:bg-[#ffadad] text-white text-lg font-semibold">
                    {is_active}
                </button>
            );
        }
        else if (is_active == "Enable") {
            return (
                <button type="button" onClick={openModal} className="w-[72px] h-[32px] border border-[#adffbb] rounded-sm bg-emerald-500 hover:bg-[#adffbd] text-white text-lg font-semibold">
                    {is_active}
                </button>
            );
        }
    };

    return (
        <>
            <div className="flex flex-col items-stretch md:pt-20 md:pl-20">
                <div className="grid p-5 justify-items-stretch max-w-full">
                    <Head>
                        <title>FKUB - User Detail</title>
                        <meta property="og:user-detail" content="user-detail" key="user-detail" />
                    </Head>

                    <main>
                        <div className="bg-[#E5E5E5] min-h-screen px-5 pt-5 ">
                            <div className="pl-5 mb-5">
                                <Link href="/">Home </Link>/ User Management / {""}
                                <Link href="/user">User</Link> / {""}
                                <Link href="/">
                                    <span className="text-gray-400">Detail User</span>
                                </Link>{""}
                            </div>
                            <div>
                                <div className="md-flex mx-auto rounded-xl shadow-md overflow-hidden w-full m-4">
                                    <div className="bg-white rounded-2xl p-3 lg:p-5 flex flex-col md:flex-row w-full shadow-lg">
                                        <div className="flex justify-start md:justify-center items-center md:items-start md:w-32 mb-2 md:mt-2">
                                            <Link href="/user">
                                                <Image className="cursor-pointer" src="/icons/back-icon.svg" alt="back" width={30} height={22} />
                                            </Link>
                                            <h1 className="text-2xl md:text-3xl font-semibold text-primary ml-8 md:hidden">
                                                Detail Profile
                                            </h1>
                                        </div>

                                        <div className="">
                                            <h1 className="text-2xl md:text-3xl font-semibold text-primary mb-4 md:mb-6 hidden md:block">
                                                Detail Profile
                                            </h1>
                                            <div className="flex md:flex-row">
                                                <div className="pr-[10px] md:pr-[50px]">
                                                    <img
                                                        src={data.foto}
                                                        alt="Parent Image"
                                                        width="100"
                                                        height="100"
                                                        layout="intrinsic"
                                                        className="flex-1 rounded-full"
                                                    />
                                                </div>
                                                <div className="felx md:flex-cols-2">
                                                    <div className="flex flex-col col-span-2 mb-3 md:mb-4">
                                                        <p className=" text-2xl font-bold text-blue-500">
                                                            {data.nama_lengkap}
                                                        </p>
                                                    </div>
                                                    <div className="grid md:grid-cols-3">
                                                        <div className="flex flex-col mb-3 md:mb-4 pr-[84px]">
                                                            <p className="text-md font-semibold text-gray-300">
                                                                Nomor Induk Kependudukan
                                                            </p>
                                                            <p className="text-md font-semibold text-gray-500">
                                                                {data.nik}
                                                            </p>
                                                        </div>
                                                        <div className="flex flex-col mb-3 md:mb-4 pr-[84px]">
                                                            <p className="text-md font-semibold text-gray-300">
                                                                Alamat
                                                            </p>
                                                            <p className="text-md font-semibold text-gray-500">
                                                                {data.alamat}
                                                            </p>
                                                        </div>
                                                        <div className="flex flex-col mb-3 md:mb-4 pr-[44px]">
                                                            <p className="text-lg font-semibold text-gray-300">
                                                                Role
                                                            </p>
                                                            <p className="text-lg font-extrabold text-gray-500">
                                                                {data.Master_account.Master_role.role}
                                                            </p>
                                                        </div>
                                                        <div className="flex flex-col mb-3 md:mb-4 pr-[84px]">
                                                            <p className="text-md font-semibold text-gray-300">
                                                                Email
                                                            </p>
                                                            <p className="text-md font-semibold text-gray-500">
                                                                {data.Master_account.email}
                                                            </p>
                                                        </div>
                                                        <div className="flex flex-col mb-3 md:mb-4 pr-[84px]">
                                                            <p className="text-md font-semibold text-gray-300">
                                                                RT / RW
                                                            </p>
                                                            <p className="text-md font-semibold text-gray-500">
                                                                {data.rt} / {data.rw}
                                                            </p>
                                                        </div>
                                                        <div className="flex flex-col mb-3 md:mb-4 pr-[44px]">
                                                            <p className="text-lg font-semibold text-gray-300">
                                                                Status Akun
                                                            </p>
                                                            <StatusAkun is_active={data.Master_account.is_active} />
                                                        </div>
                                                    </div>

                                                    <div className="grid md:grid-cols-3">
                                                        <div className="flex flex-col mb-3 md:mb-4 pr-[84px]">
                                                            <p className="text-md font-semibold text-gray-300">
                                                                Telepon
                                                            </p>
                                                            <p className="text-md font-semibold text-gray-500">
                                                                {data.telepon}
                                                            </p>
                                                        </div>
                                                        <div className="flex flex-col mb-3 md:mb-4 pr-[33px]">
                                                            <p className="text-md font-semibold text-gray-300">
                                                                Kelurahan
                                                            </p>
                                                            <p className="text-md font-semibold text-gray-500">
                                                                {data.kelurahan}
                                                            </p>
                                                        </div>
                                                        <div className="flex flex-col mb-3 md:mb-4 pr-[33px]">
                                                            <p className="text-md font-semibold text-gray-300"></p>
                                                            <p className="text-md font-semibold text-gray-500"></p>
                                                        </div>
                                                        <div className="flex flex-col mb-3 md:mb-4 pr-[84px]">
                                                            <p className="text-md font-semibold text-gray-300">
                                                                Tempat, Tanggal Lahir
                                                            </p>
                                                            <p className="text-md font-semibold text-gray-500">
                                                                {data.tempat_lahir}, {data.tanggal_lahir}
                                                            </p>
                                                        </div>
                                                        <div className="flex flex-col mb-3 md:mb-4 pr-[33px]">
                                                            <p className="text-md font-semibold text-gray-300">
                                                                Kecamatan
                                                            </p>
                                                            <p className="text-md font-semibold text-gray-500">
                                                                {data.kecamatan}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div className="grid md:grid-cols-3">
                                                        <div className="flex flex-col mb-3 md:mb-4 pr-[84px]">
                                                            <p className="text-md font-semibold text-gray-300">
                                                                Jenis Kelamin
                                                            </p>
                                                            <p className="text-md font-semibold text-gray-500">
                                                                {data.jenis_kelamin}
                                                            </p>
                                                        </div>
                                                        <div className="flex flex-col mb-3 md:mb-4 pr-[33px]">
                                                            <p className="text-md font-semibold text-gray-300">
                                                                Agama
                                                            </p>
                                                            <p className="text-md font-semibold text-gray-500">
                                                                {data.Master_religion.agama}
                                                            </p>
                                                        </div>
                                                        <div className="flex flex-col mb-3 md:mb-4 pr-[33px]">
                                                            <p className="text-md font-semibold text-gray-300"></p>
                                                            <p className="text-md font-semibold text-gray-500"></p>
                                                        </div>
                                                        <div className="flex flex-col mb-3 md:mb-4 pr-[84px] border-t">
                                                            <p className="text-md font-semibold text-gray-300 mt-2">
                                                                CreatedAt
                                                            </p>
                                                            <p className="text-md font-semibold text-gray-500">
                                                                {data.createdAt}
                                                            </p>
                                                        </div>
                                                        <div className="flex flex-col mb-3 md:mb-4 pr-[33px] border-t">
                                                            <p className="text-md font-semibold text-gray-300 mt-2">
                                                                UpdatedAt
                                                            </p>
                                                            <p className="text-md font-semibold text-gray-500">
                                                                {data.updatedAt}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
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
                                        Mengubah Status Akun
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">
                                            Apakah Anda Yakin Ingin Mengubah Status Akun User Berikut ?
                                        </p>
                                    </div>

                                    <div className="flex justify-between mt-6">
                                        <button
                                            type="button"
                                            className="rounded-md border border-transparent bg-rose-100 px-4 py-2 text-sm font-medium text-rose-900 hover:bg-rose-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2"
                                            onClick={closeModal}
                                        >
                                            Tidak
                                        </button>

                                        <button
                                            type="button"
                                            className="rounded-md border border-transparent bg-emerald-100 px-4 py-2 text-sm font-medium text-emerald-900 hover:bg-emerald-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
                                            onClick={changeStatus}
                                        >
                                            Yaa
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