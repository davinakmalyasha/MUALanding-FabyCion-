import type { ProcessStep } from "@/types";

/**
 * Booking flow. Deliberately free of specific policies (DP percentages,
 * cancellation windows) because none were supplied yet.
 * TODO(client): add the real terms here once confirmed.
 */
export const processSteps = [
  {
    title: "Hubungi via WhatsApp",
    description: "Kirim pesan dan ceritakan acara yang sedang Anda siapkan.",
  },
  {
    title: "Sampaikan detail acara",
    description: "Berikan tanggal, lokasi, serta jumlah orang yang perlu dirias.",
  },
  {
    title: "Diskusikan paket",
    description: "Kami rekomendasikan look yang sesuai, lalu konfirmasi harga.",
  },
  {
    title: "Kunci tanggal",
    description: "Setelah disepakati, tanggal resmi dibooking untuk Anda.",
  },
  {
    title: "Siap di hari H",
    description: "Faby hadir sesuai jadwal dan merias hingga Anda siap tampil.",
  },
] satisfies ProcessStep[];
