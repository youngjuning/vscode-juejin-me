import React, { useState, useEffect } from 'react';
import { List, Space, Button, Input } from 'antd';
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
  const [data, setData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [initLoading, setInitLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const { payload } = (await channel.call({
      eventType: 'requests',
      method: 'queryPosts',
      params: { userId: '325111174662855', cursor },
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
    const filterData = data.filter((item: any) => item.article_info.title.indexOf(value) > -1);
    setSearchData(filterData);
  };

  return (
    <>
      <h1 className="title">洛竹</h1>
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
