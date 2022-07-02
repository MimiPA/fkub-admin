import { useContext, useState } from 'react';
import Link from 'next/link';
import NavLink from './NavLink';
import Image from 'next/image';
import { useEffect } from 'react';
import { Popover } from '@headlessui/react';
import AuthServices from '../../services/auth';
import { useRouter } from 'next/router';
import AuthContext from '../providers/userProvider';
import api from '../../services/api';

const pmptsp = [
    {
        icon: "/icons/dashboard-icon",
        title: "Beranda",
        href: "/",
        main: true,
        active: "router.pathname === '/'",
    },
    {
        icon: "/icons/list-pengajuan",
        title: "Daftar Pengajuan",
        main: true,
        href: "/pmptsp/daftar_pengajuan"
    },
    {
        icon: "/icons/krk",
        title: "Riwayat Surat KRK",
        main: true,
        href: "/pmptsp/riwayat_krk"
    },
];

const kemenag = [
    {
        icon: "/icons/dashboard-icon",
        title: "Beranda",
        href: "/",
        main: true,
        active: "router.pathname === '/'",
    },
    {
        icon: "/icons/list-pengajuan",
        title: "Daftar Permohonan",
        main: true,
        href: "/kemenag/daftar_permohonan"
    },
    {
        icon: "/icons/surat-rekomendasi",
        title: "Riwayat Surat Rekomendasi",
        main: true,
        href: "/kemenag/riwayat_rekomendasi"
    },
];

const fkub = [
    {
        icon: "/icons/dashboard-icon",
        title: "Beranda",
        href: "/",
        main: true,
        active: "router.pathname === '/'",
    },
    {
        icon: "/icons/list-pengajuan",
        title: "Daftar Permohonan",
        main: true,
        href: "/fkub/daftar_permohonan",
    },
    {
        icon: "/icons/surat-rekomendasi",
        title: "Riwayat Surat Rekomendasi",
        main: true,
        href: "/fkub/riwayat_rekomendasi"
    },
];

const dtr = [
    {
        icon: "/icons/dashboard-icon",
        title: "Beranda",
        href: "/",
        main: true,
        active: "router.pathname === '/'",
    },
    {
        icon: "/icons/krk",
        title: "Surat KRK",
        main: true,
        item: [
            { title: "Permintaan KRK", href: "/dtr/penerbitan_krk" },
            { title: "Riwayat KRK", href: "/dtr/riwayat_krk" },
        ],
    },
    {
        icon: "/icons/imb",
        title: "Surat IMB",
        main: true,
        item: [
            { title: "Permintaan IMB", href: "/dtr/penerbitan_imb" },
            { title: "Riwayat IMB", href: "/dtr/riwayat_imb" },
        ],
    },
];

const admin = [
    {
        icon: "/icons/dashboard-icon",
        title: "Beranda",
        href: "/",
        main: true,
        active: "router.pathname === '/'",
    },
    {
        icon: "/icons/user-management-icon",
        title: "User Management",
        main: true,
        href: "/user"
    },
];

const tambahan = [
    {
        icon: "/icons/dashboard-icon",
        title: "Beranda",
        href: "/",
        main: true,
        active: "router.pathname === '/'",
    },
];

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const { state, dispatch } = useContext(AuthContext);
    const router = useRouter();
    const logout = async () => {
        await AuthServices.logout();
        dispatch({
            type: 'LOGOUT',
        });
        router.push('/login');
    };

    useEffect(() => {
        api.get('/profile').then(res => {
            localStorage.setItem('instansi', JSON.stringify(res.data));
            dispatch({
                type: 'LOGIN',
                payload: res.data,
            });
        });
    }, []);

    const [item, setItem] = useState([]);
    useEffect(() => {
        const item = JSON.parse(localStorage.getItem('instansi'));
        if (item) {
            setItem(item);
        }
    }, []);

    const Menu = () => {
        if (item.role == "Admin") {
            return (
                admin.map(({ icon, title, item, main, href }) => (
                    <NavLink
                        icon={icon}
                        title={title}
                        key={title}
                        hide={!open}
                        item={item}
                        main={main}
                        href={href}
                        setOpen={setOpen}
                    />
                ))
            );
        }
        else if (item.role == "PMPTSP") {
            return (
                pmptsp.map(({ icon, title, item, main, href }) => (
                    <NavLink
                        icon={icon}
                        title={title}
                        key={title}
                        hide={!open}
                        item={item}
                        main={main}
                        href={href}
                        setOpen={setOpen}
                    />
                ))
            );
        }
        else if (item.role == "Kemenag") {
            return (
                kemenag.map(({ icon, title, item, main, href }) => (
                    <NavLink
                        icon={icon}
                        title={title}
                        key={title}
                        hide={!open}
                        item={item}
                        main={main}
                        href={href}
                        setOpen={setOpen}
                    />
                ))
            );
        }
        else if (item.role == "FKUB") {
            return (
                fkub.map(({ icon, title, item, main, href }) => (
                    <NavLink
                        icon={icon}
                        title={title}
                        key={title}
                        hide={!open}
                        item={item}
                        main={main}
                        href={href}
                        setOpen={setOpen}
                    />
                ))
            );
        }
        else if (item.role == "Dinas Tata Ruang") {
            return (
                dtr.map(({ icon, title, item, main, href }) => (
                    <NavLink
                        icon={icon}
                        title={title}
                        key={title}
                        hide={!open}
                        item={item}
                        main={main}
                        href={href}
                        setOpen={setOpen}
                    />
                ))
            );
        }
        else {
            return (
                tambahan.map(({ icon, title, item, main, href }) => (
                    <NavLink
                        icon={icon}
                        title={title}
                        key={title}
                        hide={!open}
                        item={item}
                        main={main}
                        href={href}
                        setOpen={setOpen}
                    />
                ))
            );
        }
    }



    return (
        <>
            <div
                className={`fixed md:flex ${open ? "md:pl-72" : "md:pl-[68px]"
                    } md:flex-row-reverse w-full top-0 z-10 text-white transition-all duration-200 ease-in-out`}
            >
                <div className="bg-[#343A40] h-16 md:w-screen flex items-center justify-between px-8">
                    <div
                        className={`${open ? "hidden md:flex" : "flex"} cursor-pointer`}
                        onClick={() => setOpen(!open)}
                    >
                        <Image
                            src="/icons/dash-icon.svg"
                            alt="dash icon"
                            layout="intrinsic"
                            width="24"
                            height="24"
                        />
                    </div>
                    <div
                        className={`${!open ? "hidden" : "flex md:hidden"} cursor-pointer`}
                        onClick={() => setOpen(!open)}
                    >
                        <Image
                            src="/icons/close-icon.svg"
                            alt="close icon"
                            layout="intrinsic"
                            width="19"
                            height="19"
                        />
                    </div>

                    <div className="flex md:hidden">
                        <Image
                            src="/icons/fkub-logo.svg"
                            alt="full"
                            width="135"
                            height="20"
                        />
                    </div>

                    <div className="flex">
                        <ProfilePopover user={state} />
                    </div>
                </div>
            </div>
            <nav
                className={`bg-[#343A40] w-full ${open
                    ? "h-screen  md:fixed md:w-72"
                    : "h-0 md:fixed md:block  md:w-[70px]"
                    } md:h-screen md:top-0 z-10 max-h-screen transition-all duration-200 ease-in-out fixed top-16 text-white overflow-y-auto overflow-x-hidden navbar`}
            >
                <div
                    className={`flex items-center ${open ? "justify-start px-6" : "justify-center"
                        } mt-4`}
                >
                    <div className={`md:block  hidden md:p-0`}>
                        <Image
                            src="/icons/logo-bubble.svg"
                            alt="logo bubble"
                            width="50"
                            height="40"
                            layout="intrinsic"
                        />
                    </div>
                    <div className={`${!open ? "md:hidden" : "md:block"}  hidden md:p-0`}>
                        <Image
                            src="/icons/logo-text.svg"
                            alt="logo text"
                            width="150"
                            height="80"
                            layout="intrinsic"
                        />
                    </div>
                </div>

                <Menu />
            </nav>
        </>
    );
}

function ProfilePopover() {
    const router = useRouter();
    const { dispatch, state } = useContext(AuthContext);
    const logout = async () => {
        await AuthServices.logout();
        router.push('/login');
        dispatch({
            type: 'LOGOUT',
        });
    };

    return (
        <Popover className="relative">
            <Popover.Button className="text-white font-bold cursor-pointer">
                {state.user.nama_lengkap + ' '}
                <span className='ml-4'>
                    <Image src="/icons/down-arrow.svg" alt="down-arrow Image" width="20" height="12" />
                </span>
            </Popover.Button>

            <Popover.Panel className="absolute z-10 right-0">
                <div className="p-6 text-md absolute right-0 mt-2 flex flex-col items-start content-start drop-shadow-profilePopover rounded-md bg-white text-black justify-start text-left ">
                    <div className="flex min-w-[250px]  grow items-center pb-4">
                        <div className="w-[70px] rounded-full border-1 border-gray-200 overflow-hidden">
                            <img src={state.user.foto} alt="Profile Image" width="70" height="70" />
                        </div>

                        <div className={`ml-2 font-semibold `}>
                            <div className="">{state.user.nik}</div>
                        </div>
                    </div>
                    <Popover.Button>
                        <Link href="/change-password" passHref>
                            <a className="mt-2 py-4">Ubah Password</a>
                        </Link>
                    </Popover.Button>
                    <Popover.Button>
                        <div
                            onClick={logout}
                            className="mt-2 flex items-center text-[#F03738] hover:text-[#c72c2c] cursor-pointer font-semibold transition-colors duration-300 ease-in-out"
                        >
                            <Image className="ml-2" height="20" width="20" src="/icons/logout-icon.svg" alt="Logout Icon Image" />
                            <div className='ml-2'>Logout</div>
                        </div>
                    </Popover.Button>
                </div>
            </Popover.Panel>
        </Popover>
    );
}
