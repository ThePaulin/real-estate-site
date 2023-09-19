import { sanityClient } from "@ali/src/client";
import type {
  ExtendedNextApiRequestArticles,
  IArticlesAPI,
  IPage,
} from "@ali/src/types";
import type { NextApiResponse } from "next";

async function handler(
  req: ExtendedNextApiRequestArticles,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return;
  }

  const data = req.body;

  if (data.type === "one") {
    const query =
      typeof data.slug === "string"
        ? `*[_type == 'page' && category == '${data.category}' && slug.current == '${data.slug}'][0] {..., image->, 'content': content[]{..., image-> }, author->}`
        : `*[_type == 'page'][0]`;

    const article: IPage = await sanityClient.fetch(query);
    res.status(200).json({ message: "success", article });
  } else if (data.type === "all") {
    const query = `*[_type == 'page' && category == '${data.category}']{description, title, _updatedAt, subcategory,_id, image->, slug} | order(scheduled_for desc) | order(_createdAt asc) `;

    const articles: IArticlesAPI["articles"] = await sanityClient.fetch(query);
    res.status(200).json({ message: "success", articles });
  }
}

export default handler;
