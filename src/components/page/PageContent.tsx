import React from "react";
import type { IPage } from "@ali/src/types/index";
import { Section, Text } from "@ali/src/components/elements";
import BannerRenderer from "../global/BannerRenderer";
import ContentRenderer from "./ContentRenderer";

export default function PageContent({
  page,
  layout,
}: {
  page?: IPage;
  layout: "page" | "article";
}) {
  return (
    <div className="flex flex-col mt-8 pb-12   w-full">
      <div className="w-full flex justify-center py-8 ">
        <Text
          as="h1"
          size="custom"
          fontWeight="semibold"
          className=" text-3xl desktop:text-5xl px-4 text-center leading-snug text-secondary max-w-4xl break-words"
        >
          {page?.title}
        </Text>
      </div>

      <BannerRenderer image={page?.image} />

      <Section
        as="section"
        display="flex"
        padding="all"
        className="flex-col justify-center gap-6 items-center mx-auto w-full max-w-6xl "
      >
        {page?.author !== undefined && layout === "article" && (
          <div className="w-full flex flex-col gap-2 justify-start pt-6 pb-2 ">
            <Text className="text-black/20">
              Date: {page?.scheduled_for.slice(0, 10)}
            </Text>
            <Text className="text-black/60">
              {" "}
              Written by: {page?.author.firstname} {page?.author.lastname}
            </Text>
          </div>
        )}
        {page?.content !== undefined && (
          <ContentRenderer content={page?.content} />
        )}
      </Section>
    </div>
  );
}
