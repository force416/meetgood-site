// 文案字典。值為可信任的 HTML 片段（由我們自己撰寫），渲染時不再跳脫。
export type Lang = "zh" | "en";

export interface Service {
	code: string;
	station: string;
	title: string;
	body: string;
	tags: string[];
}

export interface Step {
	title: string;
	body: string;
}

export interface Content {
	htmlLang: string;
	path: string;
	ogLocale: string;
	title: string;
	description: string;
	siteName: string;
	companyName: string;
	nav: { services: string; approach: string; name: string; contact: string };
	switchLabel: string;
	hero: { kicker: string; headline: string; lede: string; cta: string };
	legend: { title: string; contour: string; trail: string; destination: string };
	services: { index: string; heading: string; intro: string; items: Service[] };
	approach: { index: string; heading: string; intro: string; steps: Step[] };
	name: { index: string; heading: string; paragraphs: string[]; glyphs: { char: string; gloss: string }[] };
	contact: { index: string; heading: string; body: string };
	footer: { rights: string; back: string };
	notFound: { title: string; body: string; back: string };
}

export const EMAIL = "support@ericshih.net";

export const content: Record<Lang, Content> = {
	zh: {
		htmlLang: "zh-Hant-TW",
		path: "/",
		ogLocale: "zh_TW",
		title: "覓谷資訊有限公司｜MeetGood Information",
		description: "覓谷資訊提供軟體開發、資料處理與電子資訊服務。在資訊的山谷裡，替你找到路。",
		siteName: "覓谷資訊",
		companyName: "覓谷資訊有限公司",
		nav: { services: "服務", approach: "方法", name: "名字", contact: "聯絡" },
		switchLabel: "切換語言",
		hero: {
			kicker: "軟體・資料・資訊服務",
			headline: "在資訊的山谷裡，<br>找到路。",
			lede: "覓谷資訊替團隊勘查問題的地形，畫出可行的路線，再把路鋪好。從一支程式到一整套系統，我們都用同一種踏實的方式走完。",
			cta: "寫信給我們",
		},
		legend: { title: "圖例 · LEGEND", contour: "等高線", trail: "路線", destination: "目的地" },
		services: {
			index: "01",
			heading: "三個測站",
			intro: "我們的工作圍繞三個領域。每一項都對應公司登記的營業項目。",
			items: [
				{
					code: "I301010",
					station: "測站 A",
					title: "資訊軟體服務",
					body: "網站、後端服務與內部系統的設計和開發。先弄清楚要解決的問題，再決定要寫多少程式。",
					tags: ["Web", "API", "系統整合"],
				},
				{
					code: "I301020",
					station: "測站 B",
					title: "資料處理服務",
					body: "把散落的資料整理成可以信任的資料。包含資料清理、轉換流程與報表自動化。",
					tags: ["ETL", "資料管線", "報表"],
				},
				{
					code: "I301030",
					station: "測站 C",
					title: "電子資訊供應服務",
					body: "建立與維運線上資訊服務，讓資訊穩定、即時地送到需要的人手上。",
					tags: ["雲端部署", "邊緣運算", "維運"],
				},
			],
		},
		approach: {
			index: "02",
			heading: "我們怎麼走",
			intro: "每個專案都走同一條路線。路線清楚，進度就清楚。",
			steps: [
				{ title: "勘查", body: "聽你描述目的地，看清楚現況、限制與真正的問題。" },
				{ title: "測繪", body: "把需求畫成地圖：範圍、優先順序、技術選擇與時程。" },
				{ title: "開路", body: "小步前進，頻繁交付。每一段路都可以走、可以驗收。" },
				{ title: "巡山", body: "上線不是終點。我們持續監看、修補與改善。" },
			],
		},
		name: {
			index: "03",
			heading: "關於這個名字",
			paragraphs: [
				"「覓」是尋找，「谷」是山谷。資訊系統常常像一片山谷：路徑很多，霧也很濃。",
				"我們的工作，是在霧裡找到那一條最合理的路。英文名 MeetGood 取自「覓谷」的發音，也代表我們想和每一位客戶好好相遇。",
			],
			glyphs: [
				{ char: "覓", gloss: "mì・尋找" },
				{ char: "谷", gloss: "gǔ・山谷" },
			],
		},
		contact: {
			index: "04",
			heading: "告訴我們，你想去哪裡。",
			body: "專案、合作或任何問題，都歡迎來信。我們會盡快回覆。",
		},
		footer: { rights: "版權所有", back: "回到頂端" },
		notFound: { title: "這條路不通", body: "你要找的頁面不在地圖上。", back: "回到首頁" },
	},
	en: {
		htmlLang: "en",
		path: "/en",
		ogLocale: "en_US",
		title: "MeetGood Information Co., Ltd.",
		description:
			"MeetGood builds software, processes data and runs online information services. We find the path through the valley of information.",
		siteName: "MeetGood",
		companyName: "MeetGood Information Co., Ltd.",
		nav: { services: "Services", approach: "Approach", name: "The name", contact: "Contact" },
		switchLabel: "Switch language",
		hero: {
			kicker: "Software · Data · Information services",
			headline: "Finding the path<br>through the valley.",
			lede: "MeetGood surveys the terrain of your problem, maps a route that works, and then builds the road. From a single script to a full system, we walk it the same steady way.",
			cta: "Write to us",
		},
		legend: { title: "LEGEND", contour: "Contour", trail: "Route", destination: "Destination" },
		services: {
			index: "01",
			heading: "Three stations",
			intro: "Our work covers three fields. Each one matches a registered line of business.",
			items: [
				{
					code: "I301010",
					station: "Station A",
					title: "Software services",
					body: "Design and development of websites, backend services and internal systems. We define the problem first, then decide how much code it needs.",
					tags: ["Web", "API", "Integration"],
				},
				{
					code: "I301020",
					station: "Station B",
					title: "Data processing",
					body: "We turn scattered data into data you can trust: cleaning, transformation pipelines and automated reports.",
					tags: ["ETL", "Pipelines", "Reporting"],
				},
				{
					code: "I301030",
					station: "Station C",
					title: "Online information services",
					body: "We build and run online services that deliver information reliably and on time to the people who need it.",
					tags: ["Cloud", "Edge", "Operations"],
				},
			],
		},
		approach: {
			index: "02",
			heading: "How we walk",
			intro: "Every project follows the same route. A clear route means clear progress.",
			steps: [
				{ title: "Survey", body: "We listen to where you want to go and study the terrain, the limits and the real problem." },
				{ title: "Map", body: "We turn requirements into a map: scope, priorities, technical choices and timeline." },
				{ title: "Build", body: "Small steps, frequent delivery. Every stretch of road is usable and reviewable." },
				{ title: "Patrol", body: "Launch is not the end. We monitor, repair and improve." },
			],
		},
		name: {
			index: "03",
			heading: "About the name",
			paragraphs: [
				"覓 (mì) means “to seek”. 谷 (gǔ) means “valley”. Information systems often feel like a valley: many paths, thick fog.",
				"Our job is to find the most sensible path through that fog. MeetGood echoes the sound of 覓谷, and it says what we hope for with every client: a good meeting.",
			],
			glyphs: [
				{ char: "覓", gloss: "mì · to seek" },
				{ char: "谷", gloss: "gǔ · valley" },
			],
		},
		contact: {
			index: "04",
			heading: "Tell us where you want to go.",
			body: "Projects, partnerships or questions — send us a note. We reply as soon as we can.",
		},
		footer: { rights: "All rights reserved", back: "Back to top" },
		notFound: { title: "Dead end", body: "The page you are looking for is not on the map.", back: "Back to home" },
	},
};
