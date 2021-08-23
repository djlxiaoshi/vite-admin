import React, { useState, ReactElement } from "react";
import { Button } from "antd";
import { login } from "@/service/user";
import { GoogleOutlined } from "@ant-design/icons";
import styles from "./index.module.scss";
import { urlToJson } from "@/utils/index";

import logo from "@/assets/images/vn-logo.png";

const Login = (): ReactElement => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (): void => {
    setLoading(true);
    login(urlToJson(location.search)._redirectUrl);
  };

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <img src={logo} alt="" width={64} />
      </div>
      <Button
        size={"large"}
        type="primary"
        className={styles["form-button"]}
        onClick={handleSubmit}
        loading={loading}
      >
        <GoogleOutlined />
        Login In with Google
      </Button>
    </div>
  );
};

export default Login;
