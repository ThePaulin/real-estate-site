import clsx from "clsx";
import { missingClass, formatText } from "@/utils/utils";

function Section({
  as: Component = "section",
  display = "flex",
  className,
  size = "copy",
  children,
  padding = "all",
  ...props
}: {
  as?: React.ElementType;
  display?: "flex" | "grid";
  className?: string;
  children: React.ReactNode;
  padding?: "x" | "y" | "all" | "none";
  [key: string]: any;
}) {
  const styles = clsx(
    missingClass(className, "w-") && "w-full",
    padding === "all" && "",
    className,
    display
  );

  return (
    <Component {...props} className={styles}>
      {children}
    </Component>
  );
}

export default Section;
