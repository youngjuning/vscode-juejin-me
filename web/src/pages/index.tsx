import React, { useState, useEffect } from 'react';
import { List, Space, Button } from 'antd';
import { MessageOutlined, LikeOutlined, EyeOutlined } from '@ant-design/icons';
import Channel from '@luozhu/vscode-channel';
import styles from './index.less';

require('./index.less');

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

let cursor = 0;
const channel = new Channel();

const HomePage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initLoading, setInitLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    getData();
    setInitLoading(false);
  }, []);

  const getData = async () => {
    channel.call({
      method: 'queryPosts',
      params: { userId: '325111174662855', cursor },
      success: message => {
        setData(data.concat(message.data.data));
        setLoading(false);
        if (!message.data.has_more) {
          setHasMore(false);
          setLoading(true);
        }
      },
    });
  };

  const onLoadMore = () => {
    if (hasMore) {
      cursor += 10;
      getData();
    }
  };

  const loadMore =
    !initLoading && !loading ? (
      <div
        style={{
          textAlign: 'center',
          marginTop: 12,
          marginBottom: 12,
          height: 32,
          lineHeight: '32px',
        }}
      >
        <Button onClick={onLoadMore}>加载更多</Button>
      </div>
    ) : null;

  return (
    <>
      <h1 className={styles.title}>Juejin Posts</h1>
      <div className={styles.postsList}>
        <List
          className="loadmore-list"
          itemLayout="vertical"
          dataSource={data}
          loading={initLoading}
          loadMore={loadMore}
          renderItem={(item: any) => (
            <List.Item
              key={item.article_id}
              actions={[
                <IconText
                  icon={EyeOutlined}
                  text={item.article_info.view_count}
                  key="list-vertical-star-o"
                />,
                <IconText
                  icon={LikeOutlined}
                  text={item.article_info.digg_count}
                  key="list-vertical-like-o"
                />,
                <IconText
                  icon={MessageOutlined}
                  text={item.article_info.comment_count}
                  key="list-vertical-message"
                />,
              ]}
              extra={
                <img width="120px" height="80px" alt="cover" src={item.article_info.cover_image} />
              }
            >
              <List.Item.Meta
                title={
                  <a href={`https://juejin.cn/post/${item.article_info.article_id}`}>
                    {item.article_info.title}
                  </a>
                }
                description={item.article_info.brief_content}
              />
            </List.Item>
          )}
        />
      </div>
    </>
  );
};

export default HomePage;
