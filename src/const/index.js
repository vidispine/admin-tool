/*
Sets the basename for the router so that all paths are relative
https://reactrouter.com/web/api/BrowserRouter/basename-string
*/
let publicUrl = process.env.PUBLIC_URL === '' ? '/' : process.env.PUBLIC_URL;
if (publicUrl && publicUrl.startsWith('http')) {
  publicUrl = new URL(publicUrl);
  publicUrl = publicUrl.pathname.replace(/(.+?)\/+$/, '$1');
}

export const APP_BASENAME = publicUrl;

export const getBasename = (baseUrl) => {
  if (baseUrl === undefined) return APP_BASENAME;
  return [APP_BASENAME, encodeURIComponent(baseUrl)].join('/');
};

export const getBaseUrlFromPath = () => {
  const [, pathnameWithoutBasename] = window.location.pathname.split(getBasename());
  if (pathnameWithoutBasename === undefined) return undefined;
  return pathnameWithoutBasename.split('/')[1];
};
