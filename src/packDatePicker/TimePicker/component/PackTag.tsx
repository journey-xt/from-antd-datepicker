import React, { PureComponent } from "react";
import styled from "styled-components";
import { Tag } from "antd";

const PackLayoutTag = styled(Tag.CheckableTag)<{ disabled: boolean }>`
  margin-bottom: 5px !important;
  background-color: ${props => props.disabled && "#f5f5f5 !important"};
  cursor: ${props => (props.disabled ? "not-allowed" : "pointer")}!important;
`;

interface ITag {
  value: string;
  disabled: boolean;
}

interface Props {
  onChange: (tag: string, checked: boolean) => void;
  tags: ITag;
  checked: boolean;
  children: string;
  disabled: boolean;
}

class PackTag extends PureComponent<Props> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // 点击 具体时间回调
  handleOnChange = checked => {
    const { onChange, tags, disabled } = this.props;
    if (onChange && !disabled) {
      onChange(tags.value, checked);
    }
  };

  render() {
    const { children, checked, disabled } = this.props;

    return (
      <PackLayoutTag
        checked={checked}
        disabled={disabled}
        onChange={this.handleOnChange}
      >
        {children}
      </PackLayoutTag>
    );
  }
}

export default PackTag;
