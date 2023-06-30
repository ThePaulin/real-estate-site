import clsx from "clsx";

export function TextInput({
  as: Component = "input",
  type = "text",
  className,
  ...props
}: {
  as?: React.ElementType;
  type?: "text";
  className?: string;
}): JSX.Element {
  const styles = clsx(
    className,
    "hover:border-primary focus:outline-primary border-secondary border-2 "
  );
  return <Component {...props} className={styles} />;
}

export default TextInput;
