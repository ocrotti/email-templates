import type { Locale } from "@/i18n/routing";
import type { Article } from "@/content/types";
import articlesData from "./articles.json";

// Articles are stored as JSON (generated + hand-editable). To add an
// article, append an object with the same shape — see README.
export const articles = articlesData as Article[];

export function getArticleBySlug(
  slug: string,
  locale: Locale,
): Article | undefined {
  return articles.find((a) => a.slug[locale] === slug);
}

export const sortedArticles = [...articles].sort((a, b) =>
  b.date.localeCompare(a.date),
);
