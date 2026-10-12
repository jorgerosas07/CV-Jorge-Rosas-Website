"use client";
import { useEffect, useState } from "react";

// Dev-only switcher for comparing the original, A (lifted dark) and B (light).
const OPTIONS = [
  { id: "", label: "Original" },
  { id: "a", label: "A" },
  { id: "b", label: "B" },
];

export default function ThemeSwitcher() {
  const [current, setCurrent] = useState("");

  useEffect(() => {
    setCurrent(document.documentElement.dataset.theme || "");
  }, []);

  const pick = (id) => {
    if (id) document.documentElement.dataset.theme = id;
    else delete document.documentElement.dataset.theme;
    const url = new URL(window.location.href);
    if (id) url.searchParams.set("theme", id);
    else url.searchParams.delete("theme");
    window.history.replaceState(null, "", url);
    setCurrent(id);
  };

  return (
    <div
      style={{
        position: "fixed",
        right: 16,
        bottom: 16,
        zIndex: 300,
        display: "flex",
        gap: 4,
        padding: 4,
        borderRadius: 8,
        background: "#ffffff",
        boxShadow: "0 4px 16px rgba(0,0,0,0.35)",
        fontSize: 13,
      }}
    >
      {OPTIONS.map((o) => (
        <button
          key={o.label}
          onClick={() => pick(o.id)}
          style={{
            border: 0,
            borderRadius: 6,
            padding: "6px 12px",
            cursor: "pointer",
            fontWeight: 600,
            background: current === o.id ? "#3b4fd8" : "transparent",
            color: current === o.id ? "#ffffff" : "#0b1220",
          }}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
