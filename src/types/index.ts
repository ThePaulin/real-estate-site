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

export interface IPropertyFullSearch {
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
    contact_name: string;
    email: string;
    phone: number;
    type: "Agency" | "Broker";
    _id: string;
  };
  bathroom_count: number;
  category: string;
  // images: IPropertyImages;
  images: {
    _ref: string;
    _type: string;
    _key: string;
    // images: IPropertyImage[];
    images: {
      image: {
        asset: {
          _ref: string;
          _type: string;
        };
        _type: string;
      };
      alt_text: string;
      _type: string;
      _key: string;
    };
  };
  _type: string;
  bedroom_count: number;
  _updatedAt: string;
  status: "Available" | "Pending" | "Not Available";
}

export interface IPropertyFull {
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
    contact_name: string;
    email: string;
    phone: number;
    type: "Agency" | "Broker";
    _id: string;
  };
  bathroom_count: number;
  category: string;
  // images: IPropertyImages;
  images: {
    _ref: string;
    _type: string;
    _key: string;
    // images: IPropertyImage[];
    images: Array<{
      image: {
        asset: {
          _ref: string;
          _type: string;
        };
        _type: string;
      };
      alt_text: string;
      _type: string;
      _key: string;
    }>;
  };
  _type: string;
  bedroom_count: number;
  _updatedAt: string;
  status: "Available" | "Pending" | "Not Available";
}

// export interface IPropertyFull extends IProperty {
//   ...images: {

//   }

// }

export interface IPropertyImage {
  image: {
    asset: {
      _ref: string;
      _type: string;
    };
    _type: string;
  };
  alt_text: string;
  _type: string;
  _key: string;
}

export interface IPropertyImages {
  _createdAt: string;
  _rev: string;
  _type: string;
  _id: string;
  title: string;
  _updatedAt: string;
  images: IPropertyImage[];
}

export interface IMenuObject {
  footer: IMenuItem[];
  header: IMenuItem[];
}
export interface IMenuItem {
  cta: string;
  link: string;
  _key: string;
  _type: string;
}

export interface ISiteMapPost {
  url: string;
  lastMod: Date;
  changeFreq: 'daily' | 'weekly' | 'monthly' | 'yearly';
}