import { HTMLInputTypeAttribute } from 'react';

interface Props {
  label: string;
  id: string;
  placeholder: string | undefined;
  value?: string | number | undefined;
  containerClassName?: string | undefined;
  inputClassName?: string | undefined;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
  onChangeTextArea?: React.ChangeEventHandler<HTMLTextAreaElement>;
  textarea?: boolean;
  type?: HTMLInputTypeAttribute;
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
      <label htmlFor={id} className="input-label">
        {label}
      </label>
      {textarea ? (
        <textarea
          className={`${inputClassName} input`}
          placeholder={placeholder}
          id={id}
          onChange={onChangeTextArea}
          value={value}
        />
      ) : (
        <input
          className={`${inputClassName} input`}
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
