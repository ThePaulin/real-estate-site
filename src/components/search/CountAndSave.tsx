"use client";
import type { IPropertyFullSearch, IPropertyFull } from "@ali/src/types";
import SaveButton from "../property/SaveButton";
import CountsDisplay from "./CountsDisplay";
import { useSession } from "next-auth/react";

export function CountAndSave({
  item,
}: {
  item: IPropertyFullSearch | IPropertyFull;
}): JSX.Element {
  const { data: session, status } = useSession();

  const savedItems =
    status === "authenticated" ? session?.user?.savedItems : [];
  const localItems: string[] | null = null;

  return (
    <div className="flex w-full justify-between items-center ">
      <CountsDisplay item={item} />
      {savedItems !== undefined || localItems !== null ? (
        <SaveButton item={item.slug.current} items={savedItems} />
      ) : (
        <>loading....</>
      )}
    </div>
  );
}
