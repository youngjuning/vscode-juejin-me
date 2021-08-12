import vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "juejin-posts" is now active!');

  const disposable = vscode.commands.registerCommand('juejin-posts.helloWorld', () => {
    vscode.window.showInformationMessage('Hello World from Juejin Posts!');
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}
