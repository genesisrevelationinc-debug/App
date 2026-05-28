export default {
    chatContent: {
        flex: 1,
    },
    chatContentCompose: {
        flex: 1,
    },
    chatContentComposeText: {
        color: themeColors.text,
    },
};

const chatContent = {
    flex: 1,
};
    flex: 1,
};

const chatContentCompose = {
    ...chatContent,
    minHeight: 100, // Add minHeight to prevent composer from being cut off
};

const styles = {
    chatContent,
    chatContentCompose,
    chatContentComposeText,
    chatContentComposeExpanded: {
        ...chatContentCompose,
        minHeight: 120, // Ensure expanded composer has enough height
    },
};

    chatContentComposeText: {
        color: themeColors.text,
    },
    color: themeColors.text,
};

export default {
    chatContent,
    chatContentCompose,
    chatContentComposeText,
    chatContentComposeExpanded: {
        ...chatContent,
        minHeight: 120, // Ensure expanded view has enough space
    },
};

const styles = {
    chatContent,
    chatContentCompose,
    chatContentComposeText,
    chatContentComposeExpanded: {
        ...chatContent,
        minHeight: 120,
    },
};