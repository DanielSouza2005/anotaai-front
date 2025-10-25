import { ENTITY_CONSTANTS } from "../../../entity/styles/EntityGridPageStyles";

export const getBackupRowMenuStyles = () => ({
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
            download: { color: 'primary.main' }
        }
    }
});