import Layout from "@/components/global/Layout";
import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
} from "next/types";
import type { IPropertyFull } from "@/types";
import PropertyPage from "@/components/property/propertyPage";
import { sanityClient } from "@/client";

function Property({
  property,
}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  return (
    <Layout title={property.title} description={property.description}>
      <PropertyPage property={property} />
    </Layout>
  );
}
export default Property;

export const getServerSideProps: GetServerSideProps<{
  property: IPropertyFull;
}> = async (context) => {
  const { slug }: { slug?: string | string[] } = context.query;
  const query = `*[_type == "property" && slug.current == "${
    typeof slug === "string" ? slug : ""
  }"]{..., images->, contact->}`;

  const property: IPropertyFull[] = await sanityClient.fetch(query);
  return { props: { property: property[0] } };
};
