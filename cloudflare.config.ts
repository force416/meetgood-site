import { defineConfig } from "cf/config";

export default defineConfig({
	worker: {
		name: "meetgood-site",
		compatibilityDate: "2026-10-06",
		domains: ["meetgood.ericshih.net"],
		assets: {
			notFoundHandling: "404-page",
		},
	},
});
