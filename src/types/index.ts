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
