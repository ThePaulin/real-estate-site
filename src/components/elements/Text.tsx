import clsx from "clsx";

export function Text({
  as: Component = "p",
  size = "general",
  fontWeight = "general",
  children,
  className,
  style,
  ...props
}: {
  as?: React.ElementType;
  size?: "big" | "header" | "heading" | "lead" | "general" | "small" | "custom";
  fontWeight?: "bold" | "semibold" | "light" | "general";
  className?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}): JSX.Element {
  // big: 32px lh:29px
  // heading: 24px lh:29px
  // lead: 18px lh:22px
  // general: 14px lh:17px
  // small: 12px lh:14.5px

  // values translated to em with 1em = 16px ratio

  const textSizes: Record<string, string> = {
    big: "text-[4em] leading-[1.8125em]",
    // text-[3em]
    header: "text-3xl leading-[1.8125em]",
    heading: "text-[1.5em] leading-[1.8125em]",
    lead: "text-[1.125em] leading-[1.375em]",
    general: "text-[0.875em] leading-[1.0625em]",
    small: "text-[0.75em] leading-[0.90625em]",
    custom: "",
  };
  const textWeight: Record<string, string> = {
    bold: "font-bold",
    semibold: "font-semibold",
    light: "font-light",
    general: "font-normal",
  };

  const outputStyles = clsx(
    "pointer-events-none",
    textSizes[size],
    textWeight[fontWeight],
    className
  );

  return (
    <Component {...props} className={outputStyles} style={style}>
      {children}
    </Component>
  );
}

export default Text;
