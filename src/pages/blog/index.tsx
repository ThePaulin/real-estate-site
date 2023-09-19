import { Section, Text } from "@ali/src/components/elements";
import ArticlesSection from "@ali/src/components/global/ArticleSection";
import Layout from "@ali/src/components/global/Layout";
import type { IArticlesAPI, articleRequestBody } from "@ali/src/types";
import React, { useEffect, useState } from "react";

export default function Blog() {
  const [loading, setLoading] = useState<boolean>(true);
  const [articles, setArticles] = useState<IArticlesAPI["articles"]>();

  useEffect(() => {
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

    void getArticles();
  }, []);
  return (
    <Layout
      title="Blog"
      description="Explore curated articles to help you with chosing and purchasing the right home for you!"
    >
      {!loading ? (
        <Section
          display="flex"
          padding="y"
          className="flex-col justify-center w-full items-center gap-0 "
        >
          <Text
            as={"h1"}
            fontWeight="semibold"
            size="header"
            className=" text-center"
          >
            Blog
          </Text>
          <ArticlesSection articles={articles} layout="grid" />
        </Section>
      ) : (
        <></>
      )}
    </Layout>
  );
}
