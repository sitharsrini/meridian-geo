import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Privacy" };

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-[760px] px-4 py-12">
      <h1 className="text-4xl tracking-tight">Privacy</h1>
      <div className="mt-6 space-y-4 text-[var(--muted)] leading-relaxed">
        <p>Contact form submissions are stored so we can reply. We keep name, email, company, website, city, service interest, and your note.</p>
        <p>We do not sell lead data. We do not run third-party ad pixels on this site by default.</p>
        <p>To request deletion, email {site.email} from the address you used.</p>
        <p>Controller: {site.legalName}, {site.offices[0].address}, {site.offices[0].city} {site.offices[0].postal}.</p>
      </div>
    </div>
  );
}
