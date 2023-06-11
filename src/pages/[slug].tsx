import Layout from "@/components/global/Layout";
import Section from "@/components/elements/Section";
import { useRouter } from "next/router";

function Page(): JSX.Element {
  const router = useRouter();

  const pageData: { title: string; description: string } = {
    title: router?.query?.slug?.toString() ?? "/home",
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
