// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode'
import process from './process';
import provider from './provider';

// this method is called when your extension is provider
// your extension is activated the very first time the command is executed
function activate(context: vscode.ExtensionContext) {
    let config = vscode.workspace.getConfiguration('rpx2vw');
    const Process = new process(config);
    const Provider = new provider(Process);
    
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "rpx2vw" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    const LANS = ['html','vue', 'css', 'less', 'scss', 'sass', 'stylus'];
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
            builder.replace(selection, Process.convertAll(text))
        });
    })

    context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;