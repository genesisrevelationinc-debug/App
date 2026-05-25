import {default as onyxSubscribe} from 'lib/onyxSubscribe';
import {navigationRef} from './Navigation';

    const shareFileCallback = (filePath) => {
        const activePolicy = this.getActivePolicy();
        if (activePolicy && this.getActivePolicy().shouldSmartscanEverything) {
            // existing code logic here
        }
    };