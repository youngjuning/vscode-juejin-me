import vscode from 'vscode';
import { createUmiWebviewPanel } from '@luozhu/vscode-utils';
import Channel from '@luozhu/vscode-channel';
import events from './events';

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "juejin-me" is now active!');

  context.subscriptions.push(
    vscode.commands.registerCommand('juejin-me.start', async () => {
      const currentPanel = createUmiWebviewPanel(
        context,
        'juejin-me',
        'Juejin Me',
        'assets/icon-juejin.png',
        '3.5.17'
      );
      const channel = new Channel(context, currentPanel);
      channel.bind(async message => {
        const { eventType, method, params } = message;
        const data = await events[eventType][method](params);
        return data;
      });
    })
  );
  context.subscriptions.push(
    vscode.commands.registerCommand('juejin-me.configUserId', async () => {
      const userId = await vscode.window.showInputBox({
        placeHolder: '请输入掘金用户 ID',
        validateInput: value => {
          if (value) {
            return null;
          }
          return '请输入用户 ID';
        },
      });
      const config = vscode.workspace.getConfiguration('juejin-me');

      config.update('userId', userId, true);
    })
  );
}

export function deactivate() {}
