import React from "react";
import { urlFor } from "@ali/src/client";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import type {
  IBanner,
  IBlock,
  IHero,
  IPage,
  IImage,
} from "@ali/src/types/index";
import { Section, Text } from "@ali/src/components/elements";

export default function ArticleContent({ article }: { article?: IPage }) {
  return (
    <div className="flex flex-col mt-8 pb-12 ">
      <div className="w-full flex justify-center py-8 ">
        <Text
          as="h1"
          size="custom"
          fontWeight="semibold"
          className=" text-3xl desktop:text-5xl px-4 text-center leading-snug text-secondary max-w-4xl break-words"
        >
          {article?.title}
        </Text>
      </div>

      <BannerRenderer image={article?.image} />

      <Section
        as="section"
        display="flex"
        padding="all"
        className="flex-col justify-center gap-6 items-center mx-auto w-full max-w-6xl "
      >
        {article?.author !== undefined && (
          <div className="w-full flex flex-col gap-2 justify-start pt-6 pb-2 ">
            <Text className="text-black/20">
              Date: {article?.scheduled_for.slice(0, 10)}
            </Text>
            <Text className="text-black/60">
              {" "}
              Written by: {article?.author.firstname} {article?.author.lastname}
            </Text>
          </div>
        )}
        {article?.content?.map((item: IBlock | IImage | IHero, idx) => {
          const headerColor = getColor(article, idx, item, "header");
          const paragraphColor = getColor(article, idx, item, "paragraph");

          return (
            <ContentRenderer
              key={item?._key}
              content={item}
              headerColor={headerColor}
              paragraphColor={paragraphColor}
            />
          );
        })}
      </Section>
    </div>
  );
}

function getColor(
  article: IPage,
  idx: number,
  item: IBlock | IImage | IHero,
  type: "header" | "paragraph"
) {
  // colors are only applied to text in the IHero
  if (item?._type === "hero") {
    const color =
      type === "header"
          // @ts-expect-error  type error expected
        ? article?.content[idx]?.header_color !== undefined
        // @ts-expect-error  type error expected
          ? article?.content[idx]?.header_color
          : "black"
          // @ts-expect-error  type error expected
        : article?.content[idx]?.paragraph_color !== undefined
        // @ts-expect-error  type error expected
        ? article?.content[idx]?.paragraph_color
        : "black";
    return color;
  }
}

export function ContentRenderer({
  content,
  headerColor,
  paragraphColor,
}: {
  content: IBlock | IImage | IHero;
  headerColor: string;
  paragraphColor: string;
}): JSX.Element {
  const components = {
    block: {
      h1: ({ children }: { children?: any }) => (
        <Text
          as={"h1"}
          size="header"
          fontWeight="semibold"
          className={`text-${headerColor} break-words w-full`}
        >
          {children}
        </Text>
      ),
      h2: ({ children }: { children?: any }) => (
        <Text
          as={"h2"}
          size="custom"
          fontWeight="semibold"
          className={`text-3xl text-${headerColor} break-words w-full`}
        >
          {typeof String(children) === "string" ? children : null}
        </Text>
      ),
      h3: ({ children }: { children?: any }) => (
        <Text
          as={"h3"}
          size="custom"
          fontWeight="semibold"
          className={`text-2xl text-${headerColor} break-words w-full`}
        >
          {typeof String(children) === "string" ? children : null}
        </Text>
      ),
      h4: ({ children }: { children?: any }) => (
        <Text
          as={"h4"}
          size="custom"
          fontWeight="semibold"
          className={`text-xl text-${headerColor} break-words w-full`}
        >
          {typeof String(children) === "string" ? children : null}
        </Text>
      ),
      h5: ({ children }: { children?: any }) => (
        <Text
          as={"h5"}
          size="custom"
          fontWeight="semibold"
          className={`text-lg text-${headerColor} break-words w-full`}
        >
          {typeof String(children) === "string" ? children : null}
        </Text>
      ),
      h6: ({ children }: { children?: any }) => (
        <Text
          as={"h6"}
          size="custom"
          fontWeight="semibold"
          className={`text-base text-${headerColor} break-words w-full`}
        >
          {typeof String(children) === "string" ? children : null}
        </Text>
      ),

      //   paragraph
      normal: ({ children }: { children?: any }) => (
        <Text
          as={"p"}
          size="custom"
          fontWeight="general"
          className={`text-base text-${paragraphColor} break-words w-full`}
        >
          {typeof String(children) === "string" ? children : null}
        </Text>
      ),

      blockquote: ({ children }: { children?: any }) => (
        <blockquote className="border-l-purple-500 break-words w-full">
          {typeof String(children) === "string" ? children : null}
        </blockquote>
      ),
      customHeading: ({ children }: { children?: any }) => (
        <h2 className="text-lg text-primary text-purple-700 break-words w-full">
          {typeof String(children) === "string" ? children : null}
        </h2>
      ),
    },
    marks: {
      em: ({ children }: { children?: any }) => (
        <em className="text-gray-600 font-semibold break-words w-full">
          {typeof String(children) === "string" ? children : null}
        </em>
      ),

      // Ex. 2: rendering a custom `link` annotation
      link: ({
        value,
        children,
      }: {
        value?: { href: string };
        children?: any;
      }) => {
        const target = (value?.href ?? "").startsWith("http")
          ? "_blank"
          : undefined;
        return (
          <a
            href={value?.href}
            target={target}
            className="underline-offset-2 underline text-primary pointer-events-auto break-words w-full"
            rel={target === "_blank" ? "noindex nofollow" : undefined}
          >
            {typeof String(children) === "string" ? children : null}
          </a>
        );
      },
    },
    list: {
      bullet: ({ children }: { children: any }) => (
        <ul className="mt-xl w-full px-8 desktop:px-16 ">{children}</ul>
      ),
      number: ({ children }: { children: any }) => (
        <ol className="mt-lg w-full px-8 desktop:px-16 ">{children}</ol>
      ),

      checkmarks: ({ children }: { children: any }) => (
        <ol className="m-auto text-lg w-full px-8 desktop:px-16 ">
          {children}
        </ol>
      ),
    },
    listItem: {
      bullet: ({ children }: { children: any }) => (
        <li style={{ listStyleType: "disc" }}>{children}</li>
      ),

      checkmarks: ({ children }: { children: any }) => <li>✅ {children}</li>,
      number: ({ children }: { children: any }) => <li>{children}</li>,
    },
    types: {
      banner: CustomImageComponent,
      hero: CustomHeroComponent,
    },
  };

  return (
    // @ts-expect-error type error expected
    <PortableText value={content} components={components} />
  );
}

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

function BannerRenderer({ image }: { image?: IBanner }): JSX.Element {
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
              )} w-full h-[300px] tablet:h-[600px]`}
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
              )} w-full h-[400px] tablet:h-[600px]`}
            />
          )}
        </>
      )}
    </>
  );
}

function CustomImageComponent({ value }: { value: IBanner }) {
  return <BannerRenderer image={value} />;
}
function CustomHeroComponent({ value }: { value: IHero }): JSX.Element {
  function getHeroStyles(imagePosition: IHero["layout"]): string {
    switch (imagePosition) {
      case "image_center":
        return "justify-center items-center";
      case "image_left":
        return "flex-col desktop:flex-row";
      case "image_right":
        return "flex-col desktop:flex-row-reverse";
      default:
        return "flex-col desktop:flex-row";
    }
  }

  return (
    <Section
      padding="none"
      display="flex"
      className={` w-full  ${getHeroStyles(value.layout)}`}
    >
      {value.image !== undefined && (
        <div className={`flex-1 `}>
          <BannerRenderer image={value.image} />
        </div>
      )}
      {value.content !== undefined && (
        <div
          className={`p-12 flex flex-col  justify-center items-center  ${
            value.layout === "image_center"
              ? "absolute right-0 left-0 "
              : "w-full desktop:w-1/2"
          }`}
        >
          <div
            className={`text-left  relative ${
              value.layout === "image_center"
                ? "px-4 tablet:px-8 max-w-full tablet:max-w-prose "
                : "max-w-[320px]"
            }    `}
          >
            {/* <PortableText value={value.content} components={components} /> */}
            <ContentRenderer
              content={value.content}
              headerColor={value.header_color}
              paragraphColor={value.paragraph_color}
            />
          </div>
        </div>
      )}
    </Section>
  );
}
