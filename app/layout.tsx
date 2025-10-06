import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jeffrey Yang",
  description: "Personal site of Jeffrey Yang — About, Hobbies, Photography, Contact",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial" }}>
        {/* Header */}
        <header
          style={{
            position: "sticky",
            top: 0,
            background: "#111",
            color: "#fff",
            padding: "12px 0",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              maxWidth: 980,
              margin: "0 auto",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0 16px",
            }}
          >
            {/* Logo (left side) */}
            <Link
              href="/"
              style={{ fontWeight: 700, fontSize: "18px", color: "#fff", textDecoration: "none" }}
            >
              Jeffrey Yang
            </Link>

            {/* Navigation (right side) */}
            <nav style={{ display: "flex", gap: 20 }}>
              <Link href="/photography" style={{ color: "#ddd", textDecoration: "none" }}>
                Photography
              </Link>
              <Link href="/contact" style={{ color: "#ddd", textDecoration: "none" }}>
                Contact
              </Link>
            </nav>
          </div>
        </header>

        {/* Main page content */}
        <main style={{ maxWidth: 980, margin: "0 auto", padding: "24px 16px", minHeight: "70vh" }}>
          {children}
        </main>

        {/* Footer */}
        <footer style={{ borderTop: "1px solid #eee", padding: "12px 16px" }}>
          <div style={{ maxWidth: 980, margin: "0 auto", color: "#555" }}>
            © {new Date().getFullYear()} Jeffrey Yang
          </div>
        </footer>
      </body>
    </html>
  );
}
