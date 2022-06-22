import React, { useState } from 'react';
import Link from 'next/link';
import Loader from '../../components/loader/Loader';

export default function LoginView({
    register,
    handleSubmit,
    onSubmit,
    errors,
    isLoading,
    errorService,
    isValid,
    showLoader,
}) {
    const [showPassword, setShowPassword] = useState(false);

    const togglePassword = () => {
        setShowPassword(showPassword => !showPassword);
    };

    const roles = [
        'Admin',
        'PMPTSP',
        'FKUB',
        'Kemenag',
        'Dinas Tata Ruang'
    ];

    return (
        <div className='relative pb-12 md:pb-8 pt-6 md:pt-12'>
            <header className='m-auto w-9/10'>
                <div className='logo'>
                    <img src='/icons/fkub-logo.svg' alt='fkub logo' className='w-64 md:w-72' />
                </div>
            </header>

            <main className='register mt-12 md:mt-8 m-auto w-9/10 sm:w-7/10 md:w-5/10 lg:w-5/10 xl:w-5/10 2-xl:w-2/10'>
                <h1 className='text-secondary text-4xl font-bold text-center mb-12'>Selamat Datang Instansi</h1>
                <p className='text-error text-center'>{errorService ? errorService : ''}</p>

                <form className='mt-8 flex flex-col justify-between' onSubmit={handleSubmit(onSubmit)}>
                    <div className='input-container mb-6 flex flex-col'>
                        <input
                            type="text"
                            placeholder='Nomor Induk Kependudukan'
                            className='bg-transparent h-12 w-full pl-6 border-b-2 border-primary placeholder-primary font-semibold focus:rounded-md focus:outline-none focus:border-b-0 focus:ring-2 focus:ring-primary'
                            {...register('nik')}
                        />
                        <p className='text-xs text-error self-end mr-2 mt-1'>{errors.nik?.message}</p>
                    </div>

                    <div className='input-container mb-6 flex flex-col'>
                        <div className='flex items-center relative'>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder='Password'
                                className='bg-transparent h-12 w-full pl-6 border-b-2 border-primary placeholder-primary font-semibold focus:rounded-md focus:outline-none focus:border-b-0 focus:ring-2 focus:ring-primary'
                                {...register('password')}
                            />
                            <img
                                src={showPassword ? '/icons/hide-password.svg' : '/icons/show-password.svg'}
                                className='absolute right-4 text-primary cursor-pointer w-5 rounded-l-md'
                                onClick={togglePassword}
                            />
                        </div>
                        <p className='text-xs text-error self-end mr-2 mt-1'>{errors.password?.message}</p>
                    </div>

                    <div className='input-container mb-6 flex flex-col'>
                        <select className={`bg-transparent h-12 w-full pl-6 border-b-2 border-primary placeholder-primary font-semibold focus:rounded-md focus:outline-none focus:border-b-0 focus:ring-2 focus:ring-primary ${errors.role ? 'border-error' : 'border-primary'}`} {...register("role")}>
                            {roles.map((role) => (
                                <option value={role}>{role}</option>
                            ))}
                        </select>
                    </div>

                    {isLoading ?
                        (<Loader />) :
                        (<button className='bg-primary text-white rounded-md font-medium mt-8 w-full py-2 hover:bg-primary-light disable:opacity-60 disable:cursor-not-allowed' disabled={!isValid}>Login</button>)}
                </form>

                <div className='register-now flex mt-8 justify-center'>
                    <p className='text-gray-500 mr-2'>Pengguna Baru ?</p>
                    <Link href='/register'>
                        <button className='text-secondary'>Registrasi Sekarang!</button>
                    </Link>
                </div>
            </main>

            <footer className='text-center mt-16 font-medium text-gray-500 text-sm w-9/10 m-auto'>
                Dengan mendaftar akun baru, Anda setuju dengan <button className='text-black'>Kebijakan, Kondisi</button> dan {''} <button className='text-black'>Privacy Policy</button> kami.
            </footer>

            <img src='/images/bg-auth.png' className='absolute -z-1 bottom-0 opacity-10 w-screen' />
        </div>
    );
}