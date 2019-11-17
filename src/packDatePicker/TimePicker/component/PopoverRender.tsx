import React, { PureComponent } from "react";
import styled from "styled-components";
import { chunk } from "lodash";
import PackTag from "./PackTag";

const Warp = styled.div`
  text-align: left;
  user-select: none;
`;

const RowTagWarp = styled.div`
  & .ant-tag:last-child {
    margin-right: 0;
  }
`;

interface Props {
  onChange: (tag, checked) => void;
  rownum: any;
  value: any;
}

interface State {}

class PopoverRender extends PureComponent<Props, State> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // 点击 具体时间回调
  handleOnChange = (tag, checked) => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(tag, checked);
    }
  };

  render() {
    const { rownum, value } = this.props;

    const chunkRownum = chunk(rownum, 5);

    return (
      <Warp>
        {chunkRownum.map((item: any, index) => (
          <RowTagWarp key={index}>
            {item.map(tag => (
              <PackTag
                key={tag.value}
                tags={tag}
                disabled={tag.disabled}
                checked={Number(value) === Number(tag.value)}
                onChange={this.handleOnChange}
              >
                {tag.value}
              </PackTag>
            ))}
          </RowTagWarp>
        ))}
      </Warp>
    );
  }
}

export default PopoverRender;
