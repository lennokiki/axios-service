import { Loading } from 'element-ui';

let account = 0;  // 请求次数;
let loadingInstance = null; //全局loading 单例

const options = {
  lock: true,
  text: 'Loading',
  spinner: 'el-icon-loading',
  background: 'rgba(0, 0, 0, 0.4)'
};

const cancelLoading = () => {
  if (account === 0) {
    return;
  }

  --account;

  if (account === 0) {
    let timer = setTimeout(() => {
      loadingInstance.close();
      clearTimeout(timer);
      timer = null;
    }, 100)
  }
}

const showLoading = () => {
  loadingInstance = Loading.service(options);
  ++account;
}

export { cancelLoading, showLoading };
