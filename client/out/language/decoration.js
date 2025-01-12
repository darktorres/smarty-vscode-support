"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HighlightDecoration = void 0;
const vscode_1 = require("vscode");
const configuration_1 = require("../configuration");
const CONSTANT = require("../constants");
class HighlightDecoration {
    timeout = undefined;
    smartyDecoration;
    constructor(activeTextEditor) {
        this.createDecoration(activeTextEditor);
    }
    createDecoration(activeTextEditor) {
        // Highlight feature disabled
        if (!configuration_1.CONFIG.highlight) {
            return;
        }
        // validate highlightColor setting
        if (!this.validateHighlightSettings(configuration_1.CONFIG.highlightColor)) {
            return;
        }
        // Create decorator type for highlight
        this.smartyDecoration = vscode_1.window.createTextEditorDecorationType({
            light: { backgroundColor: configuration_1.CONFIG.highlightColor.light },
            dark: { backgroundColor: configuration_1.CONFIG.highlightColor.dark },
        });
        this.updateDecorations(activeTextEditor);
    }
    validateHighlightSettings(highlightColor) {
        const hexRegex = /^#([A-Fa-f0-9]{8})$/i;
        if (!hexRegex.test(highlightColor.light)) {
            highlightColor.light = "#FFFA0040";
            vscode_1.window.showWarningMessage("Invalid value for smarty.highlightColor.light setting (Default color applied)");
            return false;
        }
        if (!hexRegex.test(highlightColor.dark)) {
            highlightColor.dark = "#FFFFFF25";
            vscode_1.window.showWarningMessage("Invalid value for smarty.highlightColor.dark setting (Default color applied)");
            return false;
        }
        return true;
    }
    updateDecorations(activeTextEditor) {
        if (!configuration_1.CONFIG.highlight || activeTextEditor?.document?.languageId !== CONSTANT.languageId) {
            return;
        }
        const smartyRegExp = /({{?\*.*?\*}}?)|{{?[^}\n\s]([^{}]|{[^{}]*})*}}?/g;
        const docText = activeTextEditor.document.getText();
        const smartyTags = [];
        let match;
        while (match = smartyRegExp.exec(docText)) {
            const startPos = activeTextEditor.document.positionAt(match.index);
            const endPos = activeTextEditor.document.positionAt(match.index + match[0].length);
            const range = new vscode_1.Range(startPos, endPos);
            const rangeTxt = activeTextEditor.document.getText(range);
            const decoration = { range };
            // checking tag inside literal
            const prevRange = smartyTags[smartyTags.length - 1];
            const prevRangeTxt = prevRange ? activeTextEditor.document.getText(prevRange.range) : "";
            if (!prevRangeTxt.includes("{literal}") || rangeTxt.includes("{/literal}")) {
                smartyTags.push(decoration);
            }
        }
        activeTextEditor.setDecorations(this.smartyDecoration, smartyTags);
    }
    triggerUpdateDecorations(activeTextEditor) {
        if (this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = undefined;
        }
        this.timeout = setTimeout(() => {
            this.updateDecorations(activeTextEditor);
        }, 500);
    }
    dispose() {
        this.smartyDecoration?.dispose();
    }
}
exports.HighlightDecoration = HighlightDecoration;
//# sourceMappingURL=decoration.js.map