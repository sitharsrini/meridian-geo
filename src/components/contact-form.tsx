"use client";

import { FormEvent, useState } from "react";
import { services } from "@/lib/catalog";

type Status = "idle" | "loading" | "ok" | "error";

export function ContactForm({ defaultService, defaultCity }: { defaultService?: string; defaultCity?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    if (String(data.get("company_website") || "").trim()) {
      setStatus("ok");
      setMessage("Thanks. We will reply within two working days.");
      form.reset();
      return;
    }
    setStatus("loading");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          company: data.get("company"),
          website: data.get("website"),
          city: data.get("city"),
          service: data.get("service"),
          notes: data.get("notes"),
        }),
      });
      if (!response.ok) throw new Error("Request failed");
      setStatus("ok");
      setMessage("Thanks. We will reply within two working days.");
      form.reset();
    } catch {
      setStatus("error");
      setMessage("The form did not send. Email hello@meridianfieldworks.com.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Name" name="name" required autoComplete="name" />
        <Field label="Work email" name="email" type="email" required autoComplete="email" />
        <Field label="Company" name="company" required autoComplete="organization" />
        <Field label="Website" name="website" type="url" placeholder="https://" />
        <Field label="City" name="city" defaultValue={defaultCity} />
        <label className="grid gap-2 text-sm">
          <span>Service</span>
          <select
            name="service"
            defaultValue={defaultService ?? ""}
            className="h-12 border border-[var(--line)] bg-[var(--paper)] px-3 text-[var(--ink)]"
          >
            <option value="">Not sure yet</option>
            {services.map((service) => (
              <option key={service.slug} value={service.slug}>
                {service.name}
              </option>
            ))}
          </select>
        </label>
      </div>
      <label className="grid gap-2 text-sm">
        <span>What should we audit first?</span>
        <textarea
          name="notes"
          rows={5}
          className="border border-[var(--line)] bg-[var(--paper)] px-3 py-3 text-[var(--ink)]"
          required
        />
      </label>
      <div className="hidden" aria-hidden="true">
        <label>
          Company website
          <input name="company_website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className="h-12 bg-[var(--accent)] px-6 text-sm text-[var(--paper)] transition hover:bg-[var(--accent-2)] disabled:opacity-60"
      >
        {status === "loading" ? "Sending" : "Book a search audit"}
      </button>
      {message ? (
        <p className={status === "error" ? "text-sm text-red-800" : "text-sm text-[var(--muted)]"}>
          {message}
        </p>
      ) : (
        <p className="text-sm text-[var(--muted)]">We reply from {`hello@meridianfieldworks.com`}.</p>
      )}
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  defaultValue,
  placeholder,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  defaultValue?: string;
  placeholder?: string;
  autoComplete?: string;
}) {
  return (
    <label className="grid gap-2 text-sm">
      <span>{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="h-12 border border-[var(--line)] bg-[var(--paper)] px-3 text-[var(--ink)] placeholder:text-[var(--muted)]"
      />
    </label>
  );
}
