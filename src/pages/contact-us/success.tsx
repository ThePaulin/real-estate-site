import Layout from "@ali/src/components/global/Layout";
import SuccessSection from "@ali/src/components/global/SuccessSection";
import React from "react";

export default function success() {
  return (
    <Layout title="success" description="success">
      <SuccessSection layout="contact-us" />
    </Layout>
  );
}
