import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Button, IconHeart } from "../elements";
import { getCSSVariable, rgbToHex } from "@ali/src/utils/utils";

function SaveButton({ item, items }: { item: string; items: string[] }) {
  const { data: session, status, update } = useSession();
  // const savedItems = session?.user?.savedItems;
  const savedItems = items;

  const [localStorageSaved, setLocalStorageSaved] = useState<string[]>();

  const [saveStatus, setSaveStatus] = useState<boolean>(false);
  const [saveStatusLoc, setSaveStatusLoc] = useState<boolean>(false);
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
      const interSaved = localStorage.getItem("saved-items");
      if (interSaved !== null) {
        const currLocItems: string[] =
          localStorage.getItem("saved-items") !== null
            ? JSON.parse(interSaved)
            : null;
        if (action === "add") {
          if (currLocItems !== null) {
            localStorage.setItem(
              "saved-items",
              JSON.stringify([...currLocItems, item])
            );
          } else {
            localStorage.setItem("saved-items", JSON.stringify([item]));
          }

          setSaveStatusLoc(true);
          // remove
        } else {
          if (currLocItems !== null) {
            localStorage.setItem(
              "saved-items",
              JSON.stringify([...currLocItems.filter((el) => el !== item)])
            );
          }
          setSaveStatusLoc(false);
        }
      } else {
        localStorage.setItem("saved-items", JSON.stringify([item]));
        setSaveStatusLoc(true);
      }
    }
  }

  useEffect(() => {
    if (localStorageSaved !== undefined) {
      setSaveStatusLoc(localStorageSaved.includes(item));
    }
  }, [localStorageSaved]);

  useEffect(() => {
    // setSaveItem(item);
    const interSaved = localStorage.getItem("saved-items");

    if (interSaved !== null) {
      setLocalStorageSaved(JSON.parse(interSaved));
    }
  }, []);

  async function updateSession() {
    if (
      getAction(saveStatus) === "add" &&
      session !== null &&
      session?.user !== undefined
    ) {
      console.log("adding");
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
      console.log("removing");
      await update({
        ...session,
        user: {
          ...session?.user,
          savedItems: [...session?.user.savedItems.filter((el) => el !== item)],
        },
      });
    }
  }

  useEffect(() => {
    // logic to save to session storage
    // logic to save to user account
    if (savedItems?.includes(item)) {
      console.log("FOund: ", savedItems?.includes(item));
      setSaveStatus(true);
    }
  });

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
      {savedItems.length >= 0 && status === "authenticated" ? (
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
