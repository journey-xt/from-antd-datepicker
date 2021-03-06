import React, { PureComponent } from "react";
import { Form, Layout, Row, Col } from "antd";
import { FormComponentProps } from "antd/lib/form";
import SingleDatePicker, { RangePicker } from "from-antd-datepicker";

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
                  <SingleDatePicker placeholder="自定义" />
                )}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="单个时间(带时间)">
                {getFieldDecorator("singleDateTime")(
                  <SingleDatePicker
                    format="YYYY-MM-DD HH:mm:ss"
                    selectTodayAfter
                  />
                )}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="联级时间">
                {getFieldDecorator("rangeDate")(
                  <RangePicker placeholder={["自定义", "自定义"]} />
                )}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="联级时间">
                {getFieldDecorator("rangeDateTime")(
                  <RangePicker format="YYYY-MM-DD HH:mm:ss" selectTodayAfter />
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
  },
})(DatePickerDemo);
