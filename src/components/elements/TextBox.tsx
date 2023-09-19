import { TextInput, Text } from "./index";

export function TextBox({
  labelText,
  placeholder = "",
  id,
  classNames,
  inputRef,
  type,
  name,
  onChange,
  required,
  ...props
}: {
  labelText: string;
  placeholder?: string;
  id: string;
  classNames?: {
    root?: string;
    input?: string;
    label?: string;
    labelText?: string;
  };
  inputRef: React.MutableRefObject<string>;
  type?: "search" | "textarea" | "text" | "email" | "password";
  name: string;
  onChange: (
    e: React.BaseSyntheticEvent<Event, EventTarget>,
    inputRef: React.MutableRefObject<string>
  ) => void;
  required?: boolean;
}) {
  // const required: boolean = props.props.required != null  ? props.props.required : false;
  return (
    <div className={classNames?.root}>
      {labelText !== undefined ? (
        <label htmlFor={id} className={classNames?.label}>
          <Text size="small" className={classNames?.labelText}>
            {labelText}
          </Text>
        </label>
      ) : null}
      <TextInput
        onChange={(e) => {
          onChange(e, inputRef);
        }}
        inputRef={inputRef}
        id={id}
        type={type}
        placeholder={placeholder}
        className={classNames?.input}
        required={required}
        name={name}
        {...props}
      />
    </div>
  );
}

export default TextBox;
