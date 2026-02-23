import type { GetServerSideProps } from "next";
import { getAppUrl } from "@/lib/env";

const PAGES = [
  { path: "/", changefreq: "weekly", priority: 1.0 },
  { path: "/about", changefreq: "monthly", priority: 0.8 },
  { path: "/services", changefreq: "monthly", priority: 0.8 },
  { path: "/contact", changefreq: "monthly", priority: 0.7 },
];

const getBaseUrl = (req: Parameters<GetServerSideProps>[0]["req"]) => {
  const appUrl = getAppUrl();
  if (appUrl) {
    return appUrl.replace(/\/$/, "");
  }

  const protoHeader = req.headers["x-forwarded-proto"];
  const proto = Array.isArray(protoHeader) ? protoHeader[0] : protoHeader;
  const scheme = proto ?? "https";
  const host = req.headers.host ?? "localhost:3000";

  return `${scheme}://${host}`;
};

const buildSitemap = (baseUrl: string) => {
  const lastmod = new Date().toISOString();
  const urls = PAGES.map((page) => {
    return [
      "<url>",
      `<loc>${baseUrl}${page.path}</loc>`,
      `<lastmod>${lastmod}</lastmod>`,
      `<changefreq>${page.changefreq}</changefreq>`,
      `<priority>${page.priority.toFixed(1)}</priority>`,
      "</url>",
    ].join("");
  }).join("");

  return [
    "<?xml version=\"1.0\" encoding=\"UTF-8\"?>",
    "<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">",
    urls,
    "</urlset>",
  ].join("");
};

export const getServerSideProps: GetServerSideProps = async ({ res, req }) => {
  const baseUrl = getBaseUrl(req);
  const sitemap = buildSitemap(baseUrl);

  res.setHeader("Content-Type", "application/xml");
  res.write(sitemap);
  res.end();

  return { props: {} };
};

const Sitemap = () => null;

export default Sitemap;
