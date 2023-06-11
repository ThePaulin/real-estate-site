import Section from "@/components/elements/Section";
import Layout from "@/components/global/Layout";
import { motion } from "framer-motion";
import { sanityClient } from "../client";
import { useEffect, useState } from "react";
import { IProperty } from "@/types";


export default function Home(): JSX.Element {

  const [properties , setProperties] = useState();

  useEffect(() => {
    const query = '*[_type == "property"]';
    sanityClient.fetch(query).then((data: IProperty[])=>{
      setProperties(data)
    })
  }, [])

  useEffect(() => {
    console.log("Home", properties)
  }, [properties])
  
  

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
              {
                properties ? (
                  <>
                    {properties.map((p: IProperty) =>{
                  return(
                    <p>{p.title}</p>
                  )
                })}
                  </>
                ): null
              }
            </motion.div>
          </Section>
        </main>
      </Layout>
    </>
  );
}
