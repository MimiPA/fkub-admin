import React from 'react';

const reducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            localStorage.setItem('instansi', JSON.stringify(action.payload));
            return {
                isAuthenticated: true,
                user: action.payload,
            };
        case 'LOGOUT':
            localStorage.clear();
            return state;
        default:
            return state;
    }
};

const initialState = {
    isAuthenticated: false,
    user: {
        nama_lengkap: null,
        nik: null,
        email: null,
        nama_depan: null,
        nama_belakang: null,
        jenis_kelamin: null,
        agama: null,
        telepon: null,
        tempat_lahir: null,
        tanggal_lahir: null,
        alamat: null,
        rt: null,
        rw: null,
        kelurahan: null,
        kecamatan: null,
        foto: null,
        role: null,
    },
};

var AuthContext = React.createContext();

function getLocalStorage() {
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('instansi')) {
            return { isAuthenticated: false, user: JSON.parse(localStorage.getItem('instansi')) };
        }
        else {
            return initialState;
        }
    }
}

function UserProvider({ children }) {
    const [state, dispatch] = React.useReducer(reducer, getLocalStorage() || initialState);

    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
export { UserProvider };