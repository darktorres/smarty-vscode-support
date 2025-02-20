"use strict";
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNodeFileFS = getNodeFileFS;
const vscode_uri_1 = require("vscode-uri");
const fs = require("fs");
const vscode_css_languageservice_1 = require("vscode-css-languageservice");
function getNodeFileFS() {
    function ensureFileUri(location) {
        if (!location.startsWith('file:')) {
            throw new Error('fileSystemProvider can only handle file URLs');
        }
    }
    return {
        stat(location) {
            ensureFileUri(location);
            return new Promise((c, e) => {
                const uri = vscode_uri_1.URI.parse(location);
                fs.stat(uri.fsPath, (err, stats) => {
                    if (err) {
                        if (err.code === 'ENOENT') {
                            return c({ type: vscode_css_languageservice_1.FileType.Unknown, ctime: -1, mtime: -1, size: -1 });
                        }
                        else {
                            return e(err);
                        }
                    }
                    let type = vscode_css_languageservice_1.FileType.Unknown;
                    if (stats.isFile()) {
                        type = vscode_css_languageservice_1.FileType.File;
                    }
                    else if (stats.isDirectory()) {
                        type = vscode_css_languageservice_1.FileType.Directory;
                    }
                    else if (stats.isSymbolicLink()) {
                        type = vscode_css_languageservice_1.FileType.SymbolicLink;
                    }
                    c({
                        type,
                        ctime: stats.ctime.getTime(),
                        mtime: stats.mtime.getTime(),
                        size: stats.size
                    });
                });
            });
        },
        readDirectory(location) {
            ensureFileUri(location);
            return new Promise((c, e) => {
                const path = vscode_uri_1.URI.parse(location).fsPath;
                fs.readdir(path, { withFileTypes: true }, (err, children) => {
                    if (err) {
                        return e(err);
                    }
                    c(children.map(stat => {
                        if (stat.isSymbolicLink()) {
                            return [stat.name, vscode_css_languageservice_1.FileType.SymbolicLink];
                        }
                        else if (stat.isDirectory()) {
                            return [stat.name, vscode_css_languageservice_1.FileType.Directory];
                        }
                        else if (stat.isFile()) {
                            return [stat.name, vscode_css_languageservice_1.FileType.File];
                        }
                        else {
                            return [stat.name, vscode_css_languageservice_1.FileType.Unknown];
                        }
                    }));
                });
            });
        }
    };
}
//# sourceMappingURL=nodeFs.js.map