import { getAppUrl } from "@/lib/env";

type JsonLdValue = string | number | boolean | null | JsonLdObject | JsonLdValue[];
type JsonLdObject = { [key: string]: JsonLdValue | undefined };

type SiteConfig = {
  name: string;
  description: string;
  locale: string;
  defaultOgImage: string;
};

const cleanObject = (value: JsonLdValue): JsonLdValue => {
  if (Array.isArray(value)) {
    return value.map(cleanObject).filter((item) => item !== undefined);
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value)
        .filter(([, val]) => val !== undefined && val !== null && val !== "")
        .map(([key, val]) => [key, cleanObject(val as JsonLdValue)]),
    );
  }

  return value;
};

const cleanJsonLdObject = (value: JsonLdObject) => {
  return cleanObject(value) as Record<string, unknown>;
};

export const siteConfig: SiteConfig = {
  name: "Clos du Soleil",
  description:
    "Résidence hôtelière pour seniors avec soins personnalisés, accompagnement quotidien et bien-être en Tunisie.",
  locale: "fr_FR",
  defaultOgImage: "/og-image.jpg",
};

export const getSiteUrl = () => {
  const envUrl = getAppUrl() ?? process.env.NEXT_PUBLIC_APP_URL;
  if (!envUrl) {
    return undefined;
  }
  return envUrl.replace(/\/$/, "");
};

export const buildAbsoluteUrl = (path?: string) => {
  const baseUrl = getSiteUrl();
  if (!baseUrl) {
    return undefined;
  }
  if (!path) {
    return baseUrl;
  }
  return `${baseUrl}${path.startsWith("/") ? path : `/${path}`}`;
};

export const buildOrganizationJsonLd = () => {
  const url = buildAbsoluteUrl("/");
  const logo = buildAbsoluteUrl("/logo.png");

  const jsonLd: JsonLdObject = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url,
    logo,
    description: siteConfig.description,
  };

  return cleanJsonLdObject(jsonLd);
};

export const buildWebsiteJsonLd = () => {
  const url = buildAbsoluteUrl("/");

  const jsonLd: JsonLdObject = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url,
    description: siteConfig.description,
    inLanguage: "fr",
  };

  return cleanJsonLdObject(jsonLd);
};
