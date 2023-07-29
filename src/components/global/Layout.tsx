import Section from "../elements/Section";
import Footer from "../global/Footer";
import Header from "./Header";
import SEO from "../elements/Seo";
import { type IMenuObject, type IScripts } from "@ali/src/types";
import { useEffect, useState } from "react";

function Layout({
  children,
  title,
  description,
  scripts = [],
}: {
  children: React.ReactNode;
  title: string;
  description: string;
  scripts?: IScripts["scripts"];
}): JSX.Element {
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
    <div className="h-screen">
      <SEO title={title} description={description} scripts={scripts} />
      <header role="header" className=" z-40">
        {menuItems !== undefined ? (
          <Header menuItems={menuItems[0]?.header} />
        ) : null}
      </header>
      <main role="main" className="h-fit z-0 min-h-[70vh]">
        {children}
      </main>
      <Section
        padding="none"
        as={"footer"}
        role="footer"
        className="bottom-0 mb-0 h-fit z-40 "
      >
        {menuItems !== undefined ? (
          <Footer menuItems={menuItems[0]?.footer} />
        ) : null}
      </Section>
    </div>
  );
}

export default Layout;
