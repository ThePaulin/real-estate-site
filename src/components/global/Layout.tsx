import Head from "next/head";
import Section from "../elements/Section";
import Footer from "../global/Footer";
import Header from "./Header";
import SEO from "../elements/Seo";
// import '../../styles/globals.css';

function Layout({ children, title, description, scripts = [] }) {
  return (
    <div className="h-screen">
      <SEO title={title} description={description} scripts={scripts} />
      <header role="header">
        <Header />
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
        <Footer />
      </Section>
    </div>
  );
}

export default Layout;
