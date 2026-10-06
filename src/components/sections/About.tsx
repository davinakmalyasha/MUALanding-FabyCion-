import { site } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";

export function About() {
  return (
    <Section id="tentang" tone="light">
      <Container>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              index="01"
              eyebrow="Tentang"
              title={
                <>
                  Setiap wajah punya karakternya sendiri.
                </>
              }
              description="Makeup yang bagus bukan yang paling tebal, tapi yang paling sesuai dengan orangnya."
            />
          </div>

          <div className="lg:col-span-7">
            <Reveal>
              <div className="space-y-5 text-[0.975rem] leading-relaxed text-muted">
                <p>
                  Faby adalah makeup artist profesional di {site.city} yang
                  percaya makeup terbaik adalah makeup yang disesuaikan. Setiap sesi dimulai dari membaca bentuk wajah,
                  warna kulit, dan karakter yang ingin ditampilkan.
                </p>
                <p>
                  Latar belajarnya bersertifikat di Hefty Makeup Academy untuk
                  teknik makeup profesional, dan Foxy Beauty untuk Korean
                  eyelash extension. Kombinasi keduanya menghasilkan riasan
                  yang natural, tahan lama, dan aman dipakai untuk acara maupun
                  sesi foto.
                </p>
                <p>
                  Layanan home service, datang ke lokasi acara Anda di {site.city}
                  dan sekitarnya. Jadwal dibooking terlebih dahulu supaya
                  waktu persiapan dan hari-H selalu tertiary.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <ul className="mt-10 grid gap-px border border-charcoal/10 bg-charcoal/10 sm:grid-cols-2">
                {site.certifications.map((cert) => (
                  <li
                    key={cert.issuer}
                    className="flex items-start gap-4 bg-ivory p-6"
                  >
                    <span className="mt-0.5 h-5 w-5 shrink-0 text-gold">
                      <Icon name="check" />
                    </span>
                    <div>
                      <p className="font-display text-lg leading-snug">
                        {cert.issuer}
                      </p>
                      <p className="mt-1 text-sm text-muted">{cert.program}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
