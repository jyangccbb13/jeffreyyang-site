"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    instgrm?: {
      Embeds: { process: () => void };
    };
  }
}

const SCRIPT_ID = "instagram-embed-script";

export default function InstagramEmbed({ url }: { url: string }) {
  useEffect(() => {
    const process = () => window.instgrm?.Embeds.process();

    if (window.instgrm) {
      process();
      return;
    }

    const existing = document.getElementById(SCRIPT_ID);
    if (existing) {
      existing.addEventListener("load", process);
      return () => existing.removeEventListener("load", process);
    }

    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.src = "https://www.instagram.com/embed.js";
    script.async = true;
    script.addEventListener("load", process);
    document.body.appendChild(script);
  }, [url]);

  return (
    <div className="flex justify-center">
      {/* Instagram's embed.js replaces this blockquote with its player once it loads. */}
      <blockquote
        className="instagram-media"
        data-instgrm-permalink={url}
        data-instgrm-version="14"
        style={{
          background: "#FFF",
          border: 0,
          borderRadius: 3,
          boxShadow: "0 0 1px 0 rgba(0,0,0,0.5), 0 1px 10px 0 rgba(0,0,0,0.15)",
          margin: 1,
          maxWidth: 540,
          minWidth: 326,
          padding: 0,
          width: "calc(100% - 2px)",
        }}
      >
        <div style={{ padding: 16, textAlign: "center" }}>
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            style={{ color: "#3897f0", fontFamily: "Arial, sans-serif", fontSize: 14, fontWeight: 600, textDecoration: "none" }}
          >
            View this post on Instagram
          </a>
        </div>
      </blockquote>
    </div>
  );
}
