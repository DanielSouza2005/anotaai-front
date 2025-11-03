import { FileDownloadOutlined } from "@mui/icons-material";
import { Box, Paper } from "@mui/material";
import { useCallback } from "react";
import EntityHeader from "../../components/domain/entity/components/EntityHeader";
import EntityTable from "../../components/domain/entity/components/EntityTable";
import useEntity from "../../components/domain/entity/hooks/useEntity";
import ImportacaoDialog from "../../components/domain/importacao/components/ImportacaoDialog/ImportacaoDialog";
import ImportacaoErrosDialog from "../../components/domain/importacao/components/ImportacaoErrosDialog/ImportacaoErrosDialog";
import ImportacaoFabButton from "../../components/domain/importacao/components/ImportacaoFabButton/ImportacaoFabButton";
import ImportacaoRowMenu from "../../components/domain/importacao/components/ImportacaoRowMenu/ImportacaoRowMenu";
import { useImportacao } from "../../components/domain/importacao/hooks/useImportacao";
import { ENTITY_NAMES } from "../../config/entity/entityConfig";
import { ImportacaoColumns } from "./config/columns";

const ImportacaoPage = () => {

    const entityName = ENTITY_NAMES.IMPORTACAO;

    const {
        rows, page, setPage, pageSize, setPageSize, totalRows, loading, selectedRowId,
        handleMenuOpen, handleMenuClose, anchorEl, fetchData
    } = useEntity(entityName);

    const {
        openErrorDialog, setOpenErrorDialog, errorMessage, handleDetailError, 
        openSolicitarImportacaoDialog, handleOpenSolicitarImportacao, handleCloseSolicitarImportacao, handleSolicitarImportacao
    } = useImportacao(handleMenuClose, fetchData);

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
                title={"Importação"}
                icon={FileDownloadOutlined}
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
                        columns={ImportacaoColumns}
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

            <ImportacaoRowMenu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                onDetailError={() => {
                    const row = rows.find(r => r.cod_importacaolog === selectedRowId);
                    handleDetailError(row);
                }}
            />

            <ImportacaoErrosDialog
                open={openErrorDialog}
                onClose={() => setOpenErrorDialog(false)}
                errorMessage={errorMessage}
            />

            <ImportacaoFabButton
                onClick={handleOpenSolicitarImportacao}
            />

            <ImportacaoDialog
                open={openSolicitarImportacaoDialog}
                onClose={handleCloseSolicitarImportacao}
                onImport={handleSolicitarImportacao}
            />
        </Box>
    );
}

export default ImportacaoPage;