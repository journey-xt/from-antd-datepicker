import React from "react";
import { ConfigProvider } from "antd";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import zhCN from "antd/es/locale/zh_CN";
import DatePickerDemo from "./DatePickerDemo";
import IframeDatePaicker from "./components/IframeDatePaicker";
import InsideModal from "./components/InsideModal";
import moment from "moment";
import "moment/locale/zh-cn";

moment.locale("zh-cn");

const App: React.FC = () => (
  <ConfigProvider autoInsertSpaceInButton locale={zhCN}>
    <BrowserRouter>
      <Switch>
        <Route path="/" component={DatePickerDemo} exact />
        <Route path="/modal" component={InsideModal} />
        <Route path="/iframe" component={IframeDatePaicker} />
      </Switch>
    </BrowserRouter>
  </ConfigProvider>
);

export default App;
