/*
Sets the basename for the router so that all paths are relative
https://reactrouter.com/web/api/BrowserRouter/basename-string
*/

let publicUrl = import.meta.env.BASE_URL === '' ? '/' : import.meta.env.BASE_URL;
if (publicUrl && publicUrl.startsWith('http')) {
  publicUrl = new URL(publicUrl);
  publicUrl = publicUrl.pathname.replace(/(.+?)\/+$/, '$1');
} else {
  publicUrl = new URL(publicUrl, window.location.origin);
  publicUrl = publicUrl.pathname.replace(/(.+?)\/+$/, '$1');
}
export const APP_BASENAME = publicUrl;

export const getBasename = (baseUrl) => {
  if (baseUrl === undefined) return APP_BASENAME;
  return [APP_BASENAME.replace(/\/+$/, ''), encodeURIComponent(baseUrl)].join('/');
};

export const getVidispineUrlFromCookie = (cookieKey = 'VIDISPINE-SERVER-URL') => {
  const cookies = {};
  document.cookie
    .split('; ')
    .forEach((keyValue) => {
      const [key, value] = keyValue.split('=');
      cookies[key] = value;
    });
  if (cookies[cookieKey]) return decodeURIComponent(cookies[cookieKey]);
  return undefined;
};
export const getVidispineUrlFromEnv = (envKey = 'VITE_VIDISPINE_URL') => (import.meta.env[envKey] !== '' ? import.meta.env[envKey] : undefined);
export const getVidispineUrlFromWindow = (windowKey = 'VIDISPINE_URL') => (window[windowKey] !== `$${windowKey}` ? window[windowKey] : undefined);
export const getContainerProxyFromWindow = (windowKey = 'CONTAINER_PROXY') => (window[windowKey] !== `$${windowKey}` ? window[windowKey] : undefined);
export const getVidispineUrlFromPath = () => {
  const pathnameWithoutBasename = window.location.pathname.replace(APP_BASENAME, '').replace(/^\/+/, '');
  if (pathnameWithoutBasename === undefined) return undefined;
  const [encodedPath] = pathnameWithoutBasename.split('/');
  try {
    const decodedPath = decodeURIComponent(encodedPath);
    return decodedPath.startsWith('http') ? decodedPath : undefined;
  } catch (e) {
    return undefined;
  }
};
export const getVidispineUrlFromLocalStorage = (storageKey = 'VIDISPINE_URL') => {
  const value = localStorage.getItem(storageKey);
  return value || undefined;
};
export const getVidispineUrlFromSessionStorage = (storageKey = 'VIDISPINE_URL') => {
  const value = sessionStorage.getItem(storageKey);
  return value || undefined;
};

export const setCookiePath = (vidispineUrl) => {
  const baseName = APP_BASENAME.replace(/^\/+/, '');
  const encodedVidispineUrl = encodeURIComponent(vidispineUrl);
  return `${
    baseName !== '' && !baseName.startsWith('/') ? '/' : ''
  }${baseName}/${encodedVidispineUrl}${
    encodedVidispineUrl.endsWith('/') ? '' : '/'
  }`;
};

export const NOTIFICATION_ENTITY = [
  'item',
  'collection',
  'job',
  'storage',
  'file',
  'quota',
  'group',
  'document',
  'deletion-lock',
];
