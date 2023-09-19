import Layout from "@ali/src/components/global/Layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import type { IPage } from "@ali/src/types/index";
import NotFound from "@ali/src/components/global/NotFound";
import PageContent from "@ali/src/components/page/PageContent";

const ArticlePage = (): JSX.Element => {
  const {
    query: { slug },
  } = useRouter();

  const [article, setArticle] = useState<IPage>();
  const [loading, setLoading] = useState<boolean>();

  useEffect(() => {
    const getPage = async () => {
      setLoading(true);
      const reqBody = JSON.stringify({
        type: "one",
        slug,
        category: "article",
        // query: typeof slug === 'string' ? `*[_type == 'page' && slug.current == '${slug}']` : `*[_type == 'page'][0]`,
      });
      const res = await fetch("/api/articles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: reqBody,
      });

      // const query = `*[_type=='page'] | order(_createdAt asc)`;
      // const res = await sanityClient.fetch(query);

      const { article }: { article: IPage } = await res.json();
      setArticle(article);
      setLoading(false);
    };

    if (slug !== undefined) {
      void getPage();
    }
  }, [slug]);

  // not found case

  if (article == null && loading === false) {
    return <NotFound type="article" />;
  }

  return (
    <>
      <Layout title={article?.title} description={article?.description}>
        {article != null ? (
          // <ArticleContent article={article} />
          <PageContent page={article} layout={"article"} />
        ) : (
          <>{loading === false && <NotFound type="article" />}</>
        )}
      </Layout>
    </>
  );
};
export default ArticlePage;
