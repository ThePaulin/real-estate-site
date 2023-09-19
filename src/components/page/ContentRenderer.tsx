// ts-expect-error PortableText missing
import { PortableText } from "@portabletext/react";
// import type { PortableTextReactComponents } from 'portabletext/react';
import type { IBlock, IImage, IHero, IBanner } from "@ali/src/types";
import { Section, Text } from "../elements";
import BannerRenderer from "../global/BannerRenderer";
import { getCSSVariable } from "@ali/src/utils/utils";

export default function ContentRenderer({
  content,
  headerColor,
  paragraphColor,
}: {
  content: Array<IBlock | IImage | IHero> | (IBlock | IImage | IHero);
  headerColor?: IHero["header_color"];
  paragraphColor?: IHero["paragraph_color"];
}): JSX.Element {
  function setColor(
    color?: IHero["header_color"] | IHero["paragraph_color"]
  ): string {
    let colorStyle = "";

    if (color === "primary") {
      colorStyle = `rgb(${getCSSVariable("--primary-color")})`;
    } else if (color === undefined) {
      // default color
      color = "black";
    } else {
      colorStyle = color;
    }

    return colorStyle;
  }

  interface IPortableText {
    block: {
      h1: ({ children }: { children?: any }) => JSX.Element;
      h2: ({ children }: { children?: any }) => JSX.Element;
      h3: ({ children }: { children?: any }) => JSX.Element;
      h4: ({ children }: { children?: any }) => JSX.Element;
      h5: ({ children }: { children?: any }) => JSX.Element;
      h6: ({ children }: { children?: any }) => JSX.Element;
      normal: ({ children }: { children?: any }) => JSX.Element;
      blockquote: ({ children }: { children?: any }) => JSX.Element;
    };
    marks: {
      em: ({ children }: { children?: any }) => JSX.Element;
      link: ({ children }: { children?: any }) => JSX.Element;
    };
    list: {
      bullet: ({ children }: { children: any }) => JSX.Element;
      number: ({ children }: { children: any }) => JSX.Element;
      checkmarks: ({ children }: { children: any }) => JSX.Element;
    };
    listItem: {
      bullet: ({ children }: { children: any }) => JSX.Element;
      number: ({ children }: { children: any }) => JSX.Element;
      checkmarks: ({ children }: { children: any }) => JSX.Element;
    };
    types: {
      banner: ({ value }: { value: IBanner }) => JSX.Element;
      hero: ({ value }: { value: IHero }) => JSX.Element;
    };
  }

  const components: IPortableText = {
    block: {
      h1: ({ children }: { children?: any }) => (
        <Text
          as={"h1"}
          size="header"
          fontWeight="semibold"
          style={{ color: setColor(headerColor) }}
          className={`break-words w-full`}
        >
          {children}
        </Text>
      ),
      h2: ({ children }: { children?: any }) => (
        <Text
          as={"h2"}
          size="custom"
          fontWeight="semibold"
          style={{ color: setColor(headerColor) }}
          className={`text-3xl break-words w-full`}
        >
          {typeof String(children) === "string" ? children : null}
        </Text>
      ),
      h3: ({ children }: { children?: any }) => (
        <Text
          as={"h3"}
          size="custom"
          fontWeight="semibold"
          style={{ color: setColor(headerColor) }}
          className={`text-2xl break-words w-full`}
        >
          {typeof String(children) === "string" ? children : null}
        </Text>
      ),
      h4: ({ children }: { children?: any }) => (
        <Text
          as={"h4"}
          size="custom"
          fontWeight="semibold"
          style={{ color: setColor(headerColor) }}
          className={`text-xl break-words w-full`}
        >
          {typeof String(children) === "string" ? children : null}
        </Text>
      ),
      h5: ({ children }: { children?: any }) => (
        <Text
          as={"h5"}
          size="custom"
          fontWeight="semibold"
          style={{ color: setColor(headerColor) }}
          className={`text-lg break-words w-full`}
        >
          {typeof String(children) === "string" ? children : null}
        </Text>
      ),
      h6: ({ children }: { children?: any }) => (
        <Text
          as={"h6"}
          size="custom"
          fontWeight="semibold"
          style={{ color: setColor(headerColor) }}
          className={`text-base break-words w-full`}
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
          style={{ color: setColor(paragraphColor) }}
          className={`text-base break-words w-full`}
        >
          {typeof String(children) === "string" ? children : null}
        </Text>
      ),

      blockquote: ({ children }: { children?: any }) => (
        <blockquote className="border-l-purple-500 break-words w-full">
          {typeof String(children) === "string" ? children : null}
        </blockquote>
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
        <ol className="mt-lg w-full px-8 desktop:px-16 flex flex-col gap-8 ">
          {children}
        </ol>
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
      // number: ({children}: {children: any}) => <li>{children}</li>

      number: ({ children }: { children: any }) => (
        <li
          style={{
            listStyle: "decimal",
            display: "list-item",
            listStylePosition: "inside",
          }}
        >
          {children}
        </li>
      ),
    },
    types: {
      banner: CustomImageComponent,
      hero: CustomHeroComponent,
    },
  };

  return (
    // @ts-expect-error expect type error, using custom interface
    <PortableText value={content} components={components} />
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
