import { PUBLIC_ROUTES } from "../../config/routes/routesConfig";

export const getToken = () => localStorage.getItem('token');

export const clearToken = () => localStorage.removeItem('token');

export const redirectToLogin = () => {
    window.location.href = '/login';
};

export const isPublicRoute = (url) => {
    if (!url) return false;
    return PUBLIC_ROUTES.some(route => url.endsWith(route));
};