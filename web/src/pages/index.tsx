import React from 'react';
import Channel from '@luozhu/vscode-channel';
import styles from './index.less';

require('./index.less');

const HomePage = () => {
  React.useEffect(() => {
    const channel = new Channel();
    channel.call({
      method: 'request',
      params: { api: 'queryPosts' },
      success: message => {
        console.log('webview 成功了', message);
      },
    });
  }, []);
  return (
    <>
      <h1 className={styles.title}>Juejin Posts</h1>
      <p className={styles.lorem}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus eligendi neque
        reprehenderit nemo corporis eveniet, soluta placeat enim iste ad ipsa consequuntur explicabo
        totam doloribus eum mollitia in quam! Vel.
      </p>
      <p className={styles.lorem}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus eligendi neque
        reprehenderit nemo corporis eveniet, soluta placeat enim iste ad ipsa consequuntur explicabo
        totam doloribus eum mollitia in quam! Vel.
      </p>
      <p className={styles.lorem}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus eligendi neque
        reprehenderit nemo corporis eveniet, soluta placeat enim iste ad ipsa consequuntur explicabo
        totam doloribus eum mollitia in quam! Vel.
      </p>
    </>
  );
};

export default HomePage;
