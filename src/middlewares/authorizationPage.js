import cookies from "next-cookies";

//Middleware for Protected Pages
export function authPage(ctx) {
    return new Promise(resolve => {
        const { accessTokenFKUBMain, refreshTokenFKUBMain } = cookies(ctx);
        if (!refreshTokenFKUBMain && !accessTokenFKUBMain) {
            return ctx.res
                .writeHead(302, {
                    Location: '/login',
                })
                .end();
        }
        resolve({
            accessTokenFKUBMain,
            refreshTokenFKUBMain
        });
    });
}

//Middleware for Public Pages
export function unauthPage(ctx) {
    return new Promise(resolve => {
        const { refreshTokenFKUBMain } = cookies(ctx);
        if (refreshTokenFKUBMain) {
            return ctx.res
                .writeHead(302, {
                    Location: '/',
                })
                .end();
        }
        resolve('unauthorized');
    });
}