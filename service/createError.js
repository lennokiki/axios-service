import { Notification  } from 'element-ui';

export default (error) => {
  let msg = '';
  // 获取到错误状态码
  if (error && error.response) {
    const statusList = {
      '400': '400：参数请求错误',
      '401': '401：未授权，请重新登录',
      '403': '403：拒绝访问',
      '404': '404：请求错误，未找到该资源',
      '405': '405：请求方法未允许',
      '408': '408：请求超时',
      '500': '500：服务端出错',
      '501': '501：网络未实现',
      '502': '502：网关错误',
      '503': '503：服务不可用，服务器正在维护',
      '504': '504：网络超时',
      '505': '505：http版本不支持该请求',
    }
    msg = statusList[error.response.status];
  } else if (typeof error.msg === 'string') {
    // 使用自定义msg
    msg = error.msg;
  } else {
    // 未获取到错误状态码
    const regConfig =
      [
        {
          reg: /Error: timeout of/,
          msg: '网络状态不佳，链接超时了！'  //超时错误
        },
        {
          reg: /Error: Network Error/,
          msg: '联网失败，请检查联网状态！'  //联网失败
        },
        {
          reg: /Error: Request failed/,
          msg: '链接请求发生错误，请联系运维人员！'  //接口请求出错
        }
      ]
    msg = regConfig.filter(item => item.reg.test(error))[0]['msg'];
  }

  Notification.error({
    title: '错误',
    message: msg || '链接请求发生错误，请联系运维人员！'
  });
}
