import React from "react";
import { Layout } from "antd";
import styles from "./index.module.scss";
import { BreadcrumbView } from "@/components/Breadcrumb";
import HeaderRightContent from "./HeaderRightContent";
import { HeaderProps } from "./index.interface";

const { Header: AntHeader } = Layout;
export const Header = ({ ...rest }: HeaderProps) => {
  return (
    <AntHeader className={styles.header}>
      <BreadcrumbView />
      <HeaderRightContent {...rest} />
    </AntHeader>
  );
};
