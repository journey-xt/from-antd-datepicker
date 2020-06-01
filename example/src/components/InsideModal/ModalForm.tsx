import React, { PureComponent } from "react";
import { Form, Layout, Row, Col } from "antd";
import { FormComponentProps } from "antd/lib/form";
import SingleDatePicker from "from-antd-datepicker";
import { StyleSheetManager } from "styled-components";

interface Props extends FormComponentProps {}

interface State {}

class ModalForm extends PureComponent<Props, State> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { form } = this.props;

    const { getFieldDecorator } = form;

    return (
      <StyleSheetManager target={window.top.document.head}>
        <Layout>
          <Form>
            <Row gutter={24}>
              <Col span={24}>
                <Form.Item label="单个时间">
                  {getFieldDecorator("modalDate")(
                    <SingleDatePicker
                      format="YYYY-MM-DD HH:mm:ss"
                      selectTodayAfter
                      placeholder="modal中弹出DatePicker"
                      //  getCalendarContainer={trigger => trigger as HTMLElement}
                      getCalendarContainer={trigger => window.top.document.body}
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Layout>
      </StyleSheetManager>
    );
  }
}

export default Form.create({
  onValuesChange(props, changedValues, allValues) {
    console.log(allValues);
  },
})(ModalForm);
