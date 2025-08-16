export const FILTER_PANEL_TEXTS = {
    title: "Filtros Avançados",
};

export const getFilterPanelStyles = () => ({
    container: {
        border: "1px solid #ccc",
        borderRadius: 2,
        padding: 1.5,
        position: "relative",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    },
    header: {
        display: "flex",
        alignItems: "center",
        gap: 1,
    },
    title: {
        fontWeight: "bold",
    },
    clearButton: {
        position: "absolute",
        top: 4,
        right: 4,
    },
    chipList: {
        display: "flex",
        flexWrap: "wrap",
        gap: 1,
    },
});
