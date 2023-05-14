import Head from "next/head";
import Section from "../elements/Section";
import Footer from "../elements/Footer";
import Header from "./Header";
import SEO from "../elements/Seo";

function Layout({ children, title, description, scripts = [] }) {
  return (
    <>
      <SEO title={title} description={description} scripts={scripts} />
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}

export default Layout;
