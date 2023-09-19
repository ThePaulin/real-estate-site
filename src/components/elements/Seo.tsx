import { type IScripts } from "@ali/src/types";
import Head from "next/head";
import { useUrl } from "@ali/src/hooks";

export function SEO({
  title,
  description,
  scripts,
}: {
  title: string;
  description: string;
  scripts: IScripts["scripts"];
}): JSX.Element {
  const editedTitle = `${title} | Cribs KGL`;
  const { origin, pathname } = useUrl();

  // for JSON-LD
  const structuredContent = {
    "@context": origin,
    "@type": pathname.split("/")[1],
    headline: title,
    description,
  };

  return (
    <Head>
      <title>{`${editedTitle}`}</title>
      <meta name="description" content={description} key="desc" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
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
      <script type="application/ld+json">
        {JSON.stringify(structuredContent)}
      </script>{" "}
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}

export default SEO;
