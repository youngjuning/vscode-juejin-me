import React, { useState, useEffect } from 'react';
import { List, Space, Modal, Input } from 'antd';
import { MessageOutlined, LikeOutlined, EyeOutlined } from '@ant-design/icons';
import Channel from '@luozhu/vscode-channel';
import styles from './index.less';

const { Search } = Input;

require('./index.less');

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const channel = new Channel();
let cursor = 0;
let tempData = [];
const HomePage = () => {
  const [data, setData] = useState([]) as any;
  const [searchData, setSearchData] = useState([]);
  const [initLoading, setInitLoading] = useState(true);

  useEffect(() => {
    channel.bind(async message => {
      switch (message.method) {
        case 'showAuthor': {
          Modal.info({
            title: '洛竹',
            content: (
              <div>
                大家好，我是洛竹🎋一只住在杭城的木系前端🧚🏻‍♀️，如果你喜欢我的文章📚，可以通过
                <a href="https://juejin.cn/user/325111174662855/posts">点赞</a>帮我聚集灵力⭐️。
              </div>
            ),
            okText: <a href="https://juejin.cn/user/325111174662855/posts">点赞 o(￣▽￣)ｄ</a>,
          });
          break;
        }
        default:
          break;
      }
    });
    getData();
  }, []);

  const getData = async () => {
    const { payload } = (await channel.call({
      eventType: 'requests',
      method: 'queryPosts',
      params: { cursor },
    })) as any;
    tempData = tempData.concat(payload.data);
    setData(tempData);
    if (!payload.has_more) {
      setInitLoading(false);
      tempData = [];
    } else {
      cursor += 10;
      getData();
    }
  };

  const onSearch = value => {
    const filterData = data.filter(
      (item: any) =>
        item.article_info.title.match(value) || item.article_info.brief_content.match(value)
    );
    setSearchData(filterData);
  };

  const userInfo = data[0] ? data[0].author_user_info : {};
  return (
    <>
      <div className="header">
        {userInfo.avatar_large ? (
          <img
            src={userInfo.avatar_large}
            alt="掘金一下"
            width="40px"
            style={{ borderRadius: '100%', marginRight: '12px' }}
          />
        ) : null}
        {userInfo.user_name || '掘金一下'}
      </div>
      <Search
        className={styles.search}
        disabled={initLoading}
        placeholder="Truth is endless. Keep searching..."
        allowClear
        enterButton="掘金一下"
        size="large"
        onSearch={onSearch}
      />
      <div className="postsList">
        <List
          itemLayout="vertical"
          dataSource={searchData.length > 0 ? searchData : data}
          loading={{ spinning: initLoading, tip: '数据加载中', size: 'large' }}
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
