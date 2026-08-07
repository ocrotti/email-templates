import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { routes } from './src/lib/routes.ts';

// Dominio di produzione: aggiornare qui (e rigenerare le immagini OG) se cambia.
const SITE = 'https://enableadvisory.com';

/*
 * Alternates hreflang per la sitemap, costruiti dalla mappa route IT↔EN.
 * L'opzione i18n di @astrojs/sitemap accoppia le pagine solo quando lo slug
 * coincide nelle due lingue: con gli slug localizzati (/it/servizi/ vs
 * /en/services/) copriva 6 URL su 34. Qui le coppie sono esplicite.
 */
const alternatesByUrl = new Map();
for (const pair of Object.values(routes)) {
  const links = [
    { lang: 'it-IT', url: SITE + pair.it },
    { lang: 'en', url: SITE + pair.en },
    { lang: 'x-default', url: SITE + pair.it },
  ];
  alternatesByUrl.set(SITE + pair.it, links);
  alternatesByUrl.set(SITE + pair.en, links);
}

export default defineConfig({
  site: SITE,
  trailingSlash: 'always',
  i18n: {
    defaultLocale: 'it',
    locales: ['it', 'en'],
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: false,
    },
  },
  integrations: [
    sitemap({
      filter: (page) => page !== `${SITE}/` && !page.includes('/404'),
      serialize(item) {
        const links = alternatesByUrl.get(item.url);
        if (links) item.links = links;
        return item;
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
