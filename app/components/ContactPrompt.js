"use client";
import { useCallback, useEffect, useRef, useState } from "react";

// Small, non-blocking prompt shown once, after the visitor has scrolled to the Skills section.
// "Yes" opens the LinkedIn profile (where the visitor can press Message); "No" thanks and closes.
const KEY = "contact-prompt-seen";

export default function ContactPrompt({ linkedin }) {
  const [open, setOpen] = useState(false);
  const [declined, setDeclined] = useState(false);
  const timer = useRef(null);

  const remember = () => {
    try {
      localStorage.setItem(KEY, "1");
    } catch {}
  };

  const close = useCallback(() => {
    clearTimeout(timer.current);
    setOpen(false);
    try {
      localStorage.setItem(KEY, "1");
    } catch {}
  }, []);

  useEffect(() => {
    const target = document.getElementById("skills");
    if (!target) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        observer.disconnect();
        try {
          // Add ?prompt to the URL to see it again, ignoring the "already seen" memory
          const force = new URLSearchParams(window.location.search).has("prompt");
          if (!force && localStorage.getItem(KEY)) return;
        } catch {}
        setOpen(true);
      },
      { threshold: 0.2 }
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      clearTimeout(timer.current);
    };
  }, [open, close]);

  if (!open) return null;

  const decline = () => {
    setDeclined(true);
    remember();
    timer.current = setTimeout(() => setOpen(false), 2200);
  };

  return (
    <aside className="askPrompt" aria-label="Connect on LinkedIn" aria-live="polite">
      <button type="button" className="askClose" onClick={close} aria-label="Close">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>
      {declined ? (
        <p className="askTitle">Thanks for stopping by.</p>
      ) : (
        <>
          <p className="askTitle">Interested in working together?</p>
          <p className="askBody">Let’s connect on LinkedIn.</p>
          <div className="askActions">
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="btnAccent askYes"
              onClick={close}
            >
              Yes, connect
            </a>
            <button type="button" className="askNo" onClick={decline}>
              No, thanks
            </button>
          </div>
        </>
      )}
    </aside>
  );
}
