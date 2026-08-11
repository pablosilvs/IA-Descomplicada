# IA Descomplicada

Portal brasileiro sobre Inteligência Artificial, construído com Astro e preparado para geração estática no Netlify.

O projeto prioriza HTML indexável, CSS leve, JavaScript mínimo, conteúdo editorial local e imagens selecionadas do CDN oficial do Pexels. A versão atual não contém anúncios, IDs fictícios de analytics ou integração de newsletter.

## 1. Instalação

Requisitos:

- Node.js 20 ou superior
- npm 10 ou superior

Na pasta do projeto:

```bash
npm install
```

## 2. Rodar localmente

```bash
npm run dev
```

Abra o endereço informado pelo Astro, normalmente `http://localhost:4321`.

## 3. Fazer build

```bash
npm run check
npm run build
```

O build estático é criado em `dist/`. Para testar a versão gerada localmente:

```bash
npm run preview
```

## 4. Publicar no Netlify

### Pela interface do Netlify

1. Suba este projeto para um repositório Git.
2. No Netlify, escolha **Add new site > Import an existing project**.
3. Use `npm run build` como **Build command**.
4. Use `dist` como **Publish directory**.
5. Publique o site.

O arquivo `netlify.toml` já registra essas configurações e os headers de segurança. O formulário da página `/contato/` usa Netlify Forms quando o domínio estiver publicado no Netlify.

### Pela CLI

Com a CLI do Netlify instalada e autenticada:

```bash
netlify deploy --prod --dir=dist
```

## 5. Adicionar um artigo novo

Edite `src/content/articles.ts` e adicione um objeto ao array `articles` com:

- `slug`, `title` e `description`
- `category` e `section` (`tutorial`, `guia`, `comparativo` ou `tendencia`)
- autor, datas, imagem, alt text e tempo de leitura
- tags, sumário (`toc`) e corpo HTML em `body`
- `faqs` apenas quando houver perguntas frequentes reais no texto

O arquivo `src/pages/artigos/[slug].astro` gera a rota automaticamente. Use links internos para conteúdos relacionados e confira o build depois de editar.

## 6. Trocar imagens

As imagens dos artigos ficam em `src/content/articles.ts`. Cada artigo usa uma URL `images.pexels.com` com parâmetros de compressão e largura. Para trocar uma imagem:

1. Escolha uma foto relevante no Pexels.
2. Confirme que o endereço final do CDN responde corretamente.
3. Atualize `image` e `imageAlt` no artigo.
4. Preserve `loading="lazy"` nos cards; a imagem principal do artigo já é carregada com prioridade.

A imagem visual usada na faixa de destaque da home está no CSS global. Evite repetir a mesma foto em assuntos diferentes.

## 7. Alterar nome ou logo

Para trocar a marca, atualize:

- `src/components/Header.astro`
- `src/components/Footer.astro`
- `public/favicon.svg`
- `public/og-image.svg`
- os nomes e descrições estruturadas em `src/layouts/BaseLayout.astro` e `src/pages/index.astro`

## 8. Adicionar domínio

No Netlify, abra **Domain management** e adicione o domínio personalizado. Depois configure o DNS indicado pelo Netlify.

Defina a URL canônica real no ambiente de build:

```bash
PUBLIC_SITE_URL=https://www.seudominio.com npm run build
```

No painel do Netlify, adicione `PUBLIC_SITE_URL` em **Site configuration > Environment variables**. A variável atualiza canonical, Open Graph, sitemap e `robots.txt`.

## 9. Adicionar Google Analytics futuramente

Não há ID de analytics no projeto. Quando a medição estiver definida:

1. Adicione o script oficial em `src/layouts/BaseLayout.astro` ou por uma integração própria.
2. Use o ID real fornecido pelo Google, nunca um placeholder.
3. Atualize a Política de Privacidade e a Política de Cookies.
4. Implemente consentimento quando necessário para o público e a jurisdição do site.
5. Teste se o script não bloqueia o conteúdo nem prejudica Core Web Vitals.

O Google Search Console é configurado no painel do próprio Google, normalmente por DNS ou por uma meta tag de verificação. Adicione a tag apenas quando receber o valor real.

## 10. Adicionar Google AdSense futuramente

`src/components/AdSlot.astro` é o ponto central para os espaços de publicidade. Ele só renderiza um bloco quando `PUBLIC_ADSENSE_ENABLED=true` e `PUBLIC_ADSENSE_SLOT` possuem valores configurados.

Antes de ativar:

1. Solicite e obtenha aprovação do site no AdSense.
2. Configure `PUBLIC_ADSENSE_PUBLISHER_ID` e `PUBLIC_ADSENSE_SLOT` com IDs reais fornecidos pelo AdSense.
3. Atualize privacidade, cookies e consentimento.
4. Ative poucos espaços, sem interromper a leitura.
5. Teste mobile e desktop e monitore estabilidade visual.

Não há anúncios falsos ou blocos simulando publicidade nesta versão.

## Estrutura principal

```text
src/
  components/       Header, Footer, cards, busca, breadcrumbs e AdSlot
  content/          artigos e catálogo de ferramentas
  layouts/          layout geral e layout de artigo
  pages/            rotas estáticas, RSS, robots e 404
  styles/           identidade visual responsiva
  utils/            datas, URLs e conteúdos relacionados
public/             favicon e imagem Open Graph
```

## Verificações úteis

```bash
npm run check
npm run build
```

Depois do deploy, revise no navegador: menu mobile, busca, formulário Netlify, links externos, imagens Pexels, canonical, `sitemap-index.xml`, `robots.txt` e `rss.xml`.
