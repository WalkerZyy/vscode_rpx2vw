"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
class Provider {
    constructor(process) {
        this.process = process;
    }
    provideCompletionItems(document, position, token) {
        return new Promise((resolve, reject) => {
            const lineText = document.getText(new vscode.Range(position.with(undefined, 0), position));
            const res = this.process.convert(lineText);
            if (!res) {
                return resolve([]);
            }
            const item = new vscode.CompletionItem(`${res.rpxValue}rpx -> ${res.vw}`, vscode.CompletionItemKind.Snippet);
            item.insertText = res.vw;
            return resolve([item]);
        });
    }
}
exports.default = Provider;
//# sourceMappingURL=provider.js.map