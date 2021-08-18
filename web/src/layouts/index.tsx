require('./index.less');

export default props => {
  return (
    <>
      {props.children}
      <a href="https://juejin.cn" id="yoyo">
        <img
          alt="yoyo"
          src="https://cdn.jsdelivr.net/gh/youngjuning/images/20210817163229.png"
          width="70"
        />
      </a>
    </>
  );
};
