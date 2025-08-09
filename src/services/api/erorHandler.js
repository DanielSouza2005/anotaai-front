import { clearToken, isPublicRoute, redirectToLogin } from "../../utils/login/auth";

const ERROR_CODE_MESSAGES = {
    USUARIO_LOGADO_EXCLUSAO_BLOQUEADA:
        'Não é possível excluir o usuário logado.'
};

export function handleApiError(error) {

    if (!error.response) {
        // toast.error('Não foi possível conectar ao servidor.');
        return;
    }

    const { status, headers } = error.response; //data
    const errorCode = headers['x-error-code']?.toUpperCase();

    if (errorCode && ERROR_CODE_MESSAGES[errorCode]) {
        // toast.error(ERROR_CODE_MESSAGES[errorCode]);
        return;
    }

    if (status === 401 || status === 403) {
        const isHandled403 = errorCode === ERROR_CODE_MESSAGES.USUARIO_LOGADO_EXCLUSAO_BLOQUEADA;
        const isNotOnLoginPage = !isPublicRoute(window.location.pathname);

        if (!isHandled403 && isNotOnLoginPage) {
            clearToken();
            redirectToLogin();
        }
        return;
    }

    if (status === 404) {
        // toast.error('O recurso solicitado não foi encontrado.');
        return;
    }

    if (status >= 500) {
        // toast.error('Erro interno no servidor. Tente novamente mais tarde.');
        return;
    }

    // const backendMessage = data?.message || data?.error || null;
    // toast.error(backendMessage || 'Ocorreu um erro inesperado.');
}