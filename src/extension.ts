import vscode from 'vscode';
import { createUmiWebviewPanel } from '@luozhu/vscode-utils';
import Channel from '@luozhu/vscode-channel';
import { init, localize } from 'vscode-nls-i18n';
import events from './events';

let currentPanel: vscode.WebviewPanel | undefined;
let channel: Channel;
export function activate(context: vscode.ExtensionContext) {
  init(context.extensionPath);
  console.log(localize('extension.activeLog'));
  context.subscriptions.push(
    vscode.commands.registerCommand('juejin-me.start', async () => {
      currentPanel = createUmiWebviewPanel(
        context,
        'juejin-me',
        'Juejin Me',
        'assets/icon-luozhu.png',
        '3.5.17'
      );
      // 处理 webview 中的信息
      channel = new Channel(context, currentPanel);
      channel.bind(async message => {
        const { eventType, method, params } = message;
        const data = await events[eventType][method](params);
        return data;
      }, vscode);
    })
  );
  context.subscriptions.push(
    vscode.commands.registerCommand('juejin-me.configUserId', async () => {
      const userId = await vscode.window.showInputBox({
        placeHolder: localize('extension.juejin-me.configUserId.placeHolder'),
        validateInput: value => {
          if (value) {
            return null;
          }
          return localize('extension.juejin-me.configUserId.validateInput');
        },
      });
      const config = vscode.workspace.getConfiguration('juejin-me');

      config.update('userId', userId, true);
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('juejin-me.showAuthor', () => {
      if (!currentPanel) {
        vscode.window.showInformationMessage('大家好，我是洛竹🎋一只住在杭城的木系前端🧚🏻‍♀️。');
      } else {
        channel.call({ method: 'showAuthor' });
      }
    })
  );
}

export function deactivate() {}
