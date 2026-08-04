export interface ScaleLevel {
  value: number;
  label: string;
  description: string;
}

/**
 * Level korosi 1-5.
 * Patokan: seberapa dalam karat sudah memakan pelat dan apa tindakan perbaikannya.
 */
export const CORROSION_LEVELS: ScaleLevel[] = [
  {
    value: 1,
    label: "Bersih",
    description:
      "Cat masih utuh, tidak ada bercak karat. Logam belum terpapar. Cukup perawatan rutin.",
  },
  {
    value: 2,
    label: "Ringan",
    description:
      "Karat permukaan berupa bercak/noda tipis, cat mulai pudar atau tergores. Hilang dengan amplas ringan, tebal pelat belum berkurang.",
  },
  {
    value: 3,
    label: "Sedang",
    description:
      "Karat merata di sebagian area, cat mengelupas, muncul pitting dangkal. Perlu diamplas sampai logam lalu primer & cat ulang.",
  },
  {
    value: 4,
    label: "Berat",
    description:
      "Karat menembus lapisan, pitting dalam, pelat menipis atau berlubang kecil, jalur las ikut terkorosi. Perlu penambalan atau ganti sebagian.",
  },
  {
    value: 5,
    label: "Parah",
    description:
      "Pelat keropos dan berlubang tembus, penampang hilang signifikan, kekuatan struktur turun. Komponen tidak layak pakai, harus diganti.",
  },
];

/**
 * Frekuensi pakai 1-10.
 * Patokan: rata-rata hari operasi kendaraan per bulan.
 */
export const USAGE_FREQUENCY_LEVELS: ScaleLevel[] = [
  {
    value: 1,
    label: "Sangat jarang",
    description: "Kurang dari 1x seminggu (±1-3 hari operasi/bulan). Unit cadangan atau musiman.",
  },
  {
    value: 2,
    label: "Jarang",
    description: "Sekitar 1x seminggu (±4-5 hari operasi/bulan).",
  },
  {
    value: 3,
    label: "Jarang",
    description: "Sekitar 2x seminggu (±8 hari operasi/bulan).",
  },
  {
    value: 4,
    label: "Cukup sering",
    description: "Sekitar 3x seminggu (±12 hari operasi/bulan).",
  },
  {
    value: 5,
    label: "Sedang",
    description: "Sekitar 4x seminggu (±16 hari operasi/bulan). Pemakaian normal separuh bulan.",
  },
  {
    value: 6,
    label: "Sedang",
    description: "5 hari kerja seminggu (±20 hari operasi/bulan), 1 shift.",
  },
  {
    value: 7,
    label: "Sering",
    description: "6 hari kerja seminggu (±24 hari operasi/bulan), 1 shift.",
  },
  {
    value: 8,
    label: "Sering",
    description: "Hampir setiap hari (±26-28 hari operasi/bulan), 1 shift penuh.",
  },
  {
    value: 9,
    label: "Sangat sering",
    description: "Setiap hari tanpa libur (±30 hari operasi/bulan) atau 2 shift, rute jarak jauh.",
  },
  {
    value: 10,
    label: "Non-stop",
    description: "Operasi 24/7, 2-3 shift bergantian tanpa hari libur. Beban pakai maksimal.",
  },
];
