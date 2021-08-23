import {Result, Button} from 'antd';
import {Link} from 'react-router-dom';
import React from 'react';

const NotFound = () => (
  <Result
    status="404"
    title="main 404"
    style={{
      background: 'none',
    }}
    subTitle={'Sorry, the page you visited does not exist.'}
    extra={
      <Link to="/">
        <Button type="primary">{'Back Home'}</Button>
      </Link>
    }
  />
);

export default NotFound;
