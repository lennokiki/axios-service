import cookie from 'cookie';

const cookieDuration = { expires: 1 };
export const AUTH_TOKEN = 'token';

const token = {
  get(type) {
    switch (type) {
      case 'session':
        return sessionStorage.getItem(AUTH_TOKEN);
      case 'local':
        return localStorage.getItem(AUTH_TOKEN);
      case 'cookie':
        return cookie.getItem(AUTH_TOKEN);
    }
  },
  set(type, val) {
    switch (type) {
      case 'session':
        return sessionStorage.setItem(AUTH_TOKEN, val);
      case 'local':
        return sessionStorage.setItem(AUTH_TOKEN, val);
      case 'cookie':
        return cookie.set(AUTH_TOKEN, val, cookieDuration);
    }
  },
  remove(type) {
    switch (type) {
      case 'session':
        return sessionStorage.removeItem(AUTH_TOKEN);
      case 'local':
        return sessionStorage.removeItem(AUTH_TOKEN);
      case 'cookie':
        return cookie.remove(AUTH_TOKEN);
    }
  }

}

export default token;
