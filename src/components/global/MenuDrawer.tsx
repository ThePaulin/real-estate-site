import Link from "next/link";
import Drawer from "./Drawer";
import { useState } from "react";
import Button from "../elements/Button";
import { motion } from "framer-motion";
import { Transition } from "@headlessui/react";

// function openMenuDrawer(setIsOpen, isOpen) {
//     if (isOpen) {
//         setIsOpen(false);
//     } else {
//         setIsOpen(true);
//     }
// };
// function closeMenuDrawer(setIsOpen) {
//     setIsOpen(false);
// }
// export function useMenuDrawer(){
//     return  {openDrawer, closeDrawer}
// }

function MenuDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const menuLinks: IMenuLink["link"] = [
    { title: "Home", link: "/" },
    { title: "Account", link: "/account" },
    { title: "Blog", link: "/blog" },
    { title: "About", link: "/about" },
    { title: "Contact Us", link: "/contact-us" },
  ];

  return (
    <div className="">
      <Drawer open={open} onClose={onClose} title="menu">
        <ul className="flex flex-col items-center gap-8 py-12 mt-12">
          {menuLinks.map((el) => {
            return (
              <motion.li
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                key={el.title}
                className=" w-fit transition-all duration-300 text-secondary/60 hover:text-secondary hover:font-700 hover:translate-x-1 "
              >
                <Link href={el.link} className="" onClick={onClose}>
                  {el.title}
                </Link>
              </motion.li>
            );
          })}
        </ul>
      </Drawer>
    </div>
  );
}

export default MenuDrawer;
