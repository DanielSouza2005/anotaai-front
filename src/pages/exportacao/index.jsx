import { FileUploadOutlined } from "@mui/icons-material";
import { Box, Paper } from "@mui/material";
import { useCallback } from "react";
import EntityHeader from "../../components/domain/entity/components/EntityHeader";
import EntityTable from "../../components/domain/entity/components/EntityTable";
import useEntity from "../../components/domain/entity/hooks/useEntity";
import ExportacaoErrosDialog from "../../components/domain/exportacao/components/ExportacaoErrosDialog/ExportacaoErrosDialog";
import ExportacaoFabButton from "../../components/domain/exportacao/components/ExportacaoFabButton/ExportacaoFabButton";
import ExportacaoRowMenu from "../../components/domain/exportacao/components/ExportacaoRowMenu/ExportacaoRowMenu";
import SolicitarExportacaoDialog from "../../components/domain/exportacao/components/SolicitarExportacaoDialog/SolicitarExportacaoDialog";
import { useExportacao } from "../../components/domain/exportacao/hooks/useExportacao";
import { ENTITY_NAMES } from "../../config/entity/entityConfig";
import { ExportacaoColumns } from "./config/columns";

const ExportacaoPage = () => {

    const entityName = ENTITY_NAMES.EXPORTACAO;

    const {
        rows, page, setPage, pageSize, setPageSize, totalRows, loading, selectedRowId,
        handleMenuOpen, handleMenuClose, anchorEl, handleDownload, fetchData
    } = useEntity(entityName);

    const {
        openErrorDialog,
        setOpenErrorDialog,
        errorMessage,
        openSolicitarExportacaoDialog,
        handleOpenSolicitarExportacao,
        handleCloseSolicitarExportacao,
        handleDetailError,
        handleSolicitarExportacao,
        handleDownloadArquivo
    } = useExportacao(entityName, handleMenuClose, handleDownload, fetchData);

    const handleRowDoubleClick = useCallback((params) => {
        handleDetailError(params.row);
    }, [handleDetailError]);

    return (
        <Box
            sx={{
                margin: 0,
                padding: 0,
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                overflow: 'hidden'
            }}
        >
            <EntityHeader
                title={"Exportação"}
                icon={FileUploadOutlined}
            />

            <Box
                sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: 0,
                    overflow: 'hidden'
                }}
            >
                <Paper
                    elevation={0}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        flex: 1,
                        minHeight: 0,
                        width: '100%',
                        overflow: 'hidden',
                        '&:hover': {
                            boxShadow: '0px 4px 12px rgba(25, 118, 210, 0.2)'
                        }
                    }}
                >
                    <EntityTable
                        entityName={entityName}
                        rows={rows}
                        columns={ExportacaoColumns}
                        loading={loading}
                        totalRows={totalRows}
                        page={page}
                        pageSize={pageSize}
                        setPage={setPage}
                        setPageSize={setPageSize}
                        handleMenuOpen={handleMenuOpen}
                        handleRowDoubleClick={handleRowDoubleClick}
                    />

                </Paper>
            </Box>

            <ExportacaoRowMenu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                onDownload={() => handleDownloadArquivo(rows, selectedRowId)}
                onDetailError={() => {
                    const row = rows.find(r => r.id === selectedRowId);
                    handleDetailError(row);
                }}
            />

            <ExportacaoErrosDialog
                open={openErrorDialog}
                onClose={() => setOpenErrorDialog(false)}
                errorMessage={errorMessage}
            />

            <ExportacaoFabButton onClick={handleOpenSolicitarExportacao} />

            <SolicitarExportacaoDialog
                open={openSolicitarExportacaoDialog}
                onClose={handleCloseSolicitarExportacao}
                onConfirm={handleSolicitarExportacao}
            />
        </Box>
    );
}

export default ExportacaoPage;