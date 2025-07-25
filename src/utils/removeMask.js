
const removeMask = (value) => {
    return value?.replace(/\D/g, '') || '';
}
export { removeMask };
