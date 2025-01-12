"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setLanguageConfiguration = setLanguageConfiguration;
const vscode_1 = require("vscode");
const CONSTANT = require("../constants");
function setLanguageConfiguration(activeTextEditor) {
    let pair = ["{*", "*}"];
    const doubleBraceRegExp = /({{\*.*?\*}})|{{[^}\n\s]([^{}]|{[^{}]*})*}}/m;
    const docText = activeTextEditor.document.getText();
    if (doubleBraceRegExp.exec(docText)) {
        pair = ["{{*", "*}}"];
    }
    vscode_1.languages.setLanguageConfiguration(CONSTANT.languageId, {
        comments: { blockComment: pair }
    });
}
//# sourceMappingURL=configuration.js.map