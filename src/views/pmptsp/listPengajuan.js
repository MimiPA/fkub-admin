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
        name: "File",
        selector: (row) => row.surat_permohonan,
        cell: (row) => (
            <a target="_blank" href={`${row.surat_permohonan}`}>
                <div>
                    <svg className='w-5 h-5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M88 304H80V256H88C101.3 256 112 266.7 112 280C112 293.3 101.3 304 88 304zM192 256H200C208.8 256 216 263.2 216 272V336C216 344.8 208.8 352 200 352H192V256zM224 0V128C224 145.7 238.3 160 256 160H384V448C384 483.3 355.3 512 320 512H64C28.65 512 0 483.3 0 448V64C0 28.65 28.65 0 64 0H224zM64 224C55.16 224 48 231.2 48 240V368C48 376.8 55.16 384 64 384C72.84 384 80 376.8 80 368V336H88C118.9 336 144 310.9 144 280C144 249.1 118.9 224 88 224H64zM160 368C160 376.8 167.2 384 176 384H200C226.5 384 248 362.5 248 336V272C248 245.5 226.5 224 200 224H176C167.2 224 160 231.2 160 240V368zM288 224C279.2 224 272 231.2 272 240V368C272 376.8 279.2 384 288 384C296.8 384 304 376.8 304 368V320H336C344.8 320 352 312.8 352 304C352 295.2 344.8 288 336 288H304V256H336C344.8 256 352 248.8 352 240C352 231.2 344.8 224 336 224H288zM256 0L384 128H256V0z" fill='salmon' /></svg>
                </div>
            </a>
        ),
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
            <Link href={`/pmptsp/daftar_pengajuan/${row.id}`}>
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

export default function ListPengajuan() {
    const [data, setData] = useState([]);

    useEffect(() => {
        api.get('/proposal/pmptsp/list').then(res => {
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
                    title="Daftar Proposal Permohonan"
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