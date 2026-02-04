import "./globals.css";

const SITE_NAME = "빠른 정보 웹";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <div className="header">
          <div className="container">
            <div className="nav">
              <a className="brand" href="/">
                <span className="brandDot" />
                {SITE_NAME}
              </a>
              <div className="navLinks">
                <a href="/">Home</a>
                <a href="/rss.xml">RSS</a>
                <a href="/sitemap.xml">Sitemap</a>
              </div>
            </div>
          </div>
        </div>

        <main className="container">{children}</main>

        <footer className="container footer">
          © {new Date().getFullYear()} {SITE_NAME}. SEO + 광고로 수익화.
        </footer>
      </body>
    </html>
  );
}

