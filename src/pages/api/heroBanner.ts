import { sanityClient } from "@ali/src/client";
import type { ExtendedNextApiRequestHeroBanner, IHeroBanner } from "@ali/src/types";
import type { NextApiResponse } from "next";




async function handler(req: ExtendedNextApiRequestHeroBanner, res: NextApiResponse) {
  if (req.method !== "POST") {
    return;
  }

  const data = req.body;


  if (typeof(data.title) === 'string') {
    const query = `*[_type == 'heroBanner']`;

    const heroBanner: IHeroBanner[] = await sanityClient.fetch(query);


    res.status(200).json({message: 'success', heroBanner: heroBanner[0]})
  }
 
}

export default handler;
