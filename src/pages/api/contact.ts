import type {
  ExtendedNextApiRequestContact,
  IContactRequestBody,
} from "@ali/src/types";
import { type NextApiResponse } from "next";

import sgMail from "@sendgrid/mail";
sgMail.setApiKey(
  process.env.SENDGRID_API_KEY != null ? process.env.SENDGRID_API_KEY : ""
);

// Just check if all required fields are provided
function formValid(body: IContactRequestBody): boolean {
  return (
    typeof body.email === "string" &&
    typeof body.name === "string" &&
    typeof body.message === "string"
  );
}

export default async function handler(
  req: ExtendedNextApiRequestContact,
  res: NextApiResponse
) {
  const body = req.body;

  if (req.method !== "POST") {
    return;
  }

  if (!formValid(body)) {
    res.status(422).end();
    return;
  }

  const msg = {
    to: "thepaulin.devtest1@gmail.com",
    // from: body.email,
    from: "thepaulin.devtest1@gmail.com",
    subject: "Cribs KGL contact enquiry",
    text: body.message,
    html: `<div><p> Name: ${body.name}</p><p>Email: ${body.email}</p><p>Inquiry: ${body.inquiry}</p><p>${body.message}</p></div>`,
  };

  sgMail
    .send(msg)
    .then(() => {
      res.status(201).end();
    })
    .catch((error) => {
      console.error(error);
    });
}
