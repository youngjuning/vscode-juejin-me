import styles from './index.less';

require('./index.less');

const HomePage = () => {
  return (
    <>
      <h1 className={styles.title}>Juejin Posts</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus eligendi neque
        reprehenderit nemo corporis eveniet, soluta placeat enim iste ad ipsa consequuntur explicabo
        totam doloribus eum mollitia in quam! Vel.
      </p>
    </>
  );
};

export default HomePage;
