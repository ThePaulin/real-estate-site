import { sanityClient } from "@/client";
import { IPropertyFullSearch, ISiteMapPost } from "@/types";

// const EXTERNAL_DATA_URL = 'https://jsonplaceholder.typicode.com/posts';
const JSON_PLACEHOLDER = "https://jsonplaceholder.typicode.com/posts";

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
       </url>
       
     `;
}

function generateSiteMap(posts, origin) {
  const propertyData: ISiteMapPost[] =
    posts?.properties?.length > 0
      ? posts.properties
          .filter((p) => p.slug.current)
          .map((p) => {
            const url = `${origin}/properties/${p.slug.current}`;
            return {
              url,
              lastMod: p._updatedAt,
              changeFreq: CHG_FREQ.property,
            };
          })
      : [];

  const pageData: ISiteMapPost[] =
    posts?.pages?.length > 0
      ? posts.pages
          .filter((p) => p.slug.current)
          .map((p) => {
            const url = encodeXML(`${origin}/pages/${p.slug.current}`);
            return {
              url,
              lastMod: p._updatedAt,
              changeFreq: CHG_FREQ.page,
              // image: {
              //     url: p.images
              // }
            };
          })
      : [];

  const blogData: ISiteMapPost[] =
    posts?.blog?.length > 0
      ? posts.blog
          .filter((p) => p.slug.current)
          .map((p) => {
            const url = `${origin}/blog/${p.slug.current}`;
            return {
              url,
              lastMod: p._updatedAt,
              changeFreq: CHG_FREQ.blog,
            };
          })
      : [];

  const siteMapData = [...propertyData, ...pageData, ...blogData];

  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     ${siteMapData
       .map((post) => {
         if (post) return renderTag(post);
       })
       .join("")}
   </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res, req }) {
  const origin = req.rawHeaders[req.rawHeaders.indexOf("Host") + 1];
  // Products
  const query = `*[_type == "property" && status == "Available" || status == "Pending" ]{ ...,images->{...,images[0]}, contact->}`;

  // We make an API call to gather the URLs for our site
  const request = await sanityClient.fetch(query);
  //   const request = await fetch(EXTERNAL_DATA_URL);
  const properties: IPropertyFullSearch[] = await request;
  // add all posts
  // const posts = await { properties, pages:[{slug: { current: 'testpage'}, _updatedAt:'uy7326462384'}] };
  const posts = await { properties };

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
