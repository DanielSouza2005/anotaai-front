import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import api from "../../../../services/api/api";

export function useImportacao(handleMenuClose, fetchData) {

    const [openErrorDialog, setOpenErrorDialog] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [openSolicitarImportacaoDialog, setOpenSolicitarImportacaoDialog] = useState(false);

    const handleDetailError = useCallback(
        (row) => {
            if (row) {
                if (row.mensagemErro) {
                    setErrorMessage(row.mensagemErro);
                    setOpenErrorDialog(true);
                } else {
                    toast.info("Esse registro não contém mensagem de erro.");
                }
            } else {
                toast.error("O registro selecionado não foi encontrado.");
            }
            handleMenuClose?.();
        },
        [handleMenuClose]
    );

    const handleOpenSolicitarImportacao = useCallback(() => {
        setOpenSolicitarImportacaoDialog(true);
    }, []);

    const handleCloseSolicitarImportacao = useCallback(() => {
        setOpenSolicitarImportacaoDialog(false);
    }, []);

    const handleSolicitarImportacao = useCallback(async (payload) => {
        try {
            const formData = new FormData();
            formData.append("arquivo", payload.arquivo);

            const entidadePath = payload.entidade === "CONTATO" ? "contatos" : "empresas";
            const url = `/importar/${entidadePath}`;

            const response = await api.post(url, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            if (response.status === 202) {
                toast.success("Importação solicitada com sucesso!");
            } else {
                toast.error("Não foi possível realizar a importação.");
            }

            handleCloseSolicitarImportacao();
            fetchData();
        } catch (err) {
            toast.error("Erro ao realizar a importação");
        }
    }, [handleCloseSolicitarImportacao, fetchData]);

    return {
        openErrorDialog,
        setOpenErrorDialog,
        errorMessage,

        openSolicitarImportacaoDialog,
        setOpenSolicitarImportacaoDialog,
        handleOpenSolicitarImportacao,
        handleCloseSolicitarImportacao,
        handleSolicitarImportacao,

        handleDetailError
    };
}