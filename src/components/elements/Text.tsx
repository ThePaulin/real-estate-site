import clsx from "clsx";

function Text({
  as: Component = "p",
  size = "general",
  fontWeight = "general",
  children,
  className,
  ...props
}: {
  as?: React.ElementType;
  size: "big" | "heading" | "lead" | "general" | "small";
  fontWeight: "bold" | "semibold" | "light" | "general";
  className?: string;
  children: React.ReactNode;
}): JSX.Element {
  // big: 32px lh:29px
  // heading: 24px lh:29px
  // lead: 18px lh:22px
  // general: 14px lh:17px
  // small: 12px lh:14.5px

  // values translated to em with 1em = 16px ratio

  const textSizes: Record<string, string> = {
    big: "text-[4em] leading-[1.8125em]",
    heading: "text-[1.5em] leading-[1.8125em]",
    lead: "text-[1.125em] leading-[1.375em]",
    general: "text-[0.875em] leading-[1.0625em]",
    small: "text-[0.75em] leading-[0.90625em]",
  };
  const textWeight: Record<string, string> = {
    bold: "font-bold",
    semibold: "font-semibold",
    light: "font-normal",
    general: "text-[0.875em] leading-[1.0625em]",
  };

  const styles = clsx(textSizes[size], textWeight[fontWeight], className);

  return (
    <Component {...props} className={styles}>
      {children}
    </Component>
  );
}

export default Text;
