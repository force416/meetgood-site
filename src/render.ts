import { EMAIL, content, type Content, type Lang } from "./content.ts";

const FONTS: Record<Lang, string[]> = {
	zh: [
		"https://fonts.googleapis.com/css2?family=Noto+Serif+TC:wght@500;900&family=Noto+Sans+TC:wght@400;500&family=IBM+Plex+Mono:wght@400;500&display=swap",
	],
	en: [
		"https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;1,6..72,400&family=IBM+Plex+Sans:wght@400;500&family=IBM+Plex+Mono:wght@400;500&display=swap",
		// 英文版只需要「覓谷資訊」四個字的明體字形，用 text= 子集化。
		`https://fonts.googleapis.com/css2?family=Noto+Serif+TC:wght@900&text=${encodeURIComponent("覓谷資訊")}&display=swap`,
	],
};

const mark = (cls: string) => `
<svg class="${cls}" viewBox="0 0 40 40" aria-hidden="true">
	<path d="M4 9c5 0 7 9 16 9s11-9 16-9" fill="none" stroke="currentColor" stroke-width="1.6"/>
	<path d="M8 17c4 0 6 7 12 7s8-7 12-7" fill="none" stroke="currentColor" stroke-width="1.6"/>
	<path d="M13 25c3 0 4 5 7 5s4-5 7-5" fill="none" stroke="currentColor" stroke-width="1.6"/>
	<circle cx="20" cy="34" r="2.6" fill="var(--seal)"/>
</svg>`;

const seal = (cls: string) =>
	`<span class="${cls}" aria-hidden="true"><span>覓</span><span>谷</span></span>`;

// 首頁才輸出結構化資料。只放公開資訊，不含統編與地址。
// WebSite 決定 Google 顯示的網站名稱，只能放在子網域根目錄 /。
function jsonLd(origin: string, lang: Lang): string {
	const organization = {
		"@type": "Organization",
		"@id": `${origin}/#organization`,
		name: content.zh.companyName,
		legalName: content.zh.companyName,
		alternateName: [content.en.companyName, "覓谷資訊", "MeetGood"],
		url: `${origin}/`,
		logo: `${origin}/logo.png`,
		email: EMAIL,
	};
	const website = {
		"@type": "WebSite",
		"@id": `${origin}/#website`,
		name: content.zh.siteName,
		alternateName: [content.en.siteName, content.zh.companyName],
		url: `${origin}/`,
	};
	const data = {
		"@context": "https://schema.org",
		"@graph": lang === "zh" ? [website, organization] : [organization],
	};
	return `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, "\\u003c")}</script>`;
}

function head(c: Content, lang: Lang, origin: string, title: string, indexable: boolean): string {
	const other = content[lang === "zh" ? "en" : "zh"];
	const seo = indexable
		? `<link rel="canonical" href="${origin}${c.path}">
<link rel="alternate" hreflang="zh-Hant-TW" href="${origin}/">
<link rel="alternate" hreflang="en" href="${origin}/en">
<link rel="alternate" hreflang="x-default" href="${origin}/">
<meta property="og:url" content="${origin}${c.path}">
${jsonLd(origin, lang)}`
		: `<meta name="robots" content="noindex">`;

	return `<!doctype html>
<html lang="${c.htmlLang}" data-lang="${lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="description" content="${c.description}">
<meta name="theme-color" content="#ece6d9">
${seo}
<meta property="og:type" content="website">
<meta property="og:site_name" content="${c.siteName}">
<meta property="og:title" content="${c.title}">
<meta property="og:description" content="${c.description}">
<meta property="og:locale" content="${c.ogLocale}">
<meta property="og:locale:alternate" content="${other.ogLocale}">
<meta property="og:image" content="${origin}/og.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${c.companyName}">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
${FONTS[lang].map((href) => `<link rel="stylesheet" href="${href}">`).join("\n")}
<link rel="stylesheet" href="/styles.css">
<script>document.documentElement.classList.add("js")</script>
</head>`;
}

function header(c: Content, lang: Lang): string {
	const other: Lang = lang === "zh" ? "en" : "zh";
	return `
<header class="top">
	<a class="brand" href="${c.path}" aria-label="${c.companyName}">
		${mark("brand__mark")}
		<span class="brand__zh">覓谷資訊</span>
		<span class="brand__en">MeetGood</span>
	</a>
	<nav class="nav" aria-label="Primary">
		<a href="${c.path}#services">${c.nav.services}</a>
		<a href="${c.path}#approach">${c.nav.approach}</a>
		<a href="${c.path}#name">${c.nav.name}</a>
		<a href="${c.path}#contact">${c.nav.contact}</a>
	</nav>
	<div class="lang" role="group" aria-label="${c.switchLabel}">
		<a href="/" hreflang="zh-Hant-TW" lang="zh-Hant-TW"${lang === "zh" ? ' aria-current="true"' : ""}>中</a>
		<span aria-hidden="true">/</span>
		<a href="/en" hreflang="en" lang="en"${lang === "en" ? ' aria-current="true"' : ""}>EN</a>
	</div>
	<a class="lang--mobile" href="${content[other].path}" lang="${content[other].htmlLang}">${other === "en" ? "EN" : "中"}</a>
</header>`;
}

function footer(c: Content): string {
	const year = new Date().getUTCFullYear();
	return `
<footer class="foot">
	<div class="foot__brand">
		${seal("seal seal--sm")}
		<div>
			<p>${content.zh.companyName}</p>
			<p>${content.en.companyName}</p>
		</div>
	</div>
	<p class="foot__meta">© ${year} ${c.footer.rights}</p>
	<a class="foot__top" href="#top">${c.footer.back} ↑</a>
</footer>`;
}

export function renderHome(lang: Lang, origin: string): string {
	const c = content[lang];
	const s = c.services;
	const a = c.approach;
	const n = c.name;

	return `${head(c, lang, origin, c.title, true)}
<body id="top">
${header(c, lang)}
<main>
	<section class="hero">
		<canvas class="topo" data-topo="hero" aria-hidden="true"></canvas>
		<div class="hero__inner">
			<p class="kicker">${c.hero.kicker}</p>
			<h1 class="hero__title">${c.hero.headline}</h1>
			<p class="hero__lede">${c.hero.lede}</p>
			<a class="cta" href="#contact"><span>${c.hero.cta}</span><span class="cta__arrow" aria-hidden="true">→</span></a>
		</div>
		<aside class="legend" aria-hidden="true">
			<p class="legend__title">${c.legend.title}</p>
			<ul>
				<li><svg viewBox="0 0 36 8"><path d="M1 4c6-4 10 4 17 0s11 4 17 0" fill="none" stroke="currentColor"/></svg>${c.legend.contour}</li>
				<li><svg viewBox="0 0 36 8"><path d="M1 4h34" fill="none" stroke="var(--seal)" stroke-width="1.5" stroke-dasharray="3 3"/></svg>${c.legend.trail}</li>
				<li><svg viewBox="0 0 36 8"><circle cx="18" cy="4" r="3" fill="var(--seal)"/></svg>${c.legend.destination}</li>
			</ul>
			<div class="scale"><span></span><span></span><span></span><span></span></div>
			<p class="scale__label">0 · · · 1 km</p>
		</aside>
		<div class="north" aria-hidden="true"><span>N</span><svg viewBox="0 0 12 28"><path d="M6 0 12 28 6 22 0 28Z" fill="currentColor"/></svg></div>
	</section>

	<section class="section services" id="services">
		<header class="section__head">
			<span class="section__index">${s.index}</span>
			<h2 class="section__title">${s.heading}</h2>
			<p class="section__intro">${s.intro}</p>
		</header>
		<ol class="stations">
			${s.items
				.map(
					(it) => `
			<li class="station reveal">
				<div class="station__meta">
					<svg class="station__icon" viewBox="0 0 20 18" aria-hidden="true"><path d="M10 1 19 17H1Z" fill="none" stroke="currentColor" stroke-width="1.4"/><circle cx="10" cy="11.5" r="1.6" fill="currentColor"/></svg>
					<span>${it.station}</span>
					<span class="station__code">${it.code}</span>
				</div>
				<h3 class="station__title">${it.title}</h3>
				<p class="station__body">${it.body}</p>
				<ul class="tags">${it.tags.map((t) => `<li>${t}</li>`).join("")}</ul>
			</li>`,
				)
				.join("")}
		</ol>
	</section>

	<section class="section approach" id="approach">
		<header class="section__head">
			<span class="section__index">${a.index}</span>
			<h2 class="section__title">${a.heading}</h2>
			<p class="section__intro">${a.intro}</p>
		</header>
		<ol class="trail">
			${a.steps
				.map(
					(st, i) => `
			<li class="waypoint reveal" style="--i:${i}">
				<span class="waypoint__no">${String(i + 1).padStart(2, "0")}</span>
				<span class="waypoint__dot" aria-hidden="true"></span>
				<h3 class="waypoint__title">${st.title}</h3>
				<p class="waypoint__body">${st.body}</p>
			</li>`,
				)
				.join("")}
		</ol>
	</section>

	<section class="section name" id="name">
		<canvas class="topo topo--dark" data-topo="name" aria-hidden="true"></canvas>
		<div class="name__glyphs" aria-hidden="true">
			${n.glyphs.map((g) => `<figure class="glyph"><span class="glyph__char">${g.char}</span><figcaption>${g.gloss}</figcaption></figure>`).join("")}
		</div>
		<div class="name__text">
			<span class="section__index">${n.index}</span>
			<h2 class="section__title">${n.heading}</h2>
			${n.paragraphs.map((p) => `<p>${p}</p>`).join("")}
		</div>
	</section>

	<section class="section contact" id="contact">
		<span class="section__index">${c.contact.index}</span>
		<h2 class="contact__title">${c.contact.heading}</h2>
		<p class="contact__body">${c.contact.body}</p>
		<a class="contact__mail" href="mailto:${EMAIL}">${EMAIL}<span aria-hidden="true">↗</span></a>
		${seal("seal seal--lg")}
	</section>
</main>
${footer(c)}
<script src="/site.js" defer></script>
</body>
</html>`;
}

export function renderNotFound(lang: Lang, origin: string): string {
	const c = content[lang];
	return `${head(c, lang, origin, `404 · ${c.title}`, false)}
<body id="top" class="is-404">
${header(c, lang)}
<main class="lost">
	<canvas class="topo" data-topo="lost" aria-hidden="true"></canvas>
	<p class="kicker">404</p>
	<h1 class="hero__title">${c.notFound.title}</h1>
	<p class="hero__lede">${c.notFound.body}</p>
	<a class="cta" href="${c.path}"><span>${c.notFound.back}</span><span class="cta__arrow" aria-hidden="true">→</span></a>
</main>
${footer(c)}
<script src="/site.js" defer></script>
</body>
</html>`;
}
