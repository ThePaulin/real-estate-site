import type { NextApiRequest } from "next";
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
  content: IBlock[];
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
  title: string;
  url: string;
  lastMod: string;
  changeFreq: "daily" | "weekly" | "monthly" | "yearly" | string;
  image?: {
    url: string;
  };
}

export interface ISitemapPostsObject {
  properties: IPropertyFullSearch[];
  pages: IArticlesAPI["articles"];
  // pages: Array<{
  //   title: string;
  //   slug: { current: string };
  //   _updatedAt: string;
  //   image: { url: string };
  // }>;
  blogs: IArticlesAPI["articles"];
  // blogs: Array<{
  //   title: string;
  //   slug: { current: string };
  //   _updatedAt: string;
  //   image: { url: string };
  // }>;
}

export interface ImanageSavedItem {
  action: "add" | "remove";
}
export interface IUser {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  role: "customer" | "vendor";
  savedItems: string[];
}

export interface IHomepageArticle {
  image: {
    url: string;
    altText: string;
  };
  content: {
    label: string;
    title: string;
    sample: string;
    url: string;
  };
}

// for sanity pages

export interface IMarkDef {
  _type: string;
}

export interface ISpan {
  _type: "span";
  marks: IMarkDef[];
  text: string;
  _key: string;
}

export interface IBlock {
  _type: "block";
  style: string;
  _key: string;
  markDefs: IMarkDef[];
  children: ISpan;
}

export interface IReference {
  _type: "reference";
  _ref: string;
}

export interface IAsset {
  _type: "reference";
  _ref: string;
}

export interface IBannerImage {
  _type: "image";
  asset: IReference;
}

export interface IBanner {
  _type: "banner";
  _key: string;
  mobile_image: IBannerImage;
  desktop_image: IBannerImage;
  alt_text: string;
  _createdAt: string;
  _rev: string;
  _id: string;
  _updatedAt: string;
}

export interface IHeroContent {
  _type: "block";
  style: string;
  _key: string;
  markDefs: IMarkDef[];
  children: ISpan;
}

export interface IHero {
  _type: "hero";
  _key: string;
  layout: "image_right" | "image_left" | "image_center";
  text_position: "text_right" | "text_left" | "text_center";
  section_name: string;
  header_color: "black" | "white" | "primary";
  paragraph_color: "black" | "white" | "primary";
  content: IBlock | IHeroContent;
  image: IBanner;
}

export interface ISlug {
  _type: "slug";
  current: string;
}

export interface IAuthorReference {
  _type: "reference";
  _ref: string;
  _id: string;
  firstname: string;
  lastname: string;
  _createdAt: string;
  _updatedAt: string;
}

export interface IImage {
  _type: "image";
  _key: string;
  asset: IReference;
}

export interface IPage {
  _type: "page";
  _createdAt: string;
  author: IAuthorReference;
  image: IBanner;
  subcategory: string;
  title: string;
  _updatedAt: string;
  content: Array<IBlock | IImage | IHero>;
  slug: ISlug;
  category: string;
  description: string;
  _id: string;
  _rev: string;
  scheduled_for: string;
}

// description, title, subcategory, image->

export interface IArticlesAPIArticle {
  description: string;
  title: string;
  subcategory: string;
  image: IBanner;
  _id: string;
  slug: ISlug;
  _updatedAt: string;
}
export interface IArticlesAPI {
  articles: IArticlesAPIArticle[];
}

// articles api

export type articleRequestBody =
  | { type: "all"; category: "page" | "article" }
  | { type: "one"; slug: string; category: "page" | "article" };
export interface ExtendedNextApiRequestArticles extends NextApiRequest {
  body: articleRequestBody;
}

export interface IContactRequestBody {
  name: string;
  email: string;
  inquiry: string;
  message: string;
}
export interface ExtendedNextApiRequestContact extends NextApiRequest {
  body: IContactRequestBody;
}

export interface IHeroBannerBody {
  title: string;
}
export interface ExtendedNextApiRequestHeroBanner extends NextApiRequest {
  body: IHeroBannerBody;
}

// Array<{banner: IBanner; title: string; _createdAt: string; _id: string; _rev: string; _type: string; _updatedAt: string }>
export interface IHeroBanner {
  banner: IBanner;
  title: string;
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: string;
}
