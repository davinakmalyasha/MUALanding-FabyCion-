import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} — ${site.role} ${site.city}`,
    short_name: site.brandLine,
    description: site.description,
    start_url: "/",
    display: "standalone",
    lang: "id",
    background_color: "#faf7f2",
    theme_color: "#b08d4f",
    icons: [{ src: "/favicon.ico", sizes: "any", type: "image/x-icon" }],
  };
}
