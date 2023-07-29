import { urlFor } from "@ali/src/client";
import type { IPropertyFullSearch } from "@ali/src/types";
import Link from "next/link";
import { CountAndSave } from "./CountAndSave";
import { Text } from "../elements";

export default function PropertyCard({ item }: { item: IPropertyFullSearch }) {
  const address: string = `${item?.address?.street_number}, ${item?.address?.street}, ${item?.address?.city}, ${item?.address?.zone}, ${item?.address?.country}`;

  return (
    <Link
      href={`/property/${item?.slug.current}`}
      className="flex flex-col  gap-4 justify-between items-center rounded bg-tertiary/10 p-2 w-fit border hover:border-primary hover:border-[1px]"
    >
      <div className="object-cover w-full  ">
        {item?.images?.images !== null ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            className="w-full rounded-lg"
            width={"auto"}
            height={"auto"}
            src={urlFor(item?.images?.images?.image).url()}
            alt={item?.images?.images?.alt_text}
          />
        ) : null}
      </div>

      <div className="w-full flex justify-between gap-4 ">
        <div className=" w-full flex flex-col justify-start gap-2 text-left ">
          <Text size="small">{item?.category}</Text>
          <Text size="general" fontWeight="bold">
            {item?.title}
          </Text>
          <Text size="small" className="text-black/40">
            {address}
          </Text>
        </div>
        <Text size="general" fontWeight="semibold" className="text-primary">
          ${item?.price}
        </Text>
      </div>
      <CountAndSave item={item} />
    </Link>
  );
}
