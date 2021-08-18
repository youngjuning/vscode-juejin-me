import request from './request';

const queryPosts = async (user_id = '325111174662855'): Promise<any> => {
  const data = await request.post('/article/query_list', {
    cursor: '0',
    sort_type: 2,
    user_id,
  });
  return data;
};

export default {
  queryPosts,
};
