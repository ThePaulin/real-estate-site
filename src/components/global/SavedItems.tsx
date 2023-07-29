import type { IPropertyFullSearch } from "@ali/src/types";
import { useState, useEffect } from "react";
import { Section, Text } from "../elements";
import { generateAddress } from "@ali/src/utils/utils";
import { urlFor } from "@ali/src/client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import SaveButton from "../property/SaveButton";
import { LOCALHOST_SAVED_ITEMS } from "@ali/src/utils/consts";

export default function SavedItems({
  savedItems,
  onClose,
  onClearItem,
}: {
  savedItems: string[];
  onClose?: () => void;
  onClearItem: (item: string) => void;
}) {
  return (
    <ul className="flex flex-col max-h-[75vh] overflow-y-auto overflow-x-hidden items-center justify-start gap-8 py-12 mt-12">
      {savedItems.map((el) => {
        return (
          <SavedItemCard
            key={el.split("-").pop()}
            item={el}
            onClose={onClose}
            onClearItem={onClearItem}
          />
        );
      })}
    </ul>
  );
}

function SavedItemCard({
  item,
  onClose,
  onClearItem,
}: {
  item: string;
  onClose: () => void;
  onClearItem: (item: string) => void;
}) {
  const { data: session, status } = useSession();
  const savedItems = session?.user.savedItems;
  const [localItems, setLocalItems] = useState<string[]>();

  useEffect(() => {
    const locItems = localStorage.getItem(LOCALHOST_SAVED_ITEMS);
    if (locItems != null) {
      setLocalItems(JSON.parse(locItems));
    }
  }, []);

  const [itemObj, setItemObj] = useState<IPropertyFullSearch>();
  useEffect(() => {
    const query = `*[_type == "property" && slug.current == "${
      typeof item === "string" ? item : ""
    }"]{ title, price, slug, category, address, images->{ ...,images[0]}}| order(_createdAt asc)`;
    async function runQuery() {
      const res = await fetch("/api/properties", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          query,
          type: "propertyPage",
        }),
      });
      const data = await res.json();

      setItemObj(data.property);
    }
    void runQuery();
  }, []);

  const address = generateAddress(itemObj);

  // function onClear(item: string) {
  //     setLocalItems(prev => prev?.filter(el => el !== item));
  // }

  console.log("itemObj: ", itemObj);

  return (
    <li className=" w-full bg-tertiary/25 rounded-md  ">
      {itemObj !== undefined ? (
        <Link
          href={`/property/${itemObj?.slug.current}`}
          className="w-full flex justify-between items-center transition-all duration-75 border border-tertiary/25  hover:border-spacing-1 hover:border-primary"
          onClick={onClose}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            width={150}
            src={urlFor(itemObj?.images.images.image).url()}
            alt={itemObj?.images.images.alt_text}
            className="rounded-md p-1 flex-1"
          />
          <Section
            padding="none"
            display="flex"
            className="flex-col h-full justify-start items-start gap-0 flex-1"
          >
            <Text
              as={"h2"}
              fontWeight="bold"
              size="general"
              className="px-2 py-1 "
            >
              {itemObj?.title}
            </Text>
            <div className="flex justify-between w-full">
              <Text
                as={"h2"}
                fontWeight="bold"
                size="general"
                className="px-2 py-1 text-primary"
              >
                ${itemObj?.price}
              </Text>
              {status === "authenticated" ? (
                <SaveButton
                  item={item}
                  items={savedItems}
                  locItems={localItems}
                />
              ) : (
                <>
                  {localItems !== undefined ? (
                    <SaveButton
                      item={item}
                      items={savedItems}
                      locItems={localItems}
                      onClearItem={onClearItem}
                    />
                  ) : (
                    <></>
                  )}
                </>
              )}
            </div>
            <Text
              as={"h3"}
              fontWeight="general"
              size="general"
              className="px-2 py-1 text-secondary/50"
            >
              {itemObj?.category}
            </Text>
            <Text
              as={"h3"}
              fontWeight="general"
              size="general"
              className="px-2 py-1 text-secondary/50 max-w-[200px] truncate"
            >
              {address}
            </Text>
          </Section>
        </Link>
      ) : (
        <></>
      )}
    </li>
  );
}
