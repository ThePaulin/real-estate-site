import clsx from "clsx";
import { missingClass } from "@/utils/utils";
import Link from "next/link";

export function Button({
  as: Component = "button",
  children,
  className,
  variant = "primary",
  href,
  ...props
}: {
  as?: React.ElementType;
  className?: string;
  children: React.ReactNode;
  variant: "primary" | "secondary" | 'outline' | "inline" | "link" ;
  href?: string;
  [key: string]: any;
}): JSX.Element {
  const variantStyles: Record<string, string> = {
    primary: "hover:bg-primary hover:text-secondary bg-accent text-secondary transition-all  h-12 w-fit py-2 px-4",
    secondary: "bg-accent transition-all  h-12 w-fit py-2 px-4",
    outline: 'bg-accent border-[1px] border-secondary transition-all  h-12 w-fit py-2 px-4',
    inline:
      "bg-none hover:border-1 hover:border-secondary focus:border-1 focus:border-secondary transition-all h-12 w-fit py-2 px-4",
    link: "bg-none transition-all   w-fit ",
  };
  const styles = clsx(
    missingClass(className, "w-") && (variant === "link" ? 'w-fit' : "w-full"),
    variantStyles[variant],
    "flex justify-center items-center", className
  );

  if (variant === "link" && href !== undefined) {
    return (
      <Link href={href} className={styles}>
        {children}
      </Link>
    );
  }

  return (
    <>
      <Component {...props} className={styles}>
        {children}
      </Component>
    </>
  );
}

export default Button;
