import cookies from "next-cookies";

//Middleware for Protected Pages
export function authPage(ctx) {
    return new Promise(resolve => {
        const { accessTokenFKUBInstansi, refreshTokenFKUBInstansi } = cookies(ctx);
        if (!refreshTokenFKUBInstansi && !accessTokenFKUBInstansi) {
            return ctx.res
                .writeHead(302, {
                    Location: '/login',
                })
                .end();
        }
        resolve({
            accessTokenFKUBInstansi,
            refreshTokenFKUBInstansi
        });
    });
}

//Middleware for Public Pages
export function unauthPage(ctx) {
    return new Promise(resolve => {
        const { refreshTokenFKUBInstansi } = cookies(ctx);
        if (refreshTokenFKUBInstansi) {
            return ctx.res
                .writeHead(302, {
                    Location: '/',
                })
                .end();
        }
        resolve('unauthorized');
    });
}