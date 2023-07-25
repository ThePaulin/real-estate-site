import { Button, TextBox, Text, Section } from "@ali/src/components/elements";
import { type FormEvent, useRef } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import Layout from "@ali/src/components/global/Layout";
import clientPromise from "@ali/src/utils/mongodb";

export const getServerSideProps = async () => {
  try {
    await clientPromise;

    return {
      props: { isConnected: true },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { isConnected: false },
    };
  }
};

function Login({ isConnected }: { isConnected: boolean }) {
  const usernameRef = useRef("");
  const passwordRef = useRef("");

  const Router = useRouter();

  function handleSubmit(
    e: React.KeyboardEvent<HTMLInputElement> | FormEvent<HTMLFormElement>
  ): void {
    e.preventDefault();

    async function handleSignin() {
      const status = await signIn("credentials", {
        redirect: false,
        email: usernameRef.current,
        password: passwordRef.current,
      });

      if (status?.ok === true) {
        void Router.push("/account");
      } else {
        alert(status?.error);
      }
    }

    void handleSignin();
  }

  function onChange(
    e: React.BaseSyntheticEvent<Event, EventTarget>,
    inputRef: React.MutableRefObject<string>
  ) {
    inputRef.current = e.target.value;
  }
  return (
    <Layout title="login" description="login page">
      {isConnected ? (
        <Section
          padding="x"
          display="flex"
          className="flex-col justify-center items-center"
        >
          <Text size="heading">Got an Account?</Text>
          <form
            className="w-full flex flex-col gap-4 max-w-md"
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
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
            <div className="flex justify-center items-center gap-1 mt-2"></div>
            <Button type="submit" variant="primary">
              Login
            </Button>
          </form>
          <div className="flex justify-center items-center gap-1 mt-2">
            <Text size="small"> Don&apos;t have an account? Create one </Text>
            <Button
              href="/account/register"
              variant="link"
              className="relative"
            >
              <Text size="small" className="underline underline-offset-2">
                here
              </Text>
            </Button>
          </div>
        </Section>
      ) : (
        <Section
          padding="x"
          display="flex"
          className="flex-col justify-center items-center"
        >
          <Text>Loading...</Text>
        </Section>
      )}
    </Layout>
  );
}

export default Login;
