import { testimonials } from "@/content/testimonials";
import { Container } from "@/components/ui/Container";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";

/**
 * Renders nothing while `testimonials` is empty. The client has not sent real
 * reviews yet. Drop quotes into src/content/testimonials.ts and this section
 * appears on its own.
 */
export function Testimonials() {
  if (testimonials.length === 0) return null;

  return (
    <Section tone="light">
      <Container>
        <SectionHeading
          index="05"
          eyebrow="Testimoni"
          title="Kata mereka yang pernah dirias."
          align="center"
        />

        <ul className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item, index) => (
            <li key={item.author}>
              <Reveal delay={index * 0.06} className="h-full">
                <figure className="flex h-full flex-col border border-charcoal/10 bg-ivory-deep p-7">
                  <span className="h-5 w-5 text-champagne">
                    <Icon name="quote" />
                  </span>

                  <blockquote className="mt-5 flex-1 text-[0.95rem] leading-relaxed text-charcoal/85">
                    {item.quote}
                  </blockquote>

                  <figcaption className="mt-7 border-t border-charcoal/10 pt-4">
                    <p className="text-sm font-medium">{item.author}</p>
                    <p className="mt-0.5 text-[0.7rem] tracking-[0.18em] uppercase text-muted">
                      {item.occasion}
                    </p>
                  </figcaption>
                </figure>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
