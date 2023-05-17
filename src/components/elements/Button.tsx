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
  const styles = clsx(
    missingClass(className, "w-") && "w-full",
    className,
    "flex justify-center items-center",
    `${variant === "primary" && "bg-primary"} ${
      variant === "secondary" && "bg-secondary"
    } ${variant === "inline" && "bg-none"} ${variant === "link" && "bg-none"}`
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
