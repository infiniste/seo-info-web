import fs from "fs";
import path from "path";
import matter from "gray-matter";

const POSTS_DIR = path.join(process.cwd(), "content/posts");

type PostMeta = {
  slug: string;
  title: string;
  description?: string;
  date?: string;
  tags?: string[];
};

export function getAllPostsMeta(): PostMeta[] {
  return fs.readdirSync(POSTS_DIR).map((file) => {
    const slug = file.replace(".md", "");
    const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf8");
    const { data } = matter(raw);

    return {
      slug,
      title: String(data.title ?? slug),
      description: data.description ? String(data.description) : undefined,
      date: data.date ? String(data.date) : undefined,
      tags: Array.isArray(data.tags) ? data.tags.map(String) : undefined,
    };
  });
}

export function getPostBySlug(slug: string) {
  const raw = fs.readFileSync(path.join(POSTS_DIR, slug + ".md"), "utf8");
  const { data, content } = matter(raw);

  return {
    meta: {
      title: String(data.title ?? slug),
      description: data.description ? String(data.description) : undefined,
      date: data.date ? String(data.date) : undefined,
      tags: Array.isArray(data.tags) ? data.tags.map(String) : undefined,
    },
    content,
  };
}
