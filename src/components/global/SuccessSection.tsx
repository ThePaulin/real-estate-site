import React from "react";
import {
  Button,
  IconConfirmationCheckmark,
  IconLogo,
  Section,
  Text,
} from "../elements";

export default function SuccessSection({
  layout,
}: {
  layout: "contact-us" | "email-verification";
}) {
  const confirmationText = {
    "contact-us": {
      main: "Your message was sent",
      label: "We will get in touch ASAP!",
    },
    "email-verification": {
      main: "Verification email was sent",
      label: "Please check your email",
    },
  };
  return (
    <Section
      display="flex"
      padding="all"
      className="flex-col justify-center items-center gap-4 mt-14"
    >
      <IconLogo />
      <div className="flex flex-row justify-center items-center gap-2 mt-6">
        <Text fontWeight="semibold" className="">
          {confirmationText[layout].main}
        </Text>
        <IconConfirmationCheckmark />
      </div>
      <Text fontWeight="light" className="text-tertiary">
        {confirmationText[layout].label}
      </Text>
      <Button variant="link" href="/" className="text-primary mt-20">
        Home
      </Button>
    </Section>
  );
}
