import Link from "next/link"
import Drawer from "./Drawer"
import { type IMenuLink } from "@/types"

function MenuDrawer ({ open, onClose }: { open: boolean, onClose: () => void }): JSX.Element {
  const menuLinks: IMenuLink["link"] = [
    { title: "Home", link: "/" },
    { title: "Account", link: "/account" },
    { title: "Blog", link: "/blog" },
    { title: "About", link: "/about" },
    { title: "Contact Us", link: "/contact-us" }
  ]

  return (
    <div className="">
      <Drawer open={open} onClose={onClose} title="menu">
        <ul className="flex flex-col items-center gap-8 py-12 mt-12">
          {menuLinks.map((el) => {
            return (
              <li
              className=" w-fit transition-all duration-300 text-secondary/60 hover:text-secondary hover:font-700 hover:translate-x-1 "
              key={el.title}>
                <Link href={el.link} className="" onClick={onClose}>
                  {el.title}
                </Link>
              </li>
            )
          })}
        </ul>
      </Drawer>
    </div>
  )
}

export default MenuDrawer
