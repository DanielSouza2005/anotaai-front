import {
    Avatar,
    Box,
    Button,
    CircularProgress,
    Typography,
    useTheme
} from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { getEntityBehavior } from '../../../../../config/entity/entityConfig';
import { getPhotoUploaderStyles, PHOTO_UPLOADER_CONFIG } from './styles/PhotoUploaderStyles';

const PhotoUploader = ({
    entity,
    previewUrl,
    onSelect,
    onClear,
    isLoading = false,
    showClear = true,
    disabled = false
}) => {
    const theme = useTheme();
    const styles = getPhotoUploaderStyles(theme);
    const inputRef = useRef();
    const [internalLoading, setInternalLoading] = useState(false);
    const [error, setError] = useState(false);
    const [imageKey, setImageKey] = useState(0);

    const behavior = getEntityBehavior(entity);
    const usaAvatar = behavior.hasAvatar;

    useEffect(() => {
        if (previewUrl) {
            setInternalLoading(true);
            setError(false);
            setImageKey(prev => prev + 1);
        }
    }, [previewUrl]);

    const handleSelectFile = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            inputRef.current.value = '';
            onSelect(file);
        }
    };

    const handleClear = () => {
        inputRef.current.value = '';
        onClear();
    };

    const showPreview = previewUrl && !error;
    const loading = internalLoading || isLoading;

    return (
        <Box>
            {!disabled && (
                <Box sx={styles.buttonsContainer}>
                    <Button
                        variant="contained"
                        component="span"
                        onClick={() => inputRef.current?.click()}
                        disabled={disabled}
                    >
                        {PHOTO_UPLOADER_CONFIG.texts.selectButton}
                    </Button>

                    {showClear && showPreview && (
                        <Button
                            color="secondary"
                            onClick={handleClear}
                            disabled={disabled}
                        >
                            {PHOTO_UPLOADER_CONFIG.texts.clearButton}
                        </Button>
                    )}
                </Box>
            )}

            <input
                accept={PHOTO_UPLOADER_CONFIG.input.acceptTypes}
                ref={inputRef}
                type="file"
                style={styles.hiddenInput}
                onChange={handleSelectFile}
                disabled={disabled}
            />

            <Box sx={styles.previewContainer}>
                {loading && (
                    <CircularProgress
                        size={PHOTO_UPLOADER_CONFIG.dimensions.loadingSize}
                        sx={styles.loadingIndicator}
                    />
                )}

                {showPreview ? (
                    usaAvatar ? (
                        <Avatar
                            key={imageKey}
                            src={previewUrl}
                            alt={PHOTO_UPLOADER_CONFIG.texts.imageAlt}
                            sx={styles.avatar}
                            onLoad={() => setInternalLoading(false)}
                            onError={() => {
                                setInternalLoading(false);
                                setError(true);
                            }}
                        />
                    ) : (
                        <img
                            key={imageKey}
                            src={previewUrl}
                            alt={PHOTO_UPLOADER_CONFIG.texts.imageAlt}
                            onLoad={() => setInternalLoading(false)}
                            onError={() => {
                                setInternalLoading(false);
                                setError(true);
                            }}
                            style={{
                                ...styles.image,
                                display: loading ? 'none' : 'block'
                            }}
                        />
                    )
                ) : (
                    <Typography variant="body2" color="textSecondary">
                        {PHOTO_UPLOADER_CONFIG.texts.noPhotoMessage}
                    </Typography>
                )}
            </Box>
        </Box>
    );
};

export default PhotoUploader;