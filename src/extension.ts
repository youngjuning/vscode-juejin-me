import vscode from 'vscode';
import path from 'path';
import { getUmiContent } from '@luozhu/vscode-utils';
import Channel from '@luozhu/vscode-channel';
import events from './events';

// 追踪当前 webview 面板
let currentPanel: vscode.WebviewPanel | undefined;

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "juejin-posts" is now active!');

  context.subscriptions.push(
    vscode.commands.registerCommand('juejin-posts.start', async () => {
      const columnToShowIn = vscode.window.activeTextEditor
        ? vscode.window.activeTextEditor.viewColumn
        : undefined;

      if (currentPanel) {
        // 如果我们已经有了一个面板，那就把它显示到目标列布局中
        currentPanel.reveal(columnToShowIn);
      } else {
        // 否则，创建并显示新的 Webview
        currentPanel = vscode.window.createWebviewPanel(
          'juejin-posts', // 只供内部使用，这个 webview 的标识
          'Juejin Posts', // 给用户显示的面板标题
          vscode.ViewColumn.One, // 给新的 webview 面板一个编辑器视图
          {
            // webview 面板的内容配置
            enableScripts: true,
            localResourceRoots: [vscode.Uri.file(path.join(context.extensionPath, 'web/dist'))], // 只允许 webview 加载我们插件的 `web/dist` 目录下的资源
            retainContextWhenHidden: true, // 隐藏时保留上下文
          }
        );
        // 设置 Logo
        currentPanel.iconPath = vscode.Uri.file(
          path.join(context.extensionPath, 'assets', 'icon-juejin.png')
        );
        // 设置 HTML 内容
        currentPanel.webview.html = getUmiContent(context, currentPanel, '3.5.17');

        // 处理webview中的信息
        const channel = new Channel(context, currentPanel.webview);
        channel.bind('request', async message => {
          const data = await events(message);
          return data;
        });

        // 当前面板被关闭后重置
        currentPanel.onDidDispose(
          () => {
            currentPanel = undefined;
          },
          null,
          context.subscriptions
        );
      }
    })
  );
}

export function deactivate() {}
