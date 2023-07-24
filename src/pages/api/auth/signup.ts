import clientPromise from "@/utils/mongodb";
import { hashPassword } from "../../../utils/auth";
import type { NextApiRequest, NextApiResponse } from "next";

interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    email: string;
    password: string;
    firstname: string;
    lastname: string;
  };
}

async function handler(req: ExtendedNextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return;
  }

  const data = req.body;

  const { email, password, firstname, lastname } = data;

  if (
    email?.includes("@") ||
    password === undefined ||
    password.trim().length < 7
  ) {
    res.status(422).json({
      message:
        "Invalid input - password should also be at least 7 characters long.",
    });
    return;
  }

  const client = await clientPromise;

  const db = client.db();

  const existingUser = await db
    .collection("cribs-kgl-users")
    .findOne({ email });

  if (existingUser !== null) {
    res.status(422).json({ message: "User exists already!" });
    // client.close();
    return;
  }

  const hashedPassword = await hashPassword(password);

  const status = await db.collection("cribs-kgl-users").insertOne({
    email,
    password: hashedPassword,
    firstname,
    lastname,
    role: "customer",
    savedItems: [],
  });

  res.status(201).json({ message: "Created user!", ...status });
  //   client.close();
}

export default handler;
