import Section from "../elements/Section";
import Footer from "../global/Footer";
import Header from "./Header";
import SEO from "../elements/Seo";
import { type IMenuObject, type IScripts } from "@/types";
import { useEffect, useState } from "react";
import { sanityClient } from "@/client";

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
    const query = '*[_type == "navigation"]';
    sanityClient.fetch(query).then((data) => {
      setMenuItems(data);
    });
  }, []);

  return (
    <div className="h-screen">
      <SEO title={title} description={description} scripts={scripts} />
      <header role="header">
        {menuItems !== undefined ? (
          <Header menuItems={menuItems[0]?.header} />
        ) : null}
      </header>
      <main role="main" className="h-fit">
        {children}
      </main>
      <Section
        padding="none"
        as={"footer"}
        role="footer"
        className="bottom-0 mb-0 h-fit "
      >
        {menuItems !== undefined ? (
          <Footer menuItems={menuItems[0]?.footer} />
        ) : null}
      </Section>
    </div>
  );
}

export default Layout;
