import Button from "../elements/Button";
import { useState, useEffect } from "react";
import { IconHeart, IconLogo, IconMenu, IconSearch } from "../elements";
import { useDrawer } from "./Drawer";
import MenuDrawer from "./MenuDrawer";
import { type IMenuItem } from "@ali/src/types";
import SearchDrawer from "./SearchDrawer";
import { getCSSVariable, rgbToHex } from "@ali/src//utils/utils";
import SavedDrawer from "./SavedDrawer";
import { useSession } from "next-auth/react";

function Header({ menuItems }: { menuItems: IMenuItem[] }): JSX.Element {
  const { closeDrawer, openDrawer } = useDrawer();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSavedOpen, setIsSavedOpen] = useState(false);
  const { data: session, status } = useSession();

  const [savedLocalItems, setSavedLocalItems] = useState<string[]>([]);

  useEffect(() => {
    const savedLocal = localStorage.getItem("saved-items");
    if (savedLocal != null) {
      setSavedLocalItems(JSON.parse(savedLocal));
    }
  }, []);

  const savedItems = session?.user.savedItems;

  const primaryColor = getCSSVariable("--primary-color");
  const hexPrimaryColor = rgbToHex(primaryColor);

  function getFill(isOpen: boolean) {
    if (isOpen) {
      return hexPrimaryColor;
    }
  }

  return (
    <>
      <nav className="flex justify-between px-4 w-full py-10 ">
        <div className="flex justify-start">
          <Button as={"a"} variant="link" href="/">
            <IconLogo />
          </Button>
        </div>
        <div className="flex justify-center items-center gap-4 tablet:gap-6">
          <Button
            className=" w-fit px-0 py-0 "
            variant="blank"
            aria-label="search"
            onClick={() => {
              setIsSearchOpen((prev) => !prev);
            }}
          >
            <IconSearch className="" fill={getFill(isSearchOpen)} />
          </Button>
          <Button
            className=" w-fit px-0 py-0 "
            variant="blank"
            aria-label="saved"
            onClick={() => {
              openDrawer(setIsSavedOpen);
            }}
          >
            <IconHeart
              fill={`${
                (savedLocalItems.length > 0 && status === "unauthenticated") ||
                (savedItems !== undefined && savedItems.length > 0)
                  ? hexPrimaryColor
                  : ""
              }`}
              color=""
              className=""
            />
          </Button>
          <Button
            className=" w-fit  px-0 py-0"
            variant="blank"
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
        <div className="w-full absolute z-40 mt-[60px]   ">
          <SearchDrawer
            open={isSearchOpen}
            close={() => {
              setIsSearchOpen(false);
            }}
          />
        </div>
      ) : null}
      <MenuDrawer
        menuItems={menuItems}
        open={isMenuOpen}
        onClose={() => {
          closeDrawer(setIsMenuOpen);
        }}
      />
      {isSavedOpen && (
        <SavedDrawer
          // savedItems={savedItems}
          open={isSavedOpen}
          onClose={() => {
            closeDrawer(setIsSavedOpen);
          }}
        />
      )}
    </>
  );
}

export default Header;
