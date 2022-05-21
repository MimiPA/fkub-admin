import Cookies from 'js-cookie';

const getLocalAccessToken = () => {
    const accessToken = Cookies.get('accessTokenFKUBMain');
    return String(accessToken).split('').slice(1, -1).join('');
};

const getLocalRefreshToken = () => {
    const refreshToken = Cookies.get('refreshTokenFKUBMain');
    return String(refreshToken).split('').slice(1, -1).join('');
};

const updateLocalAccessToken = token => {
    const inADay = 1;
    Cookies.set('accessTokenFKUBMain', JSON.stringify(token), { expires: inADay });
};

const TokenService = {
    getLocalAccessToken,
    getLocalRefreshToken,
    updateLocalAccessToken,
};

export default TokenService;