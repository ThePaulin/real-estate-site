import { useSession, signIn, signOut } from "next-auth/react";

export default function Component() {
  const { data: session } = useSession();
  if (session !== null) {
    return (
      <>
        Signed in as {session?.user?.email} <br />
        <button
          onClick={() => {
            void signOut();
          }}
        >
          Sign out
        </button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button
        onClick={() => {
          void signIn();
        }}
      >
        Sign in
      </button>
    </>
  );
}
