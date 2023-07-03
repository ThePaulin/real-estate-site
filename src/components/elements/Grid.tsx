import clsx from "clsx";

export function Grid({
  children,
  className,
  as: Component = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}) {
  const styles = clsx(
    `w-full grid grid-flow-row grid-cols-1  gap-4 md:grid-cols-2 lg:grid-cols-4`,
    className
  );
  return <div className={styles}>{children}</div>;
}

export default Grid;
