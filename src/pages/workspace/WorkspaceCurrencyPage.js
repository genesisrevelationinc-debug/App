/**
 * @param {Object} event
 * @returns {Boolean}
 */
function interceptEventForCurrencySelection(event) {
    // Return true to continue with the default behavior, false to prevent
    return true;
}

/**
 * Handle keyboard events for currency selection to prevent the Enter key from causing navigation issues
 * 
 * @param {Object} event
 * @param {Function} onSubmit
 * @returns {void}
 */
function handleKeyboardEvents(event, onSubmit) {
    if (event.key === 'Enter' && event.target.tagName !== 'BUTTON') {
        // Prevent default Enter behavior on input fields to avoid navigation
        event.preventDefault();
        event.stopPropagation();
        onSubmit();
    }
}

export {interceptEventForCurrencySelection, handleKeyboardEvents};