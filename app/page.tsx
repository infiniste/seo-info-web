import { getAllPostsMeta } from "../lib/posts";

export default function HomePage() {
  const posts = getAllPostsMeta();
  return (
    <div>
      <h2>글 목록</h2>
      {posts.map(p => (
        <div key={p.slug} className="card">
          <a href={`/posts/${p.slug}`}>{p.title}</a>
        </div>
      ))}
    </div>
  );
}
