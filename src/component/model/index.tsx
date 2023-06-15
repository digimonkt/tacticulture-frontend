import React from "react";
import { Modal as AntModal } from "antd";
import { ModalProps } from "react-bootstrap";

interface IModal extends ModalProps {
  children: React.ReactNode;
}

function Modal({ children, ...rest }: IModal) {
  return (
    <div>
      <AntModal {...rest}>{children} </AntModal>
    </div>
  );
}

export default Modal;
