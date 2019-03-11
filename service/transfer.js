import { showLoading } from './globalLoading';
import token, { AUTH_TOKEN } from './token';
import qs from 'qs';

// 默认关闭 content-type: application/json 形式
const USE_APPLICATION_JSON = false;
// 默认关闭 headers 添加 token
const USR_HEADER_TOKEN = false;
const HEADER_TOKEN = 'Administrator';

function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

function addParamsToken(params, TOKEN, url) {
  if (params[AUTH_TOKEN]) return params;
  if (isFormData(params) || isURLSearchParams(params)) {
    if (!params.get(AUTH_TOKEN)) {
      params.append(AUTH_TOKEN, TOKEN);
      return params;
    }
  }

  params[AUTH_TOKEN] = TOKEN;
  return params;
}

function whetherStingifyData(config) {
  if (isFormData(config.data ||  isURLSearchParams(config.data))) return;
  // config.data 为对象形式时，且后台不支持 content-type: application/json 这种格式，手动转换
  if (config.data && !USE_APPLICATION_JSON) {
    config.data = qs.stringify(config.data);
  }
}

function whetherShowLoading(params={}, data={}) {
  if (params.unShowLoading) {
    return delete params.unShowLoading;
  }
  if (data.unShowLoading) {
    return delete data.unShowLoading;
  }
  showLoading();
}

export default function transfer(config) {
  const method = config.method;
  const TOKEN = token.get('session');
  // 支持非全局loading
  whetherShowLoading(config.params, config.data);
  // 参数中添加 token
  if (TOKEN && !USR_HEADER_TOKEN) {
    const addToken = { [AUTH_TOKEN]: TOKEN };

    if (['get', 'delete', 'head'].includes(method)) {
      config.params = config.params ? addParamsToken(config.params, TOKEN) : addToken;
    }

    if (['post', 'put', 'patch'].includes(method)) {
      config.data = config.data ? addParamsToken(config.data, TOKEN, config.url) : addToken;
    }
  }
  // header 中添加token
  if (TOKEN && USR_HEADER_TOKEN) {
    config.headers = Object.assign({}, config.headers, { [HEADER_TOKEN]: TOKEN });
  }
  // 处理 data 数据
  whetherStingifyData(config)
}
