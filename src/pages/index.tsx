import Section from "@/components/elements/Section";
import Layout from "@/components/global/Layout";
import { motion } from "framer-motion";

export default function Home(): JSX.Element {
  return (
    <>
      <Layout title={"Home Page"} description={"home page Cribs KGL"}>
        <main className=" bg-white h-screen">
          <Section
            as="div"
            display="flex"
            className="justify-center items-center "
          >
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
              <h1>home page</h1>
            </motion.div>
          </Section>
        </main>
      </Layout>
    </>
  );
}
