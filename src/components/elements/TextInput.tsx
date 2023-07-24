import clsx from "clsx";

export function TextInput({
  as: Component = "input",
  type = "text",
  id,
  placeholder,
  className,
  inputRef,
  onChange,
  ...props
}: {
  as?: React.ElementType;
  type?: "text" | "search" | "textarea" | "email" | "password";
  id: string;
  placeholder?: string;
  className?: string;
  inputRef: React.MutableRefObject<string>;
  onChange: (
    e: React.BaseSyntheticEvent<Event, EventTarget>,
    inputRef: React.MutableRefObject<string>
  ) => void;
}): JSX.Element {
  const styles = clsx(
    className,
    " rounded-md hover:border-primary focus:outline-primary border-secondary border-2 "
  );
  return (
    <Component
      onChange={onChange}
      {...props}
      ref={inputRef}
      type={type}
      id={id}
      placeholder={placeholder}
      className={styles}
    />
  );
}

export default TextInput;
