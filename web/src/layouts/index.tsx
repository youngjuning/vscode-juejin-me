import { setLocale } from 'umi';
import Channel from '@luozhu/vscode-channel';

require('./index.less');

window.channel = new Channel();
setLocale(window.vscodeEnv.language, false);

export default props => {
  return (
    <>
      {props.children}
      <a href="https://juejin.cn" id="yoyo">
        <img
          alt="yoyo"
          src="https://cdn.jsdelivr.net/gh/youngjuning/images/20210817163229.png"
          width="60"
        />
      </a>
    </>
  );
};
