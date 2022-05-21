import axios from "axios";
import Cookies from "js-cookie";
import jwt from 'jsonwebtoken';
import TokenService from './tokenServices';
import api from './api';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const register = data => {
    const user = {
        ...data,
    };

    const { role, email, password, nik, nama_depan, nama_belakang, jenis_kelamin, agama, telepon, tempat_lahir, tanggal_lahir, alamat, rt, rw, kecamatan, kelurahan } = user;
    return axios.post(API_URL + '/register', {
        email,
        password,
        nik,
        nama_depan,
        nama_belakang,
        jenis_kelamin,
        agama,
        telepon,
        tempat_lahir,
        tanggal_lahir,
        alamat,
        rt,
        rw,
        kecamatan,
        kelurahan,
        role
    });
};

const login = async data => {
    const { email, password, role } = data;

    return axios.post(API_URL + '/login', {
        email,
        password,
        role
    })
        .then(res => {
            if (res.data.data) {
                const inADay = 1;
                Cookies.set('accessTokenFKUBMain', JSON.stringify(res.data.data.accessToken), { expires: inADay });
                Cookies.set('refreshTokenFKUBMain', JSON.stringify(res.data.data.refreshToken), { expires: inADay });
            }

            return res.data;
        });
};

const logout = async () => {
    const accessToken = TokenService.getLocalAccessToken();
    const { data: { id } } = jwt.decode(accessToken);

    return api.post(API_URL + `/logout?id=${id}`).finally(() => {
        Cookies.remove('accessTokenFKUBMain');
        Cookies.remove('refreshTokenFKUBMain');
    });
};

const AuthServices = {
    register,
    login,
    logout,
};

export default AuthServices;