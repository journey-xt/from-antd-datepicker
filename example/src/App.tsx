import React from "react";
import { ConfigProvider } from "antd";
import zhCN from "antd/es/locale/zh_CN";
import DatePickerDemo from "./DatePickerDemo";
import moment from "moment";
import "moment/locale/zh-cn";

moment.locale("zh-cn");

const App: React.FC = () => (
  <ConfigProvider autoInsertSpaceInButton locale={zhCN}>
    <DatePickerDemo />
  </ConfigProvider>
);

export default App;
