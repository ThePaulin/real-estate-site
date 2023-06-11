import { type HTMLAttributeReferrerPolicy } from "react";

export interface IMenuLink {
  link: Array<{
    title: string;
    link: string;
  }>;
}

export interface IScripts {
  scripts: Array<{
    type: "script" | "link";
    rel: string;
    href: string;
    integrity: string;
    crossOrigin: "anonymous" | "use-credentials" | "" | undefined;
    referrerPolicy: HTMLAttributeReferrerPolicy | undefined;
  }>;
}

export interface IProperty {
  price: number;
  _createdAt: string;
  _id: string;
  description: string;
  tags: string[];
  title: string;
  type: string;
  slug: {
    current: string;
    _type: string;
  };
  address: {
    country: string;
    city: string;
    zone: string;
    street: string;
    street_number: number;
  };
  _rev: string;
  contact: {
    _ref: string;
    _type: string;
  };
  bathroom_count: number;
  category: string;
  status: string;
  images: Array<{
    _ref: string;
    _type: string;
    _key: string;
  }>;
  _type: string;
  bedroom_count: number;
  _updatedAt: string;
}
