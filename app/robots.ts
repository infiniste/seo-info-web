export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: "https://seo-info-web.vercel.app/sitemap.xml",
  };
}
