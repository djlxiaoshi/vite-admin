export function urlToList(url: string) {
  const urllist = url.split("/").filter((i) => i);
  return urllist.map((_, index) => `/${urllist.slice(0, index + 1).join("/")}`);
}

export function urlToJson(url?: string) {
  url = url || window.location.href;
  const search = url.substring(url.lastIndexOf("?") + 1);
  // eslint-disable-next-line
  const obj = {} as any;
  const reg = /([^?&=]+)=([^?&=]*)/g;
  search.replace(reg, function (rs, $1, $2) {
    const name = decodeURIComponent($1);
    const val = String(decodeURIComponent($2));
    if (obj.hasOwnProperty(name)) {
      if (typeof obj[name] === "string") {
        obj[name] = [obj[name]];
      }
      obj[name].push(val);
    } else {
      obj[name] = val;
    }
    return rs;
  });
  return obj;
}

// @ts-ignore
export const isPoweredByQiankun = window.__POWERED_BY_QIANKUN__;
