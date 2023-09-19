import Layout from "@ali/src/components/global/Layout";
import { useUrl } from "@ali/src/hooks";
import type { IPropertyFullSearch } from "@ali/src/types";
import React, { useEffect, useState } from "react";
import { Grid, Section, Text } from "@ali/src/components/elements";

import { capitaliseFirstLetter } from "../utils/utils";
import PropertyCard from "@ali/src/components/search/PropertyCard";

const Search = () => {
  const { href, search } = useUrl();

  const [found, setFound] = useState<IPropertyFullSearch[]>([]);
  const [foundAndFiltered, setFoundAndFiltered] = useState<
    IPropertyFullSearch[]
  >([]);

  const decodedUrl = decodeURIComponent(href);
  const params = new URLSearchParams(decodedUrl);

  const typeParam = params.get("type")?.toLowerCase();
  const categoryParam = params.get("category")?.toLowerCase();

  const [properties, setProperties] = useState<IPropertyFullSearch[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const propertQuery = `*[_type == "property" && status == "Available" || status == "Pending" ]{ ...,images->{...,images[0]}, contact->}  | order(_createdAt asc)`;

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
          type: "searchPage",
        }),
      });
      const data = await res.json();

      setProperties(Object.values(data.properties));
      setIsLoading(false);
    }

    void fetchProperties();
  }, [isLoading]);

  const queryParam = decodeURIComponent(
    search.split("&")[0].split("=")[1]
  ).toLowerCase();
  const [fullProperty, setFullProperty] = useState<IPropertyFullSearch[]>([]);

  function filterItems(
    items: IPropertyFullSearch[],
    categoryParam: string | undefined,
    typeParam: string | undefined,
    queryParam: string
  ): IPropertyFullSearch[] {
    const qPramArr: any[] = queryParam.split(" ");
    function filterBy(
      item: IPropertyFullSearch,
      by: keyof typeof item,
      value: string | undefined
    ) {
      if (typeof item[by] === "string" && typeof value === "string") {
        if (item[by] === capitaliseFirstLetter(value)) {
          return true;
        } else return false;
      }
    }

    function checkQuery(item: IPropertyFullSearch, queryParam: string) {
      // one word search
      if (qPramArr.length === 1) {
        if (
          item.title.toLowerCase().includes(queryParam) ||
          item.description.toLowerCase().includes(queryParam) ||
          item.address.city.toLowerCase().includes(queryParam) ||
          item.address.zone.toLowerCase().includes(queryParam) ||
          item.address.street.toLowerCase().includes(queryParam) ||
          item.tags.find((x) => x.toLowerCase().includes(queryParam)) != null
        ) {
          return true;
        } else return false;

        // multiword search
      } else {
        let finds: number = 0;
        for (const word of qPramArr) {
          if (
            item.title.toLowerCase().includes(word) ||
            item.description.toLowerCase().includes(word) ||
            item.address.city.toLowerCase().includes(queryParam) ||
            item.address.zone.toLowerCase().includes(queryParam) ||
            item.address.street.toLowerCase().includes(queryParam) ||
            item.tags.find((x) => x.toLowerCase().includes(word)) != null ||
            item.address.city.toLowerCase().includes(word) ||
            item.address.zone.toLowerCase().includes(word) ||
            item.price === Number(word)
          ) {
            finds += 1;
          }
        }
        // tolerance
        if (finds > qPramArr.length / 4) {
          return true;
        } else return false;
      }
    }

    const ret: IPropertyFullSearch[] = [];
    if (items?.length > 0) {
      for (const item of items) {
        const hasType = filterBy(item, "type", typeParam);
        const hasCategory = filterBy(item, "category", categoryParam);
        if (hasType === true && hasCategory === true) {
          const hasQuery = checkQuery(item, queryParam);
          if (hasQuery) ret.push(item);
        }
      }
    }
    return ret;
  }

  useEffect(() => {
    const result = filterItems(
      properties ?? [],
      categoryParam,
      typeParam,
      queryParam
    );
    setFoundAndFiltered(result);
    if (properties !== undefined) {
      setFound(properties);
    }
  }, [properties]);

  const notFound = foundAndFiltered.length === 0;

  useEffect(() => {
    if (notFound) {
      setFullProperty(found);
    } else {
      setFullProperty(foundAndFiltered);
    }
  }, [found, foundAndFiltered]);

  return (
    <>
      {fullProperty?.length > 0 && (
        <Layout title="search" description="search page">
          {/* <Suspense fallback={<h1 className="px-4">Loading...</h1>}> */}
          <Section padding="y" display="flex" className="flex-col ">
            {notFound ? (
              <Text className="px-4" size="lead">
                No results found :&#40;
              </Text>
            ) : null}
            <div className="mt-4">
              <div className="flex flex-col">
                {!notFound ? (
                  <Text
                    className="px-4"
                    as="span"
                    size={"lead"}
                    fontWeight={"light"}
                  >
                    Showing results for: &quot;
                    <Text as="span" size={"lead"} fontWeight="semibold">
                      {queryParam}
                    </Text>
                    &quot;.{" "}
                  </Text>
                ) : (
                  <Text className="px-4">Explore our Catalogue</Text>
                )}
                <Grid className="mt-10 px-2">
                  {fullProperty?.map((item) => {
                    return (
                      item !== undefined && (
                        <PropertyCard item={item} key={item?._id} />
                      )
                    );
                  })}
                </Grid>
              </div>
            </div>
          </Section>
          {/* </Suspense> */}
        </Layout>
      )}
    </>
  );
};

export default Search;
