export const metadata = {
  title: "문의하기",
  description: "사이트 문의 및 제휴 문의",
};

const SITE_NAME = "빠른 정보 웹";
const CONTACT_EMAIL = "contact@example.com"; // 너 이메일로 바꿔

export default function ContactPage() {
  return (
    <div className="card article">
      <h1>문의하기</h1>
      <p>
        {SITE_NAME} 관련 문의(오류 제보, 콘텐츠 제안, 제휴/광고 문의)는 아래
        이메일로 보내주세요.
      </p>

      <h2>연락처</h2>
      <p>
        이메일: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
      </p>

      <h2>빠른 처리를 위해 포함해 주세요</h2>
      <ul>
        <li>문의 유형: (오류/제휴/기타)</li>
        <li>관련 URL (있다면)</li>
        <li>상세 내용</li>
      </ul>

      <p className="meta">
        스팸/광고성 메시지는 답변하지 않을 수 있습니다.
      </p>
    </div>
  );
}
