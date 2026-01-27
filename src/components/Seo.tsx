import Head from "next/head";
import { useRouter } from "next/router";
import { buildAbsoluteUrl, buildOrganizationJsonLd, buildWebsiteJsonLd, siteConfig } from "@/lib/seo";

type SeoProps = {
  title: string;
  description: string;
  canonicalPath?: string;
  image?: string;
  noindex?: boolean;
  type?: "website" | "article";
  jsonLd?: Record<string, unknown> | Array<Record<string, unknown>>;
};

const buildJsonLdArray = (jsonLd: SeoProps["jsonLd"]) => {
  if (!jsonLd) {
    return [];
  }
  return Array.isArray(jsonLd) ? jsonLd : [jsonLd];
};

const Seo = ({
  title,
  description,
  canonicalPath,
  image = siteConfig.defaultOgImage,
  noindex = false,
  type = "website",
  jsonLd,
}: SeoProps) => {
  const router = useRouter();
  const path = canonicalPath ?? router.asPath.split("?")[0].split("#")[0];
  const canonicalUrl = buildAbsoluteUrl(path);
  const imageUrl = buildAbsoluteUrl(image) ?? image;
  const robots = noindex ? "noindex, nofollow" : "index, follow";

  const defaultJsonLd = buildJsonLdArray([buildOrganizationJsonLd(), buildWebsiteJsonLd()]);
  const jsonLdEntries = noindex ? (jsonLd ? buildJsonLdArray(jsonLd) : []) : jsonLd ? buildJsonLdArray(jsonLd) : defaultJsonLd;

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={robots} />
      <meta name="googlebot" content={robots} />
      <meta name="theme-color" content="#f8f1e8" />

      {canonicalUrl ? <link rel="canonical" href={canonicalUrl} /> : null}

      <meta property="og:site_name" content={siteConfig.name} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:locale" content={siteConfig.locale} />
      {canonicalUrl ? <meta property="og:url" content={canonicalUrl} /> : null}
      {imageUrl ? <meta property="og:image" content={imageUrl} /> : null}
      {imageUrl ? <meta property="og:image:alt" content={`${siteConfig.name} - Résidence seniors`} /> : null}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {imageUrl ? <meta name="twitter:image" content={imageUrl} /> : null}

      {jsonLdEntries.map((entry, index) => (
        <script
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(entry) }}
          key={`jsonld-${index}`}
          type="application/ld+json"
        />
      ))}
    </Head>
  );
};

export default Seo;
