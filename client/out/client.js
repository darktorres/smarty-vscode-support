"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLanguageClient = createLanguageClient;
const path = require("path");
const vscode_1 = require("vscode");
const node_1 = require("vscode-languageclient/node");
const CONSTANT = require("./constants");
function createLanguageClient(context) {
    // The server is implemented in node
    let root = vscode_1.env.uiKind === 1 ? "node" : "web";
    let serverModule = context.asAbsolutePath(path.join("server", "dist", root, "nodeServerMain.js"));
    // The debug options for the server
    // --inspect=6009: runs the server in Node"s Inspector mode so VS Code can attach to the server for debugging
    let debugOptions = { execArgv: ["--nolazy", "--inspect=6009"] };
    // If the extension is launched in debug mode then the debug server options are used
    // Otherwise the run options are used
    let serverOptions = {
        run: { module: serverModule, transport: node_1.TransportKind.ipc },
        debug: {
            module: serverModule,
            transport: node_1.TransportKind.ipc,
            options: debugOptions
        }
    };
    // Options to control the language client
    let clientOptions = {
        // Register the server for plain text documents
        documentSelector: [CONSTANT.languageId],
        initializationOptions: {
            dataPaths: [],
            embeddedLanguages: { css: true, javascript: true }
        }
    };
    // Create the language client.
    return new node_1.LanguageClient(CONSTANT.languageId, CONSTANT.languageServerName, serverOptions, clientOptions);
}
//# sourceMappingURL=client.js.map