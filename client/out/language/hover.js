"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HoverProvider = void 0;
const vscode_1 = require("vscode");
const CONSTANT = require("../constants");
const snippets = require("../../../snippets/snippets.json");
class HoverProvider {
    provideHover(document, position, token) {
        const range = document.getWordRangeAtPosition(position);
        const word = document.getText(range);
        const line = document.lineAt(position).text;
        try {
            const regex = new RegExp(`{.*?${word}\\b.*?}`);
            if (!regex.test(line) || !snippets[word]) {
                return null;
            }
        }
        catch (error) {
            return null;
        }
        const snippet = snippets[word];
        if (!snippet.description.length) {
            return null;
        }
        const md = new vscode_1.MarkdownString();
        // md.appendCodeblock(word);
        md.appendMarkdown(snippet.description);
        if (snippet.reference) {
            md.appendMarkdown(`\n\r[Smarty Reference](${CONSTANT.smartyDocsUri}/${snippet.reference})`);
        }
        return new vscode_1.Hover(md);
    }
}
exports.HoverProvider = HoverProvider;
//# sourceMappingURL=hover.js.map