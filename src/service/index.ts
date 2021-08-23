import config from "@/config";
import Request from "@/utils/request";

const http = new Request(
  {
    baseURL: config.API_PREFIX + "admin/v2/",
  },
  {
    showErrorMsg: true,
  }
);

export default http;
