import Layout from "@ali/src/components/global/Layout";
import type { IPropertyFull } from "@ali/src/types";
import PropertyPage from "../../components/property/propertyPage";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function Property(): JSX.Element {
  const {
    query: { slug },
  } = useRouter();

  const [property, setProperty] = useState<IPropertyFull>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const propertQuery = `*[_type == "property" && slug.current == "${
    typeof slug === "string" ? slug : ""
  }"]{..., images->, contact->} | order(_createdAt asc)`;

  useEffect(() => {
    async function fetchProperties() {
      const res = await fetch("/api/properties", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          query: propertQuery,
          type: "propertyPage",
        }),
      });
      const data = await res.json();

      setProperty(data.property);
      setIsLoading(false);
    }

    void fetchProperties();
  }, [isLoading, propertQuery]);

  return (
    <>
      {property !== undefined && (
        <Layout title={property?.title} description={property?.description}>
          <PropertyPage property={property} />
        </Layout>
      )}
    </>
  );
}
export default Property;
