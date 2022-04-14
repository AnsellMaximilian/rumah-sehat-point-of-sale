interface Props {
  label: string;
  id: string;
  placeholder: string | undefined;
  value?: string | undefined;
  containerClassName?: string | undefined;
  inputClassName?: string | undefined;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
}

const TextInput = ({
  label,
  id,
  placeholder,
  value,
  onChange,
  containerClassName,
  inputClassName,
}: Props) => {
  return (
    <div className={containerClassName}>
      <label
        htmlFor={id}
        className="text-sm mb-1 block font-medium text-gray-700"
      >
        {label}
      </label>
      <input
        className={`${inputClassName} focus:ring-1 ring-primary outline-none px-2 py-1 rounded-sm min-w-0 border border-gray-300`}
        placeholder={placeholder}
        id={id}
        onChange={onChange}
        value={value}
      />
    </div>
  );
};

TextInput.defaultProps = {
  onChange: undefined,
  value: undefined,
  containerClassName: undefined,
  inputClassName: undefined,
};

export default TextInput;
