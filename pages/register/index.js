import React, { useState } from 'react';
import RegisterView from '../../src/views/register';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import AuthServices from '../../src/services/auth';
import { unauthPage } from '../../src/middlewares/authorizationPage';

import Head from 'next/head';

export async function getServerSideProps(ctx) {
    await unauthPage(ctx);
    return { props: {} };
}

export default function Register() {
    const [isLoading, showLoader] = useState(false);
    const [serviceResponse, setServiceResponse] = useState({});

    const validationSchema = Yup.object().shape({
        email: Yup.string().required('Email harus di isi').email('Email tidak valid'),
        password: Yup.string()
            .matches(/^((?!\s).)*$/, 'Password tidak boleh berisi spasi')
            .required('Password perlu di isi')
            .min(6, 'Password paling sedikit harus 6 karakter')
            .max(40, 'Password hanya bisa maksimal 40 karakter'),
        role: Yup.string()
            .required('Role user perlu di pilih'),
        nik: Yup.string()
            .required('Nomor Induk Kependudukan perlu di isi')
            .min(16, 'Jumlah NIK 16 angka')
            .matches(/^[0-9]+$/i, 'NIK harus berupa angka'),
        nama_depan: Yup.string()
            .required('Nama Depan perlu di isi')
            .matches(/^[a-z0-9]+$/i, 'Nama Depan harus karakter alphanumerik'),
        nama_belakang: Yup.string()
            .required('Nama Belakang perlu di isi')
            .matches(/^[a-z0-9]+$/i, 'Nama Belakang harus karakter alphanumerik'),
        jenis_kelamin: Yup.string()
            .required('Jenis Kelamin perlu di pilih'),
        agama: Yup.string()
            .required('Agama perlu di pilih'),
        telepon: Yup.string()
            .required('Nomor Telepon harus di isi')
            .matches(
                // https://regex101.com/r/qtEg6H/3
                /(\()?(\+62|62|0)(\d{2,3})?\)?[ .-]?\d{2,4}[ .-]?\d{2,4}[ .-]?\d{2,4}/g,
                'Nomor telepon tidak valid'
            ),
        tempat_lahir: Yup.string()
            .required('Tempat Lahir perlu di isi')
            .matches(/^[a-zA-Z]+$/i, 'Tempat Lahir harus berupa alphabet'),
        tanggal_lahir: Yup.string()
            .required('Tanggal Lahir perlu di pilih'),
        alamat: Yup.string()
            .required('Alamat perlu di isi')
            .matches(/^[a-z0-9A-Z ]+$/i, 'Alamat harus karakter alphanumerik'),
        rt: Yup.string()
            .required('RT perlu di isi')
            .matches(/^[0-9]+$/i, 'RT harus berupa angka')
            .min(3, 'RT paling sedikit terdiri dari 3 angka'),
        rw: Yup.string()
            .required('RW perlu di isi')
            .matches(/^[0-9]+$/i, 'RW harus berupa angka')
            .min(3, 'RW paling sedikit terdiri dari 3 angka'),
        kecamatan: Yup.string()
            .required('Kecamatan perlu di pilih'),
        kelurahan: Yup.string()
            .required('Kelurahan perlu di pilih'),
    });

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isValid },
    } = useForm({
        resolver: yupResolver(validationSchema),
        mode: 'onChange',
    });

    const onSubmit = async data => {
        setServiceResponse({});
        showLoader(true);

        try {
            const res = await AuthServices.register(data);
            setServiceResponse({
                type: 'text-success',
                message: res.data.message,
            });
            reset();
        }
        catch (err) {
            setServiceResponse({
                type: 'text-error',
                message: err.response.data.message,
            });
        }
        showLoader(false);
    };

    return (
        <>
            <Head>
                <title>FKUB - Register</title>
                <meta property='og:register' content='register' key='register' />
            </Head>
            <RegisterView
                register={register}
                handleSubmit={handleSubmit}
                onSubmit={onSubmit}
                errors={errors}
                isLoading={isLoading}
                serviceResponse={serviceResponse}
                isValid={isValid}
            />
        </>
    );
}