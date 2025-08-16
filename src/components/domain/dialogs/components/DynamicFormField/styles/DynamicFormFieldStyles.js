export const DYNAMIC_FORM_FIELD_CONFIG = {
    texts: {
        requiredIndicator: ' *'
    },
    fieldTypes: {
        select: 'select',
        textarea: 'textarea',
        date: 'date'
    },
    specialFields: {
        addressPrefix: 'endereco'
    },
    grid: {
        halfSpan: 6,
        fullSpan: 12
    },
    input: {
        margin: 'dense'
    },
    textarea: {
        rows: 3
    },
    dimensions: {
        loadingSize: 20,
        readOnlyBorderRadius: 1,
        loadingMarginRight: 1
    },
    colors: {
        readOnlyBackground: '#e3f2fd'
    }
};

export const getDynamicFormFieldStyles = (theme) => ({
    readOnlyInput: {
        backgroundColor: DYNAMIC_FORM_FIELD_CONFIG.colors.readOnlyBackground,
        borderRadius: DYNAMIC_FORM_FIELD_CONFIG.dimensions.readOnlyBorderRadius
    },
    loadingIndicator: {
        mr: DYNAMIC_FORM_FIELD_CONFIG.dimensions.loadingMarginRight
    }
});