import clsx from "clsx";

function Text({
  as: Component = "p",
  size = "general",
  children,
  className,
  ...props
}: {
  as?: React.ElementType;
  size: "big" | "heading" | "lead" | "general" | "small";
  className?: string;
  children: React.ReactNode;
}) {
  // big: 32px lh:29px
  // heading: 24px lh:29px
  // lead: 18px lh:22px
  // general: 14px lh:17px
  // small: 12px lh:14.5px

  // values translated to em with 1em = 16px ratio
  let textSize: string = "";
  let leadingSize: string = "";
  // switch(size) {
  //     case 'big':
  //         // textSize='32px';
  //         textSize='4em';
  //         leadingSize='1.8125em';
  //         // leadingSize='29px';
  //         break;
  //     case 'heading':
  //         // textSize='67px';
  //         textSize='1.5em'
  //         leadingSize='1.8125em';
  //         leadingSize='29px';
  //         break;
  //     case 'lead':
  //         textSize='1.125em';
  //         leadingSize='1.375em';
  //         // leadingSize='22px';
  //         break;
  //     case 'general':
  //         textSize='0.875em';
  //         leadingSize='1.0625em';
  //         // leadingSize='17px';
  //         break;
  //     case 'small':
  //         textSize='0.75em';
  //         leadingSize='0.90625em';
  //         // leadingSize='14.5px';
  //         break;
  // }
  const textSizes: Record<string, string> = {
    // lead: 'text-lead font-medium',
    // copy: 'text-copy',
    // fine: 'text-fine subpixel-antialiased',
    // 'big'|'heading'| 'lead' | 'general' | 'small'
    big: "text-[4em] leading-[1.8125em]",
    heading: "text-[1.5em] leading-[1.8125em]",
    lead: "text-[1.125em] leading-[1.375em]",
    general: "text-[0.875em] leading-[1.0625em]",
    small: "text-[0.75em] leading-[0.90625em]",
  };

  const styles = clsx(textSizes[size], className);

  return (
    <Component {...props} className={styles}>
      {children}
    </Component>
  );
}

export default Text;
