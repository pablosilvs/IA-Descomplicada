import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const origin = (site || new URL('https://descomplica-iaofc.netlify.app')).toString().replace(/\/$/, '');
  const content = `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap-index.xml\n`;
  return new Response(content, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
