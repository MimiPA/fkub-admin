import React from 'react';
import Link from 'next/link';
import DataTable from 'react-data-table-component';
import { useState, useEffect } from 'react';
import api from '../../services/api';

const customStyles = {
    header: {
        style: {
            fontSize: "24px",
            fontWeight: 700,
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

const columns = [
    {
        name: 'No.',
        selector: (row, index) => index + 1,
        sortable: true,
        maxWidth: "7px",
    },
    {
        name: "NIK",
        selector: (row) => row.nik,
        sortable: true,
    },
    {
        name: "Nama Lengkap",
        selector: (row) => row.nama_lengkap,
        sortable: true,
    },
    {
        name: "Email",
        selector: (row) => row.email,
        sortable: true,
    },
    {
        name: "Jenis Kelamin",
        selector: (row) => row.jenis_kelamin,
        sortable: true,
    },
    {
        name: "Telepon",
        selector: (row) => row.telepon,
        sortable: true,
    },
    {
        name: "Role",
        selector: (row) => row.role,
        sortable: true,
    },
    {
        name: "Aktivasi Akun",
        selector: (row) => row.is_active,
        sortable: true,
    },
    {
        button: true,
        cell: (row) => (
            <Link href={`/user/detail/${row.nik}`}>
                <button className="w-[44px] h-[22px] border border-[#ADC6FF] rounded-sm bg-[#F0F5FF] hover:bg-[#ADC6FF] text-[#2F54EB] ">
                    Detail
                </button>
            </Link>
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

export default function UserList() {
    const [data, setData] = useState([]);

    useEffect(() => {
        api.get('/user/admin').then(res => {
            setData(res.data.data);
        }).catch((err) => console.log(err));
    }, []);

    const [filterText, setFilterText] = React.useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
    const filteredItems = data.filter(item =>
        item.nama_lengkap && item.nama_lengkap.toLowerCase().includes(filterText.toLowerCase()) ||
        item.jenis_kelamin && item.jenis_kelamin.toLowerCase().includes(filterText.toLowerCase()) ||
        item.Master_account.email && item.Master_account.email.toLowerCase().includes(filterText.toLowerCase()) ||
        item.Master_account.is_active && item.Master_account.is_active.toLowerCase().includes(filterText.toLowerCase()) ||
        item.Master_account.Master_role.role && item.Master_account.Master_role.role.toLowerCase().includes(filterText.toLowerCase()),
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

    return (
        <>
            <div>
                <DataTable
                    title="User Profile"
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
        </>
    );
};