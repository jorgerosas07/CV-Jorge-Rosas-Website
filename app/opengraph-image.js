import { ImageResponse } from "next/og";

export const alt = "Jorge Rosas, BSc Management at Nova SBE. Magnite pitch: +104.6% realised return.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0a0a",
          color: "#ffffff",
          padding: "72px 80px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 26, color: "#8b9cf8", letterSpacing: 4 }}>
          <div style={{ width: 14, height: 14, background: "#8b9cf8" }} />
          BSC MANAGEMENT · NOVA SBE · LISBON
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 104, fontWeight: 700, letterSpacing: -4 }}>Jorge Rosas</div>
          <div style={{ fontSize: 38, color: "#a1a1aa", marginTop: 12 }}>
            Strategy and investing. Summer 2027 internships.
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 24 }}>
          <div style={{ fontSize: 84, fontWeight: 700, color: "#4ade80" }}>+104.6%</div>
          <div style={{ fontSize: 30, color: "#a1a1aa" }}>realised return, Magnite pitch</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
