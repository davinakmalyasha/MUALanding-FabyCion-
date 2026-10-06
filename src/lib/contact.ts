import { site, whatsappMessage } from "@/content/site";

/**
 * Builds a wa.me deep link with a pre-filled message so enquiries arrive
 * already scoped to the section the visitor clicked from.
 */
export function whatsappUrl(message: string = whatsappMessage): string {
  return `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function whatsappUrlFor(topic: string): string {
  return whatsappUrl(`Halo Faby Cion, saya mau tanya soal ${topic}.`);
}
