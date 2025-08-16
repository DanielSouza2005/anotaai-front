import {
    Avatar,
    Box,
    Button,
    CircularProgress,
    Typography
} from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { getEntityBehavior } from '../../../../config/entity/entityConfig';

const PhotoUploader = ({
    entity,
    previewUrl,
    onSelect,
    onClear,
    isLoading = false,
    showClear = true,
    disabled = false
}) => {
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
                <Box mb={2} display="flex" gap={2}>
                    <Button
                        variant="contained"
                        component="span"
                        onClick={() => inputRef.current?.click()}
                        disabled={disabled}
                    >
                        Selecionar Foto
                    </Button>

                    {showClear && showPreview && (
                        <Button
                            color="secondary"
                            onClick={handleClear}
                            disabled={disabled}
                        >
                            Limpar Foto
                        </Button>
                    )}
                </Box>
            )}

            <input
                accept="image/*"
                ref={inputRef}
                type="file"
                style={{ display: 'none' }}
                onChange={handleSelectFile}
                disabled={disabled}
            />

            <Box position="relative" display="inline-block">
                {loading && (
                    <CircularProgress
                        size={72}
                        sx={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }}
                    />
                )}

                {showPreview ? (
                    usaAvatar ?
                        (
                            <Avatar
                                key={imageKey}
                                src={previewUrl}
                                alt="Foto"
                                sx={{ width: 96, height: 96 }}
                                onLoad={() => setInternalLoading(false)}
                                onError={() => {
                                    setInternalLoading(false);
                                    setError(true);
                                }}
                            />
                        )
                        :
                        (
                            <img
                                key={imageKey}
                                src={previewUrl}
                                alt="Foto"
                                onLoad={() => setInternalLoading(false)}
                                onError={() => {
                                    setInternalLoading(false);
                                    setError(true);
                                }}
                                style={{
                                    maxWidth: '100%',
                                    maxHeight: 200,
                                    display: loading ? 'none' : 'block'
                                }}
                            />
                        )
                ) : (
                    <Typography variant="body2" color="textSecondary">
                        Nenhuma foto selecionada.
                    </Typography>
                )}
            </Box>
        </Box>
    );
};

export default PhotoUploader;
