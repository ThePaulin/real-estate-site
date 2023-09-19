import { useSession, signOut } from "next-auth/react";
import clientPromise from "../../utils/mongodb";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import {
  Button,
  IconAccount,
  Section,
  Text,
} from "@ali/src/components/elements";
import Layout from "@ali/src/components/global/Layout";
import SavedItems from "@ali/src/components/global/SavedItems";

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
          padding="x"
          display="flex"
          className="flex-col justify-center items-center w-full  py-16 "
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
              className="flex-col justify-center items-center gap-6"
            >
              {/* <p>Signed in as {session?.user?.email}</p>
              <p>Signed in as {session?.user?.firstname}</p> */}
              <div className="w-full flex justify-end">
                <IconAccount />
              </div>
              <div className="flex flex-col justify-start w-full">
                <Text as={"h1"} size="lead" fontWeight="bold">
                  Profile:
                </Text>
                <ul>
                  <li>Firstname: {session?.user.firstname}</li>
                  <li>Lastname: {session?.user.lastname}</li>
                  <li>Email: {session?.user.email}</li>
                </ul>
              </div>
              <div className="py-16">
                <SavedItems
                  savedItems={session?.user.savedItems}
                  account={true}
                />
              </div>

              <Button
                className="max-w-sm mt-8"
                onClick={signOut}
                variant={"outline"}
              >
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
