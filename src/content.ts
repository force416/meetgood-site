// 文案字典。值為可信任的 HTML 片段（由我們自己撰寫），渲染時不再跳脫。
export type Lang = "zh" | "en";

export interface Service {
	code: string;
	title: string;
	body: string;
	items: string[];
}

export interface Step {
	title: string;
	label: string;
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

export const EMAIL = "support@ericshih.dev";

export const content: Record<Lang, Content> = {
	zh: {
		htmlLang: "zh-Hant-TW",
		path: "/",
		ogLocale: "zh_TW",
		title: "覓谷資訊｜MeetGood 軟體開發與資料服務",
		description: "覓谷資訊提供軟體開發、資料處理與電子資訊服務。在資訊的山谷裡，替你找到路。",
		siteName: "覓谷資訊",
		companyName: "覓谷資訊有限公司",
		nav: { services: "服務", approach: "方法", name: "名字", contact: "聯絡" },
		switchLabel: "切換語言",
		hero: {
			kicker: "軟體・資料・資訊服務",
			headline: "在資訊的山谷裡，<br>找到路。",
			lede: "覓谷資訊開發網站與後端系統、整理資料、維運線上服務。從一支程式到一整套系統，我們都先看清楚地形、畫好路線，再把路鋪好。",
			cta: "寫信給我們",
		},
		legend: { title: "圖例 · LEGEND", contour: "等高線", trail: "路線", destination: "目的地" },
		services: {
			index: "01",
			heading: "服務項目",
			intro: "我們的工作分成三個領域。每一項都對應公司登記的營業項目。",
			items: [
				{
					code: "I301010",
					title: "資訊軟體服務",
					body: "網站、後端服務與內部系統的設計和開發。先弄清楚要解決的問題，再決定要寫多少程式。",
					items: ["官方網站製作", "API 設計與第三方串接", "內部作業系統", "AI 協助導入工作流程"],
				},
				{
					code: "I301020",
					title: "資料處理服務",
					body: "把散落的資料整理成可以信任的資料。包含資料清理、轉換流程與報表自動化。",
					items: ["資料清理與格式轉換", "排程資料管線（ETL）", "自動化報表"],
				},
				{
					code: "I301030",
					title: "電子資訊供應服務",
					body: "建立與維運線上資訊服務，讓資訊穩定、即時地送到需要的人手上。",
					items: ["雲端與邊緣部署", "監控與告警", "既有系統與網站維護"],
				},
			],
		},
		approach: {
			index: "02",
			heading: "合作流程",
			intro: "每個專案都走同一條路線。路線清楚，進度就清楚。",
			steps: [
				{ title: "勘查", label: "需求訪談", body: "聽你描述目的地，看清楚現況、限制與真正的問題。" },
				{ title: "測繪", label: "規劃與估時", body: "把需求畫成地圖：範圍、優先順序、技術選擇與時程。" },
				{ title: "開路", label: "開發與交付", body: "小步前進，頻繁交付。每一段路都可以走、可以驗收。" },
				{ title: "巡山", label: "上線維運", body: "上線不是終點。我們持續監看、修補與改善。" },
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
			lede: "MeetGood builds websites and backend systems, processes data and runs online services. From a single script to a full system, we survey the terrain and map the route before we build the road.",
			cta: "Write to us",
		},
		legend: { title: "LEGEND", contour: "Contour", trail: "Route", destination: "Destination" },
		services: {
			index: "01",
			heading: "What we do",
			intro: "Our work covers three fields. Each one matches a registered line of business.",
			items: [
				{
					code: "I301010",
					title: "Software services",
					body: "Design and development of websites, backend services and internal systems. We define the problem first, then decide how much code it needs.",
					items: ["Company websites", "API design and integrations", "Internal business systems", "AI-assisted workflow adoption"],
				},
				{
					code: "I301020",
					title: "Data processing",
					body: "We turn scattered data into data you can trust: cleaning, transformation pipelines and automated reports.",
					items: ["Data cleaning and conversion", "Scheduled pipelines (ETL)", "Automated reports"],
				},
				{
					code: "I301030",
					title: "Online information services",
					body: "We build and run online services that deliver information reliably and on time to the people who need it.",
					items: ["Cloud and edge deployment", "Monitoring and alerts", "Maintenance of existing systems and websites"],
				},
			],
		},
		approach: {
			index: "02",
			heading: "How we work",
			intro: "Every project follows the same route. A clear route means clear progress.",
			steps: [
				{ title: "Survey", label: "Discovery", body: "We listen to where you want to go and study the terrain, the limits and the real problem." },
				{ title: "Map", label: "Planning and estimates", body: "We turn requirements into a map: scope, priorities, technical choices and timeline." },
				{ title: "Build", label: "Development and delivery", body: "Small steps, frequent delivery. Every stretch of road is usable and reviewable." },
				{ title: "Patrol", label: "Operations", body: "Launch is not the end. We monitor, repair and improve." },
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
