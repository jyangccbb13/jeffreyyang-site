"use client";

import { useState, type FormEvent } from "react";
import { site } from "@/lib/site";

const fieldClasses =
  "w-full rounded-lg border border-line bg-bg px-4 py-3 text-sm text-ink placeholder:text-faint outline-none transition-colors focus:border-accent/60";

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const from = data.get("email")?.toString().trim() ?? "";
    const subject = data.get("subject")?.toString().trim() || "Hello from your site";
    const message = data.get("message")?.toString().trim() ?? "";
    const body = from ? `${message}\n\n— reply to: ${from}` : message;

    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="mb-1.5 block text-xs uppercase tracking-wider text-faint">
          Your email
        </label>
        <input id="email" name="email" type="email" required placeholder="you@email.com" className={fieldClasses} />
      </div>
      <div>
        <label htmlFor="subject" className="mb-1.5 block text-xs uppercase tracking-wider text-faint">
          Subject
        </label>
        <input id="subject" name="subject" type="text" placeholder="What's this about?" className={fieldClasses} />
      </div>
      <div>
        <label htmlFor="message" className="mb-1.5 block text-xs uppercase tracking-wider text-faint">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Say hello..."
          className={`${fieldClasses} resize-none`}
        />
      </div>
      <button
        type="submit"
        className="rounded-full bg-white px-6 py-3 text-sm font-medium text-stone-900 transition-colors hover:bg-white/90"
      >
        Send message
      </button>
      {sent && <p className="text-xs text-faint">Opening your email client…</p>}
    </form>
  );
}
