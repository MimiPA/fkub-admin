import React, { useState, useContext } from 'react';
import LoginView from '../../src/views/login';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import AuthServices from '../../src/services/auth';
import { unauthPage } from '../../src/middlewares/authorizationPage';

import Head from 'next/head';
import { useRouter } from 'next/router';

import AuthContext from '../../src/components/providers/userProvider';
import api from '../../src/services/api';

export async function getServerSideProps(ctx) {
    await unauthPage(ctx);
    return { props: {} };
}

export default function Login() {
    const [isLoading, showLoader] = useState(false);
    const [errorService, setErrorService] = useState('');
    const router = useRouter();
    const { dispatch } = useContext(AuthContext);

    const validationSchema = Yup.object().shape({
        nik: Yup.string()
            .required('Nomor Induk Kependudukan perlu di isi')
            .min(16, 'Jumlah NIK 16 angka')
            .matches(/^[0-9]+$/i, 'NIK harus berupa angka'),
        password: Yup.string().required('Password harus di isi').min(6, 'Password minimal paling sedikit 6 karakter'),
        role: Yup.string().required('Role user perlu di pilih'),
    });

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({
        resolver: yupResolver(validationSchema),
        mode: 'onChange',
    });

    const onSubmit = async data => {
        setErrorService(false);
        showLoader(true);

        try {
            await AuthServices.login(data);
            await api.get('/profile').then(res => {
                localStorage.setItem('user', JSON.stringify(res.data));
                dispatch({
                    type: 'LOGIN',
                    payload: res.data,
                });
            });
            router.push('/');
        }
        catch (err) {
            setErrorService(err.response.data.message);
        }
        showLoader(false);
    };

    return (
        <>
            <Head>
                <title>FKUB - Login</title>
                <meta property='og:login' content='login' key='login' />
            </Head>
            <LoginView
                register={register}
                handleSubmit={handleSubmit}
                onSubmit={onSubmit}
                errors={errors}
                isLoading={isLoading}
                errorService={errorService}
                isValid={isValid}
                showLoader={showLoader}
            />
        </>
    );
}
