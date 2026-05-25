    const shareFileCallback = (filePath) => {
        try {
            const activePolicy = this.getActivePolicy();
            if (activePolicy && activePolicy.shouldSmartscanEverything) {
                // existing code logic here
            }
        } catch (error) {