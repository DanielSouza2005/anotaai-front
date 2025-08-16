export const FILTER_INPUT_ROW_TEXTS = {
    fieldLabel: "Campo",
    valueLabel: "Conteúdo",
    addFilterTooltip: "Adicionar filtro",
};

export const getFilterInputRowStyles = () => ({
    container: {
        display: "flex",
        gap: 2,
        alignItems: "center",
    },
    fieldSelect: {
        minWidth: 150,
    },
    valueInput: {
        flexGrow: 1,
    },
});
