import idConfig from "./id";

// 单个Region的服务配置
export type ServerConfig = {
  API_PREFIX: string;
  LOGIN_REDIRECT_HOST: string;
};

// 所有Region的服务配置集合
export type ServersConfig = {
  [key: string]: ServerConfig;
};
export const APP_REGION = import.meta.env.VITE_APP_REGION || "vn";
export const APP_ENV = import.meta.env.VITE_APP_ENV || "test";

const config: ServersConfig = {
  id: idConfig,
};

const exportConfig = config[APP_REGION];

if (APP_ENV !== "live") {
  console.log(
    "Vite环境参数",
    "VITE_APP_ENV:",
    //@ts-ignore
    import.meta.env.VITE_APP_ENV,
    "VITE_APP_REGION:",
    //@ts-ignore
    import.meta.env.VITE_APP_REGION
  );
  console.log("API环境参数", "API_CONFIG", exportConfig);
}

export default exportConfig;
