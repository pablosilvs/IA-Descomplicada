export type ArticleSection = 'tutorial' | 'guia' | 'comparativo' | 'tendencia';

export interface TocItem {
  id: string;
  label: string;
  level: 2 | 3;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Article {
  slug: string;
  title: string;
  description: string;
  category: string;
  section: ArticleSection;
  author: string;
  publishedAt: string;
  updatedAt: string;
  image: string;
  imageAlt: string;
  readTime: string;
  tags: string[];
  toc: TocItem[];
  body: string;
  faqs?: FAQItem[];
}

export interface Tool {
  name: string;
  description: string;
  category: string;
  use: string;
  level: 'Iniciante' | 'Intermediário' | 'Avançado';
  url: string;
  accent: string;
}
