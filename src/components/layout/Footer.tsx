import { site } from "@/content/site";
import { whatsappUrl } from "@/lib/contact";
import { Container } from "@/components/ui/Container";
import { Icon, type IconName } from "@/components/ui/Icon";

const socialIcons: Record<string, IconName> = {
  Instagram: "instagram",
  WhatsApp: "whatsapp",
  Email: "mail",
};

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-charcoal/10 bg-ivory-deep">
      <Container className="grid gap-12 py-16 md:grid-cols-12 md:py-20">
        <div className="md:col-span-5">
          <p className="font-display text-2xl tracking-[0.16em] uppercase">
            {site.brandLine}
          </p>
          <p className="mt-3 max-w-[34ch] text-sm leading-relaxed text-muted">
            {site.role} {site.city}. Melayani makeup pengantin, prewedding,
            wisuda, party, hingga commercial TV dan digital.
          </p>

          <ul className="mt-7 flex items-center gap-3">
            {site.socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-charcoal/15 text-charcoal transition-colors duration-300 hover:border-charcoal hover:bg-charcoal hover:text-ivory"
                >
                  <span className="h-4 w-4">
                    <Icon name={socialIcons[social.label] ?? "arrow-up-right"} />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label="Navigasi footer" className="md:col-span-3">
          <p className="text-[0.7rem] font-medium tracking-[0.22em] uppercase text-muted">
            Navigasi
          </p>
          <ul className="mt-5 flex flex-col gap-3">
            {site.navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="inline-block py-1.5 text-sm text-charcoal/85 transition-colors hover:text-gold"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-4">
          <p className="text-[0.7rem] font-medium tracking-[0.22em] uppercase text-muted">
            Kontak
          </p>
          <ul className="mt-5 flex flex-col gap-3 text-sm">
            <li>
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noreferrer"
                className="text-charcoal/85 transition-colors hover:text-gold"
              >
                WhatsApp {site.contact.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${site.contact.email}`}
                className="text-charcoal/85 transition-colors hover:text-gold"
              >
                {site.contact.email}
              </a>
            </li>
            <li>
              <a
                href={`https://www.instagram.com/${site.contact.instagramHandle}/`}
                target="_blank"
                rel="noreferrer"
                className="text-charcoal/85 transition-colors hover:text-gold"
              >
                @{site.contact.instagramHandle}
              </a>
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-charcoal/10">
        <Container className="flex flex-col gap-2 py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {site.name}. Seluruh hak cipta dilindungi.
          </p>
          <p>{site.role} {site.city}</p>
        </Container>
      </div>
    </footer>
  );
}
