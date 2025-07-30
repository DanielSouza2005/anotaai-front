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
import { useEntityUtils } from '../../../hooks/useEntityUtils';
import { useMaskUtils } from '../../../hooks/useMaskUtils';

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

    const columnsWithActions = [...columns];

    const hasAcoes = columns.some((col) => col.field === 'acoes');

    if (!hasAcoes) {
        columnsWithActions.push({
            field: 'acoes',
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
        });
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
            sx={{
                flex: 1,
                width: '100%',
                minWidth: 600,
                '& .even': { backgroundColor: '#f3f3f3' },
                '& .odd': { backgroundColor: '#ffffff' },
                '& .MuiDataGrid-row:hover': { backgroundColor: '#e3f2fd' },
                '& .MuiDataGrid-footerContainer': {
                    position: 'sticky',
                    paddingX: 5,
                    borderTop: '1px solid #e0e0e0',
                    backgroundColor: 'transparent',
                    borderBottomLeftRadius: '16px',
                    borderBottomRightRadius: '16px',
                    bottom: 0,
                },
                '& .MuiDataGrid-columnHeaderTitle': {
                    fontWeight: 600,
                    color: '#424242',
                    fontSize: '0.875rem',
                },
                '& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within': {
                    outline: 'none !important',
                    '&:last-child': {
                        borderRight: 'none',
                    },
                },
                '& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-columnHeader:focus-within': {
                    outline: 'none !important',
                },
                '& .MuiDataGrid-columnHeader': {
                    '&:last-child': {
                        borderRight: 'none',
                    },
                },
                '& .MuiDataGrid-columnHeaders': {
                    backgroundColor: '#f5f5f5',
                    borderBottom: 'none',
                    borderTopLeftRadius: '16px',
                    borderTopRightRadius: '16px',
                    position: 'sticky',
                    top: 0,
                    zIndex: 1,
                },
                '& .MuiDataGrid-columnSeparator': { display: 'none' },
                '& .MuiDataGrid-menuIcon button': { color: '#333' },
                '& .MuiDataGrid-main': {
                    borderRadius: '16px',
                    height: '100% !important',
                },
                '& .MuiDataGrid-virtualScroller': {
                    overflowX: 'auto',
                    overflowY: 'auto',
                    minHeight: 200,
                },
            }}
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