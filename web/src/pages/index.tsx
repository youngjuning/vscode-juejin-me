import React from 'react';
import styles from './index.less';

require('./index.less');

const HomePage = () => {
  React.useEffect(() => {
    // @ts-ignore
    const vscode = typeof acquireVsCodeApi === 'function' ? acquireVsCodeApi() : null;
    vscode.postMessage({
      type: 'request',
      api: 'queryPosts',
    });
    window.addEventListener('message', event => {
      const message = event.data; // The JSON data our extension sent
      console.log(message);
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
