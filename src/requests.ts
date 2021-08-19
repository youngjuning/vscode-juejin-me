import vscode from 'vscode';
import request from './request';

const queryPosts = async (params: { cursor: string }): Promise<any> => {
  const { userId } = vscode.workspace.getConfiguration('juejin-me');

  const { cursor } = params;
  const data = await request.post('/article/query_list', {
    cursor: `${cursor}`,
    sort_type: 2,
    user_id: userId,
  });
  return data;
};

export default {
  queryPosts,
};
