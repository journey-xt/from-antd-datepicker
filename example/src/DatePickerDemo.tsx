import React, { PureComponent } from "react";
import { Form, Layout, Row, Col } from "antd";
import { FormComponentProps } from "antd/lib/form";
import SingleDatePicker, { RangePicker } from "packdatepicker";

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
                {getFieldDecorator("singleDate")(<SingleDatePicker />)}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="联级时间">
                {getFieldDecorator("rangeDate")(<RangePicker />)}
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
    console.log(allValues.rangeDate);
  },
})(DatePickerDemo);
