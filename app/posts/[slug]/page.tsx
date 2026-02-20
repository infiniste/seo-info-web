import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { getPostBySlug, getAllPostsMeta } from "../../../lib/posts";

function AdBox({ title }: { title: string }) {
  return (
    <div className="card" style={{ textAlign: "center" }}>
      <div className="badge">{title}</div>
      <div className="meta" style={{ marginTop: 10 }}>
        (AdSense 승인 후 광고 코드 삽입)
      </div>
      <div style={{ marginTop: 10, color: "#9ca3af" }}>
        추천: 상단/본문중간/하단 3개 배치
      </div>
    </div>
  );
}

export function generateStaticParams() {
  const posts = getAllPostsMeta();
  return posts.map((p) => ({ slug: p.slug }));
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) return notFound();

  const { meta, content } = post;

  return (
    <div>
      <div className="hero">
        <p className="meta" style={{ marginBottom: 10 }}>
          ← <Link href="/">Home</Link>
        </p>

        <h1>{meta.title}</h1>
        {meta.description ? <p>{meta.description}</p> : null}
        {meta.date ? <p className="meta">업데이트: {meta.date}</p> : null}

        {meta.tags?.length ? (
          <div className="badges" style={{ marginTop: 12 }}>
            {meta.tags.slice(0, 8).map((t: string) => (
              <span key={t} className="badge">
                #{t}
              </span>
            ))}
          </div>
        ) : null}
      </div>

      <div className="grid">
        <div className="card article">
          <ReactMarkdown>{content}</ReactMarkdown>

          <div style={{ marginTop: 20 }}>
            <AdBox title="본문 하단 광고" />
          </div>
        </div>

        <div style={{ display: "grid", gap: 14 }}>
          <AdBox title="상단 광고" />
          <div className="card">
            <div className="badge">Tools</div>
            <div className="meta" style={{ marginTop: 10 }}>
              • <a href="/tools/leverage-calculator">레버리지 계산기</a>
            </div>
          </div>
          <AdBox title="사이드 광고" />
        </div>
      </div>
    </div>
  );
}
