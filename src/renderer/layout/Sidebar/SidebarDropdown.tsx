import { ReactNode, useState } from 'react';
import { FaChevronRight, FaChevronDown } from 'react-icons/fa';

interface Props {
  children: ReactNode;
  className?: string;
  trigger: ReactNode;
}

const SidebarDropdown = ({ children, className, trigger }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={className}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full flex items-center gap-2 rounded-sm hover:text-primary hover:bg-primary-light cursor-pointer"
      >
        <div className="grow px-3 py-1">{trigger}</div>
        <span className="block px-3 py-1">
          {isOpen ? <FaChevronDown /> : <FaChevronRight />}
        </span>
      </button>
      {isOpen && <div className="ml-4">{children}</div>}
    </div>
  );
};

SidebarDropdown.defaultProps = {
  className: '',
};

export default SidebarDropdown;
