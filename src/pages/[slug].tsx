import Layout from "@ali/src/components/global/Layout";
import Section from "@ali/src/components/elements/Section";
import { useRouter } from "next/router";
import type { IPage } from "../types";
import NotFound from "../components/global/NotFound";
import { useEffect, useState } from "react";
import PageContent from "../components/page/PageContent";

function Page(): JSX.Element {
  // const router = useRouter();
  const {
    query: { slug },
  } = useRouter();

  const [page, setPage] = useState<IPage>();
  const [loading, setLoading] = useState<boolean>();

  useEffect(() => {
    const getPage = async () => {
      setLoading(true);
      const reqBody = JSON.stringify({
        type: "one",
        slug,
        category: "page",
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
      setPage(article);
      setLoading(false);
    };

    if (slug !== undefined) {
      void getPage();
    }
  }, [slug]);

  // not found case

  if (page == null && loading === false) {
    return <NotFound type="page" />;
  }

  return (
    <Layout title={page?.title} description={page?.description}>
      <Section as={"div"} display="flex" className="justify-center">
        <PageContent page={page} layout="page" />
      </Section>
    </Layout>
  );
}

export default Page;
