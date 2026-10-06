import Image from "next/image";
import { site } from "@/content/site";
import { profileImage } from "@/content/portfolio";
import { whatsappUrlFor } from "@/lib/contact";
import { HEADER_HEIGHT } from "@/lib/constants";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";

export function Hero() {
  return (
    <section
      id="top"
      style={{ paddingTop: HEADER_HEIGHT }}
      className="relative overflow-hidden"
    >
      {/* Soft wash behind the portrait. */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 right-0 -z-10 h-full w-full bg-[radial-gradient(60%_60%_at_78%_28%,var(--color-champagne-mist)_0%,transparent_70%)] md:w-[55%]"
      />

      <Container className="grid items-center gap-16 py-16 md:py-24 lg:grid-cols-12 lg:gap-14 lg:py-28">
        <div className="lg:col-span-7">
          <Reveal>
            <p className="flex items-center gap-3 text-[0.7rem] font-medium tracking-[0.24em] uppercase text-muted">
              <span className="h-px w-9 bg-champagne" />
              {site.role} {site.city}
            </p>
          </Reveal>

          <Reveal delay={0.06}>
            <h1 className="mt-7 font-display text-[clamp(2.5rem,1.35rem+4.6vw,4.6rem)] leading-[1.02] tracking-[-0.02em] text-balance">
              Tampil memukau di hari{" "}
              <em className="italic text-gold">terpenting</em> Anda.
            </h1>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mt-7 max-w-[46ch] text-base leading-relaxed text-muted md:text-[1.0625rem]">
              Riasan yang disesuaikan dengan bentuk wajah dan warna kulit Anda,
              dibuat agar tetap natural saat difoto dan tetap terasa sepanjang
              acara. Untuk pengantin, keluarga, wisuda, party, hingga kebutuhan
              commercial.
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Button href={whatsappUrlFor("jasa makeup")} external size="lg" icon="whatsapp">
                Booking via WhatsApp
              </Button>
              <Button href="#portofolio" variant="outline" size="lg">
                Lihat Portofolio
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.24}>
            <ul className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3">
              {site.certifications.map((cert) => (
                <li key={cert.issuer} className="flex items-center gap-2.5">
                  <span className="h-4 w-4 shrink-0 text-gold">
                    <Icon name="check" />
                  </span>
                  <span className="text-[0.8rem] leading-snug text-muted">
                    {cert.issuer}
                    <span className="text-charcoal/40"> &middot; </span>
                    {cert.program}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="lg:col-span-5">
          <Reveal delay={0.1} y={26}>
            <figure className="relative mx-auto max-w-md lg:max-w-none">
              {/* Offset hairline frame. */}
              <div
                aria-hidden
                className="absolute -inset-x-3 -top-4 bottom-8 border border-champagne/45 sm:-inset-x-4"
              />

              <div className="relative aspect-[3/4] w-full overflow-hidden bg-ivory-deep">
                <Image
                  src={profileImage.src}
                  alt={profileImage.alt}
                  fill
                  priority
                  quality={85}
                  sizes="(min-width: 1024px) 38vw, (min-width: 640px) 60vw, 88vw"
                  className="object-cover"
                />
              </div>

              <figcaption className="mt-6 flex items-center justify-between gap-4 border-t border-charcoal/10 pt-4">
                <span className="text-[0.7rem] tracking-[0.2em] uppercase text-muted">
                  {site.brandLine}
                </span>
                <span className="text-[0.7rem] tracking-[0.2em] uppercase text-gold">
                  {site.city}
                </span>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
