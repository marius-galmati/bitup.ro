/** Fluxurile RSS (PLAN Faza 3): un flux per limbă, doar articolele publicate, linkuri fără slash final (`trailingSlash: false`, cum s-a notat la spike). */
import rss from '@astrojs/rss';
import { dynamicPath, localePath, type Locale } from '../i18n';
import { visiblePosts, slugOf } from './collections';
import { site } from './site';
import { blogRo } from '../copy/blog.ro';
import { blogEn } from '../copy/blog.en';

export async function feed(lang: Locale) {
  const copy = lang === 'ro' ? blogRo : blogEn;
  const posts = (await visiblePosts(lang)).filter((p) => !p.data.draft);
  return rss({
    title: copy.title,
    description: copy.description,
    site: site.url,
    trailingSlash: false,
    items: posts.map((p) => ({
      title: p.data.title,
      description: p.data.description,
      pubDate: p.data.pubDate,
      link: dynamicPath('post', lang, slugOf(p.id)),
      categories: p.data.tags,
    })),
    xmlns: { atom: 'http://www.w3.org/2005/Atom' },
    customData: `<language>${lang}</language><atom:link href="${site.url}${localePath('rss', lang)}" rel="self" type="application/rss+xml"/>`,
  });
}
