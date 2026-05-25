    const shareFileCallback = (filePath) => {
        const activePolicy = this.getActivePolicy();
        if (activePolicy && activePolicy.shouldSmartscanEverything) {
            // Process smartscan
            processSmartScan(filePath);
        }