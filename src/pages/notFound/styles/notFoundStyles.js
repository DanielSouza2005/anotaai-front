export const NOT_FOUND_PAGE_CONFIG = {
    texts: {
        errorCode: '404',
        title: 'Oops! Página não encontrada :(',
        description: 'Parece que você se perdeu no caminho. A página que você está procurando não existe ou foi movida.',
        backButton: 'Voltar'
    },
    colors: {
        fallbackPrimary: '#1976d2',
        backgroundColor: '#ffffff',
        overlayBackground: 'rgba(255,255,255,0.5)',
        titleColor: '#444',
        descriptionColor: '#666',
        buttonBackground: '#ffffff',
        textShadow: 'rgba(0,0,0,0.1)',
        hoverBackground: 'rgba(25, 118, 210, 0.04)'
    },
    dimensions: {
        errorCodeFontSize: '8rem',
        errorCodeFontWeight: 700,
        titleFontWeight: 600,
        buttonBorderRadius: '50px',
        buttonFontSize: '1rem',
        textShadowBlur: '2px 2px 4px'
    },
    spacing: {
        errorCodeMarginBottom: 2,
        titleMarginBottom: 3,
        descriptionMarginBottom: 4,
        contentPaddingY: 4,
        buttonPaddingX: 4,
        buttonPaddingY: 1.5
    },
    layout: {
        fullHeight: '100dvh'
    },
    background: {
        size: 'cover',
        position: 'center'
    }
};

export const getNotFoundPageStyles = (theme, backgroundImage) => ({
    backgroundContainer: {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: NOT_FOUND_PAGE_CONFIG.background.size,
        backgroundPosition: NOT_FOUND_PAGE_CONFIG.background.position,
        bgcolor: NOT_FOUND_PAGE_CONFIG.colors.backgroundColor,
        minHeight: NOT_FOUND_PAGE_CONFIG.layout.fullHeight,
        width: '100%',
        margin: 0,
        padding: 0,
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflowY: 'auto'
    },
    contentContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: NOT_FOUND_PAGE_CONFIG.layout.fullHeight,
        textAlign: 'center',
        py: NOT_FOUND_PAGE_CONFIG.spacing.contentPaddingY,
        bgcolor: NOT_FOUND_PAGE_CONFIG.colors.overlayBackground
    },
    errorCode: {
        fontSize: NOT_FOUND_PAGE_CONFIG.dimensions.errorCodeFontSize,
        fontWeight: NOT_FOUND_PAGE_CONFIG.dimensions.errorCodeFontWeight,
        mb: NOT_FOUND_PAGE_CONFIG.spacing.errorCodeMarginBottom,
        textShadow: `${NOT_FOUND_PAGE_CONFIG.dimensions.textShadowBlur} ${NOT_FOUND_PAGE_CONFIG.colors.textShadow}`
    },
    title: {
        mb: NOT_FOUND_PAGE_CONFIG.spacing.titleMarginBottom,
        fontWeight: NOT_FOUND_PAGE_CONFIG.dimensions.titleFontWeight,
        color: NOT_FOUND_PAGE_CONFIG.colors.titleColor
    },
    description: {
        mb: NOT_FOUND_PAGE_CONFIG.spacing.descriptionMarginBottom,
        color: NOT_FOUND_PAGE_CONFIG.colors.descriptionColor
    },
    backButton: {
        borderRadius: NOT_FOUND_PAGE_CONFIG.dimensions.buttonBorderRadius,
        px: NOT_FOUND_PAGE_CONFIG.spacing.buttonPaddingX,
        py: NOT_FOUND_PAGE_CONFIG.spacing.buttonPaddingY,
        fontSize: NOT_FOUND_PAGE_CONFIG.dimensions.buttonFontSize,
        bgcolor: NOT_FOUND_PAGE_CONFIG.colors.buttonBackground
    },
    backButtonHover: {
        bgcolor: NOT_FOUND_PAGE_CONFIG.colors.hoverBackground
    }
});