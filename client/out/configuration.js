"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONFIG = void 0;
exports.setConfiguration = setConfiguration;
const vscode_1 = require("vscode");
exports.CONFIG = {};
function setConfiguration() {
    const getConfig = vscode_1.workspace.getConfiguration();
    Object.assign(exports.CONFIG, {
        highlight: getConfig.get("smarty.highlight"),
        highlightColor: getConfig.get("smarty.highlightColor"),
        tabSize: getConfig.get("editor.tabSize"),
        insertSpaces: getConfig.get("editor.insertSpaces"),
        indentInnerHtml: getConfig.get("html.format.indentInnerHtml"),
        maxPreserveNewLines: getConfig.get("html.format.maxPreserveNewLines"),
        preserveNewLines: getConfig.get("html.format.preserveNewLines"),
        wrapLineLength: getConfig.get("html.format.wrapLineLength"),
        wrapAttributes: getConfig.get("html.format.wrapAttributes"),
        endWithNewline: getConfig.get("html.format.endWithNewline"),
    });
}
//# sourceMappingURL=configuration.js.map