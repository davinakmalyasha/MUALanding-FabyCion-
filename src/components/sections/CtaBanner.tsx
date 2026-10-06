import { site } from "@/content/site";
import { whatsappUrl } from "@/lib/contact";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Icon, type IconName } from "@/components/ui/Icon";

const channels: Array<{ icon: IconName; label: string; value: string; href: string }> = [
  {
    icon: "whatsapp",
    label: "WhatsApp",
    value: site.contact.phoneDisplay,
    href: whatsappUrl(),
  },
  {
    icon: "mail",
    label: "Email",
    value: site.contact.email,
    href: `mailto:${site.contact.email}`,
  },
  {
    icon: "instagram",
    label: "Instagram",
    value: `@${site.contact.instagramHandle}`,
    href: `https://www.instagram.com/${site.contact.instagramHandle}/`,
  },
];

export function CtaBanner() {
  return (
    <section className="bg-ivory-deep py-20 md:py-28">
      <Container>
        <Reveal>
          <div className="grid gap-12 border border-charcoal/12 bg-ivory p-8 md:p-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <p className="text-[0.7rem] font-medium tracking-[0.22em] uppercase text-gold">
                Siap tampil memukau?
              </p>

              <h2 className="mt-5 font-display text-[clamp(1.9rem,1.25rem+2.4vw,3rem)] leading-[1.1] tracking-[-0.015em] text-balance">
                Ceritakan acaranya, sisanya kami yang rapikan.
              </h2>

              <p className="mt-5 max-w-[48ch] text-[0.975rem] leading-relaxed text-muted">
                Kirim tanggal dan jenis acara lewat WhatsApp. Balasan cepat,
                dan jadwal langsung dicek untuk Anda.
              </p>

              <Button
                href={whatsappUrl()}
                external
                size="lg"
                icon="whatsapp"
                className="mt-9"
              >
                Chat {site.brandLine}
              </Button>
            </div>

            <ul className="flex flex-col gap-px self-start border border-charcoal/10 bg-charcoal/10 lg:col-span-5">
              {channels.map((channel) => (
                <li key={channel.label}>
                  <a
                    href={channel.href}
                    {...(channel.href.startsWith("http")
                      ? { target: "_blank", rel: "noreferrer" }
                      : {})}
                    className="group flex items-center gap-4 bg-ivory p-5 transition-colors hover:bg-charcoal hover:text-ivory"
                  >
                    <span className="h-4.5 w-4.5 shrink-0 text-gold transition-colors group-hover:text-champagne-soft">
                      <Icon name={channel.icon} />
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="block text-[0.65rem] tracking-[0.2em] uppercase text-muted transition-colors group-hover:text-ivory/60">
                        {channel.label}
                      </span>
                      <span className="mt-1 block truncate text-[0.95rem]">
                        {channel.value}
                      </span>
                    </span>

                    <span className="h-3.5 w-3.5 shrink-0 opacity-0 transition-opacity group-hover:opacity-100">
                      <Icon name="arrow-up-right" />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
