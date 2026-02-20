"use client";

import { useMemo, useState } from "react";

function num(v: string) {
  const x = Number(v);
  return Number.isFinite(x) ? x : 0;
}

function fmt(n: number) {
  if (!Number.isFinite(n)) return "0";
  return n.toLocaleString("ko-KR", { maximumFractionDigits: 2 });
}

export default function LeverageCalculatorPage() {
  const [side, setSide] = useState<"long" | "short">("long");
  const [entry, setEntry] = useState("100"); // 진입가
  const [price, setPrice] = useState("105"); // 현재가
  const [qty, setQty] = useState("1"); // 수량(코인 개수)
  const [leverage, setLeverage] = useState("10"); // 배율
  const [margin, setMargin] = useState("0"); // 증거금 직접 입력(선택)

  const r = useMemo(() => {
    const e = num(entry);
    const p = num(price);
    const q = num(qty);
    const lev = Math.max(1, num(leverage));

    const notional = e * q; // 포지션 규모(명목)
    const pnlRaw = (p - e) * q * (side === "long" ? 1 : -1); // 실제 손익(레버리지와 무관)
    const marginAuto = notional / lev; // 배율 기준 예상 증거금
    const usedMargin = num(margin) > 0 ? num(margin) : marginAuto;

    const roi = usedMargin > 0 ? (pnlRaw / usedMargin) * 100 : 0;

    return { notional, pnlRaw, marginAuto, usedMargin, roi, lev };
  }, [side, entry, price, qty, leverage, margin]);

  return (
    <div>
      <div className="hero">
        <h1>레버리지 선물 수익/손실 계산기</h1>
        <p>
          진입가/현재가/수량/배율을 입력하면 손익(PnL)과 수익률(ROI)을 계산합니다.
          (거래소마다 수수료/펀딩비는 다르니 참고용으로 사용하세요)
        </p>
      </div>

      <div className="grid">
        <div className="card">
          <div className="badges">
            <span className="badge">무료</span>
            <span className="badge">즉시 계산</span>
            <span className="badge">SEO용 유입 페이지</span>
          </div>

          <div style={{ marginTop: 14, display: "grid", gap: 12 }}>
            <div>
              <div className="meta">포지션 방향</div>
              <div className="badges" style={{ marginTop: 8 }}>
                <button
                  className="badge"
                  onClick={() => setSide("long")}
                  style={{
                    cursor: "pointer",
                    borderColor: side === "long" ? "rgba(34,197,94,.7)" : undefined,
                  }}
                >
                  Long
                </button>
                <button
                  className="badge"
                  onClick={() => setSide("short")}
                  style={{
                    cursor: "pointer",
                    borderColor: side === "short" ? "rgba(34,197,94,.7)" : undefined,
                  }}
                >
                  Short
                </button>
              </div>
            </div>

            <label>
              <div className="meta">진입가</div>
              <input
                value={entry}
                onChange={(e) => setEntry(e.target.value)}
                inputMode="decimal"
                style={inputStyle}
              />
            </label>

            <label>
              <div className="meta">현재가</div>
              <input
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                inputMode="decimal"
                style={inputStyle}
              />
            </label>

            <label>
              <div className="meta">수량 (코인 개수)</div>
              <input
                value={qty}
                onChange={(e) => setQty(e.target.value)}
                inputMode="decimal"
                style={inputStyle}
              />
            </label>

            <label>
              <div className="meta">레버리지 (배)</div>
              <input
                value={leverage}
                onChange={(e) => setLeverage(e.target.value)}
                inputMode="numeric"
                style={inputStyle}
              />
            </label>

            <label>
              <div className="meta">
                증거금 직접 입력(선택) — 비워두면 자동({fmt(r.marginAuto)})
              </div>
              <input
                value={margin}
                onChange={(e) => setMargin(e.target.value)}
                inputMode="decimal"
                placeholder="예: 50"
                style={inputStyle}
              />
            </label>
          </div>
        </div>

        <div style={{ display: "grid", gap: 14 }}>
          <div className="card" style={{ textAlign: "center" }}>
            <div className="badge">광고 자리 (상단)</div>
            <div className="meta" style={{ marginTop: 10 }}>
              AdSense 승인 후 코드 삽입
            </div>
          </div>

          <div className="card">
            <div className="badge">결과</div>

            <div style={{ marginTop: 12, display: "grid", gap: 10 }}>
              <div className="meta">포지션 규모(명목)</div>
              <div style={bigNum}>{fmt(r.notional)}</div>

              <div className="meta">손익 (PnL)</div>
              <div style={bigNum}>
                {r.pnlRaw >= 0 ? "+" : ""}
                {fmt(r.pnlRaw)}
              </div>

              <div className="meta">증거금(기준)</div>
              <div style={bigNum}>{fmt(r.usedMargin)}</div>

              <div className="meta">수익률 (ROI)</div>
              <div style={bigNum}>
                {r.roi >= 0 ? "+" : ""}
                {fmt(r.roi)}%
              </div>
            </div>

            <div className="meta" style={{ marginTop: 14 }}>
              ※ 참고: 레버리지는 “손익 금액”을 키우는 게 아니라,
              “필요 증거금(분모)”을 줄여서 ROI를 키우는 효과가 큽니다.
            </div>
          </div>

          <div className="card" style={{ textAlign: "center" }}>
            <div className="badge">광고 자리 (하단)</div>
            <div className="meta" style={{ marginTop: 10 }}>
              AdSense 승인 후 코드 삽입
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  marginTop: 8,
  padding: "12px 12px",
  borderRadius: 12,
  border: "1px solid rgba(255,255,255,.10)",
  background: "rgba(0,0,0,.2)",
  color: "inherit",
  outline: "none",
};

const bigNum: React.CSSProperties = {
  fontSize: 22,
  fontWeight: 800,
  letterSpacing: "-0.02em",
};