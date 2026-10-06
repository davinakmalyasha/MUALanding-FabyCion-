import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${site.name} — ${site.role} ${site.city}`;

/**
 * Rendered at build time from the same content config the page uses, so the
 * social card never drifts from the site copy. Typographic only, to keep it
 * dependency-free and crisp at every size.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          padding: "72px 80px",
          backgroundColor: "#faf7f2",
          color: "#1b1a18",
          fontFamily: "serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ width: 56, height: 2, backgroundColor: "#b08d4f" }} />
          <div
            style={{
              marginLeft: 24,
              fontSize: 24,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "#57524c",
            }}
          >
            {`${site.role} ${site.city}`}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 108,
              lineHeight: 1.05,
              letterSpacing: -2,
              color: "#1b1a18",
            }}
          >
            {site.brandLine}
          </div>
          <div
            style={{
              marginTop: 24,
              fontSize: 44,
              fontStyle: "italic",
              color: "#8a6b2f",
            }}
          >
            {site.tagline}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 26,
            color: "#57524c",
          }}
        >
          <div>{site.contact.phoneDisplay}</div>
          <div>{`wa.me/${site.contact.whatsapp}`}</div>
        </div>
      </div>
    ),
    size,
  );
}
