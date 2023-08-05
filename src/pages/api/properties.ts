import { sanityClient } from "@ali/src/client";
import type { IPropertyFull, IPropertyFullSearch } from "@ali/src/types";
import type { NextApiRequest, NextApiResponse } from "next";

interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    query: string;
    type: "propertyPage" | "searchPage";
  };
}

async function handler(req: ExtendedNextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return;
  }

  const data = req.body;

  const { query, type } = data;

  if (type === "propertyPage") {
    // for property page
    const properties: IPropertyFull[] = await sanityClient.fetch(query);
    res
      .status(200)
      .json({ message: "success", property: { ...properties[0] } });
  } else {
    // for search page
    const properties: IPropertyFullSearch[] = await sanityClient.fetch(query);
    res.status(200).json({ message: "success", properties: { ...properties } });
  }
}

export default handler;
