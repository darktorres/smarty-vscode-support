"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const l10n = require("@vscode/l10n");
let initialized = false;
self.onmessage = async (e) => {
    if (!initialized) {
        initialized = true;
        const i10lLocation = e.data.i10lLocation;
        if (i10lLocation) {
            await l10n.config({ uri: i10lLocation });
        }
        await Promise.resolve().then(() => require('./htmlServerMain'));
    }
};
//# sourceMappingURL=htmlServerWorkerMain.js.map