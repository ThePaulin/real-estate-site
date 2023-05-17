import Image from "next/image";
import Logo from "../../assets/Logo.png";
import Button from "../elements/Button";
import { IMenuLink } from "@/types";

import Text from "../elements/Text";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
// import Router, { withRouter } from 'next/router';

function Header({ router }) {
  // console.log("router: ", Router.query.slug)

  // const foundMenu = Router.pathname === '/' ? 'home' : Router.query.slug;
  // const [selectedMenu, setSelectedMenu] = useState(foundMenu);
  // const [currentMenu, setCurrentMenu] = useState(foundMenu);

  // useEffect(() => {
  //   setCurrentMenu()
  // }, [])

  // console.log("foundMenu: ", foundMenu)

  const menuLinks: IMenuLink["link"] = [
    { title: "Home", link: "/" },
    { title: "Account", link: "/account" },
    { title: "Blog", link: "/blog" },
    { title: "About", link: "/about" },
    { title: "Contact Us", link: "/contact-us" },
  ];

  return (
    <nav className="flex justify-between px-4 py-10  ">
      <div className="flex justify-start translate-x-10">
        <Button as={"a"} variant="link" href="/">
          <Image src={Logo} alt="Cribs KGL logo" />
        </Button>
      </div>
      <ul className="flex justify-start items-center gap-12 -translate-x-28 ">
        {menuLinks.map((item: IMenuLink["link"]) => {
          return (
            <li>
              <Button as={"a"} variant="link" href={item.link}>
                <Text as="span">{item?.title}</Text>
              </Button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default Header;
