import Link from "next/link";
import type { Locale } from "@/lib/site";
import { localePath } from "@/lib/site";
import { blogIndex, blogPosts, type BlogPost } from "@/content/blog";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";
import MagneticButton from "@/components/MagneticButton";
import Reveal from "@/components/Reveal";
import Section from "@/components/Section";
import { shared } from "@/content/shared";

export function BlogIndexPage({ locale }: { locale: Locale }) {
  const t = blogIndex[locale];
  const posts = blogPosts[locale];

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "enable.talent", path: localePath(locale, "/") },
          { name: "Blog", path: localePath(locale, "/blog") },
        ]}
      />
      <section className="bg-ink px-5 pb-16 pt-32 text-paper md:px-10 md:pb-24 md:pt-44">
        <div className="mx-auto w-full max-w-wrap">
          <Reveal>
            <h1 className="text-display-lg max-w-4xl font-display font-bold">{t.title}</h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-mist">{t.intro}</p>
          </Reveal>
        </div>
      </section>
      <Section theme="dark">
        <div className="grid gap-6 md:grid-cols-2">
          {posts.map((post, i) => (
            <Reveal key={post.slug} delay={i * 0.08}>
              <Link
                href={localePath(locale, `/blog/${post.slug}`)}
                className="group flex h-full flex-col justify-between rounded-2xl border border-ink-line bg-ink-soft/60 p-8 transition-all duration-300 hover:border-blue/50 hover:shadow-glow-blue"
              >
                <div>
                  <div className="flex items-center gap-3 text-xs text-mist">
                    <span className="rounded-full border border-amber/40 px-3 py-1 text-amber">{post.tag}</span>
                    <time dateTime={post.date}>{post.date}</time>
                    <span>·</span>
                    <span>{post.readingTime}</span>
                  </div>
                  <h2 className="mt-5 font-display text-2xl font-semibold leading-tight text-paper transition-colors group-hover:text-blue-bright">
                    {post.title}
                  </h2>
                  <p className="mt-4 text-sm leading-relaxed text-mist">{post.description}</p>
                </div>
                <span className="mt-8 text-sm font-medium text-blue-bright">
                  {t.readMore} <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}

export function BlogPostPage({ locale, post }: { locale: Locale; post: BlogPost }) {
  const t = blogIndex[locale];
  const s = shared[locale];
  const path = `/blog/${post.slug}`;
  const headings = post.sections.filter((sec) => sec.heading).map((sec) => sec.heading!);

  return (
    <>
      <ArticleJsonLd
        title={post.title}
        description={post.description}
        path={localePath(locale, path)}
        datePublished={post.date}
        author={post.author}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "enable.talent", path: localePath(locale, "/") },
          { name: "Blog", path: localePath(locale, "/blog") },
          { name: post.title, path: localePath(locale, path) },
        ]}
      />

      <section className="bg-ink px-5 pb-12 pt-32 text-paper md:px-10 md:pb-16 md:pt-44">
        <div className="mx-auto w-full max-w-3xl">
          <Reveal>
            <Link href={localePath(locale, "/blog")} className="link-underline text-sm text-mist">
              {t.backToBlog}
            </Link>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="text-display-md mt-6 font-display font-bold">{post.title}</h1>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-mist">
              <span className="rounded-full border border-amber/40 px-3 py-1 text-xs text-amber">{post.tag}</span>
              <span>{post.author}</span>
              <span>·</span>
              <time dateTime={post.date}>{post.date}</time>
              <span>·</span>
              <span>{post.readingTime}</span>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="bg-ink px-5 pb-24 text-paper md:px-10">
        <div className="mx-auto grid w-full max-w-5xl gap-12 lg:grid-cols-[220px_1fr]">
          {/* TOC */}
          <aside className="hidden lg:block">
            <nav className="sticky top-28 rounded-2xl border border-ink-line p-5" aria-label={t.tocTitle}>
              <p className="mb-3 text-xs uppercase tracking-[0.2em] text-mist">{t.tocTitle}</p>
              <ol className="space-y-2">
                {headings.map((h, i) => (
                  <li key={h}>
                    <a href={`#section-${i}`} className="link-underline text-sm text-paper/70 hover:text-paper">
                      {h}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>

          {/* Article body */}
          <article className="min-w-0 max-w-3xl">
            {post.sections.map((section, si) => {
              const headingIndex = section.heading ? headings.indexOf(section.heading) : -1;
              return (
                <div key={si} className="mb-10">
                  {section.heading ? (
                    <h2 id={`section-${headingIndex}`} className="mb-4 scroll-mt-28 font-display text-2xl font-semibold text-paper">
                      {section.heading}
                    </h2>
                  ) : null}
                  {section.paragraphs.map((p) => (
                    <p key={p.slice(0, 32)} className="mb-4 text-base leading-relaxed text-paper/80">
                      {p}
                    </p>
                  ))}
                  {section.list ? (
                    <ul className="mb-4 space-y-3">
                      {section.list.map((item) => (
                        <li key={item.slice(0, 32)} className="flex gap-3 text-base leading-relaxed text-paper/80">
                          <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-bright" aria-hidden />
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              );
            })}

            <div className="mt-16 rounded-3xl border border-blue/30 bg-blue/10 p-8">
              <h2 className="font-display text-xl font-semibold text-paper">{t.ctaTitle}</h2>
              <p className="mt-2 text-sm text-mist">{t.ctaBody}</p>
              <div className="mt-6">
                <MagneticButton href={localePath(locale, "/contact")}>{s.ctaPrimary} →</MagneticButton>
              </div>
            </div>
          </article>
        </div>
      </div>
    </>
  );
}
