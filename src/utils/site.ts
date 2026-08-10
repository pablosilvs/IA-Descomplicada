import type { Article } from '../types';

export const siteName = 'IA Descomplicada';
export const siteDescription = 'Guias, ferramentas, tutoriais e comparativos para usar inteligência artificial com mais clareza.';

export function formatDate(value: string) {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${value}T12:00:00Z`));
}

export function articleUrl(slug: string) {
  return `/artigos/${slug}/`;
}

export function getRelatedArticles(article: Article, articles: Article[], limit = 3) {
  return articles
    .filter((candidate) => candidate.slug !== article.slug)
    .map((candidate) => ({
      article: candidate,
      score: candidate.category === article.category ? 3 : 0,
    }))
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.article.publishedAt < b.article.publishedAt ? 1 : -1;
    })
    .slice(0, limit)
    .map(({ article: candidate }) => candidate);
}

export function getCanonical(siteUrl: URL | undefined, pathname: string) {
  const origin = siteUrl?.origin || 'https://ia-descomplicada.netlify.app';
  return new URL(pathname, origin).toString();
}
