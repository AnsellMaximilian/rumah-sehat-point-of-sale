interface Props {
  label: string;
  id: string;
  value?: string | number | undefined;
  containerClassName?: string | undefined;
  inputClassName?: string | undefined;
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
  children: React.ReactNode;
}

const SelectInput = ({
  label,
  id,
  value,
  onChange,
  containerClassName,
  inputClassName,
  children,
}: Props) => {
  return (
    <div className={containerClassName}>
      <label htmlFor={id} className="input-label">
        {label}
      </label>
      <select
        onChange={onChange}
        className={`${inputClassName} input`}
        id={id}
        value={value}
      >
        {children}
      </select>
    </div>
  );
};

SelectInput.defaultProps = {
  onChange: undefined,
  value: undefined,
  containerClassName: undefined,
  inputClassName: undefined,
};

export default SelectInput;
