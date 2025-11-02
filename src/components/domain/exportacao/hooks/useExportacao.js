import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import { useEntityUtils } from "../../../../hooks/useEntityUtils";
import api from "../../../../services/api/api";

export function useExportacao(entityName, handleMenuClose, handleDownload, fetchData) {
    const { getEntityIdKey } = useEntityUtils();

    const [openErrorDialog, setOpenErrorDialog] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [openSolicitarExportacaoDialog, setOpenSolicitarExportacaoDialog] = useState(false);
   
    const handleDetailError = useCallback(
        (row) => {
            if (row) {
                if (row.mensagem_erro) {
                    setErrorMessage(row.mensagem_erro);
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

    const handleOpenSolicitarExportacao = useCallback(() => {
        setOpenSolicitarExportacaoDialog(true);
    }, []);

    const handleCloseSolicitarExportacao = useCallback(() => {
        setOpenSolicitarExportacaoDialog(false);
    }, []);

    const handleSolicitarExportacao = useCallback(async (entidade, tipoExportacao) => {
        try {
            const entidadePath = entidade === 0 ? "contatos" : "empresas";
            const tipoPath = tipoExportacao === "1" ? "/cabecalho" : "";
            const url = `/exportar/${entidadePath}${tipoPath}`;

            const response = await api.post(url);

            if (response.status === 200 || response.status === 202) {
                toast.success("Exportação solicitada com sucesso!");
            } else {
                toast.error("Não foi possível realizar a exportação.");
            }

            handleCloseSolicitarExportacao();
            fetchData();
        } catch (err) {
            console.error(err);
            toast.error("Erro ao realizar exportação");
        }
    }, [handleCloseSolicitarExportacao, fetchData]);

    const handleDownloadArquivo = useCallback((rows, selectedRowId) => {
        const selectedFile = rows.find(
            (row) => row[getEntityIdKey(entityName)] === selectedRowId
        );

        if (selectedFile) {
            if (selectedFile.caminho_arquivo) {
                handleDownload(selectedFile.caminho_arquivo);
            } else {
                toast.info("Esse registro não contém arquivo para download.");
            }
        } else {
            toast.error("Arquivo selecionado não encontrado.");
        }
    }, [entityName, getEntityIdKey, handleDownload]);

    return {
        openErrorDialog,
        setOpenErrorDialog,
        errorMessage,

        openSolicitarExportacaoDialog,
        handleOpenSolicitarExportacao,
        handleCloseSolicitarExportacao,

        handleDetailError,
        handleSolicitarExportacao,
        handleDownloadArquivo
    };
}
