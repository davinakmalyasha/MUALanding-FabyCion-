import { waLink } from "@/content/site";

export { waLink as whatsappUrl };

/** Scopes the pre-filled message to the section the visitor clicked from. */
export function whatsappUrlFor(topic: string): string {
  return waLink(`Halo Faby Cion, saya mau tanya soal ${topic}.`);
}
