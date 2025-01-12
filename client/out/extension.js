"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode_1 = require("vscode");
const client_1 = require("./client");
const configuration_1 = require("./configuration");
const configuration_2 = require("./language/configuration");
const documentLink_1 = require("./language/documentLink");
const decoration_1 = require("./language/decoration");
const formatter_1 = require("./language/formatter");
const hover_1 = require("./language/hover");
const utils_1 = require("./utils");
const CONSTANT = require("./constants");
let client;
function activate(context) {
    let { activeTextEditor } = vscode_1.window;
    // Set comfiguration
    (0, configuration_1.setConfiguration)();
    let smartyDecoration;
    if (activeTextEditor) {
        // Create decoration for highlight (if enabled)
        smartyDecoration = new decoration_1.HighlightDecoration(activeTextEditor);
        (0, configuration_2.setLanguageConfiguration)(activeTextEditor);
    }
    // Subscribe to document change
    vscode_1.window.onDidChangeActiveTextEditor(editor => {
        activeTextEditor = editor;
        if (editor) {
            smartyDecoration?.updateDecorations(activeTextEditor);
            (0, configuration_2.setLanguageConfiguration)(activeTextEditor);
        }
    }, null, context.subscriptions);
    vscode_1.workspace.onDidChangeTextDocument(event => {
        if (activeTextEditor && event.document === activeTextEditor.document) {
            smartyDecoration?.triggerUpdateDecorations(activeTextEditor);
        }
    }, null, context.subscriptions);
    // Reset
    function reset() {
        smartyDecoration?.dispose();
        // reset configuration
        (0, configuration_1.setConfiguration)();
        // Receate decoration for highlight (if enabled)
        smartyDecoration = new decoration_1.HighlightDecoration(activeTextEditor);
    }
    // Subscribe to configuration change
    vscode_1.workspace.onDidChangeConfiguration(event => {
        const configs = ["editor", "html.format", "smarty"];
        configs.some(config => event.affectsConfiguration(config)) && reset();
    });
    // Language document formatting providers
    vscode_1.languages.registerDocumentFormattingEditProvider(CONSTANT.languageId, new formatter_1.FormattingProvider());
    vscode_1.languages.registerDocumentRangeFormattingEditProvider(CONSTANT.languageId, new formatter_1.FormattingProvider());
    // Language document link provider
    vscode_1.languages.registerDocumentLinkProvider(CONSTANT.languageId, new documentLink_1.DocumentLinkProvider());
    // Language document hover provider
    vscode_1.languages.registerHoverProvider(CONSTANT.languageId, new hover_1.HoverProvider());
    // Command to toggle highlight decoration
    vscode_1.commands.registerCommand(CONSTANT.toggleHighlightCommand, () => {
        const getConfig = vscode_1.workspace.getConfiguration('smarty');
        getConfig.update('highlight', !getConfig.get('highlight'), vscode_1.ConfigurationTarget.Global);
    });
    // Prompt to show release notes on extension updated
    (0, utils_1.promptToShowReleaseNotes)(context);
    // Create the language client and start the client.
    client = (0, client_1.createLanguageClient)(context);
    client.start();
}
function deactivate() {
    // Stop the language client.
    return client?.stop();
}
//# sourceMappingURL=extension.js.map