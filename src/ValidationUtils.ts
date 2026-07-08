/**
 * Validate that the given value is a valid card name.
 * Letters, numbers, and spaces are allowed.
 */
function isValidCardName(value: string): boolean {
    return /^[a-zA-Z0-9\s]+$/.test(value);
}