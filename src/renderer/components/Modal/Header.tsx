import React from 'react';

interface Props {
  label: string;
  closeModal?: (
    event: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>
  ) => void;
}

const Header = ({ label, closeModal }: Props) => {
  return (
    <header className="p-4 bg-primary text-white">
      <h1 className="text-xl font-semibold">{label}</h1>
      <button type="button" onClick={closeModal}>
        &times;
      </button>
    </header>
  );
};

Header.defaultProps = {
  closeModal: undefined,
};

export default Header;
