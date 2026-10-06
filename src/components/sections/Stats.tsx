import { site } from "@/content/site";
import { Container } from "@/components/ui/Container";

/**
 * Renders nothing while `site.stats` is empty. The client asked us not to
 * publish unconfirmed figures, so the array ships empty. Adding entries brings
 * the strip back with no code change.
 */
export function Stats() {
  if (site.stats.length === 0) return null;

  return (
    <section className="border-y border-charcoal/10 bg-ivory-deep">
      <Container className="grid grid-cols-2 gap-px bg-charcoal/10 md:grid-cols-4">
        {site.stats.map((stat) => (
          <div key={stat.label} className="bg-ivory-deep px-2 py-12 text-center">
            <p className="font-display text-[clamp(2rem,1.4rem+2vw,2.9rem)] leading-none">
              {stat.value}
            </p>
            <p className="mt-3 text-[0.7rem] tracking-[0.2em] uppercase text-muted">
              {stat.label}
            </p>
          </div>
        ))}
      </Container>
    </section>
  );
}
