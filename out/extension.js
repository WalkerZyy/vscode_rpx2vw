"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const process_1 = require("./process");
const provider_1 = require("./provider");
// this method is called when your extension is provider
// your extension is activated the very first time the command is executed
function activate(context) {
    let config = vscode.workspace.getConfiguration('rpx2vw');
    const Process = new process_1.default(config);
    const Provider = new provider_1.default(Process);
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "rpx2vw" is now active!');
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    const LANS = ['html', 'vue', 'css', 'less', 'scss', 'sass', 'stylus'];
    // 注册
    for (let lan of LANS) {
        let providerDisposable = vscode.languages.registerCompletionItemProvider(lan, Provider);
        context.subscriptions.push(providerDisposable);
    }
    let disposable = vscode.commands.registerTextEditorCommand('extension.rpx2vw', function (textEditor, edit) {
        const doc = textEditor.document;
        let selection = textEditor.selection;
        if (selection.isEmpty) {
            const start = new vscode.Position(0, 0);
            const end = new vscode.Position(doc.lineCount - 1, doc.lineAt(doc.lineCount - 1).text.length);
            selection = new vscode.Range(start, end);
        }
        let text = doc.getText(selection);
        textEditor.edit(builder => {
            builder.replace(selection, Process.convertAll(text));
        });
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map