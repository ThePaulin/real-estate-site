import { urlFor } from "@ali/src/client";
import type { IBanner } from "@ali/src/types";
import { missingClass } from "@ali/src/utils/utils";
import Image from "next/image";

export default function BannerRenderer({
  image,
  className = "",
}: {
  image?: IBanner;
  className?: string;
}): JSX.Element {
  function toShow(
    image: IBanner,
    type: "desktop_image" | "mobile_image"
  ): string {
    const otherImageKey =
      type === "desktop_image" ? "mobile_image" : "desktop_image";
    let style = "";

    if (image?.[otherImageKey] === undefined) {
      style = "";
    } else {
      if (type === "desktop_image") {
        style = "hidden tablet:block";
      } else if (type === "mobile_image") {
        style = "block tablet:hidden";
      }
    }

    return style;
  }

  return (
    <>
      {image !== undefined && (
        <>
          {image?.desktop_image !== undefined && (
            <Image
              width={1800}
              height={600}
              alt={image?.alt_text}
              src={urlFor(image?.desktop_image?.asset).url()}
              priority={true}
              className={`object-cover ${toShow(
                image,
                "desktop_image"
              )} w-full ${
                missingClass(className, "h-")
                  ? "h-[300px] tablet:h-[600px]"
                  : ""
              } ${className}`}
            />
          )}
          {image?.mobile_image !== undefined && (
            <Image
              width={728}
              height={400}
              priority={true}
              alt={image?.alt_text}
              src={urlFor(image?.mobile_image?.asset).url()}
              className={`object-cover ${toShow(
                image,
                "mobile_image"
              )} w-full ${
                missingClass(className, "h-")
                  ? "h-[300px] tablet:h-[600px]"
                  : ""
              } ${className}`}
            />
          )}
        </>
      )}
    </>
  );
}
