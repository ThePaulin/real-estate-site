import clsx from "clsx";

export function TextInput({
  type = "text",
  as: Component = type !== "textarea" ? "input" : "textarea",
  id,
  name,
  placeholder,
  className,
  inputRef,
  onChange,
  required = true,
  ...props
}: {
  as?: React.ElementType;
  type?: "text" | "search" | "textarea" | "email" | "password";
  id: string;
  name: string;
  placeholder?: string;
  className?: string;
  inputRef: React.MutableRefObject<string>;
  onChange: (
    e: React.BaseSyntheticEvent<Event, EventTarget>,
    inputRef: React.MutableRefObject<string>
  ) => void;
  required?: boolean;
}): JSX.Element {
  const styles = clsx(
    className,
    " rounded-md hover:border-primary focus:outline-primary border-secondary border-2 "
  );

  // if (type === "textarea") {
  //   return
  // }
  return (
    <Component
      onChange={onChange}
      {...props}
      ref={inputRef}
      type={type}
      id={id}
      placeholder={placeholder}
      className={styles}
      required={required}
      name={name}
    />
  );
}

export default TextInput;
