export async function applyApiDelay() {
    const delay = Number(process.env.REACT_APP_ANOTAAI_API_DELAY) || 0;

    if (delay > 0) {
        await new Promise(resolve => setTimeout(resolve, delay));
    }
}