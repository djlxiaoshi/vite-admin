import React, {useEffect} from 'react';
import Request from '@/utils/request';
import envConfig from '@/config';
const http = new Request({
  baseURL: envConfig.API_PREFIX,
});

export default function TestPage() {
  useEffect(() => {
    http
      .request(
        {
          url: 'http://localhost:5000/node_modules/.vite/react.js?v=ff38dcfb',
        },
        {
          showSuccessMsg: true,
          showErrorMsg: 'stupid',
        },
      )
      .catch(error => {
        console.log('error', error);
      });
  }, []);
  return <div>hello</div>;
}
