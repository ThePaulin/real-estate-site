import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Button, IconHeart } from "../elements";
import { getCSSVariable, rgbToHex } from "@ali/src/utils/utils";
import { LOCALHOST_SAVED_ITEMS } from "@ali/src/utils/consts";

function SaveButton({
  item,
  items,
  locItems,
  onClearItem,
}: {
  item: string;
  items?: string[];
  locItems?: string[];
  onClearItem?: (item: string) => void;
}) {
  const { data: session, status, update } = useSession();
  const savedItems = items;

  const [saveStatus, setSaveStatus] = useState<boolean>(false);
  const [saveStatusLoc, setSaveStatusLoc] = useState<boolean>(false);

  useEffect(() => {
    // logic to save to user account
    if (status === "authenticated" && savedItems !== undefined) {
      if (savedItems?.includes(item)) {
        setSaveStatus(true);
      }
    } else {
      // logic to save to session storage
      // if (locItems !== undefined) {
      //   setSaveStatusLoc(locItems.includes(item));
      // }

      locItems !== undefined && setSaveStatusLoc(locItems.includes(item));
    }
  }, [
    setSaveStatus,
    status,
    session,
    setSaveStatusLoc,
    item,
    locItems,
    savedItems,
  ]);

  useEffect(() => {}, [saveStatusLoc]);

  // useEffect(() => {
  //   // setSaveItem(item);
  //   // const interSaved = localStorage.getItem(LOCALHOST_SAVED_ITEMS);

  //   // if (interSaved !== null) {
  //   //   setLocalStorageSaved(JSON.parse(interSaved));
  //   // }

  //   setLocalStorageSaved(locItems)
  // }, []);

  function handleManageSaved(e: React.BaseSyntheticEvent<Event, EventTarget>) {
    e.stopPropagation();
    e.preventDefault();
    // if (session?.user?.email !== undefined) {
    const email = session?.user?.email !== undefined ? session?.user.email : "";
    const item: string = e.target.value;
    const action: "add" | "remove" = e.target.name;

    async function handleManageItems() {
      const res = await fetch("/api/user/manage-saved", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email,
          item,
          action,
        }),
      });
      // }
      // Await for data for any desirable next steps
      const data = await res.json();

      // On success
      if (data.acknowledged === true) {
        void updateSession();
        setSaveStatus((prev) => !prev);
      } else {
        alert(data?.message);
      }
    }

    // update savedItems
    if (status === "authenticated") {
      void handleManageItems();

      // void updateSession();
    } else {
      // logic to save to session storage
      // add
      const interSaved = localStorage.getItem(LOCALHOST_SAVED_ITEMS);
      // const interSaved = itemsLoc;
      if (interSaved !== null) {
        const currLocItems: string[] =
          localStorage.getItem(LOCALHOST_SAVED_ITEMS) !== null
            ? JSON.parse(interSaved)
            : null;
        if (action === "add") {
          if (currLocItems !== null) {
            localStorage.setItem(
              LOCALHOST_SAVED_ITEMS,
              JSON.stringify([...currLocItems, item])
            );
          } else {
            localStorage.setItem(LOCALHOST_SAVED_ITEMS, JSON.stringify([item]));
          }

          setSaveStatusLoc(true);
          // remove
        } else {
          if (currLocItems !== null) {
            localStorage.setItem(
              LOCALHOST_SAVED_ITEMS,
              JSON.stringify([...currLocItems.filter((el) => el !== item)])
            );
          }
          setSaveStatusLoc(false);
          if (onClearItem !== undefined) {
            onClearItem(item);
          }
        }
      } else {
        localStorage.setItem(LOCALHOST_SAVED_ITEMS, JSON.stringify([item]));
        setSaveStatusLoc(true);
      }
    }
  }

  async function updateSession() {
    if (
      getAction(saveStatus) === "add" &&
      session !== null &&
      session?.user !== undefined
    ) {
      await update({
        ...session,
        user: {
          ...session?.user,
          savedItems: [...session?.user.savedItems, item],
        },
      });
    } else if (
      getAction(saveStatus) === "remove" &&
      session !== null &&
      session?.user !== undefined
    ) {
      await update({
        ...session,
        user: {
          ...session?.user,
          savedItems: [...session?.user.savedItems.filter((el) => el !== item)],
        },
      });
    }
  }

  function getAction(saveStatus: boolean | undefined) {
    if (saveStatus === true) {
      return "remove";
    } else {
      return "add";
    }
  }
  //   after adding item we need to

  return (
    <>
      {/* handle logged in saves */}
      {status === "authenticated" ? (
        <Button
          variant="inline"
          className="w-fit z-40"
          value={item}
          name={getAction(saveStatus)}
          onClick={(e: React.BaseSyntheticEvent<Event, EventTarget>) => {
            handleManageSaved(e);
          }}
        >
          <IconHeart
            fill={
              saveStatus
                ? rgbToHex(getCSSVariable("--primary-color"))
                : undefined
            }
          />
        </Button>
      ) : (
        // handle non logged-in saves
        <>
          <Button
            variant="inline"
            className="w-fit z-40"
            value={item}
            name={getAction(saveStatusLoc)}
            onClick={(e: React.BaseSyntheticEvent<Event, EventTarget>) => {
              handleManageSaved(e);
            }}
          >
            <IconHeart
              fill={
                saveStatusLoc
                  ? rgbToHex(getCSSVariable("--primary-color"))
                  : undefined
              }
            />
          </Button>
        </>
      )}
    </>
  );
}

export default SaveButton;
