import { sanityClient, urlFor } from "@/client";
import type { IPropertyFullSearch, ISiteMapPost, ISitemapPostsObject } from "@/types";
import { encode } from "punycode";

const CHG_FREQ = {
  property: "daily",
  page: "weekly",
  blog: "daily",
};
function encodeXML(string: string): string {
  // convert special characters into HTML entities
  return string.replace(/[&<>'"]/g, (el) => `&#${el.charCodeAt(0)};`);
}

function renderTag(post: ISiteMapPost) {
  return `
       <url>
       <loc>${`${post.url}`}</loc>
       <lastmod>${post.lastMod}</lastmod>
        <changefreq>${post.changeFreq}</changefreq>
        ${post.image?.url !== undefined ? 
            `<image:image>
            <image:loc>${post.image.url}</image:loc>
            <image:title>${post.title}</image:title>
            <image:caption/>
            </image:image>`
            : ''}
       </url>
       
     `;
}


function generateSiteMap(posts: ISitemapPostsObject , origin: string) {
  const propertyData =
    posts?.properties?.length > 0
      ? posts.properties
          .filter((p) => p.slug.current)
          .map((p) => {
            const url = `${origin}/properties/${p.slug.current}`;
            return {
              title: encodeXML(p?.title),
              url,
              lastMod: encodeXML(p._updatedAt),
              changeFreq: encodeXML(CHG_FREQ.property),
              image: {
                url: encodeXML(urlFor(p?.images?.images?.image).url()),
              }
            };
          })
      : [];

  const pageData =
    posts?.pages?.length > 0
      ? posts.pages
          .filter((p) => p.slug.current)
          .map((p) => {
            const url = encodeXML(`${origin}/pages/${p.slug.current}`);
            return {
              title: encodeXML(p?.title),
              url,
              lastMod: encodeXML(p._updatedAt),
              changeFreq: encodeXML(CHG_FREQ.page),
            //   image: {
            //     url: urlFor(p.images.images.image).url(),
            //   }
            };
          })
      : [];

  const blogData =
    posts?.blogs?.length > 0
      ? posts.blogs
          .filter((p) => p.slug.current)
          .map((p) => {
            const url = encodeXML(`${origin}/blog/${p.slug.current}`);
            return {
              title: encodeXML(p?.title),
              url,
              lastMod: encodeXML(p._updatedAt),
              changeFreq: encodeXML(CHG_FREQ.blog),
            };
          })
      : [];

  const siteMapData = [...propertyData, ...pageData, ...blogData];

  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
     ${siteMapData
       .map((post) => {
        //  if (post.url) return renderTag(post);
        return post.url !== undefined && renderTag(post);
       })
       .join("")}
   </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res, req }: {res: any; req: any}) {
  // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
  const origin = req.rawHeaders[req.rawHeaders.indexOf("Host") + 1];
  // Products
  const query = `*[_type == "property" && status == "Available" || status == "Pending" ]{ ...,images->{...,images[0]}, contact->}`;

  // We make an API call to gather the URLs for our site
  const request = await sanityClient.fetch(query);
  //   const request = await fetch(EXTERNAL_DATA_URL);
  const properties: IPropertyFullSearch[] = await request;
  // add all posts
  // const posts = await { properties, pages:[{slug: { current: 'testpage'}, _updatedAt:'uy7326462384'}] };
  const posts: ISitemapPostsObject = { properties, pages: [], blogs: [] };

  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(posts, origin);
  //   const sitemap2 = generateSiteMap([{url:'hdjfkd', }], origin);

  res.setHeader("Content-Type", "text/xml");
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;
