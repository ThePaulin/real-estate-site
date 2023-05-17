function Link({ href, as: Component = "a", children, className, ...props }) {
  return <Component {...props}>{children}</Component>;
}

export default Link;
