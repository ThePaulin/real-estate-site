import { Button, TextBox, Text, Section } from "@/components/elements";
import Layout from "@/components/global/Layout";
import { useRouter } from "next/router";
import { type FormEvent, useRef } from "react";

function Register() {
  const Router = useRouter();

  const usernameRef = useRef("");
  const passwordRef = useRef("");
  const firstnameRef = useRef("");
  const lastnameRef = useRef("");

  function handleSubmit(
    e: React.KeyboardEvent<HTMLInputElement> | FormEvent<HTMLFormElement>
  ): void {
    e.preventDefault();

    const email = usernameRef.current;
    const password = passwordRef.current;
    const firstname = firstnameRef.current;
    const lastname = lastnameRef.current;

    // Validation
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!email.includes("@") || !password) {
      alert("Invalid details");
      return;
    }
    // POST form values
    async function handleRegister() {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          firstname,
          lastname,
        }),
      });
      // Await for data for any desirable next steps
      const data = await res.json();
      // console.log(data);

      // user was created
      if (data.acknowledged === true) {
        void Router.push("/account/register/success");
      } else {
        alert(data?.message);
      }
    }

    void handleRegister();
    // return null;
  }

  function onChange(
    e: React.BaseSyntheticEvent<Event, EventTarget>,
    inputRef: React.MutableRefObject<string>
  ) {
    inputRef.current = e.target.value;
  }
  return (
    <Layout title="register" description="register page">
      <Section
        padding="all"
        display="flex"
        className="flex-col justify-center items-center mb-16"
      >
        <Text size="heading">Create an Account?</Text>
        <form
          className="w-full flex flex-col gap-4 max-w-md"
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <TextBox
            type="text"
            inputRef={firstnameRef}
            onChange={onChange}
            id="firstname"
            labelText="Firstname"
            placeholder="firstname"
            classNames={{
              root: "flex flex-col ",
              label: "p-1 ",
              input: "h-12 px-4 text-md",
            }}
          />
          <TextBox
            type="text"
            inputRef={lastnameRef}
            onChange={onChange}
            id="lastname"
            labelText="Lastname"
            placeholder="lastname"
            classNames={{
              root: "flex flex-col ",
              label: "p-1 ",
              input: "h-12 px-4 text-md",
            }}
          />
          <TextBox
            type="email"
            inputRef={usernameRef}
            onChange={onChange}
            id="username"
            labelText="Username"
            placeholder="username"
            classNames={{
              root: "flex flex-col ",
              label: "p-1 ",
              input: "h-12 px-4 text-md",
            }}
          />
          <TextBox
            type="password"
            inputRef={passwordRef}
            onChange={onChange}
            id="password"
            labelText="Password"
            placeholder="password"
            classNames={{
              root: "flex flex-col ",
              label: "p-1 ",
              input: "h-12 px-4 text-md",
            }}
          />
          <Button type="submit" variant="primary">
            Register
          </Button>
        </form>
        <div className="flex justify-center items-center gap-1 mt-2">
          <Text size="small">Have an account? Login one </Text>
          <Button href="/account/login" variant="link" className="relative">
            <Text size="small" className="underline underline-offset-2">
              here
            </Text>
          </Button>
        </div>
      </Section>
    </Layout>
  );
}

export default Register;
