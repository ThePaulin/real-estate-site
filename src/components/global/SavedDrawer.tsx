import Drawer from "./Drawer";
import { Section, Text } from "@ali/components/elements/index";
import SavedItems from "./SavedItems";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

function SavedDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}): JSX.Element {
  const { data: session } = useSession();

  const [savedLocalItems, setSavedLocalItems] = useState<string[]>([]);

  useEffect(() => {
    const savedLocal = localStorage.getItem("saved-items");
    if (savedLocal != null) {
      setSavedLocalItems(JSON.parse(savedLocal));
    }
  }, []);

  function onClearItem(item: string) {
    setSavedLocalItems((prev) => prev?.filter((el) => el !== item));
  }

  const savedItems = session?.user.savedItems;
  return (
    <div className="">
      <Drawer open={open} onClose={onClose} title="menu">
        <Text as={"h1"} size="heading">
          Saved
        </Text>
        {savedItems !== undefined ? (
          <>
            {savedItems?.length > 0 ? (
              <SavedItems
                savedItems={savedItems}
                onClose={onClose}
                onClearItem={onClearItem}
              />
            ) : (
              <NoItemsFoundMessage />
            )}
          </>
        ) : (
          // read from local storage
          <>
            {savedLocalItems.length > 0 ? (
              <>
                <SavedItems
                  savedItems={savedLocalItems}
                  onClose={onClose}
                  onClearItem={onClearItem}
                />
              </>
            ) : (
              <NoItemsFoundMessage />
            )}
          </>
        )}
      </Drawer>
    </div>
  );
}

export default SavedDrawer;

function NoItemsFoundMessage() {
  return (
    <Section>
      <Text>Looks like you haven&#39;t added any properties to your list!</Text>
    </Section>
  );
}
