import { Button, Section, Text } from "@ali/src/components/elements";
import Layout from "@ali/src/components/global/Layout";

function success() {
  return (
    <Layout
      title="register success"
      description="You have successfully created an account!"
    >
      <Section
        padding="all"
        display="flex"
        className="flex-col items-center justify-start gap-8"
      >
        <Text>You have successfully created an account!</Text>

        <Button
          variant="link"
          className="w-full tablet:max-w-sm border-2 border-primary px-4 py-2 hover:bg-primary hover:text-white transition ease-in-out duration-100 hover:font-bold "
          href="/account/login"
        >
          Login
        </Button>
      </Section>
    </Layout>
  );
}

export default success;
