import { sanityClient } from "@ali/src/client";
import type { IMenuObject } from "@ali/src/types";
import type { NextApiRequest, NextApiResponse } from "next";

interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    query: string;
    type: "propertyPage" | "searchPage";
  };
}

async function handler(req: ExtendedNextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return;
  }
  const query = '*[_type == "navigation"]';

  const menuItems: IMenuObject[] = await sanityClient.fetch(query);

  res.status(200).json({ message: "success", menuItems: { ...menuItems } });
}

export default handler;
