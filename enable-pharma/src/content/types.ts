import type { Locale } from "@/i18n/routing";

export type Dict<T> = Record<Locale, T>;

export interface SeoMeta {
  /** ≤ 60 chars */
  title: string;
  /** ≤ 155 chars */
  description: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface Kpi {
  value: number;
  /** Symbols only (e.g. "+") — rendered at display size with the number */
  prefix?: string;
  /** Symbols only (e.g. "%") — rendered at display size with the number */
  suffix?: string;
  /** Word units (e.g. "mesi") — rendered smaller so the figure stays legible */
  unit?: string;
  label: string;
}

export interface ProcessPhase {
  index: string;
  title: string;
  weeks: string;
  owner: string;
  body: string;
  deliverables: string[];
}

export interface ArticleSection {
  heading: string;
  paragraphs: string[];
  list?: string[];
}

export interface ArticleLang {
  title: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  sections: ArticleSection[];
  sources?: { label: string; note?: string }[];
}

export interface Article {
  slug: Dict<string>;
  date: string;
  keywords: string[];
  readingMinutes: number;
  content: Dict<ArticleLang>;
}
