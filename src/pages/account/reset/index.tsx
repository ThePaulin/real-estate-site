import { Section, Text } from "@/components/elements";
import Layout from "@/components/global/Layout";

function Reset() {
  return (
    <Layout title="Reset" description="login page">
      <Section
        padding="x"
        display="flex"
        className="flex-col justify-center items-center"
      >
        <Text size="heading">Reset Password?</Text>
      </Section>
    </Layout>
  );
}

export default Reset;
