import React, { useState } from "react";
import { Button, Modal } from "antd";
import ModalForm from "./ModalForm";

interface Props {}

const IframeDatePaicker = (props: Props) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
      <Button onClick={() => setModalVisible(true)}>打开modal</Button>
      <Modal
        visible={modalVisible}
        maskClosable={false}
        onOk={() => setModalVisible(false)}
        onCancel={() => setModalVisible(false)}
        getContainer={() => window.top.document.body}
      >
        <ModalForm />
      </Modal>
    </>
  );
};

export default IframeDatePaicker;
