import { services, priceDisclaimer, rateCardAsset } from "@/content/services";
import { whatsappUrlFor } from "@/lib/contact";
import { Container } from "@/components/ui/Container";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

export function Services() {
  return (
    <Section id="layanan" tone="deep">
      <Container>
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            index="02"
            eyebrow="Layanan & Rate Card"
            title="Harga yang transparan, sesuai rate card."
            description="Enam layanan untuk seluruh kebutuhan acara Anda."
            className="md:max-w-[34rem]"
          />

          <Reveal delay={0.1}>
            <Button
              href={rateCardAsset.href}
              variant="outline"
              size="md"
              icon="download"
            >
              {rateCardAsset.label}
            </Button>
          </Reveal>
        </div>

        <ul className="mt-14 grid gap-px border border-charcoal/10 bg-charcoal/10 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <li key={service.slug}>
              <Reveal delay={index * 0.05} className="h-full">
                <article className="flex h-full flex-col bg-ivory p-7 md:p-8">
                  <div className="flex items-start justify-between gap-4">
                    <span className="text-[0.65rem] tracking-[0.2em] text-gold">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {service.featured ? (
                      <span className="rounded-full border border-champagne/60 px-2.5 py-1 text-[0.6rem] tracking-[0.14em] uppercase text-gold">
                        Populer
                      </span>
                    ) : null}
                  </div>

                  <h3 className="mt-6 font-display text-xl leading-snug">
                    {service.name}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {service.description}
                  </p>

                  <div className="mt-auto pt-7">
                    {service.pricePrefix ? (
                      <p className="text-[0.65rem] tracking-[0.18em] uppercase text-muted">
                        {service.pricePrefix}
                      </p>
                    ) : null}
                    <p className="font-display text-[1.6rem] leading-tight">
                      {service.price}
                    </p>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal delay={0.1}>
          <div className="mt-8 flex flex-col gap-5 border-t border-charcoal/15 pt-7 md:flex-row md:items-center md:justify-between">
            <p className="flex items-start gap-3 text-sm text-muted">
              <span className="mt-0.5 h-4 w-4 shrink-0 text-gold">
                <Icon name="close" />
              </span>
              {priceDisclaimer}
            </p>

            <Button
              href={whatsappUrlFor("paket dan harga")}
              external
              variant="primary"
              size="md"
              icon="whatsapp"
            >
              Tanya Paket
            </Button>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
