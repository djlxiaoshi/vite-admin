import { ServersConfig } from ".";

const API_PREFIX_DEV = "xxxxxx";

const LOGIN_REDIRECT_HOST = "xxxx";

const vnServerConfig: ServersConfig = {
  dev: {
    API_PREFIX: API_PREFIX_DEV,
    LOGIN_REDIRECT_HOST: LOGIN_REDIRECT_HOST,
  },
};

export default vnServerConfig[import.meta.env.VITE_APP_ENV || "dev"];
