import React, { ReactElement } from "react";
import { Spin } from "antd";

export const PageLoading = (): ReactElement => (
  <div style={{ paddingTop: 100, textAlign: "center" }}>
    <Spin size="large" />
  </div>
);
