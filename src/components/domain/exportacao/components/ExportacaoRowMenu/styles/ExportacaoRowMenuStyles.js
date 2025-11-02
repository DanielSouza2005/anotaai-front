import { ENTITY_CONSTANTS } from "../../../../entity/styles/EntityGridPageStyles";

export const getExportacaoRowMenuStyles = () => ({
    menu: {
        paper: {
            borderRadius: ENTITY_CONSTANTS.layout.borderRadius,
            minWidth: 150,
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        },
        item: {
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            py: 1,
            px: 2,
            transition: 'background-color 0.2s ease',
            '&:hover': {
                backgroundColor: 'action.hover',
            },
        },
        items: {
            download: { color: 'primary.main' },
            error: { color: 'error.main' },
        },
    }
});