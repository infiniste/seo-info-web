import Link from "next/link";
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

export default function HomePage() {
  const posts = getAllPostsMeta();

  return (
    <div>
      <div className="hero">
        <h1>검색으로 들어오는 정보 아카이브</h1>
        <p>
          이 사이트는 “정보(SEO) + 광고(AdSense)”로 수익을 만드는 구조야.
          글을 누적하면 자동으로 트래픽이 쌓이고 광고 수익이 생김.
        </p>
      </div>

      <div className="grid">
        <div className="card">
          <div className="badge">최신 글</div>

          {posts.map((p) => (
            <div key={p.slug} className="postItem">
              <Link href={`/posts/${p.slug}`}>
                <h2 className="postTitle">{p.title}</h2>
              </Link>
              {p.description ? <div className="meta">{p.description}</div> : null}
              <div className="meta">{p.date}</div>
              {p.tags?.length ? (
                <div className="badges">
                  {p.tags.slice(0, 6).map((t) => (
                    <span key={t} className="badge">#{t}</span>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gap: 14 }}>
          <AdBox title="상단 광고" />
          <div className="card">
            <div className="badge">수익화 체크리스트</div>
            <div className="meta" style={{ marginTop: 10 }}>
              1) 글 30개 누적<br />
              2) AdSense 신청<br />
              3) “OO 계산기” 페이지 추가(광고 단가↑)<br />
              4) 내부링크(관련글 연결)
            </div>
          </div>
          <AdBox title="사이드 광고" />
        </div>
      </div>
    </div>
  );
}
