import { Section, Text } from "@ali/src/components/elements";
import Layout from "@ali/src/components/global/Layout";
import { motion } from "framer-motion";
import SearchDrawer from "../components/global/SearchDrawer";
import { useEffect, useState } from "react";
import type { IArticlesAPI, IHeroBanner, articleRequestBody } from "../types";
import ArticlesSection from "../components/global/ArticleSection";
import BannerRenderer from "../components/global/BannerRenderer";
import ServiceStatement from "../components/global/ServiceStatement";
import Link from "next/link";

export default function Home(): JSX.Element {
  const [loading, setLoading] = useState<boolean>(true);
  const [articles, setArticles] = useState<IArticlesAPI["articles"]>();
  const [heroBanner, setHeroBanner] = useState<IHeroBanner>();

  useEffect(() => {
    const getHeroBanner = async () => {
      setLoading(true);
      const bodyObj: any = {
        title: "Home",
      };
      const reqBody = JSON.stringify(bodyObj);
      const res = await fetch("/api/heroBanner", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: reqBody,
      });

      const { heroBanner }: { heroBanner: IHeroBanner } = await res.json();
      setHeroBanner(heroBanner);
    };

    const getArticles = async () => {
      setLoading(true);
      const bodyObj: articleRequestBody = {
        type: "all",
        category: "article",
      };
      const reqBody = JSON.stringify(bodyObj);
      const res = await fetch("/api/articles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: reqBody,
      });

      const { articles }: { articles: IArticlesAPI["articles"] } =
        await res.json();
      setArticles(articles);
      setLoading(false);
    };

    void getHeroBanner();
    void getArticles();
  }, []);

  return (
    <>
      <Layout title={"Home Page"} description={"home page Cribs KGL"}>
        {!loading ? (
          <div className=" bg-white">
            <Section
              as="div"
              padding="none"
              display="flex"
              className="justify-center items-center w-screen  "
            >
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="flex flex-col gap-2 "
              >
                <div className="w-full relative flex justify-center items-start ">
                  <div className=" absolute w-full h-fit  bottom-3/4 desktop:bottom-1/2 flex flex-col justify-center items-center">
                    <Text
                      as={"h1"}
                      fontWeight="semibold"
                      size="header"
                      className="text-white"
                    >
                      Start Here!
                    </Text>
                    <div className=" w-full flex justify-center  items-center py-4  ">
                      <SearchDrawer
                        close={() => {}}
                        open={true}
                        style="embedded"
                      />
                    </div>
                  </div>
 
                  <BannerRenderer
                    image={heroBanner?.banner}
                    className="w-screen h-[600px] desktop:h-[800px] "
                  />
                </div>
                <Link href={'/terms-of-service'}>terms of service</Link>

                <ArticlesSection articles={articles} layout="flex" />
                <ServiceStatement />
              </motion.div>
            </Section>
          </div>
        ) : (
          <></>
        )}
      </Layout>
    </>
  );
}
