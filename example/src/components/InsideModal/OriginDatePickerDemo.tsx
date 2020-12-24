import React, { PureComponent } from "react";
import { Form, Layout, Row, Col, DatePicker } from "antd";
import { FormComponentProps } from "antd/lib/form";

interface Props extends FormComponentProps {}

interface State {}

class DatePickerDemo extends PureComponent<Props, State> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { form } = this.props;

    const { getFieldDecorator } = form;

    return (
      <Layout style={{ padding: 20 }}>
        <Form>
          <Row gutter={24}>
            <Col span={8}>
              <Form.Item label="单个时间">
                {getFieldDecorator("singleDate")(
                  <DatePicker placeholder="自定义" />
                )}
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Layout>
    );
  }
}

export default Form.create({
  onValuesChange(props, changedValues, allValues) {
    console.log(allValues);
  }
})(DatePickerDemo);
