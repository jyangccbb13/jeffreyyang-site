"use client";

import { useState, type FormEvent } from "react";
import { site } from "@/lib/site";

const fieldClasses =
  "w-full rounded-lg border border-line bg-bg px-4 py-3 text-sm text-ink placeholder:text-faint outline-none transition-colors focus:border-accent/60";

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

    if (!accessKey) {
      // Not configured yet — fall back to opening the visitor's email client.
      const data = new FormData(e.currentTarget);
      const from = data.get("email")?.toString().trim() ?? "";
      const subject = data.get("subject")?.toString().trim() || "Hello from your site";
      const message = data.get("message")?.toString().trim() ?? "";
      const body = from ? `${message}\n\n— reply to: ${from}` : message;
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`;
      setStatus("sent");
      return;
    }

    setStatus("sending");
    const form = e.currentTarget;
    const data = new FormData(form);
    data.append("access_key", accessKey);
    data.append("subject", data.get("subject")?.toString() || "New message from jeffreyyang.org");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      const result = await res.json();
      if (result.success) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm text-faint">
          Your email
        </label>
        <input id="email" name="email" type="email" required placeholder="you@email.com" className={fieldClasses} />
      </div>
      <div>
        <label htmlFor="subject" className="mb-1.5 block text-sm text-faint">
          Subject
        </label>
        <input id="subject" name="subject" type="text" placeholder="What's this about?" className={fieldClasses} />
      </div>
      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm text-faint">
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
        disabled={status === "sending"}
        className="rounded-full bg-button px-6 py-3 text-sm font-medium text-stone-900 transition-colors hover:bg-button-hover disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
      {status === "sent" && (
        <p className="text-xs text-faint">Message sent — I&apos;ll get back to you soon.</p>
      )}
      {status === "error" && (
        <p className="text-xs text-faint">
          Something went wrong — email me directly at{" "}
          <a href={`mailto:${site.email}`} className="link-underline">
            {site.email}
          </a>
          .
        </p>
      )}
    </form>
  );
}
