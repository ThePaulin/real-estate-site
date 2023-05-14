import Head from "next/head";
import { HTMLAttributeReferrerPolicy } from "react";

export default function SEO({
  title,
  description,
  scripts,
}: {
  title: string;
  description: string;
  scripts: {
    type: "script" | "link";
    rel: string;
    href: string;
    integrity: string;
    crossOrigin: "anonymous" | "use-credentials" | "" | undefined;
    referrerPolicy: HTMLAttributeReferrerPolicy | undefined;
  }[];
}) {
  const editedTitle = title + " | Cribs KGL";

  return (
    <Head>
      <title>{editedTitle} </title>
      <meta name="description" content={description} key="desc" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
      {scripts?.map((script) => {
        return (
          <>
            {script.type === "script" ? (
              <script type="text/javascript" src={script.href} />
            ) : (
              <link
                rel={script.rel}
                href={script.href}
                crossOrigin={script.crossOrigin}
                integrity={script.integrity}
                referrerPolicy={script.referrerPolicy}
              />
            )}
          </>
        );
      })}
    </Head>
  );
}
