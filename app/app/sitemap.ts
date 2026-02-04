import { getAllPostsMeta } from "../lib/posts";

export default function sitemap() {
  const baseUrl = "https://seo-info-web.vercel.app";

  const posts = getAllPostsMeta();

  const postUrls = posts.map((p) => ({
    url: `${baseUrl}/posts/${p.slug}`,
    lastModified: new Date(),
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    ...postUrls,
  ];
}
