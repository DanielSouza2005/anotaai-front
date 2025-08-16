import { ENTITY_CONSTANTS } from "../../../styles/EntityGridPageStyles";

export const getEntityRowMenuStyles = () => ({
    menu: {
        paper: {
            borderRadius: ENTITY_CONSTANTS.layout.borderRadius,
            minWidth: 150,
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        },
        item: {
            gap: 1,
            py: 1
        },
        items: {
            edit: { color: 'primary.main' },
            delete: { color: 'error.main' },
            details: { color: 'info.main' }
        }
    }
});