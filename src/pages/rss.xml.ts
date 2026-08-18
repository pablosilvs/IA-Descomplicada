import type { APIRoute } from 'astro';
import { articles } from '../content/articles';
import { articleUrl } from '../utils/site';

const escapeXml = (value: string) => value
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&apos;');

export const GET: APIRoute = ({ site }) => {
  const origin = (site || new URL('https://ia-descomplicadaoofc.netlify.app')).toString().replace(/\/$/, '');
  const items = [...articles]
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .map((article) => `
      <item>
        <title>${escapeXml(article.title)}</title>
        <description>${escapeXml(article.description)}</description>
        <link>${origin}${articleUrl(article.slug)}</link>
        <guid>${origin}${articleUrl(article.slug)}</guid>
        <pubDate>${new Date(`${article.publishedAt}T12:00:00Z`).toUTCString()}</pubDate>
      </item>`)
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
    <rss version="2.0">
      <channel>
        <title>IA Descomplicada</title>
        <description>Inteligência Artificial sem complicação.</description>
        <link>${origin}/</link>
        <language>pt-BR</language>
        ${items}
      </channel>
    </rss>`;

  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
