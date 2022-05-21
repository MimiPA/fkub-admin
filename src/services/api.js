import axios from "axios";
import TokenService from './tokenServices';

const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

instance.interceptors.request.use(
    config => {
        const token = TokenService.getLocalAccessToken();
        if (token) {
            config.headers['Authorization'] = token;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

//Handler if access token is expired
instance.interceptors.response.use(
    res => {
        return res;
    },
    async err => {
        const originalConfig = err.config;

        if (originalConfig.url !== '/login' && err.response) {
            //Access token was expired
            if (err.response.status === 401 && !originalConfig._retry) {
                originalConfig._retry = true;

                try {
                    originalConfig.headers['refreshToken'] = TokenService.getLocalRefreshToken();

                    const res = await instance(originalConfig);
                    TokenService.updateLocalAccessToken(res.headers.accessToken);
                    return res;
                } catch (_error) {
                    return Promise.reject(_error);
                }
            }
        }
        return Promise.reject(err);
    }
);

export default instance;