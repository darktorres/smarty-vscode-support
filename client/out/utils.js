"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fullDocumentRange = fullDocumentRange;
exports.promptToShowReleaseNotes = promptToShowReleaseNotes;
exports.versionIsNewer = versionIsNewer;
exports.getExtensionVersion = getExtensionVersion;
const vscode_1 = require("vscode");
const CONSTANT = require("./constants");
const packageJson = require("../../package.json");
function fullDocumentRange(document) {
    const endLineNumber = document.lineCount - 1;
    const endLineText = document.lineAt(endLineNumber).text;
    return new vscode_1.Range(0, 0, endLineNumber, endLineText.length);
}
function promptToShowReleaseNotes(context) {
    const currentVersion = getExtensionVersion();
    const lastSeenVersion = context.globalState.get(CONSTANT.lastSeenVersionKey, '');
    if (!versionIsNewer(lastSeenVersion, currentVersion)) {
        return;
    }
    context.globalState.update(CONSTANT.lastSeenVersionKey, currentVersion);
    vscode_1.window.showInformationMessage(`Smarty extension has been updated to v${currentVersion}. Please check the changelog and star on Github`, `Visit Github`).then(() => {
        const uri = vscode_1.Uri.parse(packageJson.repository.url);
        vscode_1.env.openExternal(uri);
    });
}
function versionIsNewer(oldVersion, newVersion) {
    return !!newVersion.localeCompare(oldVersion, undefined, {
        numeric: true,
        sensitivity: 'base'
    });
}
function getExtensionVersion() {
    return packageJson.version;
}
//# sourceMappingURL=utils.js.map