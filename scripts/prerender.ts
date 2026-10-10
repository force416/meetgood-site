// 在 build 前把頁面輸出成靜態 HTML，讓所有請求都由免費的 static assets 處理。
import { mkdirSync, writeFileSync } from "node:fs";
import { renderHome, renderNotFound } from "../src/render.ts";

const SITE = "https://meetgood.ericshih.net";
const out = new URL("../public/", import.meta.url);

const pages: Record<string, string> = {
	"index.html": renderHome("zh", SITE),
	"en.html": renderHome("en", SITE),
	"404.html": renderNotFound("zh", SITE),
	"en/404.html": renderNotFound("en", SITE),
};

for (const [file, html] of Object.entries(pages)) {
	const url = new URL(file, out);
	mkdirSync(new URL(".", url), { recursive: true });
	writeFileSync(url, html);
	console.log(`prerendered public/${file}`);
}
