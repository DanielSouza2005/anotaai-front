import { MoreVert, Refresh } from '@mui/icons-material';
import {
    Button,
    IconButton,
    LinearProgress,
    Stack,
    Typography
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { ptBR } from '@mui/x-data-grid/locales';
import { useEntityUtils } from '../../../../../hooks/useEntityUtils';
import { useMaskUtils } from '../../../../../hooks/useMaskUtils';
import { getEntityTableStyles } from './styles/EntityTableStyles';

const EntityTable = ({
    entityName,
    rows,
    columns,
    loading,
    totalRows,
    page,
    pageSize,
    setPage,
    setPageSize,
    handleRowDoubleClick,
    handleMenuOpen
}) => {
    const { getEntityIdKey } = useEntityUtils();
    const { formatValue } = useMaskUtils();
    const styles = getEntityTableStyles();

    let columnsWithActions = [...columns];

    const hasAcoes = columns.some((col) => col.field === 'acoes');

    if (hasAcoes) {
        columnsWithActions = columnsWithActions.map((col) =>
            col.field === 'acoes'
                ? {
                    ...col,
                    headerName: '',
                    width: 50,
                    sortable: false,
                    filterable: false,
                    renderCell: (params) => (
                        <IconButton
                            onClick={(event) =>
                                handleMenuOpen(event, params.row[getEntityIdKey(entityName)])
                            }
                        >
                            <MoreVert />
                        </IconButton>
                    ),
                }
                : col
        );
    }

    const formattedColumns = columnsWithActions.map((col) => {
        if (col.valueFormatter || col.valueGetter || col.renderCell) return col;
        return {
            ...col,
            valueFormatter: (params) => formatValue(col, params),
        };
    });

    return (
        <DataGrid
            rows={rows}
            columns={formattedColumns}
            loading={loading}
            rowCount={totalRows}
            paginationMode="server"
            paginationModel={{ page, pageSize }}
            onPaginationModelChange={(model) => {
                setPage(model.page);
                setPageSize(model.pageSize);
            }}
            disableRowSelectionOnClick
            onRowDoubleClick={handleRowDoubleClick}
            localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
            getRowId={(row) => row[getEntityIdKey(entityName)]}
            getRowClassName={(params) =>
                params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
            }
            hideFooterSelectedRowCount={true}
            disableColumnMenu={false}
            autoHeight={false}
            aria-label="Tabela de dados"
            sx={styles.table.container}
            components={{
                NoRowsOverlay: () => (
                    <Stack height="100%" alignItems="center" justifyContent="center" spacing={1}>
                        <Typography color="text.secondary" variant="body1">
                            Nenhum registro encontrado
                        </Typography>
                        <Button variant="text" size="small" onClick={() => window.location.reload()} startIcon={<Refresh />}>
                            Recarregar
                        </Button>
                    </Stack>
                ),
                LoadingOverlay: () => (
                    <LinearProgress
                        color="primary"
                        sx={{
                            height: '2px',
                            '& .MuiLinearProgress-bar': {
                                borderRadius: '2px'
                            }
                        }}
                    />
                ),
            }}
        />
    )
}

export default EntityTable;