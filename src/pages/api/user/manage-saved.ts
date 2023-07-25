import clientPromise from "@ali/src/utils/mongodb";
import type { ImanageSavedItem } from "@ali/src/types";
import type { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "PATCH") {
    return;
  }

  const data = req.body;

  const {
    email,
    item,
    action,
  }: { email: string; item: string; action: ImanageSavedItem["action"] } = data;

  const client = await clientPromise;

  const db = client.db();

  const existingUser = await db
    .collection("cribs-kgl-users")
    .findOne({ email });

  //   re-verify email
  if (existingUser === undefined || existingUser == null) {
    res.status(401).json({ message: "User does not exist!" });
    // client.close();
  } else {
    if (action === "add") {
      // add

      // verify

      if (existingUser.savedItems.includes(item) === true) {
        res.status(401).json({ message: "Item alredy exists!" });
      } else {
        // eslint-disable-next-line object-shorthand
        const status = await db
          .collection("cribs-kgl-users")
          .updateOne({ email }, { $push: { savedItems: item } });

        res.status(202).json({ message: "Item saved!", ...status });
      }

      // remove
    } else {
      // verify

      if (existingUser.savedItems.includes(item) === false) {
        res.status(401).json({ message: "Item to remove does not exist" });
      } else {
        const status = await db
          .collection("cribs-kgl-users")
          .updateOne({ email }, { $pull: { savedItems: item } });
        res.status(202).json({ message: "Item removed!", ...status });
      }
    }
  }
}

export default handler;
