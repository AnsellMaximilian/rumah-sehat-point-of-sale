import PropTypes from 'prop-types';

import Button, { RadioButtonProps } from './Button';

interface Props {
  label?: string;
  id: string;
  className?: string | undefined;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
  children: React.ReactNode;
}

interface RadioInputComposition {
  Button: React.FC<RadioButtonProps>;
}

const RadioInput: React.FC<Props> & RadioInputComposition = ({
  label,
  id,
  className,
  children,
}) => {
  return (
    <div className={className}>
      {label && (
        <label htmlFor={id} className="input-label">
          {label}
        </label>
      )}
      {children}
    </div>
  );
};

RadioInput.Button = Button;

RadioInput.defaultProps = {
  label: undefined,
  className: undefined,
};

RadioInput.propTypes = {
  label: PropTypes.string,
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default RadioInput;
