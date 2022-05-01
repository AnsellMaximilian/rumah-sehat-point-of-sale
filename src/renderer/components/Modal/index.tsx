import React from 'react';
import BaseModal from 'react-modal';
import PropTypes from 'prop-types';
import Header, { ModalHeaderProps } from './Header';

interface Props {
  isOpen: boolean;
  onRequestClose?: (
    event: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>
  ) => void;
  children: React.ReactNode;
}

interface ModalComposition {
  Header: React.FC<ModalHeaderProps>;
}

const Modal: React.FC<Props> & ModalComposition = ({
  isOpen,
  onRequestClose,
  children,
}) => {
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

Modal.Header = Header;

Modal.defaultProps = {
  onRequestClose: undefined,
  children: undefined,
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func,
  children: PropTypes.node,
};

export default Modal;
