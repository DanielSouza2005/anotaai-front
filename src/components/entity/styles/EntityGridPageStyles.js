export const ENTITY_CONSTANTS = {
    pagination: {
        defaultPageSize: 25,
        pageSizeOptions: [10, 25, 50, 100]
    },
    animations: {
        fabTimeout: 500,
        fadeTransition: 'opacity 0.3s ease'
    },
    table: {
        minWidth: 600,
        minHeight: 200,
        actionsColumnWidth: 50
    },
    layout: {
        borderRadius: 2,
        elevation: 0,
        spacing: {
            small: 1,
            medium: 2,
            large: 3
        }
    }
};

export const getEntityGridPageStyles = (theme, showFilters = false) => ({
    root: {
        margin: 0,
        padding: 0,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflow: 'hidden'
    },

    filterSection: {
        backgroundColor: '#fafafa',
        padding: showFilters ? 2 : 1,
        borderRadius: ENTITY_CONSTANTS.layout.borderRadius,
        border: '1px solid #e0e0e0',
        mb: ENTITY_CONSTANTS.layout.spacing.medium,
        transition: 'padding 0.3s ease'
    },

    tableContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        minHeight: 0,
        overflow: 'hidden'
    },

    tablePaper: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        minHeight: 0,
        width: '100%',
        overflow: 'hidden',
        transition: 'box-shadow 0.3s ease',
        '&:hover': {
            boxShadow: '0px 4px 12px rgba(25, 118, 210, 0.2)'
        }
    }
});