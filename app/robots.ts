export default function robots() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://YOUR_DOMAIN";
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
