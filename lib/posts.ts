import fs from "fs";
import path from "path";
import matter from "gray-matter";

const POSTS_DIR = path.join(process.cwd(), "content/posts");

export function getAllPostsMeta() {
  return fs.readdirSync(POSTS_DIR).map(file => {
    const slug = file.replace(".md","");
    const raw = fs.readFileSync(path.join(POSTS_DIR,file),"utf8");
    const { data } = matter(raw);
    return { slug, title: data.title };
  });
}

export function getPostBySlug(slug:string) {
  const raw = fs.readFileSync(path.join(POSTS_DIR,slug+".md"),"utf8");
  const { data, content } = matter(raw);
  return { meta: data, content };
}
