export interface RadioButtonProps {
  label: string;
  id: string;
  value: string | number;
  containerClassName?: string | undefined;
  inputClassName?: string | undefined;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
  checked?: boolean;
}

const Button = ({
  label,
  id,
  value,
  onChange,
  containerClassName,
  inputClassName,
  checked,
}: RadioButtonProps) => {
  return (
    <div className={`flex items-center gap-2 ${containerClassName}`}>
      <input
        className={`${inputClassName}`}
        id={id}
        onChange={onChange}
        value={value}
        checked={checked}
        type="radio"
      />
      <label htmlFor={id} className="block input-label">
        {label}
      </label>
    </div>
  );
};

Button.defaultProps = {
  onChange: undefined,
  containerClassName: undefined,
  inputClassName: undefined,
  checked: false,
};

export default Button;
