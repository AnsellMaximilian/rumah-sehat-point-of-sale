interface Props {
  label: string;
  id: string;
  placeholder: string | undefined;
  value?: string | undefined;
  containerClassName?: string | undefined;
  inputClassName?: string | undefined;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
  onChangeTextArea?: React.ChangeEventHandler<HTMLTextAreaElement>;
  textarea?: boolean;
  type?: string;
}

const TextInput = ({
  label,
  id,
  placeholder,
  value,
  onChange,
  containerClassName,
  inputClassName,
  textarea,
  onChangeTextArea,
  type = 'text',
}: Props) => {
  return (
    <div className={containerClassName}>
      <label
        htmlFor={id}
        className="text-sm mb-1 block font-medium text-gray-700"
      >
        {label}
      </label>
      {textarea ? (
        <textarea
          className={`${inputClassName} focus:ring-1 ring-primary outline-none px-2 py-1 rounded-sm min-w-0 border border-gray-300`}
          placeholder={placeholder}
          id={id}
          onChange={onChangeTextArea}
          value={value}
        />
      ) : (
        <input
          className={`${inputClassName} focus:ring-1 ring-primary outline-none px-2 py-1 rounded-sm min-w-0 border border-gray-300`}
          placeholder={placeholder}
          id={id}
          onChange={onChange}
          value={value}
          type={type}
        />
      )}
    </div>
  );
};

TextInput.defaultProps = {
  onChange: undefined,
  onChangeTextArea: undefined,
  value: undefined,
  containerClassName: undefined,
  inputClassName: undefined,
  textarea: false,
  type: 'text',
};

export default TextInput;
