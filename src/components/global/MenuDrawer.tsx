import Link from "next/link";
import Drawer from "./Drawer";
import { type IMenuItem } from "@/types";

function MenuDrawer({
  menuItems,
  open,
  onClose,
}: {
  menuItems: IMenuItem[];
  open: boolean;
  onClose: () => void;
}): JSX.Element {
  return (
    <div className="">
      <Drawer open={open} onClose={onClose} title="menu">
        <ul className="flex flex-col items-center gap-8 py-12 mt-12">
          {menuItems.map((el) => {
            return (
              <li
                className=" w-fit transition-all duration-300 text-secondary/60 hover:text-secondary hover:font-700 hover:translate-x-1 "
                key={el.cta}
              >
                <Link href={el.link} className="" onClick={onClose}>
                  {el.cta}
                </Link>
              </li>
            );
          })}
        </ul>
      </Drawer>
    </div>
  );
}

export default MenuDrawer;
