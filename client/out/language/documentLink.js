"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentLinkProvider = void 0;
const vscode_1 = require("vscode");
const path = require("path");
class DocumentLinkProvider {
    async provideDocumentLinks(document, token) {
        const results = [];
        const text = document.getText();
        const linkPattern = /(?<=['"]).*\.tpl(?=['"])/g;
        for (let match; match = linkPattern.exec(text); match) {
            // Get position in document
            const range = new vscode_1.Range(document.positionAt(match.index), document.positionAt(match.index + match[0].length));
            // Get target file path
            const fPath = match[0];
            // Current file directory path
            const docdir = path.dirname(document.uri.path);
            // Handle relative paths
            if (fPath.startsWith('./') || fPath.startsWith('../')) {
                const absPath = path.posix.resolve(docdir, fPath);
                results.push(new vscode_1.DocumentLink(range, vscode_1.Uri.parse(absPath)));
                continue;
            }
            const uri = path.posix.normalize(match[0]?.replace(/^[/]?/, '/'));
            const targets = await vscode_1.workspace.findFiles('**' + uri, null, 1);
            // To create file if path not found
            if (!targets.length) {
                const pathresolved = path.posix.resolve(docdir, match[0]?.replace(/^[/]?/, ''));
                targets.push(vscode_1.Uri.parse(pathresolved));
            }
            const doumentlink = new vscode_1.DocumentLink(range, targets[0]);
            results.push(doumentlink);
        }
        return results;
    }
}
exports.DocumentLinkProvider = DocumentLinkProvider;
//# sourceMappingURL=documentLink.js.map