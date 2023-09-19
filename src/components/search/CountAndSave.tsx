"use client";
import type { IPropertyFullSearch, IPropertyFull } from "@ali/src/types";
import SaveButton from "../property/SaveButton";
import CountsDisplay from "./CountsDisplay";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export function CountAndSave({
  item,
}: {
  item: IPropertyFullSearch | IPropertyFull;
}): JSX.Element {
  const { data: session, status } = useSession();

  const savedItems =
    status === "authenticated" ? session?.user?.savedItems : [];

  const [locItems, setLocItems] = useState<string[]>();

  useEffect(() => {
    const loc = localStorage.getItem("saved-items");
    if (loc != null) {
      setLocItems(JSON.parse(loc));
    } else {
      localStorage.setItem("saved-items", JSON.stringify([]));
      setLocItems([]);
    }
  }, []);

  useEffect(() => {}, [locItems]);

  return (
    <div className="flex w-full justify-between items-center ">
      <CountsDisplay item={item} />

      {status === "authenticated" ? (
        <>
          {/* case for logged in */}
          {savedItems !== undefined ? (
            <SaveButton
              item={item?.slug?.current}
              items={savedItems}
              locItems={locItems}
            />
          ) : (
            <>loading....</>
          )}
        </>
      ) : (
        <>
          {/* case for local */}
          {locItems !== undefined ? (
            <SaveButton
              item={item?.slug?.current}
              items={savedItems}
              locItems={locItems}
            />
          ) : (
            <>loading....</>
          )}
        </>
      )}
    </div>
  );
}
