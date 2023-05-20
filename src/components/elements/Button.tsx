import clsx from "clsx";
import { missingClass, formatText } from "@/utils/utils";
import Link from "next/link";
// import { Component } from "react";

function Button({
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
  variant: "primary" | "secondary" | "inline" | "link";
  href?: string;
  [key: string]: any;
}) {
  const variantStyles: Record<string, string> = {
    primary: "bg-primary",
    secondary: "bg-secondary",
    inline:
      "bg-none hover:border-1 hover:border-secondary focus:border-1 focus:border-secondary",
    link: "bg-none",
  };
  const styles = clsx(
    missingClass(className, "w-") && "w-full",
    "flex justify-center items-center"
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
