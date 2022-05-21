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

const navItem = [
    {
        icon: "/icons/dashboard-icon",
        title: "Dashboard",
        href: "/",
        main: true,
        active: "router.pathname === '/'",
    },
    {
        icon: "/icons/pengajuan",
        title: "Pengajuan Proposal",
        main: true,
        item: [
            { title: "Bangun Baru", href: "/bangun_baru", active: "router.pathname.startsWith('/bangun_baru')" },
            { title: "Renovasi", href: "/renovasi", active: "router.pathname.startsWith('/renovasi')" },
        ],
    },
    {
        icon: "/icons/list-pengajuan",
        title: "List Pengajuan",
        href: "/list_pengajuan",
        main: true,
        active: "router.pathname.startsWith('/list_pengajuan')",
    },
    {
        icon: "/icons/berkas-pendukung",
        title: "Berkas Pendukung",
        href: "/berkas_pendukung",
        main: true,
        active: "router.pathname.startsWith('/berkas_pendukung')"
    },
];

export default function Navbar() {
    const [show, setShow] = useState(false);
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
            localStorage.setItem('user', JSON.stringify(res.data));
            dispatch({
                type: 'LOGIN',
                payload: res.data,
            });
        });
    }, []);

    const handleShow = () => {
        setShow(!show);
        if (show === true) {
            document.body.style.overflow = 'unset';
        } else {
            document.body.style.overflow = 'hidden';
        }
        // Unsets Background Scrolling to use when SideDrawer/Modal is closed
    };

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

                {navItem.map(({ icon, title, item, main, href }) => (
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
                ))}
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
                {state.user.nama_depan + ' '}
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
                            <div className="">{state.user.nama_depan + ' ' + state.user.nama_belakang}</div>
                            <Popover.Button>
                                <Link href="/profile" passHref>
                                    <a className="text-gray-500 text-md cursor-pointer hover:text-primary transition-colors duration-300 ease-in-out">
                                        View Profile
                                    </a>
                                </Link>
                            </Popover.Button>
                        </div>
                    </div>
                    <Popover.Button>
                        <Link href="/change-password" passHref>
                            <a className="mt-2 py-4">Change Password</a>
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
