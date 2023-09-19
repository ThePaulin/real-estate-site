import React from "react";
import { Section } from "../elements";

export default function AccountSection({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Section
      padding="all"
      display="flex"
      className="flex-col justify-center items-center mb-16"
    >
      {children}
    </Section>
  );
}
