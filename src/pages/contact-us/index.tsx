import React, { type FormEvent, useRef, useState } from "react";
import Layout from "../../components/global/Layout";
import {
  Button,
  IconLocation,
  IconPhone,
  Section,
  Text,
  TextBox,
} from "../../components/elements";
import { useRouter } from "next/router";
import { CustomListBox } from "@ali/src/components/global/SearchDrawer";

export default function ContactUs() {
  const buttonStyle =
    "bg-tertiary w-full flex flex-col gap-4 justify-center items-center p-10 rounded-md";
  return (
    <Layout
      title="Contact Us"
      description="Got any question for us? Get in contact with us and we&;ll contact you as soon as possible!"
    >
      <Section
        display="flex"
        padding="all"
        className=" flex-col justify-center items-center gap-8"
      >
        <Text size="header" fontWeight="semibold">
          Contact Us
        </Text>
        <div className="flex flex-col justify-center items-center gap-4">
          <Button
            variant="link"
            target="blank"
            href="https://goo.gl/maps/QusTxvSK87d3xYW38"
            className={buttonStyle}
          >
            <IconLocation />
            <Text>
              1234, example Route, example City, example Province, Example
              Country!
            </Text>
          </Button>
          <Button variant="link" href="tel:123123123" className={buttonStyle}>
            <IconPhone />
            <Text>Give us a CALL!</Text>
          </Button>
        </div>
        <ContactForm />
      </Section>
    </Layout>
  );
}

function ContactForm() {
  const listOptions = [
    "Sell with us",
    "Buy with us",
    "Information request",
    "Other",
  ];

  const [inquiryOption, setInquiryOption] = useState<string>(listOptions[0]);
  const router = useRouter();
  const nameRef = useRef("");
  const emailRef = useRef("");
  const messageRef = useRef("");
  function onChange(
    e: React.BaseSyntheticEvent<Event, EventTarget>,
    inputRef: React.MutableRefObject<string>
  ) {
    inputRef.current = e.target.value;
  }
  async function handleSubmit(
    e:
      | React.KeyboardEvent<HTMLInputElement>
      | FormEvent<HTMLFormElement>
      | HTMLFormElement
  ) {
    e.preventDefault();

    // const data = new FormData(e.currentTarget);
    const data = JSON.stringify({
      email: emailRef.current,
      name: nameRef.current,
      inquiry: inquiryOption,
      message: messageRef.current,
    });

    try {
      const response = await fetch("/api/contact", {
        body: data,
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Invalid response:  ${response.status}`);
      }
      void router.push("contact-us/success");
    } catch (e) {
      console.error(e);
      alert("We can't submit the form, try again later? ");
    }
  }

  return (
    <form
      id="form"
      onSubmit={(e) => {
        void handleSubmit(e);
      }}
      className="w-full max-w-xl flex flex-col gap-4 items-end"
    >
      <TextBox
        type="text"
        name="name"
        inputRef={nameRef}
        onChange={onChange}
        id="name"
        labelText="Name"
        placeholder="Enter your name"
        classNames={{
          root: "flex flex-col w-full ",
          label: "p-1 ",
          input: "h-12 px-4 text-md",
        }}
      />
      <TextBox
        type="email"
        name="email"
        inputRef={emailRef}
        onChange={onChange}
        id="email"
        labelText="Email"
        placeholder="Enter your email"
        classNames={{
          root: "flex flex-col  w-full  ",
          label: "p-1 ",
          input: "h-12 px-4 text-md",
        }}
      />
      <div className="flex flex-col desktop:flex-row justify-center desktop:justify-end gap-4 w-full">
        <label htmlFor="inquiry-type" className="whitespace-nowrap">
          Inquiry Type:{" "}
        </label>
        <div className="w-1/3">
          <CustomListBox
            setSelected={setInquiryOption}
            selected={inquiryOption}
            options={listOptions}
          />
        </div>
      </div>

      <TextBox
        type="textarea"
        name="message"
        inputRef={messageRef}
        onChange={onChange}
        id="message"
        labelText="Message"
        placeholder="Type your message here!"
        classNames={{
          root: "flex flex-col  w-full  ",
          label: "p-1 ",
          input: "h-[12em] px-4 text-md",
        }}
      />
      <Button type="submit" variant={"primary"} className="max-w-sm rounded-md">
        Send
      </Button>
    </form>
  );
}
