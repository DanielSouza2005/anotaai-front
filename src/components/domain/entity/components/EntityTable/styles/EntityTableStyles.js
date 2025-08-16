import { ENTITY_CONSTANTS } from "../../../styles/EntityGridPageStyles";

export const getEntityTableStyles = () => ({
    table: {
        container: {
            flex: 1,
            width: '100%',
            minWidth: ENTITY_CONSTANTS.table.minWidth,
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
                minHeight: ENTITY_CONSTANTS.table.minHeight,
            },
        }
    },
});