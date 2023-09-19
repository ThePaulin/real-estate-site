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
  title?: string;
  description?: string;
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
    <div className="h-screen ">
      <SEO
        title={title ?? "Page Not Found"}
        description={description ?? "Page does not exist"}
        scripts={scripts}
      />
      <header
        role="header"
        className="w-full h-[60px] flex justify-center items-center top-0 fixed bg-white z-40"
      >
        {menuItems !== undefined ? (
          <Header menuItems={menuItems[0]?.header} />
        ) : null}
      </header>
      <main role="main" className="h-fit z-0 min-h-[70vh] relative  ">
        <Section
          display="flex"
          padding="none"
          className="justify-center items-center  mt-header"
        >
          {children}
        </Section>
      </main>
      <Section
        padding="none"
        as={"footer"}
        role="footer"
        className=" bottom-0 mb-0 h-fit z-40 "
      >
        {menuItems !== undefined ? (
          <Footer menuItems={menuItems[0]?.footer} />
        ) : null}
      </Section>
    </div>
  );
}

export default Layout;
