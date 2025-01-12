"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormattingProvider = void 0;
const vscode_1 = require("vscode");
const beautify_1 = require("./beautify");
const utils_1 = require("../utils");
class FormattingProvider {
    SmartyFormatter = new beautify_1.BeautifySmarty();
    provideDocumentRangeFormattingEdits(document, range, options, _token) {
        const newrange = new vscode_1.Range(range.start.line, 0, range.end.line, range.end.character);
        const text = document.getText(newrange);
        const formatted = this.SmartyFormatter.beautify(text, options);
        return [vscode_1.TextEdit.replace(newrange, formatted)];
    }
    provideDocumentFormattingEdits(document, options, _token) {
        const text = document.getText();
        const formatted = this.SmartyFormatter.beautify(text, options);
        const range = (0, utils_1.fullDocumentRange)(document);
        return [vscode_1.TextEdit.replace(range, formatted)];
    }
}
exports.FormattingProvider = FormattingProvider;
//# sourceMappingURL=formatter.js.map