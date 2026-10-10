// 在 build 前把頁面輸出成靜態 HTML，讓所有請求都由免費的 static assets 處理。
import { mkdirSync, writeFileSync } from "node:fs";
import { renderHome, renderNotFound } from "../src/render.ts";

const SITE = "https://meetgood.ericshih.net";
const out = new URL("../public/", import.meta.url);

// 依 Google 規範：每個 <url> 都列出所有語言版本，包含自己。
function sitemap(): string {
	const alternates = [
		["zh-Hant-TW", `${SITE}/`],
		["en", `${SITE}/en`],
		["x-default", `${SITE}/`],
	]
		.map(([lang, href]) => `\t\t<xhtml:link rel="alternate" hreflang="${lang}" href="${href}"/>`)
		.join("\n");
	const urls = [`${SITE}/`, `${SITE}/en`]
		.map((loc) => `\t<url>\n\t\t<loc>${loc}</loc>\n${alternates}\n\t</url>`)
		.join("\n");
	return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`;
}

const pages: Record<string, string> = {
	"index.html": renderHome("zh", SITE),
	"en.html": renderHome("en", SITE),
	"404.html": renderNotFound("zh", SITE),
	"en/404.html": renderNotFound("en", SITE),
	"sitemap.xml": sitemap(),
	"robots.txt": `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`,
};

for (const [file, html] of Object.entries(pages)) {
	const url = new URL(file, out);
	mkdirSync(new URL(".", url), { recursive: true });
	writeFileSync(url, html);
	console.log(`prerendered public/${file}`);
}
