import React from 'react';
import Link from 'next/link';
import DataTable from 'react-data-table-component';
import Swal from "sweetalert2";
import Image from "next/image";
import { useState, useEffect, Fragment } from 'react';
import api from '../../services/api';
import moment from 'moment';

import Loader from '../../components/loader/Loader';

import { Dialog, Transition } from '@headlessui/react';

const customStyles = {
    header: {
        style: {
            fontSize: "24px",
            fontWeight: 900,
            fontFamily: "Bahnschrift SemiBold",
            lineHeight: "32px",
            color: "rgba(249, 102, 58, 1)",
            backgroundColor: "rgb(255 249 245)",
            borderBottomStyle: 'solid',
            borderBottomWidth: '1px',
            borderBottomColor: "rgb(209 213 219)",
            paddingLeft: "20px",
        },
    },
    headRow: {
        style: {
            backgroundColor: "rgba(0, 0, 0, 0.06)",
        },
    },
    headCells: {
        style: {
            justifyContent: "center",
            fontWeight: 500,
            fontSize: "14px",
            color: "rgba(0, 0, 0, 0.85)",
        },
    },
    cells: {
        style: {
            justifyContent: "center",
            fontSize: "14px",
            fontWeight: 400,
            paddingLeft: "3px",
        },
    },
};

export default function DokumenMasyarakatList({ id_pengajuan }) {
    const [activeRow, setActiveRow] = useState({});

    const [isLoading, showLoader] = useState(false);

    const SuratPernyataan = ({ file }) => {
        if (file == "-") {
            return (
                <p>{file}</p>
            );
        }
        else {
            return (
                <a target="_blank" href={file}>
                    <div><svg className='w-5 h-5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M88 304H80V256H88C101.3 256 112 266.7 112 280C112 293.3 101.3 304 88 304zM192 256H200C208.8 256 216 263.2 216 272V336C216 344.8 208.8 352 200 352H192V256zM224 0V128C224 145.7 238.3 160 256 160H384V448C384 483.3 355.3 512 320 512H64C28.65 512 0 483.3 0 448V64C0 28.65 28.65 0 64 0H224zM64 224C55.16 224 48 231.2 48 240V368C48 376.8 55.16 384 64 384C72.84 384 80 376.8 80 368V336H88C118.9 336 144 310.9 144 280C144 249.1 118.9 224 88 224H64zM160 368C160 376.8 167.2 384 176 384H200C226.5 384 248 362.5 248 336V272C248 245.5 226.5 224 200 224H176C167.2 224 160 231.2 160 240V368zM288 224C279.2 224 272 231.2 272 240V368C272 376.8 279.2 384 288 384C296.8 384 304 376.8 304 368V320H336C344.8 320 352 312.8 352 304C352 295.2 344.8 288 336 288H304V256H336C344.8 256 352 248.8 352 240C352 231.2 344.8 224 336 224H288zM256 0L384 128H256V0z" fill='salmon' /></svg></div>
                </a>
            );
        }
    };

    const FotoKTP = ({ file }) => {
        if (file == "-") {
            return (
                <p>{file}</p>
            );
        }
        else {
            return (
                <Link href={`${file}`}>
                    <button type="button" onClick={`window.open(${file}, '_blank')`} >
                        <svg className='w-5 h-5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M528 32h-480C21.49 32 0 53.49 0 80V96h576V80C576 53.49 554.5 32 528 32zM0 432C0 458.5 21.49 480 48 480h480c26.51 0 48-21.49 48-48V128H0V432zM368 192h128C504.8 192 512 199.2 512 208S504.8 224 496 224h-128C359.2 224 352 216.8 352 208S359.2 192 368 192zM368 256h128C504.8 256 512 263.2 512 272S504.8 288 496 288h-128C359.2 288 352 280.8 352 272S359.2 256 368 256zM368 320h128c8.836 0 16 7.164 16 16S504.8 352 496 352h-128c-8.836 0-16-7.164-16-16S359.2 320 368 320zM176 192c35.35 0 64 28.66 64 64s-28.65 64-64 64s-64-28.66-64-64S140.7 192 176 192zM112 352h128c26.51 0 48 21.49 48 48c0 8.836-7.164 16-16 16h-192C71.16 416 64 408.8 64 400C64 373.5 85.49 352 112 352z" fill='#00CED1' /></svg>
                    </button>
                </Link>
            );
        }
    };

    const FotoDiri = ({ file }) => {
        if (file == "-") {
            return (
                <p>{file}</p>
            );
        }
        else {
            return (
                <Link href={`${file}`}>
                    <button type="button" onClick={`window.open(${file}, '_blank')`} >
                        <svg className='w-5 h-5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M336 0h-288c-26.51 0-48 21.49-48 48v416C0 490.5 21.49 512 48 512h288c26.51 0 48-21.49 48-48v-416C384 21.49 362.5 0 336 0zM192 128c35.35 0 64 28.65 64 64s-28.65 64-64 64S128 227.3 128 192S156.7 128 192 128zM288 384H96c-8.836 0-16-7.164-16-16C80 323.8 115.8 288 160 288h64c44.18 0 80 35.82 80 80C304 376.8 296.8 384 288 384z" fill='#9400D3' /></svg>
                    </button>
                </Link>
            );
        }
    };

    const columns = [
        {
            name: 'No.',
            selector: (row, index) => index + 1,
            sortable: true,
            maxWidth: "7px",
        },
        {
            name: 'NIK',
            selector: (row) => row.nik,
            sortable: true,
        },
        {
            name: "Nama Pendukung",
            selector: (row) => row.nama_lengkap,
            sortable: true,
        },
        {
            name: "Telepon",
            selector: (row) => row.telepon,
            sortable: true,
        },
        {
            name: "Jenis Kelamin",
            selector: (row) => row.jenis_kelamin,
            sortable: true,
        },
        {
            name: "Tanggal Dukungan",
            selector: (row) => row.createdAt,
            format: (row) => moment(row.createdAt).format('LLL'),
            sortable: true,
        },
        {
            name: "Surat Dukungan",
            selector: (row) => row.Trx_dokumen_pendukung.surat_pernyataan,
            cell: (row) => (
                <SuratPernyataan file={row.Trx_dokumen_pendukung.surat_pernyataan} />
            ),
            maxWidth: "15px",
        },
        {
            name: "Foto KTP",
            selector: (row) => row.Trx_dokumen_pendukung.foto_ktp,
            cell: (row) => (
                <FotoKTP file={row.Trx_dokumen_pendukung.foto_ktp} />
            ),
            maxWidth: "15px",
        },
        {
            name: "Foto Diri",
            selector: (row) => row.Trx_dokumen_pendukung.foto_diri,
            cell: (row) => (
                <FotoDiri file={row.Trx_dokumen_pendukung.foto_diri} />
            ),
            maxWidth: "15px",
        },
        {
            name: "Status",
            selector: (row) => row.status,
            sortable: true,
        },
        {
            button: true,
            cell: (row) => (
                <button data-tag="allowRowEvents" className="w-[45px] h-[23px] border border-blue rounded-sm bg-black hover:bg-[#4e4e4e] text-white">
                    Action
                </button>
            ),
        },
    ];

    const FilterComponent = ({ filterText, onFilter }) => (
        <>
            <label htmlFor="search-users" className="absolute pr-44">
                <img src="/icons/search-icon.svg" />
            </label>
            <input
                type="text"
                id="search-users"
                placeholder="Search"
                aria-label="Search Input"
                value={filterText}
                onChange={onFilter}
                className="h-[32px] w-[200px] pr-[32px] pl-[50px] text-sm border border-[#C2C9D1] rounded-md rounded-t-[5px] rounded-b-[5px]"
            />
        </>
    );

    const [data, setData] = useState([]);

    useEffect(() => {
        api.get(`/proposal/fkub/list/detailPendukung/${id_pengajuan}`).then(res => {
            setData(res.data.data.dataMasyarakat);
        }).catch((err) => console.log(err));
    }, []);

    const [filterText, setFilterText] = React.useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
    const filteredItems = data.filter(item =>
        item.telepon && item.telepon.toLowerCase().includes(filterText.toLowerCase()) ||
        item.nama_lengkap && item.nama_lengkap.toLowerCase().includes(filterText.toLowerCase()) ||
        item.createdAt && item.createdAt.toLowerCase().includes(filterText.toLowerCase())
    );

    const subHeaderComponentMemo = React.useMemo(() => {
        const handleClear = () => {
            if (filterText) {
                setResetPaginationToggle(!resetPaginationToggle);
                setFilterText('');
            }
        };

        return (
            <FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />
        );
    }, [filterText, resetPaginationToggle]);

    let [isOpen, setIsOpen] = React.useState(false);

    function closeModal() {
        setIsOpen(false);
    }

    function openModal() {
        setIsOpen(true);
    }

    const onRowClicked = (row, event) => {
        setActiveRow(row);
        setIsOpen(true);
    }

    function statusTerima() {
        showLoader(true);
        api
            .put(`/proposal/fkub/dukungan/${activeRow.id}/status?status=Diterima`)
            .then(res => {
                Swal.fire({
                    icon: 'success',
                    title: 'Berhasil',
                    text: res.data.message,
                }).then(() => (window.location.reload()));
            })
            .catch(err => {
                console.log(err);

                Swal.fire({
                    icon: 'error',
                    title: 'Terjadi Kesalahan',
                    text: 'Tidak Dapat Mengubah Status. Mohon Coba Lagi.',
                }).then(() => (window.location.href = '/fkub/daftar_permohonan'));
                showLoader(false);
            });
    }

    function statusTolak() {
        showLoader(true);
        api
            .put(`/proposal/fkub/dukungan/${activeRow.id}/status?status=Ditolak`)
            .then(res => {
                Swal.fire({
                    icon: 'success',
                    title: 'Berhasil',
                    text: res.data.message,
                }).then(() => (window.location.reload()));
            })
            .catch(err => {
                console.log(err);

                Swal.fire({
                    icon: 'error',
                    title: 'Terjadi Kesalahan',
                    text: 'Tidak Dapat Mengubah Status. Mohon Coba Lagi.',
                }).then(() => (window.location.href = '/fkub/daftar_permohonan'));
                showLoader(false);
            });
    }

    return (
        <>
            <div>
                <DataTable
                    onRowClicked={onRowClicked}
                    columns={columns}
                    data={filteredItems}
                    subHeader
                    subHeaderComponent={subHeaderComponentMemo}
                    persistTableHead
                    customStyles={customStyles}
                    pagination
                    paginationResetDefaultPage={resetPaginationToggle}
                    highlightOnHover
                />
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
                                    <button
                                        type="button"
                                        className="flex flex-row-reverse text-end self-end justify-end content-end border-transparent bg-transparent text-sm font-bold text-red-600 hover:bg-rose-200 focus:outline-none focus-visible:ring-2"
                                        onClick={closeModal}
                                    >
                                        X
                                    </button>

                                    <Dialog.Title
                                        as="h3"
                                        className="text-center text-lg font-medium leading-6 text-black"
                                    >
                                        Menerima / Menolak
                                    </Dialog.Title>

                                    <div className="mt-4">
                                        <p className="text-sm text-gray-500">
                                            Apakah Anda Yakin Ingin Mengubah Status Pendukung Masyarakat Berikut ?
                                        </p>
                                    </div>

                                    {isLoading ?
                                        (<Loader />) :
                                        (<>
                                            <div className="flex justify-between mt-6">
                                                <button
                                                    type="button"
                                                    className="rounded-md border border-transparent bg-rose-100 px-4 py-2 text-sm font-medium text-rose-900 hover:bg-rose-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2"
                                                    onClick={statusTolak}
                                                >
                                                    Tolak
                                                </button>

                                                <button
                                                    type="button"
                                                    className="rounded-md border border-transparent bg-emerald-100 px-4 py-2 text-sm font-medium text-emerald-900 hover:bg-emerald-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
                                                    onClick={statusTerima}
                                                >
                                                    Terima
                                                </button>
                                            </div>
                                        </>)
                                    }
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
};