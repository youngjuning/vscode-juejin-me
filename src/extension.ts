import vscode from 'vscode';
import path from 'path';
import { getUmiContent } from '@luozhu/vscode-utils';

let panel: vscode.WebviewPanel | undefined;

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "juejin-posts" is now active!');

  context.subscriptions.push(
    vscode.commands.registerCommand('juejin-posts.start', async () => {
      const columnToShowIn = vscode.window.activeTextEditor
        ? vscode.window.activeTextEditor.viewColumn
        : undefined;

      if (panel) {
        // 如果我们已经有了一个面板，那就把它显示到目标列布局中
        panel.reveal(columnToShowIn);
      } else {
        // 否则，创建并显示新的 Webview
        panel = vscode.window.createWebviewPanel(
          'juejin-posts', // 只供内部使用，这个 Webview 的标识
          '我的掘金', // 给用户显示的面板标题
          vscode.ViewColumn.One, // 给新的 Webview 面板一个编辑器视图
          {
            enableScripts: true,
            localResourceRoots: [vscode.Uri.file(path.join(context.extensionPath, 'web/dist'))],
          } // Webview 选项。
        );
        // 设置 Logo
        panel.iconPath = vscode.Uri.file(path.join(context.extensionPath, 'assets', 'logo.png'));
        // 设置 HTML 内容
        panel.webview.html = getUmiContent(context, panel, '3.5.17');

        // 当前面板被关闭后重置
        panel.onDidDispose(
          () => {
            panel = undefined;
          },
          null,
          context.subscriptions
        );
      }
    })
  );
}

export function deactivate() {}
