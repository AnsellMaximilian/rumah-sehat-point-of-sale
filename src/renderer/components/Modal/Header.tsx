import React from 'react';

export interface ModalHeaderProps {
  label: string;
  closeModal?: (
    event: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>
  ) => void;
  children?: React.ReactNode;
}

const Header = ({ label, closeModal, children }: ModalHeaderProps) => {
  return (
    <header className="p-4 bg-primary text-white flex items-center">
      <div className="grow">
        <h1 className="text-xl font-semibold">{label}</h1>
        {children}
      </div>
      <button type="button" className="btn" onClick={closeModal}>
        &times;
      </button>
    </header>
  );
};

Header.defaultProps = {
  closeModal: undefined,
  children: undefined,
};

export default Header;
