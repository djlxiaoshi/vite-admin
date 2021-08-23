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
          url: '/tags',
        },
        {
          showSuccessMsg: true,
          showErrorMsg: 'stupid',
        },
      )
      .then();
  }, []);
  return <div>hello</div>;
}
