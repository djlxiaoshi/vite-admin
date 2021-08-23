import axios, { AxiosRequestConfig, Canceler } from "axios";
import { notification } from "antd";

interface CustomConfig {
  showErrorMsg?: boolean | string;
  showSuccessMsg?: boolean | string;
  loading?: boolean;
  disableLoginCheck?: boolean;
  moduleName?: string;
  cancel?: (cb: Canceler) => void;
}

interface RequestInstance {
  cancel: () => void;
  axiosConfig: AxiosRequestConfig;
  customConfig: CustomConfig;
}

const SUCCESS_CODE = 0;
const NOT_LOGGED_IN_CODE = 401;

const defaultAxiosConfig: AxiosRequestConfig = {
  url: "",
  method: "get",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
};

const defaultCustomConfig: CustomConfig = {
  showErrorMsg: false,
  showSuccessMsg: false,
  loading: true,
};

// 请求发送拦截
axios.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 增加响应拦截器（判断用户是否登录）
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default class Request {
  constructor(axiosConfig?: AxiosRequestConfig, customConfig?: CustomConfig) {
    this.axiosConfig = Object.assign({}, defaultAxiosConfig, axiosConfig);
    this.customConfig = Object.assign({}, defaultCustomConfig, customConfig);
  }

  private axiosConfig: AxiosRequestConfig = {};
  private customConfig: CustomConfig = {};

  private xhrCacheList: RequestInstance[] = [];

  // 获取请求路径
  private _getFinalUrl(baseUrl = "", url: string) {
    if (/^(https:\/\/)|^(http:\/\/)|^(\/\/)/.test(url)) {
      return url;
    }
    return baseUrl + url;
  }

  // 用户未登录处理
  private _loginCheck() {
    const url = window.location.href;
    const state = encodeURIComponent(url);
    window.location.replace("/login?_redirectUrl=" + state);
  }

  private handleError(config: CustomConfig, errorMsg: string) {
    notification.error({
      message: "Error",
      description:
        typeof config.showErrorMsg === "string"
          ? config.showErrorMsg
          : errorMsg,
    });
  }

  public request(
    axiosConfig: AxiosRequestConfig = {},
    customConfig: CustomConfig = {}
  ) {
    const CancelToken = axios.CancelToken;
    const obj: RequestInstance = {} as RequestInstance;
    const finalCustomConfig = {
      ...this.customConfig,
      ...customConfig,
    };

    const finalAxiosConfig = {
      ...this.axiosConfig,
      ...axiosConfig,
      cancelToken: new CancelToken(function executor(cancel) {
        if (finalCustomConfig.cancel) {
          finalCustomConfig.cancel(cancel);
        }
        obj.cancel = cancel;
      }),
    };

    obj.axiosConfig = finalAxiosConfig;
    obj.customConfig = finalCustomConfig;

    // 设置请求参数
    this.xhrCacheList.push(obj);

    return new Promise((resolve, reject) => {
      axios(finalAxiosConfig)
        .then((response) => {
          const data = response.data;
          const status = data.ret;

          if (status !== SUCCESS_CODE) {
            if (finalCustomConfig.showErrorMsg) {
              this.handleError(finalCustomConfig, data.msg);
            }
            reject(data);
          } else {
            if (finalCustomConfig.showSuccessMsg) {
              // 如果前端设置了提示信息则采用前端设置的提示信息，否则使用服务端返回的提示信息
              notification.success({
                message: "Success",
                description:
                  typeof finalCustomConfig.showSuccessMsg === "string"
                    ? finalCustomConfig.showSuccessMsg
                    : data.msg,
              });
            }
            resolve(data.data);
          }
        })
        .catch((error) => {
          const { response = {} } = error;
          const { status } = response;

          if (
            !finalCustomConfig.disableLoginCheck &&
            status === NOT_LOGGED_IN_CODE
          ) {
            // 登录验证
            this._loginCheck();
          }
          // 展示error且不是因为取消请求导致的error
          if (finalCustomConfig.showErrorMsg && !axios.isCancel(error)) {
            this.handleError(finalCustomConfig, error.message);
          }
          reject(error);
        })
        .finally(() => {
          // 更新请求缓存列表
          const xhrIndex = this.xhrCacheList.indexOf(obj);
          this.xhrCacheList.splice(xhrIndex, 1);

          if (this.xhrCacheList.length === 0) {
          }
        });
    });
  }

  cancelAll() {
    this.xhrCacheList.forEach((item: RequestInstance) => {
      if (item.cancel) {
        item.cancel();
      }
    });

    // 清空请求缓存列表
    this.xhrCacheList = [];
  }

  // 根据模块名称取消对应请求
  cancelByModuleName(moduleName: string) {
    this.xhrCacheList.forEach((item: RequestInstance, index) => {
      if (item.customConfig.moduleName === moduleName) {
        item.cancel();

        // 从请求缓存列表中移除
        this.xhrCacheList.splice(index, 1);
      }
    });
  }

  getXhrCacheList() {
    return this.xhrCacheList;
  }
}
