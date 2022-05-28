import React, { useState } from 'react';
import Link from 'next/link';
import Loader from '../../components/loader/Loader';
import { date } from 'yup';
import kecamatans from './kecamatan';
import kelurahans from './kelurahan';

export default function RegisterView({
    register,
    handleSubmit,
    onSubmit,
    errors,
    isLoading,
    serviceResponse,
    isValid,
}) {
    const [showPassword, setShowPassword] = useState(false);

    const togglePassword = () => {
        setShowPassword(showPassword => !showPassword);
    };

    const agamas = [
        "Agama",
        "Buddha",
        "Hindu",
        "Islam",
        "Katolik",
        "Konghucu",
        "Kristen"
    ];

    const roles = [
        'Admin',
        'PMPTSP',
        'FKUB',
        'Kemenag',
        'Dinas Tata Ruang'
    ];

    return (
        <div className='relative pb-12 md:pb-24 pt-6 md:pt-12'>
            <header className='flex space-between items-center m-auto w-9/10'>
                <div className='logo w-full'>
                    <img src='/icons/fkub-logo.svg' alt='fkub logo' className='w-64 md:w-72' />
                </div>
                <div className='login-section flex justify-between min-w-max items-center'>
                    <p className='hidden lg:block font-medium text-sm mr-6'>Already have an account ?</p>
                    <Link href='/login'>
                        <button className="bg-secondary hover:bg-secondary-light text-white px-6 py-2 md:px-9 md:py-3 rounded-md font-bold text-base">
                            Login
                        </button>
                    </Link>
                </div>
            </header>

            <main className='register mt-12 md:mt-8 m-auto w-9/10 sm:w-7/10 md:w-5/10 lg:w-5/10 xl:w-5/10 2-xl:w-2/10'>
                <h1 className='text-secondary text-4xl font-bold text-center mb-12'>Register</h1>
                <p className={`text-center ${Object.keys(serviceResponse).length ? serviceResponse.type : ''}`}>
                    {Object.keys(serviceResponse).length ? serviceResponse.message : ''}
                </p>

                <form className='mt-8 flex flex-col justify-between' onSubmit={handleSubmit(onSubmit)}>
                    <div className='mt-2 mb-4 flex flex-col bg-secondary'>
                        <p className='text-base text-white font-medium p-1.5 ml-2'>Data Akun</p>
                    </div>

                    <div className='input-container mb-4 flex flex-col'>
                        <div className='flex'>
                            <img src='/icons/email.svg' className='bg-primary w-12 px-4 rounded-l-md' />
                            <input
                                type='text'
                                placeholder='Email'
                                className={`bg-transparent h-12 w-full pl-6 rounded-r-md border-2 focus:outline-none ${errors.email ? 'border-error' : 'border-primary'}`} {...register('email')} />
                        </div>
                        <p className='text-xs text-error self-end mr-2 mt-1'>{errors.email?.message}</p>
                    </div>

                    <div className='input-container mb-4 flex flex-col'>
                        <div className='flex items-stretch relative'>
                            <img src='/icons/lock.svg' className='bg-primary w-12 px-4 rounded-l-md' />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder='Password'
                                className={`bg-transparent h-12 w-full pl-6 rounded-r-md border-2 focus:outline-none ${errors.password ? 'border-error' : 'border-primary'}`} {...register('password')} />

                            <img
                                src={showPassword ? '/icons/hide-password.svg' : '/icons/show-password.svg'}
                                className='absolute self-center right-4 text-primary cursor-pointer w-5 rounded-l-md'
                                onClick={togglePassword}
                            />
                        </div>
                        <p className='text-xs text-error self-end mr-2 mt-1'>{errors.password?.message}</p>
                    </div>

                    <div className='input-container mb-4 flex flex-col'>
                        <div className='flex'>
                            <img src='/icons/user-role.svg' className='bg-primary w-12 px-4 rounded-l-md' />
                            <select className={`bg-transparent h-12 w-full pl-6 rounded-r-md border-2 pr-6 focus:outline-none ${errors.role ? 'border-error' : 'border-primary'}`} {...register("role")}>
                                {roles.map((role) => (
                                    <option value={role}>{role}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className='mt-2 mb-4 flex flex-col bg-secondary'>
                        <p className='text-base text-white font-medium p-1.5 ml-2'>Data Diri</p>
                    </div>

                    <div className='input-container mb-4 flex flex-col'>
                        <div className='flex'>
                            <img src='/icons/nik.svg' className='bg-primary w-12 px-4 rounded-l-md' />
                            <input
                                type='text'
                                placeholder='Nomor Induk Kependudukan'
                                className={`bg-transparent h-12 w-full pl-6 rounded-r-md border-2 focus:outline-none ${errors.nik ? 'border-error' : 'border-primary'}`} {...register('nik')}
                            />
                        </div>
                        <p className='text-xs text-error self-end mr-2 mt-1'>{errors.nik?.message}</p>
                    </div>

                    <div className='input-container mb-4 flex flex-col'>
                        <div className='flex'>
                            <img src='/icons/user.svg' className='bg-primary w-12 px-4 rounded-l-md' />
                            <input
                                type='text'
                                placeholder='Nama Depan'
                                className={`bg-transparent h-12 w-full pl-6 rounded-r-md border-2 focus:outline-none ${errors.nama_depan ? 'border-error' : 'border-primary'}`} {...register('nama_depan')} />
                        </div>
                        <p className='text-xs text-error self-end mr-2 mt-1'>{errors.nama_depan?.message}</p>
                    </div>

                    <div className='input-container mb-4 flex flex-col'>
                        <div className='flex'>
                            <img src='/icons/user.svg' className='bg-primary w-12 px-4 rounded-l-md' />
                            <input
                                type='text'
                                placeholder='Nama Belakang'
                                className={`bg-transparent h-12 w-full pl-6 rounded-r-md border-2 focus:outline-none ${errors.nama_belakang ? 'border-error' : 'border-primary'}`} {...register('nama_belakang')} />
                        </div>
                        <p className='text-xs text-error self-end mr-2 mt-1'>{errors.nama_belakang?.message}</p>
                    </div>

                    <div className='input-container mb-4 flex flex-col'>
                        <div className='flex'>
                            <img src='/icons/gender.svg' className='bg-primary w-12 px-4 rounded-l-md' />
                            <div className={`bg-transparent h-12 w-full pl-6 rounded-r-md border-2 focus:outline-none ${errors.jenis_kelamin ? 'border-error' : 'border-primary'}`}>
                                <input
                                    type="radio"
                                    value="Laki-laki"
                                    className='bg-primary h-5 mt-3' {...register('jenis_kelamin')} />
                                <label className='text-lg mr-10'> Laki-laki</label>
                                <input
                                    type="radio"
                                    value="Perempuan"
                                    className='bg-primary h-5 mt-3 ml-10' {...register('jenis_kelamin')} />
                                <label className='text-lg'> Perempuan</label>
                            </div>
                        </div>
                        <p className='text-xs text-error self-end mr-2 mt-1'>{errors.jenis_kelamin?.message}</p>
                    </div>

                    <div className='input-container mb-4 flex flex-col'>
                        <div className='flex'>
                            <img src='/icons/religion.svg' className='bg-primary w-12 px-4 rounded-l-md' />
                            <select className={`bg-transparent h-12 w-full pl-6 rounded-r-md border-2 pr-6 focus:outline-none ${errors.agama ? 'border-error' : 'border-primary'}`} {...register("agama")}>
                                {agamas.map((agama) => (
                                    <option value={agama}>{agama}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className='input-container mb-4 flex flex-col'>
                        <div className='flex'>
                            <img src='/icons/phone.svg' className='bg-primary w-12 px-4 rounded-l-md' />
                            <input
                                type='tel'
                                placeholder='Telepon'
                                className={`bg-transparent h-12 w-full pl-6 rounded-r-md border-2 focus:outline-none ${errors.telepon ? 'border-error' : 'border-primary'}`} {...register('telepon')}
                            />
                        </div>
                        <p className='text-xs text-error self-end mr-2 mt-1'>{errors.telepon?.message}</p>
                    </div>

                    <div className='input-container mb-4 flex flex-row space-x-9 sm:space-x-2 md:space-x-3 lg:space-x-5 xl:space-x-9'>
                        <div className='w-5/12'>
                            <div className='flex'>
                                <img src='/icons/tempat-lahir.svg' className='bg-primary w-12 px-4 rounded-l-md' />
                                <input
                                    type='text'
                                    placeholder='Tempat Lahir'
                                    className={`bg-transparent h-12 w-full pl-6 pr-6 rounded-r-md border-2 focus:outline-none ${errors.tempat_lahir ? 'border-error' : 'border-primary'}`} {...register('tempat_lahir')}
                                />
                            </div>
                            <p className='text-xs text-error self-end mr-2 mt-1'>{errors.tempat_lahir?.message}</p>
                        </div>
                        <div className='w-5/12'>
                            <div className='flex'>
                                <img src='/icons/birthday.svg' className='bg-primary w-12 px-4 rounded-l-md' />
                                <input
                                    type='date'
                                    min="1900-01-01"
                                    className={`bg-transparent h-12 w-full pl-6 pr-6 rounded-r-md border-2 focus:outline-none ${errors.tanggal_lahir ? 'border-error' : 'border-primary'}`} {...register('tanggal_lahir')}
                                />
                            </div>
                            <p className='text-xs text-error self-end mr-2 mt-1'>{errors.tanggal_lahir?.message}</p>
                        </div>
                    </div>

                    <div className='mt-2 mb-4 flex flex-col bg-secondary'>
                        <p className='text-base text-white font-medium p-1.5 ml-2'>Data Alamat</p>
                    </div>

                    <div className='input-container mb-4 flex flex-col'>
                        <div className='flex'>
                            <img src='/icons/house-user-solid.svg' className='bg-primary w-12 px-4 rounded-l-md' />
                            <input
                                type='text'
                                placeholder='Alamat'
                                className={`bg-transparent h-12 w-full pl-6 rounded-r-md border-2 focus:outline-none ${errors.alamat ? 'border-error' : 'border-primary'}`} {...register('alamat')}
                            />
                        </div>
                        <p className='text-xs text-error self-end mr-2 mt-1'>{errors.alamat?.message}</p>
                    </div>

                    <div className='input-container mb-4 flex flex-row space-x-9 sm:space-x-2 md:space-x-3 lg:space-x-5 xl:space-x-9'>
                        <div className='w-5/12'>
                            <div className='flex'>
                                <img src='/icons/house-chimney-solid.svg' className='bg-primary w-12 px-4 rounded-l-md' />
                                <input
                                    type='text'
                                    placeholder='RT'
                                    className={`bg-transparent h-12 w-full pl-6 rounded-r-md border-2 focus:outline-none ${errors.rt ? 'border-error' : 'border-primary'}`} {...register('rt')}
                                />
                            </div>
                            <p className='text-xs text-error self-end mr-2 mt-1'>{errors.rt?.message}</p>
                        </div>
                        <div className='w-5/12'>
                            <div className='flex'>
                                <img src='/icons/house-chimney-solid.svg' className='bg-primary w-12 px-4 rounded-l-md' />
                                <input
                                    type='text'
                                    placeholder='RW'
                                    className={`bg-transparent h-12 w-full pl-6 rounded-r-md border-2 focus:outline-none ${errors.rw ? 'border-error' : 'border-primary'}`} {...register('rw')}
                                />
                            </div>
                            <p className='text-xs text-error self-end mr-2 mt-1'>{errors.rw?.message}</p>
                        </div>
                    </div>

                    <div className='input-container mb-4 flex flex-row space-x-9 sm:space-x-2 md:space-x-3 lg:space-x-5 xl:space-x-9'>
                        <div className='w-5/12'>
                            <div className='flex'>
                                <img src='/icons/building.svg' className='bg-primary w-12 px-4 rounded-l-md' />
                                <select className={`bg-transparent h-12 w-full pl-6 rounded-r-md border-2 pr-4 focus:outline-none ${errors.kecamatan ? 'border-error' : 'border-primary'}`} {...register("kecamatan")}>
                                    {kecamatans.map((kecamatan) => (
                                        <option value={kecamatan}>{kecamatan}</option>
                                    ))}
                                </select>
                            </div>
                            <p className='text-xs text-error self-end mr-2 mt-1'>{errors.kecamatan?.message}</p>
                        </div>
                        <div className='w-5/12'>
                            <div className='flex'>
                                <img src='/icons/building.svg' className='bg-primary w-12 px-4 rounded-l-md' />
                                <select className={`bg-transparent h-12 w-full pl-6 rounded-r-md border-2 focus:outline-none ${errors.kelurahan ? 'border-error' : 'border-primary'}`} {...register("kelurahan")}>
                                    {kelurahans.map((kelurahan) => (
                                        <option value={kelurahan}>{kelurahan}</option>
                                    ))}
                                </select>
                            </div>
                            <p className='text-xs text-error self-end mr-2 mt-1'>{errors.kelurahan?.message}</p>
                        </div>
                    </div>

                    {isLoading ?
                        (<Loader />) :
                        (<button className='bg-primary text-white px-6 py-2 rounded-md font-medium text-sm self-end mr-1 hover:bg-primary-light disable:opacity-60 disable:cursor-not-allowed' disabled={!isValid}>Submit</button>)}
                </form>

                <p className={`text-center ${Object.keys(serviceResponse).length ? serviceResponse.type : ''}`}>
                    {Object.keys(serviceResponse).length ? serviceResponse.message : ''}
                </p>
            </main>

            <img src='/images/bg-auth.png' className='absolute -z-1 bottom-0 opacity-10 w-full' />
        </div>
    );
}