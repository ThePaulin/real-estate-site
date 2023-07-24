import { TextInput, Text } from "./index";

export function TextBox({
  labelText,
  placeholder = "",
  id,
  classNames,
  inputRef,
  type,
  onChange,
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
  onChange: (
    e: React.BaseSyntheticEvent<Event, EventTarget>,
    inputRef: React.MutableRefObject<string>
  ) => void;
}) {
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
      />
    </div>
  );
}

export default TextBox;
