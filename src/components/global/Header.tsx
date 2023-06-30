import Button from "../elements/Button";
import { useState } from "react";
import { IconLogo, IconMenu, IconSearch } from "../elements";
import { useDrawer } from "./Drawer";
import MenuDrawer from "./MenuDrawer";
import { type IMenuItem } from "@/types";
import SearchDrawer from "./SearchDrawer";
import { getCSSVariable, rgbToHex } from "@/utils/utils";

function Header({ menuItems }: { menuItems: IMenuItem[] }): JSX.Element {
  const { closeDrawer, openDrawer } = useDrawer();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const primaryColor = getCSSVariable('--primary-color');
  const hexPrimaryColor = rgbToHex(primaryColor)

  function getFill(isSearchOpen: boolean) {
    if(isSearchOpen) {
      return hexPrimaryColor
    }
    
  }
  

  return (
    <>
      <nav className="flex justify-between px-4 py-10 ">
        <div className="flex justify-start">
          <Button as={"a"} variant="link" href="/">
            <IconLogo />
          </Button>
        </div>
        <div className="flex justify-center items-center gap-4 tablet:gap-2">
          <Button 
          className=" h-fit px-0 py-0" 
          variant="inline" 
          aria-label="search" 
          onClick={() => { setIsSearchOpen(prev => !prev) }}>
            <IconSearch  fill={getFill(isSearchOpen)}  />
          </Button>
          <Button
            className=" h-fit px-0 py-0"
            variant="inline"
            aria-label="menu"
            onClick={() => {
              openDrawer(setIsMenuOpen);
            }}
          >
            <IconMenu />
          </Button>
        </div>
      </nav>
      
      {isSearchOpen ? (
        <div className="w-full">
           <SearchDrawer close={()=>{ setIsSearchOpen(false)}} />
        </div>
      ) : null}
      <MenuDrawer
        menuItems={menuItems}
        open={isMenuOpen}
        onClose={() => {
          closeDrawer(setIsMenuOpen);
        }}
      />
    </>
  );
}

export default Header;
