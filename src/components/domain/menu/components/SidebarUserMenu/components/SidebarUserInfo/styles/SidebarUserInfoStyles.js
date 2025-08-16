
export const getSidebarUserInfoStyles = (variant) => ({
    container: {
        flex: variant === 'compact' ? 1 : undefined,
        overflow: variant === 'compact' ? 'hidden' : undefined,
        textAlign: variant === 'detailed' ? 'center' : 'left'
    },
    name: {
        overflow: variant === 'compact' ? 'hidden' : undefined,
        textOverflow: variant === 'compact' ? 'ellipsis' : undefined,
        whiteSpace: variant === 'compact' ? 'nowrap' : undefined
    },
    email: {
        overflow: variant === 'compact' ? 'hidden' : undefined,
        textOverflow: variant === 'compact' ? 'ellipsis' : undefined,
        whiteSpace: variant === 'compact' ? 'nowrap' : undefined
    }
});