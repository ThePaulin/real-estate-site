import React from "react";
import Layout from "./Layout";

export default function NotFound({
  type,
}: {
  type: "page" | "article" | "property";
}) {
  // implement not found for different types of pages
  return (
    <Layout title="Not Found" description="Resource not found!">
      {type} Not Found
    </Layout>
  );
}
