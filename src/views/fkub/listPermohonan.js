import React from 'react';
import Link from 'next/link';
import DataTable from 'react-data-table-component';
import { useState, useEffect } from 'react';
import api from '../../services/api';
import moment from 'moment';

const customStyles = {
    header: {
        style: {
            fontSize: "24px",
            fontWeight: 600,
            color: "rgba(249, 102, 58, 1)",
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
        selector: (row) => row.id,
        sortable: true,
        grow: 0,
        maxWidth: "15px",
    },
    {
        name: "Tanggal Pengajuan",
        selector: (row) => row.createdAt,
        format: (row) => moment(row.createdAt).format('LLL'),
        sortable: true,
    },
    {
        name: "Nama Tempat",
        selector: (row) => row.nama_tempat,
        sortable: true,
    },
    {
        name: "Tempat Ibadah",
        selector: (row) => row.tempat_ibadah,
        sortable: true,
    },
    {
        name: "Jenis Pembangunan",
        selector: (row) => row.jenis_pembangunan,
        sortable: true,
    },
    {
        name: "Alamat",
        selector: (row) => row.alamat,
        sortable: true,
    },
    {
        name: "Nama Pemohon",
        selector: (row) => row.Pengguna.nama_depan + ' ' + row.Pengguna.nama_belakang,
        sortable: true,
    },
    {
        name: "Status",
        selector: (row) => row.status,
        sortable: true,
    },
    {
        button: true,
        cell: (row) => (
            <Link href={`/fkub/daftar_permohonan/${row.id}`}>
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

export default function ListPermohonan() {
    const [data, setData] = useState([]);

    useEffect(() => {
        api.get('/proposal/fkub/list').then(res => {
            setData(res.data.data);
        }).catch((err) => console.log(err));
    }, []);

    const [filterText, setFilterText] = React.useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
    const filteredItems = data.filter(item =>
        item.nama_tempat && item.nama_tempat.toLowerCase().includes(filterText.toLowerCase()) ||
        item.tempat_ibadah && item.tempat_ibadah.toLowerCase().includes(filterText.toLowerCase()) ||
        item.alamat && item.alamat.toLowerCase().includes(filterText.toLowerCase()) ||
        item.status && item.status.toLowerCase().includes(filterText.toLowerCase())
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
                    title="Daftar Permohonan"
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