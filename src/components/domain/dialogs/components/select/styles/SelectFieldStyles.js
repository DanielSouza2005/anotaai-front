export const SELECT_FIELD_TEXTS = {
    refreshTooltip: "Atualizar lista",
    emptyOption: "Selecione",
};

export const getSelectFieldStyles = ({ loading, isRefreshing, showRefreshButton }) => ({
    textField: {
        minWidth: 220,
    },
    inputAdornment: {
        minWidth: 40,
    },
    circularProgress: {
        mr: showRefreshButton ? 0.5 : 1,
        color: isRefreshing ? 'primary.main' : 'inherit',
    },
    refreshButton: {
        padding: '4px',
        mr: '4px',
        '&:hover': {
            backgroundColor: 'action.hover',
            transform: 'rotate(180deg)',
            transition: 'transform 0.3s ease-in-out',
        },
        '&:disabled': {
            opacity: 0.5,
        },
    },
    refreshIcon: {
        transition: 'transform 0.3s ease-in-out',
        transform: isRefreshing ? 'rotate(360deg)' : 'rotate(0deg)',
    },
});
