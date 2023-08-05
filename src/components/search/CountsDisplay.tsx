import type { IPropertyFull, IPropertyFullSearch } from "@ali/src/types";
import { IconBed, IconBath, Text } from "../elements";

export default function CountsDisplay({
  item,
}: {
  item: IPropertyFullSearch | IPropertyFull;
}): JSX.Element {
  const countInfoStyles = "flex justify-center gap-1 items-center";
  return (
    <div className="flex justify-between w-24 ">
      <div className={countInfoStyles}>
        <IconBed />
        <Text size="small">{item?.bedroom_count}</Text>
      </div>
      <div className={countInfoStyles}>
        <IconBath className="h-5 w-5" />

        <Text size="small">{item?.bathroom_count}</Text>
      </div>
    </div>
  );
}
