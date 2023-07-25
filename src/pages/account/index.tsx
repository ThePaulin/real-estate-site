import { useSession, signOut } from "next-auth/react";
import clientPromise from "../../utils/mongodb";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import { Button, Section } from "@ali/src/components/elements";
import Layout from "@ali/src/components/global/Layout";


interface ConnectionStatus {
  isConnected: boolean;
}

export const getServerSideProps: GetServerSideProps<
  ConnectionStatus
> = async () => {
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

export default function Component({
  isConnected,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { data: session, status } = useSession();

  return (
    <Layout title="account" description="account">
      {isConnected ? (
        <Section
          padding="all"
          display="flex"
          className="flex-col justify-center items-center"
        >
          {status !== "authenticated" ? (
            <Section
              padding="none"
              display="flex"
              className="flex-col justify-center items-center gap-4"
            >
              <Button
                variant="link"
                className="w-full tablet:max-w-sm border-2 border-primary px-4 py-2 hover:bg-primary hover:text-white transition ease-in-out duration-100 hover:font-bold "
                href="/account/login"
              >
                Login
              </Button>
              <Button
                variant="link"
                className="w-full tablet:max-w-sm border-2 border-primary px-4 py-2 hover:bg-primary hover:text-white transition ease-in-out duration-100 hover:font-bold "
                href="/account/register"
              >
                Register
              </Button>
            </Section>
          ) : (
            <Section
              padding="none"
              display="flex"
              className="flex-col justify-center items-center"
            >
              <p>Signed in as {session?.user?.email}</p>
              <p>Signed in as {session?.user?.firstname}</p>
              <Button onClick={signOut} variant={"outline"}>
                Logout
              </Button>
            </Section>
          )}
        </Section>
      ) : (
        "Loading..."
      )}
    </Layout>
  );
}
