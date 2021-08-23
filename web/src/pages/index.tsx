import React, { useState, useEffect } from 'react';
import { List, Space, Modal, Input, Radio, BackTop } from 'antd';
import _union from 'lodash.union';
import { MessageOutlined, LikeOutlined, EyeOutlined } from '@ant-design/icons';
import styles from './index.less';

const { Search } = Input;

require('./index.less');

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

let cursor = 0;
let tempData: any[] = [];
const HomePage = () => {
  const [data, setData] = useState([]) as any;
  const [categories, setCategories] = useState([]) as any[];
  const [searchData, setSearchData] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [category, setCategory] = useState('全部');
  const [initLoading, setInitLoading] = useState(true);

  useEffect(() => {
    window.channel.bind(async message => {
      switch (message.method) {
        case 'showAuthor': {
          Modal.info({
            title: '洛竹',
            closable: true,
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
    const { payload } = (await window.channel.call({
      eventType: 'request',
      method: 'queryPosts',
      params: { cursor },
    })) as any;
    tempData = tempData.concat(payload.data);
    setData(tempData);
    if (!payload.has_more) {
      setInitLoading(false);
      setCategories(_union(['全部', ...tempData.map(item => item.category.category_name)]));
      tempData = [];
    } else {
      cursor += 10;
      getData();
    }
  };

  const onSearch = value => {
    setSearchValue(value);
  };
  const onSearchValueChange = event => {
    const { value } = event.target;
    if (value === '') {
      setSearchValue('');
    }
  };
  const onFilterCategory = e => {
    const { value } = e.target;
    setCategory(value);
  };
  useEffect(() => {
    const searchResult =
      category === '全部'
        ? data
        : data.filter((item: any) => item.category.category_name === category);
    const result =
      searchValue === ''
        ? searchResult
        : searchResult.filter(
            (item: any) =>
              item.article_info.title.match(searchValue) ||
              item.article_info.brief_content.match(searchValue)
          );
    if (category === '全部' && searchValue === '') {
      setSearchData(null);
    } else {
      setSearchData(result);
    }
  }, [searchValue, category]);

  const userInfo = data[0] ? data[0].author_user_info : {};

  return (
    <>
      <BackTop target={() => document.querySelector('#root') as HTMLElement} />
      <div
        className="header"
        onDoubleClick={() => {
          document.querySelector('#root')!.scrollTop = 0;
          document.querySelector('#root')!.scrollTop = 0;
        }}
      >
        {userInfo.avatar_large ? (
          <img
            src={userInfo.avatar_large}
            alt="掘金一下"
            width="60px"
            className="logo"
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
        onChange={onSearchValueChange}
        onSearch={onSearch}
      />
      <Radio.Group
        defaultValue="全部"
        buttonStyle="solid"
        className="selectCategory"
        onChange={onFilterCategory}
      >
        {categories.map(item => (
          <Radio.Button key={item} value={item}>
            {item}
          </Radio.Button>
        ))}
      </Radio.Group>
      <div className="postsList">
        <List
          itemLayout="vertical"
          dataSource={searchData || data}
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
                description={`${item.category.category_name} | ${item.tags
                  .map(tag => tag.tag_name)
                  .filter(tagName => tagName !== item.category.category_name)
                  .join(' · ')}`}
              />
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
