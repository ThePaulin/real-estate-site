import Layout from "@/components/global/Layout";
import { getAllPageSlugs, getPageData } from "../lib/pages";
import Section from "@/components/elements/Section";
import { useRouter } from "next/router";

type Params = {
  params: {
    slug: string;
  };
};

function Page() {
  const router = useRouter();

  console.log("params: ", router);

  const pageData = {
    title: router.query.slug,
    description: "test description",
  };

  return (
    <Layout title={pageData.title} description={pageData.description}>
      <Section as={"div"}>
        <p className="">{pageData.title}</p>
      </Section>
    </Layout>
  );
}

export default Page;

// export async function getStaticPaths() {
//   const paths = getAllPageSlugs();
//   return {
//     paths,
//     fallback: false,
//   };
// }
// export async function getStaticProps({  params }) {
//     const postData = getPageData(params.slug);
//     return {
//       props: {
//         pageData,
//       },
//     };
//   }
