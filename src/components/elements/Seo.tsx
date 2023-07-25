import { type IScripts } from "@ali/src/types";
import Head from "next/head";

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

  return (
    <Head>
      <title>{`${editedTitle}`}</title>
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

export default SEO;
