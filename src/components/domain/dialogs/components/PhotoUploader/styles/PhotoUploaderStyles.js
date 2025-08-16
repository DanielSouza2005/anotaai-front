export const PHOTO_UPLOADER_CONFIG = {
    texts: {
        selectButton: 'Selecionar Foto',
        clearButton: 'Limpar Foto',
        imageAlt: 'Foto',
        noPhotoMessage: 'Nenhuma foto selecionada.'
    },
    input: {
        acceptTypes: 'image/*'
    },
    dimensions: {
        avatarSize: 96,
        imageMaxHeight: 200,
        loadingSize: 72,
        buttonsGap: 2,
        buttonsMarginBottom: 2
    }
};

export const getPhotoUploaderStyles = (theme) => ({
    buttonsContainer: {
        mb: PHOTO_UPLOADER_CONFIG.dimensions.buttonsMarginBottom,
        display: 'flex',
        gap: PHOTO_UPLOADER_CONFIG.dimensions.buttonsGap
    },
    hiddenInput: {
        display: 'none'
    },
    previewContainer: {
        position: 'relative',
        display: 'inline-block'
    },
    loadingIndicator: {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 1
    },
    avatar: {
        width: PHOTO_UPLOADER_CONFIG.dimensions.avatarSize,
        height: PHOTO_UPLOADER_CONFIG.dimensions.avatarSize
    },
    image: {
        maxWidth: '100%',
        maxHeight: PHOTO_UPLOADER_CONFIG.dimensions.imageMaxHeight
    }
});