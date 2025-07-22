import { useEffect, useState } from 'react';

const useFotoPreview = (file, existingUrl = null) => {
    const [previewUrl, setPreviewUrl] = useState(existingUrl);

    useEffect(() => {
        if (!file) {
            setPreviewUrl(existingUrl || null);
            return;
        }

        const objectUrl = URL.createObjectURL(file);
        setPreviewUrl(objectUrl);

        return () => {
            URL.revokeObjectURL(objectUrl);
        };
    }, [file, existingUrl]);

    return previewUrl;
};

export default useFotoPreview;
