import Link from "next/link";
import Swal from "sweetalert2";

import React, { useState, useEffect, Fragment } from 'react';
import { useRouter } from "next/router";
import { Dialog, Transition } from '@headlessui/react';

import api from '../../services/api';

export default function SuratKRK({ id_pengajuan }) {
    const [suratDokumen, setSuratDokumen] = useState("");

    useEffect(() => {
        api.get(`/suratKRK/dtr/riwayat/detail/${id_pengajuan}`)
            .then(res => {
                setSuratDokumen(res.data.data);
            })
            .catch(err => {
                console.log(err);
                setSuratDokumen(null);

                Swal.fire({
                    icon: 'error',
                    title: 'Terjadi Kesalahan',
                    text: 'Surat KRK Tidak Tersedia',
                });
            });
    }, []);

    if (suratDokumen == null || suratDokumen == undefined) {
        return (
            <>
                <div className='flex justify-start pl-5 pt-5'>
                    <p className='text-lg font-medium text-teal-600'>
                        Dimohon untuk memberikan Surat KRK
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
                        ~ ~ Surat KRK :
                    </p>

                    <Link href={suratDokumen}>
                        <button type="button" onClick={`window.open(${suratDokumen}, '_blank')`} className="ml-4">
                            <svg className='w-7 h-7' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M88 304H80V256H88C101.3 256 112 266.7 112 280C112 293.3 101.3 304 88 304zM192 256H200C208.8 256 216 263.2 216 272V336C216 344.8 208.8 352 200 352H192V256zM224 0V128C224 145.7 238.3 160 256 160H384V448C384 483.3 355.3 512 320 512H64C28.65 512 0 483.3 0 448V64C0 28.65 28.65 0 64 0H224zM64 224C55.16 224 48 231.2 48 240V368C48 376.8 55.16 384 64 384C72.84 384 80 376.8 80 368V336H88C118.9 336 144 310.9 144 280C144 249.1 118.9 224 88 224H64zM160 368C160 376.8 167.2 384 176 384H200C226.5 384 248 362.5 248 336V272C248 245.5 226.5 224 200 224H176C167.2 224 160 231.2 160 240V368zM288 224C279.2 224 272 231.2 272 240V368C272 376.8 279.2 384 288 384C296.8 384 304 376.8 304 368V320H336C344.8 320 352 312.8 352 304C352 295.2 344.8 288 336 288H304V256H336C344.8 256 352 248.8 352 240C352 231.2 344.8 224 336 224H288zM256 0L384 128H256V0z" fill='salmon' /></svg>
                        </button>
                    </Link>
                </div>
            </>
        );
    }
}