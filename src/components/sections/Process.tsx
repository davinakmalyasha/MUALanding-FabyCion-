import { processSteps } from "@/content/process";
import { whatsappUrl } from "@/lib/contact";
import { Container } from "@/components/ui/Container";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

export function Process() {
  return (
    <Section id="cara-booking" tone="dark">
      <Container>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              index="04"
              eyebrow="Cara Booking"
              title={
                <>
                  Lima langkah, lalu tanggal Anda aman.
                </>
              }
              tone="dark"
              description="Paling mudah lewat WhatsApp. Balasan cepat, dan jadwal bisa langsung dipastikan."
            />

            <Reveal delay={0.12}>
              <Button
                href={whatsappUrl()}
                external
                variant="accent"
                size="lg"
                icon="whatsapp"
                className="mt-9"
              >
                Mulai Booking
              </Button>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <ol className="border-t border-ivory/15">
              {processSteps.map((step, index) => (
                <li key={step.title}>
                  <Reveal delay={index * 0.06}>
                    <div className="group flex items-start gap-6 border-b border-ivory/15 py-7 md:gap-10 md:py-8">
                      <span className="mt-1 font-display text-sm text-champagne-soft">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <div>
                        <h3 className="font-display text-xl leading-snug text-ivory md:text-[1.4rem]">
                          {step.title}
                        </h3>
                        <p className="mt-2 max-w-[46ch] text-sm leading-relaxed text-ivory/60">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Container>
    </Section>
  );
}
