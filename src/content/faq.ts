import type { FaqItem } from "@/types";

/**
 * Answers are grounded in the rate card the client supplied. Nothing about
 * experience length, service area, or booking policy is invented — those
 * questions defer to WhatsApp instead.
 */
export const faqs = [
  {
    question: "Layanan apa saja yang tersedia?",
    answer:
      "Makeup pengantin, prewedding, bridesmaid, graduasi, party atau event, serta commercial untuk TV dan digital. Harga masing-masing ada di bagian Layanan.",
  },
  {
    question: "Apakah harga sudah termasuk transport?",
    answer:
      "Belum. Sesuai rate card, harga belum termasuk biaya transport dan softlens. Ongkos transport diinformasikan saat konfirmasi booking.",
  },
  {
    question: "Saya perlu softlens, apakah disediakan?",
    answer:
      "Softlens tidak termasuk dalam paket. Bila Anda ingin memakai softlens, lenses dibeli dan dibayar sendiri oleh Anda.",
  },
  {
    question: "Bagaimana cara membooking?",
    answer:
      "Cukup hubungi WhatsApp, sampaikan tanggal dan jenis acara, lalu kita diskusikan paket dan harga. Setelah disepakati, tanggal dikunci dan Faby hadir di hari H.",
  },
  {
    question: "Apakah saya bisa menentukan look sendiri?",
    answer:
      "Tentu. Anda bebas membawa foto referensi, dan kami sesuaikan dengan bentuk wajah, warna kulit, serta karakter yang ingin ditampilkan.",
  },
  {
    question: "Apakah hasilnya tahan lama?",
    answer:
      "Ya. Produk dan teknik yang dipakai dipilih agar hasil bertahan seharian, dari persiapan sampai acara selesai.",
  },
  {
    question: "Bisakah dirias beberapa orang sekaligus?",
    answer:
      "Bisa. Untuk pengantin bersama mother, sister, atau bridesmaid, cukup sampaikan jumlah orangnya saat booking agar jadwal dan waktunya bisa diatur.",
  },
  {
    question: "Apakah melayani area Jakarta?",
    answer:
      "Faby melayani area Jakarta dan sekitarnya. Hubungi via WhatsApp untuk memastikan ketersediaan area serta ongkos transport menuju lokasi Anda.",
  },
] satisfies FaqItem[];
