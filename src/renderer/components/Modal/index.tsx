import React from 'react';
import BaseModal from 'react-modal';

interface Props {
  isOpen: boolean;
  onRequestClose?: (
    event: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>
  ) => void;
  children: React.ReactNode;
}

const Modal = ({ isOpen, onRequestClose, children }: Props) => {
  return (
    <BaseModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={{
        overlay: { backgroundColor: 'rgba(0, 0, 0, 0.6)' },
        content: { padding: 0, border: 'none' },
      }}
    >
      {children}
    </BaseModal>
  );
};

Modal.defaultProps = {
  onRequestClose: undefined,
};

export default Modal;
