import React, { useEffect, useState } from "react";
import Layout from "../components/global/Layout";
import { Section, Text } from "../components/elements";
import type { IMenuObject } from "../types";
import Link from "next/link";

export default function Sitemap() {
  const [menuItems, setMenuItems] = useState<IMenuObject[]>();

  useEffect(() => {
    async function runQuery() {
      const res = await fetch("/api/navigation", {
        method: "GET",
      });

      const data = await res.json();
      setMenuItems(data.menuItems);
    }
    void runQuery();
  }, []);

  return (
    <Layout
      title="site-map"
      description="Cribs KGL site-map. We are here to help you navigate our website!"
    >
      <Section
        as={"ul"}
        display="flex"
        padding="none"
        className="flex-col gap-8 items-center pb-16 px-8"
      >
        <div className="w-full flex justify-center py-4 ">
          <Text
            as="h1"
            size="custom"
            fontWeight="semibold"
            className=" text-3xl desktop:text-5xl px-4 text-center leading-snug text-secondary max-w-4xl break-words"
          >
            Site-map
          </Text>
        </div>
        {menuItems !== undefined ? (
          menuItems[0].header?.concat(menuItems[0].footer).map((item) => {
            return (
              <li key={item?.cta}>
                <Link href={item?.link}>{item?.cta}</Link>
              </li>
            );
          })
        ) : (
          <></>
        )}
      </Section>
    </Layout>
  );
}
